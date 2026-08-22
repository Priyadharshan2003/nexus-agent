import { AgentDefinition } from "../types";

export const INITIAL_AGENTS: AgentDefinition[] = [
  {
    id: "planner",
    name: "Planner Agent",
    role: "Autonomous Strategic Orchestrator",
    description: "Deconstructs high-level enterprise goals into executable LangGraph state machines, evaluates dependencies, and schedules sub-agents.",
    avatarIcon: "Compass",
    accentColor: "from-cyan-500 to-blue-600",
    category: "Strategy",
    capabilities: [
      "Goal Decomposition & Work Breakdown Structure (WBS)",
      "Dynamic Task Dependency Graph Generation",
      "Resource & Token Optimization",
      "Real-time LangGraph State Recovery"
    ],
    systemPrompt: `You are the lead SAP Enterprise AI Planner. Your mission is to analyze complex business modernization requests (ECC to S/4HANA, ABAP to CAP, OData Orchestration), decompose them into deterministic steps, assign specialized agents, and manage state transitions.`,
    model: "gpt-4o-enterprise / claude-3-7-sonnet",
    temperature: 0.2,
    status: "idle",
    metrics: {
      totalRuns: 1420,
      successRate: 99.4,
      tokensUsed: 2840000,
      avgDurationSec: 4.2
    }
  },
  {
    id: "architect",
    name: "Architect Agent",
    role: "SAP Clean Core & Solution Architect",
    description: "Designs modern Cloud Application Programming (CAP) models, enforces SAP Clean Core principles, and defines integration boundaries.",
    avatarIcon: "Building2",
    accentColor: "from-indigo-500 to-purple-600",
    category: "Strategy",
    capabilities: [
      "SAP Clean Core Compliance Verification",
      "CDS Domain & Aspect Architecture",
      "Side-by-Side Extensibility Blueprinting",
      "Multi-Tenant BTP Architecture Design"
    ],
    systemPrompt: `You are the Principal SAP Cloud Solution Architect. You enforce Clean Core architecture, ensure zero modifications to SAP standard core tables, validate side-by-side extensibility via SAP BTP, and produce robust Core Data Services (CDS) entity designs.`,
    model: "gpt-4o-enterprise",
    temperature: 0.1,
    status: "idle",
    metrics: {
      totalRuns: 980,
      successRate: 98.8,
      tokensUsed: 4120000,
      avgDurationSec: 6.8
    }
  },
  {
    id: "abap",
    name: "ABAP Modernizer Agent",
    role: "ABAP Cloud & RAP Refactoring Specialist",
    description: "Performs deep AST parsing on legacy ABAP 7.0-7.4 code, eliminates direct DB writes, refactors to ABAP RESTful Application Programming (RAP).",
    avatarIcon: "Code2",
    accentColor: "from-amber-500 to-orange-600",
    category: "Engineering",
    capabilities: [
      "Legacy ABAP AST & Cyclomatic Complexity Analysis",
      "Direct DB modification (INSERT/MODIFY) removal",
      "Conversion to ABAP Cloud & Released APIs",
      "RAP Behavior Definition & Implementation generation"
    ],
    systemPrompt: `You are an expert ABAP Cloud and RAP modernization specialist. You transform legacy Z-reports and function modules into clean ABAP Cloud classes using released C1 APIs, CDS Views with data control, and RAP business object patterns.`,
    model: "gpt-4o-enterprise",
    temperature: 0.1,
    status: "idle",
    metrics: {
      totalRuns: 2150,
      successRate: 97.2,
      tokensUsed: 6890000,
      avgDurationSec: 8.5
    }
  },
  {
    id: "cap",
    name: "CAP Generator Agent",
    role: "BTP Cloud Application Programming Engineer",
    description: "Generates production-grade SAP CAP Node.js / Java microservices, CDS models, custom event handlers, and MTA deployment descriptors.",
    avatarIcon: "Boxes",
    accentColor: "from-emerald-500 to-teal-600",
    category: "Engineering",
    capabilities: [
      "Complete CDS Schema (`schema.cds`) Generation",
      "CAP Service Definition & Node.js Event Handlers",
      "Fiori Elements UI Annotations (@UI.LineItem, @UI.FieldGroup)",
      "MTA Deployment Manifest (`mta.yaml`) Builder"
    ],
    systemPrompt: `You are a Senior SAP BTP CAP Full-Stack Engineer. You generate idiomatic SAP CAP services using @sap/cds, with full support for HANA Cloud persistence, OData V4 exposure, authorization annotations (@restrict), and lifecycle event handlers.`,
    model: "gpt-4o-enterprise",
    temperature: 0.2,
    status: "idle",
    metrics: {
      totalRuns: 1840,
      successRate: 98.9,
      tokensUsed: 5930000,
      avgDurationSec: 7.1
    }
  },
  {
    id: "qa",
    name: "QA & Verification Agent",
    role: "Autonomous Test Suite & Validation Agent",
    description: "Synthesizes unit tests, OData mock request suites, regression checks, and verifies contract consistency against S/4HANA schemas.",
    avatarIcon: "FlaskConical",
    accentColor: "from-pink-500 to-rose-600",
    category: "Engineering",
    capabilities: [
      "Automated OData V2/V4 Contract Verification",
      "Jest & Mocha Test Suite Synthesis",
      "Edge Case & Boundary Data Simulation",
      "Fiori Elements UI Navigation Assertions"
    ],
    systemPrompt: `You are a QA automation expert specialized in SAP enterprise applications. You generate unit tests, contract tests for OData APIs, and integration test scripts covering edge cases, permission checks, and payload schema validations.`,
    model: "gpt-4o-mini",
    temperature: 0.3,
    status: "idle",
    metrics: {
      totalRuns: 3100,
      successRate: 99.1,
      tokensUsed: 3450000,
      avgDurationSec: 3.9
    }
  },
  {
    id: "security",
    name: "Security & Governance Agent",
    role: "Enterprise RBAC & Zero-Trust Auditor",
    description: "Scans code and configurations for authorization bypasses, hardcoded credentials, Segregation of Duties (SoD) violations, and data leak risks.",
    avatarIcon: "ShieldCheck",
    accentColor: "from-violet-500 to-purple-700",
    category: "Governance",
    capabilities: [
      "SAP Authorization Object (AUTHORITY-CHECK) Audit",
      "Segregation of Duties (SoD) Conflict Detection",
      "XSS / SQL Injection Vulnerability Scanning",
      "Zero-Trust Destination & JWT Token Validation"
    ],
    systemPrompt: `You are an SAP Enterprise Security and Compliance Officer. You ensure all generated artifacts adhere to Zero Trust policies, proper SAP BTP XSUAA scopes, authorization objects (e.g. S_DEVELOP, M_MATE_STA), and secure credential handling.`,
    model: "gpt-4o-enterprise",
    temperature: 0.05,
    status: "idle",
    metrics: {
      totalRuns: 1650,
      successRate: 99.8,
      tokensUsed: 2190000,
      avgDurationSec: 3.1
    }
  },
  {
    id: "documentation",
    name: "Documentation Agent",
    role: "Technical Blueprint & OpenAPI Synthesizer",
    description: "Produces comprehensive SAP architectural blueprints, OpenAPI 3.0 specs, Fiori UX guidelines, and SAP Release & Transport documentation.",
    avatarIcon: "FileText",
    accentColor: "from-blue-500 to-cyan-600",
    category: "Operations",
    capabilities: [
      "OpenAPI 3.0 / Swagger Spec Generation from OData",
      "Technical Architecture Markdown Blueprints",
      "SAP Transport Release Notes & User Manuals",
      "Mermaid Diagrammatic Process Flow Generation"
    ],
    systemPrompt: `You are an expert SAP Technical Writer and Documentation Specialist. You produce crystal-clear documentation, Mermaid diagrams, API reference sheets, and changelogs formatted for enterprise developers and stakeholders.`,
    model: "gpt-4o-mini",
    temperature: 0.3,
    status: "idle",
    metrics: {
      totalRuns: 1290,
      successRate: 99.6,
      tokensUsed: 1980000,
      avgDurationSec: 2.8
    }
  },
  {
    id: "deployment",
    name: "Deployment & Transport Agent",
    role: "BTP Cloud Foundry / Kyma & CTS+ Orchestrator",
    description: "Validates SAP CTS+ transports, orchestrates Cloud Foundry / Kyma container deployments, and verifies health probes.",
    avatarIcon: "Rocket",
    accentColor: "from-emerald-600 to-green-700",
    category: "Operations",
    capabilities: [
      "SAP BTP Cloud Foundry & Kyma Deployment",
      "CTS+ Transport Request Validation & Packaging",
      "Zero-Downtime Blue-Green Deployment Staging",
      "Post-Deployment Smoke Tests & Health Check Probes"
    ],
    systemPrompt: `You are the SAP BTP DevOps and Transport Management expert. You prepare MTA archives, deploy to Cloud Foundry or Kyma clusters, validate transport requests, and guarantee safe rollout with rollback triggers.`,
    model: "gpt-4o-enterprise",
    temperature: 0.1,
    status: "idle",
    metrics: {
      totalRuns: 890,
      successRate: 98.4,
      tokensUsed: 1750000,
      avgDurationSec: 12.4
    }
  }
];
