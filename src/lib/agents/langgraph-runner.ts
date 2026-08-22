import { WorkflowExecution, WorkflowNodeTrace, AgentId, HumanApprovalItem, AuditLogEntry } from "../types";

export interface WorkflowTemplate {
  id: string;
  title: string;
  category: "Migration" | "Modernization" | "CAP Generator" | "OData Orchestration" | "Custom";
  targetSystem: "SAP S/4HANA Cloud" | "SAP ECC 6.0" | "SAP BTP" | "SuccessFactors" | "Multi-Cloud";
  description: string;
  defaultPrompt: string;
}

export const PRESET_WORKFLOW_TEMPLATES: WorkflowTemplate[] = [
  {
    id: "wf_ecc_to_s4_migration",
    title: "ECC 6.0 to S/4HANA Clean Core Modernization",
    category: "Migration",
    targetSystem: "SAP S/4HANA Cloud",
    description: "Full end-to-end automated pipeline: Parse legacy ABAP reports, extract data structures, generate RAP business objects and side-by-side CAP microservices with automated approval gates.",
    defaultPrompt: "Analyze legacy custom report Z_ECC_CUSTOM_SO_POSTING, remediate direct DB updates, convert to ABAP Cloud RAP, generate side-by-side CAP Leave / Order API, and validate BTP transport."
  },
  {
    id: "wf_cap_service_gen",
    title: "Autonomous SAP BTP CAP Microservice Generator",
    category: "CAP Generator",
    targetSystem: "SAP BTP",
    description: "Instantiate full-stack enterprise CAP service with HANA Cloud persistence, OData V4 annotations, Jest testing harness, and Cloud Foundry MTA deployment package.",
    defaultPrompt: "Create an enterprise Employee Leave Management service with multi-level manager approval, audit log composition, and Fiori Elements draft enablement."
  },
  {
    id: "wf_odata_orchestration",
    title: "S/4HANA OData V4 Sales Order Fast-Track Invoicing",
    category: "OData Orchestration",
    targetSystem: "SAP S/4HANA Cloud",
    description: "Read A_SalesOrder and A_BusinessPartner live metadata, construct resilient side-by-side caching layer, execute security verification, and stage for deployment.",
    defaultPrompt: "Orchestrate real-time query against A_SalesOrder and A_BusinessPartner APIs with automatic credit limit verification and high-priority delivery queueing."
  }
];

export function createInitialWorkflow(
  templateId: string,
  customPrompt?: string,
  targetSystem?: any
): WorkflowExecution {
  const template = PRESET_WORKFLOW_TEMPLATES.find(t => t.id === templateId) || PRESET_WORKFLOW_TEMPLATES[0];
  const now = new Date().toISOString();

  const nodes: WorkflowNodeTrace[] = [
    {
      id: "node_1",
      agentId: "planner",
      agentName: "Planner Agent",
      title: "Goal Understanding & WBS Breakdown",
      status: "pending",
      input: customPrompt || template.defaultPrompt,
      logs: []
    },
    {
      id: "node_2",
      agentId: "architect",
      agentName: "Architect Agent",
      title: "Clean Core Architecture & CDS Model Definition",
      status: "pending",
      input: "Awaiting Planner WBS graph output...",
      logs: []
    },
    {
      id: "node_3_abap",
      agentId: "abap",
      agentName: "ABAP Modernizer Agent",
      title: "Legacy AST Code Scanning & RAP Refactoring",
      status: "pending",
      input: "Awaiting Architect entity models...",
      logs: []
    },
    {
      id: "node_3_cap",
      agentId: "cap",
      agentName: "CAP Generator Agent",
      title: "CDS Services, Event Handlers & MTA Builder",
      status: "pending",
      input: "Awaiting Architect entity models...",
      logs: []
    },
    {
      id: "node_3_qa",
      agentId: "qa",
      agentName: "QA Verification Agent",
      title: "Contract Testing & Mock OData Assertions",
      status: "pending",
      input: "Awaiting ABAP and CAP deliverables...",
      logs: []
    },
    {
      id: "node_4",
      agentId: "security",
      agentName: "Security & Governance Agent",
      title: "Zero-Trust RBAC & Authorization Object Audit",
      status: "pending",
      input: "Awaiting QA and engineering artifacts...",
      logs: []
    },
    {
      id: "node_5",
      agentId: "deployment",
      agentName: "Deployment & Transport Agent",
      title: "BTP Cloud Foundry Staging & CTS+ Transport Release",
      status: "pending",
      input: "Awaiting Human Approval Gate...",
      logs: []
    },
    {
      id: "node_6",
      agentId: "documentation",
      agentName: "Documentation Agent",
      title: "OpenAPI Spec & Release Notes Synthesis",
      status: "pending",
      input: "Awaiting Deployment outputs...",
      logs: []
    }
  ];

  return {
    id: `wf_${Date.now()}_${Math.random().toString(36).substr(2, 5)}`,
    title: template.title,
    description: template.description,
    targetSystem: targetSystem || template.targetSystem,
    category: template.category,
    status: "draft",
    createdAt: now,
    updatedAt: now,
    currentStepIndex: 0,
    progressPercentage: 0,
    nodes
  };
}

export interface StepExecutionResult {
  updatedWorkflow: WorkflowExecution;
  newApproval?: HumanApprovalItem;
  newAuditLog?: AuditLogEntry;
}

export function executeNextStep(
  workflow: WorkflowExecution,
  stepIndex: number
): StepExecutionResult {
  const updatedNodes = [...workflow.nodes];
  const currentNode = updatedNodes[stepIndex];
  const now = new Date().toISOString();
  let newApproval: HumanApprovalItem | undefined;
  let newAuditLog: AuditLogEntry | undefined;

  if (!currentNode) {
    return {
      updatedWorkflow: {
        ...workflow,
        status: "completed",
        progressPercentage: 100,
        updatedAt: now
      }
    };
  }

  // Calculate realistic simulated token & duration metrics
  const tokens = Math.floor(800 + Math.random() * 1200);
  const duration = Math.floor(1200 + Math.random() * 2000);

  // Step-specific outputs and mock synthesis
  if (currentNode.agentId === "planner") {
    currentNode.status = "completed";
    currentNode.startTime = now;
    currentNode.endTime = now;
    currentNode.durationMs = duration;
    currentNode.tokensUsed = tokens;
    currentNode.logs = [
      "▶ Initialized LangGraph State Graph orchestrator",
      "✓ Goal decomposed into 6 discrete subtasks across 7 specialized agents",
      "✓ Identified target system: " + workflow.targetSystem,
      "✓ Scheduled parallel execution branches for ABAP, CAP, and QA nodes",
      "✓ Injected Clean Core compliance constraints into agent memory buffers"
    ];
    currentNode.output = `State Graph compiled successfully. Goal translated into LangGraph DAG with 1 human-in-the-loop checkpoint gate.`;
  } else if (currentNode.agentId === "architect") {
    currentNode.status = "completed";
    currentNode.durationMs = duration;
    currentNode.tokensUsed = tokens;
    currentNode.logs = [
      "▶ Ingested SAP Clean Core Extensibility Framework guidelines",
      "✓ Designed CDS entity boundaries: LeaveRequests, ApprovalLogs, SalesOrderExtension",
      "✓ Enforced Side-by-Side BTP pattern with zero core modifications",
      "✓ Generated OData V4 Service Contract specifications"
    ];
    currentNode.output = `Architecture blueprint established. Data models verified against SAP S/4HANA 2023 Clean Core standards.`;
    currentNode.artifacts = [
      {
        name: "architecture_blueprint.cds",
        type: "code",
        language: "cds",
        content: `namespace sap.btp.arch;\nentity CoreBlueprint { key id: UUID; cleanCoreCompliant: Boolean default true; }`
      }
    ];
  } else if (currentNode.agentId === "abap") {
    currentNode.status = "completed";
    currentNode.durationMs = duration;
    currentNode.tokensUsed = tokens;
    currentNode.logs = [
      "▶ Parsed legacy ABAP AST: Identified 2 direct DB writes on VBAK/VBAP",
      "✓ Refactored obsolete TABLES statement to typed structures",
      "✓ Transformed legacy BAPI_SALESORDER_CREATEFROMDAT2 to EML `MODIFY ENTITIES OF I_SalesOrderTP`",
      "✓ Generated ABAP Cloud Class `ZCL_SALES_ORDER_RAP_HANDLER` (Clean Core Score: 98/100)"
    ];
    currentNode.output = `ABAP AST modernization complete. Clean Core Readiness improved from 32% to 98%.`;
  } else if (currentNode.agentId === "cap") {
    currentNode.status = "completed";
    currentNode.durationMs = duration;
    currentNode.tokensUsed = tokens;
    currentNode.logs = [
      "▶ Synthesized `db/schema.cds` with cuid, managed, and Fiori annotations",
      "✓ Created `srv/service.cds` with OData V4 draft handling",
      "✓ Implemented custom event handlers in `srv/service.js` with date validation",
      "✓ Packaged multi-target deployment manifest `mta.yaml` for SAP HANA Cloud"
    ];
    currentNode.output = `Full-stack CAP Microservice artifacts compiled and packaged.`;
  } else if (currentNode.agentId === "qa") {
    currentNode.status = "completed";
    currentNode.durationMs = duration;
    currentNode.tokensUsed = tokens;
    currentNode.logs = [
      "▶ Synthesized 18 automated Mocha & Jest unit tests",
      "✓ Tested OData V4 schema contract validation against SAP S/4HANA metadata",
      "✓ Validated edge cases: boundary dates, currency mismatch, unauthorized token simulation",
      "✓ 18/18 Unit & Contract Tests passed with 100% code coverage"
    ];
    currentNode.output = `QA suite validated. Zero contract discrepancies found against SAP S/4HANA OData schemas.`;
  } else if (currentNode.agentId === "security") {
    currentNode.status = "completed";
    currentNode.durationMs = duration;
    currentNode.tokensUsed = tokens;
    currentNode.logs = [
      "▶ Audited SAP Authorization Objects (V_VBAK_VKO, S_DEVELOP)",
      "✓ Checked for SQL injection / buffer overflow risks: Zero vulnerabilities found",
      "✓ Verified XSUAA scope `@restrict: [{ grant: '*', to: 'Admin' }]`",
      "⚠️ HIGH IMPACT ACTION DETECTED: BTP Production Deployment & CTS+ Transport Release",
      "⏸ Triggering mandatory Human Approval Gate (HITL)"
    ];
    currentNode.output = `Security audit cleared. High-impact deployment checkpoint triggered for Human Authorization.`;

    // Create Human Approval Item!
    const approvalId = `appr_${Date.now()}`;
    newApproval = {
      id: approvalId,
      workflowId: workflow.id,
      workflowTitle: workflow.title,
      requestedByAgent: "security",
      actionType: "Transport Release",
      riskLevel: "High",
      targetSystem: workflow.targetSystem,
      transportRequestNumber: `TRK900${Math.floor(1000 + Math.random() * 9000)}`,
      summary: `Authorize transport release & deployment of modernized CAP microservice to ${workflow.targetSystem}`,
      impactDetails: [
        "Replaces legacy custom report with ABAP Cloud RAP handler",
        "Deploys CAP microservice container to SAP BTP Cloud Foundry cluster",
        "Grants XSUAA role collection 'LeaveServiceAdmin' to enterprise group",
        "Instantiates HDI container on SAP HANA Cloud"
      ],
      status: "pending",
      createdAt: now
    };

    newAuditLog = {
      id: `audit_${Date.now()}`,
      timestamp: now,
      actor: { type: "agent", id: "security", name: "Security & Governance Agent" },
      action: "HITL_GATE_TRIGGERED",
      target: workflow.title,
      severity: "security",
      details: `Mandatory human approval gate created for Transport Request ${newApproval.transportRequestNumber}`,
      verifiedHash: `sha256_${Math.random().toString(36).substr(2, 12)}`
    };

    return {
      updatedWorkflow: {
        ...workflow,
        status: "paused_for_approval",
        approvalId: approvalId,
        currentStepIndex: stepIndex + 1,
        progressPercentage: Math.round(((stepIndex + 1) / workflow.nodes.length) * 100),
        updatedAt: now,
        nodes: updatedNodes
      },
      newApproval,
      newAuditLog
    };
  } else if (currentNode.agentId === "deployment") {
    currentNode.status = "completed";
    currentNode.durationMs = duration + 2000;
    currentNode.tokensUsed = tokens;
    currentNode.logs = [
      "▶ Transport Release validated with approved signature",
      "✓ Released CTS+ Transport to BTP Quality Assurance system",
      "✓ Built MTA archive `employee-leave-service.mtar`",
      "✓ Deployed to SAP BTP Cloud Foundry space 'prd-apps-01'",
      "✓ Health probes verified: HTTP 200 OK across 3 pod replicas"
    ];
    currentNode.output = `Service successfully deployed to SAP BTP. Public endpoint active.`;

    newAuditLog = {
      id: `audit_${Date.now()}`,
      timestamp: now,
      actor: { type: "agent", id: "deployment", name: "Deployment Agent" },
      action: "BTP_DEPLOY_SUCCESS",
      target: workflow.title,
      severity: "info",
      details: `Autonomous deployment successfully staged on SAP BTP Cloud Foundry space 'prd-apps-01'`,
      verifiedHash: `sha256_${Math.random().toString(36).substr(2, 12)}`
    };
  } else if (currentNode.agentId === "documentation") {
    currentNode.status = "completed";
    currentNode.durationMs = duration;
    currentNode.tokensUsed = tokens;
    currentNode.logs = [
      "▶ Generated OpenAPI 3.0 specification for OData V4 endpoints",
      "✓ Generated SAP Fiori Elements UX Integration documentation",
      "✓ Published Transport Release Notes and Audit Verification Record"
    ];
    currentNode.output = `Documentation package compiled and committed to enterprise repository.`;
  }

  const nextStepIndex = stepIndex + 1;
  const isFinished = nextStepIndex >= updatedNodes.length;

  return {
    updatedWorkflow: {
      ...workflow,
      status: isFinished ? "completed" : "running",
      currentStepIndex: nextStepIndex,
      progressPercentage: Math.min(100, Math.round((nextStepIndex / updatedNodes.length) * 100)),
      updatedAt: now,
      nodes: updatedNodes
    },
    newApproval,
    newAuditLog
  };
}
