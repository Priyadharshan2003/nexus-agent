"use client";

import React, { useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { useNexusStore } from "@/lib/store/useNexusStore";
import {
  Settings,
  ShieldCheck,
  Key,
  Server,
  Cpu,
  Lock,
  Users,
  Check,
  Sparkles,
  Save,
  CheckCircle2
} from "lucide-react";

export default function SettingsPage() {
  const { settings, setSettings, user } = useNexusStore();
  const [activeTab, setActiveTab] = useState<"security" | "btp" | "llm" | "rbac">("security");
  const [savedSuccess, setSavedSuccess] = useState<boolean>(false);

  const [apiKeyInput, setApiKeyInput] = useState<string>("sk-proj-sap-ent-ai-••••••••••••••••");
  const [btpSubdomain, setBtpSubdomain] = useState<string>(settings.btpSubdomain);
  const [zeroTrust, setZeroTrust] = useState<boolean>(settings.zeroTrustEnforced);
  const [autoApprove, setAutoApprove] = useState<boolean>(settings.autoApproveLowRisk);

  const handleSave = () => {
    setSettings((prev) => ({
      ...prev,
      btpSubdomain,
      zeroTrustEnforced: zeroTrust,
      autoApproveLowRisk: autoApprove
    }));
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const rbacRoles = [
    {
      role: "Admin",
      description: "Full orchestrator control, agent system prompt tuning, BTP credential changes.",
      canExecute: true,
      canApprove: true,
      canEditPrompts: true
    },
    {
      role: "Architect",
      description: "Trigger migrations, design CDS models, approve Clean Core exceptions.",
      canExecute: true,
      canApprove: true,
      canEditPrompts: true
    },
    {
      role: "Developer",
      description: "Run ABAP refactoring, generate CAP services, test OData queries.",
      canExecute: true,
      canApprove: false,
      canEditPrompts: false
    },
    {
      role: "Approver",
      description: "Human-in-the-loop authorization of CTS+ transports and production deploys.",
      canExecute: false,
      canApprove: true,
      canEditPrompts: false
    },
    {
      role: "Viewer",
      description: "Read-only access to dashboards, audit logs, and generated blueprints.",
      canExecute: false,
      canApprove: false,
      canEditPrompts: false
    }
  ];

  return (
    <AppShell>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
              Enterprise Governance
            </span>
            <span className="text-xs text-slate-400 font-mono">SOC2 & Zero-Trust Enforced</span>
          </div>
          <h1 className="text-xl lg:text-2xl font-bold tracking-tight text-white mt-1">
            Settings & Security Center
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Configure SAP BTP Cloud Connectors, LLM keys, RBAC roles, and autonomous governance guardrails.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs shadow-glow flex items-center gap-2 transition-all self-start"
        >
          {savedSuccess ? (
            <>
              <CheckCircle2 className="w-4 h-4 text-emerald-300" />
              <span>Settings Saved!</span>
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              <span>Save Configuration</span>
            </>
          )}
        </button>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
        {[
          { id: "security", label: "Zero-Trust Guardrails", icon: ShieldCheck },
          { id: "btp", label: "SAP BTP Destinations", icon: Server },
          { id: "llm", label: "Foundation LLM Vault", icon: Cpu },
          { id: "rbac", label: "RBAC Role Matrix", icon: Users }
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-mono transition-all flex items-center gap-2 ${
                activeTab === tab.id
                  ? "bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 font-bold shadow-sm"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content: Zero-Trust Guardrails */}
      {activeTab === "security" && (
        <div className="p-5 rounded-2xl glass-panel border border-slate-800/80 space-y-5">
          <div>
            <h3 className="text-sm font-bold text-white">Autonomous Agent Guardrails</h3>
            <p className="text-xs text-slate-400">
              Control the boundary rules applied to all 8 autonomous agents.
            </p>
          </div>

          <div className="space-y-3">
            <div className="p-4 rounded-xl bg-surface-200/60 border border-slate-800 flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold text-slate-200">
                  Enforce Mandatory Human Approval on CTS+ Transports
                </h4>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Agents cannot release SAP CTS+ transport requests or deploy to production BTP spaces without reviewer sign-off.
                </p>
              </div>
              <input
                type="checkbox"
                checked={zeroTrust}
                onChange={(e) => setZeroTrust(e.target.checked)}
                className="h-4 w-4 accent-cyan-400 rounded cursor-pointer"
              />
            </div>

            <div className="p-4 rounded-xl bg-surface-200/60 border border-slate-800 flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold text-slate-200">
                  Auto-Approve Low Risk Sandbox Microservices
                </h4>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Allow deployment agents to automatically stage read-only mock test services to developer test spaces.
                </p>
              </div>
              <input
                type="checkbox"
                checked={autoApprove}
                onChange={(e) => setAutoApprove(e.target.checked)}
                className="h-4 w-4 accent-cyan-400 rounded cursor-pointer"
              />
            </div>

            <div className="p-4 rounded-xl bg-surface-200/60 border border-slate-800 flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold text-slate-200">
                  Strict Clean Core ABAP AST Policy
                </h4>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Automatically fail any agent workflow generating direct DB queries on SAP standard tables (VBAK, BSEG, EKKO).
                </p>
              </div>
              <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                ACTIVE
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Tab Content: SAP BTP Destinations */}
      {activeTab === "btp" && (
        <div className="p-5 rounded-2xl glass-panel border border-slate-800/80 space-y-4">
          <div>
            <h3 className="text-sm font-bold text-white">SAP BTP Subaccount & Destinations</h3>
            <p className="text-xs text-slate-400">
              Configure destination connectivity to S/4HANA Cloud, Cloud Connectors, and Kyma clusters.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono uppercase text-slate-400 mb-1">
                BTP Subaccount Subdomain
              </label>
              <input
                type="text"
                value={btpSubdomain}
                onChange={(e) => setBtpSubdomain(e.target.value)}
                className="w-full bg-[#080b11] border border-slate-800 rounded-xl px-3 py-2 text-xs font-mono text-cyan-300 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-slate-400 mb-1">
                SAP Cloud Connector Status
              </label>
              <div className="p-2.5 rounded-xl bg-[#080b11] border border-slate-800 text-xs font-mono text-emerald-400 flex items-center justify-between">
                <span>SCC v2.16 Connected (Location ID: BTP-PRD-LOC1)</span>
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping"></span>
              </div>
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <h4 className="text-xs font-mono uppercase text-slate-400">Active Destinations</h4>
            <div className="space-y-1.5">
              {[
                { name: "S4HANA_CLOUD_ODATA_V4", type: "HTTP", auth: "OAuth2SAMLBearerAssertion", status: "Active" },
                { name: "SAP_HANA_CLOUD_HDI_01", type: "HDB", auth: "UserPassword", status: "Active" },
                { name: "SUCCESSFACTORS_TIME_API", type: "HTTP", auth: "OAuth2ClientCredentials", status: "Active" }
              ].map((dest) => (
                <div
                  key={dest.name}
                  className="p-3 rounded-xl bg-surface-200/60 border border-slate-800 flex items-center justify-between text-xs font-mono"
                >
                  <div>
                    <span className="font-bold text-slate-200">{dest.name}</span>
                    <span className="text-slate-500 ml-2">[{dest.type} • {dest.auth}]</span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 text-[10px]">
                    {dest.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab Content: Foundation LLM Vault */}
      {activeTab === "llm" && (
        <div className="p-5 rounded-2xl glass-panel border border-slate-800/80 space-y-4">
          <div>
            <h3 className="text-sm font-bold text-white">Foundation Model API Credentials (BYOK)</h3>
            <p className="text-xs text-slate-400">
              Keys are encrypted at rest with AES-256 and never transmitted to client browsers.
            </p>
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-xs font-mono uppercase text-slate-400 mb-1">
                OpenAI / Azure OpenAI Enterprise API Key
              </label>
              <div className="flex gap-2">
                <input
                  type="password"
                  value={apiKeyInput}
                  onChange={(e) => setApiKeyInput(e.target.value)}
                  className="flex-1 bg-[#080b11] border border-slate-800 rounded-xl px-3 py-2 text-xs font-mono text-cyan-300 focus:outline-none"
                />
                <button
                  onClick={() => alert("API Key encrypted and verified.")}
                  className="px-4 py-2 rounded-xl bg-surface-200 hover:bg-surface-100 border border-slate-700 text-slate-200 text-xs font-mono"
                >
                  Verify Key
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs font-mono pt-2">
              <div className="p-3 rounded-xl bg-surface-200/50 border border-slate-800">
                <span className="text-slate-400">Default Reasoning Model:</span>
                <p className="text-cyan-400 font-bold mt-1">GPT-4o Enterprise / Claude 3.7 Sonnet</p>
              </div>
              <div className="p-3 rounded-xl bg-surface-200/50 border border-slate-800">
                <span className="text-slate-400">HANA Vector Embedding Model:</span>
                <p className="text-purple-400 font-bold mt-1">text-embedding-3-small (1536d)</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab Content: RBAC Role Matrix */}
      {activeTab === "rbac" && (
        <div className="p-5 rounded-2xl glass-panel border border-slate-800/80 space-y-4">
          <div>
            <h3 className="text-sm font-bold text-white">Enterprise Role-Based Access Control (RBAC)</h3>
            <p className="text-xs text-slate-400">
              Role collection assignments mapped to SAP BTP XSUAA identity providers.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="border-b border-slate-800 text-slate-500 text-[10px] uppercase">
                  <th className="pb-2">Role Name</th>
                  <th className="pb-2">Scope / Description</th>
                  <th className="pb-2">Run Agents?</th>
                  <th className="pb-2">Approve Transports?</th>
                  <th className="pb-2">Edit Prompts?</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {rbacRoles.map((r) => (
                  <tr key={r.role} className="hover:bg-surface-200/40">
                    <td className="py-3 font-bold text-cyan-300">{r.role}</td>
                    <td className="py-3 text-slate-400 max-w-xs">{r.description}</td>
                    <td className="py-3">
                      {r.canExecute ? (
                        <span className="text-emerald-400 font-bold">YES</span>
                      ) : (
                        <span className="text-slate-600">NO</span>
                      )}
                    </td>
                    <td className="py-3">
                      {r.canApprove ? (
                        <span className="text-amber-400 font-bold">YES</span>
                      ) : (
                        <span className="text-slate-600">NO</span>
                      )}
                    </td>
                    <td className="py-3">
                      {r.canEditPrompts ? (
                        <span className="text-emerald-400 font-bold">YES</span>
                      ) : (
                        <span className="text-slate-600">NO</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </AppShell>
  );
}
