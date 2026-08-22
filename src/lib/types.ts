export type AgentId =
  | "planner"
  | "architect"
  | "abap"
  | "cap"
  | "qa"
  | "security"
  | "documentation"
  | "deployment";

export type AgentStatus = "idle" | "running" | "waiting_approval" | "completed" | "error";

export interface AgentMetric {
  totalRuns: number;
  successRate: number;
  tokensUsed: number;
  avgDurationSec: number;
}

export interface AgentDefinition {
  id: AgentId;
  name: string;
  role: string;
  description: string;
  avatarIcon: string;
  accentColor: string;
  category: "Strategy" | "Engineering" | "Governance" | "Operations";
  capabilities: string[];
  systemPrompt: string;
  model: string;
  temperature: number;
  status: AgentStatus;
  metrics: AgentMetric;
}

export type WorkflowStatus = "draft" | "queued" | "running" | "paused_for_approval" | "completed" | "failed";

export interface WorkflowNodeTrace {
  id: string;
  agentId: AgentId;
  agentName: string;
  title: string;
  status: "pending" | "running" | "completed" | "failed" | "waiting_approval";
  startTime?: string;
  endTime?: string;
  durationMs?: number;
  tokensUsed?: number;
  input: string;
  output?: string;
  logs: string[];
  artifacts?: {
    name: string;
    type: "code" | "json" | "markdown" | "diff" | "manifest";
    content: string;
    language?: string;
  }[];
}

export interface WorkflowExecution {
  id: string;
  title: string;
  description: string;
  targetSystem: "SAP S/4HANA Cloud" | "SAP ECC 6.0" | "SAP BTP" | "SuccessFactors" | "Multi-Cloud";
  category: "Migration" | "Modernization" | "CAP Generator" | "OData Orchestration" | "Custom";
  status: WorkflowStatus;
  createdAt: string;
  updatedAt: string;
  currentStepIndex: number;
  progressPercentage: number;
  nodes: WorkflowNodeTrace[];
  approvalId?: string;
}

export interface HumanApprovalItem {
  id: string;
  workflowId: string;
  workflowTitle: string;
  requestedByAgent: AgentId;
  actionType: "Transport Release" | "Production Deployment" | "Role / Auth Grant" | "Mass Data Mutation" | "Clean Core Override";
  riskLevel: "Low" | "Medium" | "High" | "Critical";
  targetSystem: string;
  transportRequestNumber?: string;
  summary: string;
  impactDetails: string[];
  status: "pending" | "approved" | "rejected" | "changes_requested";
  createdAt: string;
  decidedAt?: string;
  decidedBy?: string;
  reviewComment?: string;
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  actor: {
    type: "agent" | "user" | "system";
    id: string;
    name: string;
  };
  action: string;
  target: string;
  severity: "info" | "warning" | "security" | "critical";
  details: string;
  ipAddress?: string;
  verifiedHash: string;
}

export interface ODataEntity {
  name: string;
  description: string;
  serviceUri: string;
  entitySet: string;
  version: "V2" | "V4";
  keyFields: string[];
  fields: {
    name: string;
    type: string;
    nullable: boolean;
    label: string;
  }[];
  sampleRecords: Record<string, any>[];
}

export interface AbapAnalysisResult {
  programName: string;
  programType: "Report" | "Function Module" | "Class / Interface" | "BAdI Implementation";
  linesOfCode: number;
  cyclomaticComplexity: number;
  cleanCoreReadinessScore: number; // 0 - 100
  securityVulnerabilities: {
    ruleId: string;
    severity: "High" | "Medium" | "Low";
    line: number;
    description: string;
    remediation: string;
  }[];
  deprecatedStatements: {
    line: number;
    statement: string;
    modernAlternative: string;
  }[];
  legacyCode: string;
  modernizedAbapCloud: string;
  modernizedRapBehavior?: string;
}

export interface CapProjectGeneration {
  projectName: string;
  namespace: string;
  description: string;
  database: "SAP HANA Cloud" | "PostgreSQL" | "SQLite (Local)";
  entities: {
    name: string;
    annotations: string[];
    elements: { name: string; type: string; key?: boolean; required?: boolean }[];
  }[];
  files: {
    path: string;
    language: "cds" | "javascript" | "json" | "yaml" | "http";
    content: string;
  }[];
}

export interface RagDocumentChunk {
  id: string;
  source: "SAP Note" | "Clean Core Guide" | "CAP Documentation" | "Custom Z-Doc";
  docNumber?: string;
  title: string;
  content: string;
  tags: string[];
  similarityScore?: number;
  lastUpdated: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: "Admin" | "Architect" | "Developer" | "Approver" | "Viewer";
  avatar: string;
  tenantId: string;
  tenantName: string;
}

export interface SystemSettings {
  llmProvider: "openai" | "azure_openai" | "gemini" | "anthropic" | "ollama_local";
  apiKeyConfigured: boolean;
  btpDestinationConfigured: boolean;
  btpSubdomain: string;
  hanaVectorEnabled: boolean;
  zeroTrustEnforced: boolean;
  autoApproveLowRisk: boolean;
  telemetryEnabled: boolean;
}
