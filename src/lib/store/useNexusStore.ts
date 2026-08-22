"use client";

import { useState, useEffect, useCallback } from "react";
import {
  AgentDefinition,
  WorkflowExecution,
  HumanApprovalItem,
  AuditLogEntry,
  UserProfile,
  SystemSettings,
  AgentId
} from "../types";
import { INITIAL_AGENTS } from "../agents/agent-definitions";
import {
  createInitialWorkflow,
  executeNextStep,
  PRESET_WORKFLOW_TEMPLATES
} from "../agents/langgraph-runner";

const STORAGE_KEY = "nexus_agent_store_v1";

const DEFAULT_USER: UserProfile = {
  id: "usr_priychan_01",
  name: "Priyadharshan Chandranath",
  email: "priyadharshan@nexus.enterprise.sap",
  role: "Architect",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80",
  tenantId: "TENANT_SAP_BTP_PROD_01",
  tenantName: "Global SAP Enterprise Suite"
};

const DEFAULT_SETTINGS: SystemSettings = {
  llmProvider: "openai",
  apiKeyConfigured: true,
  btpDestinationConfigured: true,
  btpSubdomain: "eu10-stage-sapient-btp",
  hanaVectorEnabled: true,
  zeroTrustEnforced: true,
  autoApproveLowRisk: false,
  telemetryEnabled: true
};

const INITIAL_AUDIT_LOGS: AuditLogEntry[] = [
  {
    id: "audit_init_01",
    timestamp: new Date(Date.now() - 3600000 * 2).toISOString(),
    actor: { type: "agent", id: "planner", name: "Planner Agent" },
    action: "STATE_GRAPH_COMPILED",
    target: "ECC 6.0 to S/4HANA Modernization",
    severity: "info",
    details: "Decomposed enterprise migration target into 6 LangGraph state nodes with zero-trust boundary verification.",
    verifiedHash: "sha256_9b83f01c2a"
  },
  {
    id: "audit_init_02",
    timestamp: new Date(Date.now() - 3600000 * 1.5).toISOString(),
    actor: { type: "agent", id: "abap", name: "ABAP Modernizer Agent" },
    action: "AST_PARSING_COMPLETED",
    target: "Z_ECC_CUSTOM_SO_POSTING",
    severity: "warning",
    details: "Found 2 direct DB write violations on VBAK. Refactored to ABAP Cloud RAP via I_SalesOrderTP.",
    verifiedHash: "sha256_e718bc009a"
  },
  {
    id: "audit_init_03",
    timestamp: new Date(Date.now() - 3600000 * 0.8).toISOString(),
    actor: { type: "agent", id: "security", name: "Security & Governance Agent" },
    action: "HITL_GATE_TRIGGERED",
    target: "Transport Request TRK9008412",
    severity: "security",
    details: "Transport release paused pending human authorization for SAP BTP Cloud Foundry cluster.",
    verifiedHash: "sha256_31c890deaa"
  }
];

const INITIAL_APPROVALS: HumanApprovalItem[] = [
  {
    id: "appr_init_01",
    workflowId: "wf_seed_01",
    workflowTitle: "ECC 6.0 to S/4HANA Clean Core Modernization",
    requestedByAgent: "security",
    actionType: "Transport Release",
    riskLevel: "High",
    targetSystem: "SAP S/4HANA Cloud",
    transportRequestNumber: "TRK9008412",
    summary: "Authorize transport release & deployment of modernized CAP microservice to SAP S/4HANA Cloud",
    impactDetails: [
      "Replaces legacy custom report with ABAP Cloud RAP handler",
      "Deploys CAP microservice container to SAP BTP Cloud Foundry space 'prd-apps-01'",
      "Grants XSUAA role collection 'LeaveServiceAdmin' to enterprise group",
      "Instantiates HDI container on SAP HANA Cloud"
    ],
    status: "pending",
    createdAt: new Date(Date.now() - 3600000 * 0.8).toISOString()
  }
];

export function useNexusStore() {
  const [agents, setAgents] = useState<AgentDefinition[]>(INITIAL_AGENTS);
  const [workflows, setWorkflows] = useState<WorkflowExecution[]>([]);
  const [activeWorkflowId, setActiveWorkflowId] = useState<string | null>(null);
  const [approvals, setApprovals] = useState<HumanApprovalItem[]>(INITIAL_APPROVALS);
  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>(INITIAL_AUDIT_LOGS);
  const [user, setUser] = useState<UserProfile>(DEFAULT_USER);
  const [settings, setSettings] = useState<SystemSettings>(DEFAULT_SETTINGS);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isCommandOpen, setIsCommandOpen] = useState<boolean>(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");

  // Load initial theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("nexus_theme") as "dark" | "light" | null;
    const initialTheme = savedTheme || "dark";
    setTheme(initialTheme);
    if (initialTheme === "dark") {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
    }
  }, []);

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      localStorage.setItem("nexus_theme", next);
      if (next === "dark") {
        document.documentElement.classList.add("dark");
        document.documentElement.classList.remove("light");
      } else {
        document.documentElement.classList.remove("dark");
        document.documentElement.classList.add("light");
      }
      return next;
    });
  }, []);

  // Initialize with a default ready-to-inspect workflow
  useEffect(() => {
    const seedWorkflow = createInitialWorkflow("wf_ecc_to_s4_migration");
    setWorkflows([seedWorkflow]);
    setActiveWorkflowId(seedWorkflow.id);
  }, []);

  const activeWorkflow = workflows.find((w) => w.id === activeWorkflowId) || workflows[0] || null;

  // Trigger next step in active workflow
  const stepForward = useCallback((targetWfId?: string) => {
    const wfId = targetWfId || activeWorkflowId;
    if (!wfId) return;

    setWorkflows((prev) => {
      const targetIndex = prev.findIndex((w) => w.id === wfId);
      if (targetIndex === -1) return prev;

      const target = prev[targetIndex];
      if (target.status === "completed" || target.status === "paused_for_approval") return prev;

      const result = executeNextStep(target, target.currentStepIndex);

      if (result.newApproval) {
        setApprovals((oldAppr) => [result.newApproval!, ...oldAppr]);
      }
      if (result.newAuditLog) {
        setAuditLogs((oldLogs) => [result.newAuditLog!, ...oldLogs]);
      }

      // Update agents status
      const currentNode = target.nodes[target.currentStepIndex];
      if (currentNode) {
        setAgents((prevAgents) =>
          prevAgents.map((a) => (a.id === currentNode.agentId ? { ...a, status: "completed" } : a))
        );
      }

      const updatedList = [...prev];
      updatedList[targetIndex] = result.updatedWorkflow;
      return updatedList;
    });
  }, [activeWorkflowId]);

  // Run full workflow automatically step by step until human gate or completion
  const runWorkflowAuto = useCallback((wfId?: string) => {
    const id = wfId || activeWorkflowId;
    if (!id) return;

    setIsRunning(true);
    let currentStep = 0;

    const interval = setInterval(() => {
      setWorkflows((prev) => {
        const targetIndex = prev.findIndex((w) => w.id === id);
        if (targetIndex === -1) {
          clearInterval(interval);
          setIsRunning(false);
          return prev;
        }

        const target = prev[targetIndex];
        if (target.status === "completed" || target.status === "paused_for_approval") {
          clearInterval(interval);
          setIsRunning(false);
          return prev;
        }

        const result = executeNextStep(target, target.currentStepIndex);

        if (result.newApproval) {
          setApprovals((oldAppr) => [result.newApproval!, ...oldAppr]);
        }
        if (result.newAuditLog) {
          setAuditLogs((oldLogs) => [result.newAuditLog!, ...oldLogs]);
        }

        if (result.updatedWorkflow.status === "paused_for_approval" || result.updatedWorkflow.status === "completed") {
          clearInterval(interval);
          setIsRunning(false);
        }

        const updatedList = [...prev];
        updatedList[targetIndex] = result.updatedWorkflow;
        return updatedList;
      });
    }, 1200);
  }, [activeWorkflowId]);

  // Start a new workflow from template
  const startNewWorkflow = useCallback((templateId: string, customPrompt?: string, targetSystem?: any) => {
    const newWf = createInitialWorkflow(templateId, customPrompt, targetSystem);
    newWf.status = "running";
    setWorkflows((prev) => [newWf, ...prev]);
    setActiveWorkflowId(newWf.id);

    const log: AuditLogEntry = {
      id: `audit_${Date.now()}`,
      timestamp: new Date().toISOString(),
      actor: { type: "user", id: user.id, name: user.name },
      action: "WORKFLOW_INITIATED",
      target: newWf.title,
      severity: "info",
      details: `Started autonomous LangGraph pipeline: ${newWf.title} targeting ${newWf.targetSystem}`,
      verifiedHash: `sha256_${Math.random().toString(36).substr(2, 12)}`
    };
    setAuditLogs((prev) => [log, ...prev]);

    return newWf;
  }, [user]);

  // Handle Human Approval decisions
  const decideApproval = useCallback((
    approvalId: string,
    decision: "approved" | "rejected" | "changes_requested",
    comment: string
  ) => {
    const now = new Date().toISOString();
    let affectedWorkflowId: string | undefined;

    setApprovals((prev) =>
      prev.map((appr) => {
        if (appr.id === approvalId) {
          affectedWorkflowId = appr.workflowId;
          return {
            ...appr,
            status: decision,
            decidedAt: now,
            decidedBy: user.name,
            reviewComment: comment
          };
        }
        return appr;
      })
    );

    // Audit log
    const audit: AuditLogEntry = {
      id: `audit_${Date.now()}`,
      timestamp: now,
      actor: { type: "user", id: user.id, name: user.name },
      action: decision === "approved" ? "APPROVAL_GRANTED" : decision === "rejected" ? "APPROVAL_REJECTED" : "CHANGES_REQUESTED",
      target: `Approval ID ${approvalId}`,
      severity: decision === "approved" ? "info" : "warning",
      details: `Human decision [${decision.toUpperCase()}]: ${comment || "No comment provided"}`,
      verifiedHash: `sha256_${Math.random().toString(36).substr(2, 12)}`
    };
    setAuditLogs((prev) => [audit, ...prev]);

    // Resume workflow if approved!
    if (decision === "approved" && affectedWorkflowId) {
      setWorkflows((prev) =>
        prev.map((w) => {
          if (w.id === affectedWorkflowId) {
            return {
              ...w,
              status: "running"
            };
          }
          return w;
        })
      );
      runWorkflowAuto(affectedWorkflowId);
    }
  }, [user, runWorkflowAuto]);

  return {
    agents,
    setAgents,
    workflows,
    activeWorkflow,
    activeWorkflowId,
    setActiveWorkflowId,
    approvals,
    auditLogs,
    user,
    setUser,
    settings,
    setSettings,
    isRunning,
    isCommandOpen,
    setIsCommandOpen,
    theme,
    setTheme,
    toggleTheme,
    stepForward,
    runWorkflowAuto,
    startNewWorkflow,
    decideApproval
  };
}
