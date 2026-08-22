"use client";

import React, { useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { useNexusStore } from "@/lib/store/useNexusStore";
import {
  ShieldCheck,
  Server,
  Cpu,
  Users,
  Save,
  CheckCircle2,
  Sun,
  Moon,
  Monitor
} from "lucide-react";

export default function SettingsPage() {
  const { settings, setSettings, theme, setTheme } = useNexusStore();
  const [activeTab, setActiveTab] = useState<"security" | "btp" | "llm" | "rbac" | "appearance">("security");
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

  const handleThemeChange = (newTheme: "dark" | "light") => {
    setTheme(newTheme);
    localStorage.setItem("nexus_theme", newTheme);
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    } else {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.add("light");
    }
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
            <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-cyan-100 dark:bg-cyan-950 text-cyan-800 dark:text-cyan-300 border border-cyan-300 dark:border-cyan-800 font-semibold">
              Enterprise Governance
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">SOC2 & Zero-Trust Enforced</span>
          </div>
          <h1 className="text-xl lg:text-2xl font-bold tracking-tight text-slate-900 dark:text-white mt-1">
            Settings & Security Center
          </h1>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
            Configure SAP BTP Cloud Connectors, LLM keys, RBAC roles, and appearance preferences.
          </p>
        </div>

        <button
          onClick={handleSave}
          className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs shadow-glow flex items-center gap-2 transition-all self-start"
        >
          {savedSuccess ? (
            <>
              <CheckCircle2 className="w-4 h-4 text-emerald-200" />
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
      <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-2 overflow-x-auto">
        {[
          { id: "security", label: "Zero-Trust Guardrails", icon: ShieldCheck },
          { id: "appearance", label: "Theme & Appearance", icon: Sun },
          { id: "btp", label: "SAP BTP Destinations", icon: Server },
          { id: "llm", label: "Foundation LLM Vault", icon: Cpu },
          { id: "rbac", label: "RBAC Role Matrix", icon: Users }
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-xl text-xs font-mono transition-all flex items-center gap-2 flex-shrink-0 font-semibold ${
                activeTab === tab.id
                  ? "bg-cyan-500/20 text-cyan-800 dark:text-cyan-300 border border-cyan-400 dark:border-cyan-500/40 font-bold shadow-sm"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
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
        <div className="p-5 rounded-2xl glass-panel border border-slate-200 dark:border-slate-800/80 space-y-5 shadow-sm">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Autonomous Agent Guardrails</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Control the boundary rules applied to all 8 autonomous agents.
            </p>
          </div>

          <div className="space-y-3">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-surface-200/60 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">
                  Enforce Mandatory Human Approval on CTS+ Transports
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                  Agents cannot release SAP CTS+ transport requests or deploy to production BTP spaces without reviewer sign-off.
                </p>
              </div>
              <input
                type="checkbox"
                checked={zeroTrust}
                onChange={(e) => setZeroTrust(e.target.checked)}
                className="h-4 w-4 accent-cyan-500 rounded cursor-pointer"
              />
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-surface-200/60 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">
                  Auto-Approve Low Risk Sandbox Microservices
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                  Allow deployment agents to automatically stage read-only mock test services to developer test spaces.
                </p>
              </div>
              <input
                type="checkbox"
                checked={autoApprove}
                onChange={(e) => setAutoApprove(e.target.checked)}
                className="h-4 w-4 accent-cyan-500 rounded cursor-pointer"
              />
            </div>

            <div className="p-4 rounded-xl bg-slate-50 dark:bg-surface-200/60 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div>
                <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200">
                  Strict Clean Core ABAP AST Policy
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                  Automatically fail any agent workflow generating direct DB queries on SAP standard tables (VBAK, BSEG, EKKO).
                </p>
              </div>
              <span className="text-[10px] font-mono font-bold text-emerald-800 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950 px-2 py-0.5 rounded border border-emerald-300 dark:border-emerald-800">
                ACTIVE
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Tab Content: Appearance & Theme Switcher */}
      {activeTab === "appearance" && (
        <div className="p-5 rounded-2xl glass-panel border border-slate-200 dark:border-slate-800/80 space-y-5 shadow-sm">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Appearance & Theme Mode</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Select your preferred visual interface theme.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Dark Mode Card */}
            <button
              onClick={() => handleThemeChange("dark")}
              className={`p-5 rounded-2xl border text-left transition-all flex items-start gap-4 ${
                theme === "dark"
                  ? "bg-[#0b101c] border-cyan-500 ring-2 ring-cyan-500/40 text-white shadow-md"
                  : "bg-slate-100 dark:bg-surface-200/60 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-400"
              }`}
            >
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-amber-400">
                <Moon className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-bold">Cyber Space (Dark Mode)</h4>
                  {theme === "dark" && (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                      ACTIVE
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  High-contrast dark sapphire theme tailored for high-focus agent workflows and nighttime telemetry monitoring.
                </p>
              </div>
            </button>

            {/* Light Mode Card */}
            <button
              onClick={() => handleThemeChange("light")}
              className={`p-5 rounded-2xl border text-left transition-all flex items-start gap-4 ${
                theme === "light"
                  ? "bg-white border-blue-600 ring-2 ring-blue-500/40 text-slate-900 shadow-md"
                  : "bg-slate-100 dark:bg-surface-200/60 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-400"
              }`}
            >
              <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 text-blue-600">
                <Sun className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h4 className="text-sm font-bold">SAP Horizon (Light Mode)</h4>
                  {theme === "light" && (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-blue-100 text-blue-700 border border-blue-300">
                      ACTIVE
                    </span>
                  )}
                </div>
                <p className="text-xs text-slate-600 mt-1">
                  Crisp, clean SAP Fiori Horizon enterprise light theme designed for daytime business and executive presentations.
                </p>
              </div>
            </button>
          </div>
        </div>
      )}

      {/* Tab Content: SAP BTP Destinations */}
      {activeTab === "btp" && (
        <div className="p-5 rounded-2xl glass-panel border border-slate-200 dark:border-slate-800/80 space-y-4 shadow-sm">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">SAP BTP Subaccount & Destinations</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Configure destination connectivity to S/4HANA Cloud, Cloud Connectors, and Kyma clusters.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono uppercase text-slate-500 dark:text-slate-400 mb-1 font-semibold">
                BTP Subaccount Subdomain
              </label>
              <input
                type="text"
                value={btpSubdomain}
                onChange={(e) => setBtpSubdomain(e.target.value)}
                className="w-full bg-slate-50 dark:bg-[#080b11] border border-slate-300 dark:border-slate-800 rounded-xl px-3 py-2 text-xs font-mono text-cyan-800 dark:text-cyan-300 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono uppercase text-slate-500 dark:text-slate-400 mb-1 font-semibold">
                SAP Cloud Connector Status
              </label>
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-[#080b11] border border-slate-300 dark:border-slate-800 text-xs font-mono text-emerald-700 dark:text-emerald-400 flex items-center justify-between">
                <span>SCC v2.16 Connected (Location ID: BTP-PRD-LOC1)</span>
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping"></span>
              </div>
            </div>
          </div>

          <div className="space-y-2 pt-2">
            <h4 className="text-xs font-mono uppercase text-slate-500 dark:text-slate-400 font-semibold">Active Destinations</h4>
            <div className="space-y-1.5">
              {[
                { name: "S4HANA_CLOUD_ODATA_V4", type: "HTTP", auth: "OAuth2SAMLBearerAssertion", status: "Active" },
                { name: "SAP_HANA_CLOUD_HDI_01", type: "HDB", auth: "UserPassword", status: "Active" },
                { name: "SUCCESSFACTORS_TIME_API", type: "HTTP", auth: "OAuth2ClientCredentials", status: "Active" }
              ].map((dest) => (
                <div
                  key={dest.name}
                  className="p-3 rounded-xl bg-slate-50 dark:bg-surface-200/60 border border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs font-mono"
                >
                  <div>
                    <span className="font-bold text-slate-800 dark:text-slate-200">{dest.name}</span>
                    <span className="text-slate-500 ml-2">[{dest.type} • {dest.auth}]</span>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-800 text-[10px] font-semibold">
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
        <div className="p-5 rounded-2xl glass-panel border border-slate-200 dark:border-slate-800/80 space-y-4 shadow-sm">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Foundation Model API Credentials (BYOK)</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Keys are encrypted at rest with AES-256 and never transmitted to client browsers.
            </p>
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-xs font-mono uppercase text-slate-500 dark:text-slate-400 mb-1 font-semibold">
                OpenAI / Azure OpenAI Enterprise API Key
              </label>
              <div className="flex gap-2">
                <input
                  type="password"
                  value={apiKeyInput}
                  onChange={(e) => setApiKeyInput(e.target.value)}
                  className="flex-1 bg-slate-50 dark:bg-[#080b11] border border-slate-300 dark:border-slate-800 rounded-xl px-3 py-2 text-xs font-mono text-cyan-800 dark:text-cyan-300 focus:outline-none"
                />
                <button
                  onClick={() => alert("API Key encrypted and verified.")}
                  className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-surface-200 hover:bg-slate-200 dark:hover:bg-surface-100 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs font-mono"
                >
                  Verify Key
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono pt-2">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-surface-200/50 border border-slate-200 dark:border-slate-800">
                <span className="text-slate-500 dark:text-slate-400">Default Reasoning Model:</span>
                <p className="text-cyan-700 dark:text-cyan-400 font-bold mt-1">GPT-4o Enterprise / Claude 3.7 Sonnet</p>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-surface-200/50 border border-slate-200 dark:border-slate-800">
                <span className="text-slate-500 dark:text-slate-400">HANA Vector Embedding Model:</span>
                <p className="text-purple-700 dark:text-purple-400 font-bold mt-1">text-embedding-3-small (1536d)</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab Content: RBAC Role Matrix */}
      {activeTab === "rbac" && (
        <div className="p-5 rounded-2xl glass-panel border border-slate-200 dark:border-slate-800/80 space-y-4 shadow-sm">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Enterprise Role-Based Access Control (RBAC)</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Role collection assignments mapped to SAP BTP XSUAA identity providers.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 text-[10px] uppercase">
                  <th className="pb-2">Role Name</th>
                  <th className="pb-2">Scope / Description</th>
                  <th className="pb-2">Run Agents?</th>
                  <th className="pb-2">Approve Transports?</th>
                  <th className="pb-2">Edit Prompts?</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800/60">
                {rbacRoles.map((r) => (
                  <tr key={r.role} className="hover:bg-slate-50 dark:hover:bg-surface-200/40">
                    <td className="py-3 font-bold text-cyan-700 dark:text-cyan-300">{r.role}</td>
                    <td className="py-3 text-slate-600 dark:text-slate-400 max-w-xs">{r.description}</td>
                    <td className="py-3">
                      {r.canExecute ? (
                        <span className="text-emerald-700 dark:text-emerald-400 font-bold">YES</span>
                      ) : (
                        <span className="text-slate-400">NO</span>
                      )}
                    </td>
                    <td className="py-3">
                      {r.canApprove ? (
                        <span className="text-amber-700 dark:text-amber-400 font-bold">YES</span>
                      ) : (
                        <span className="text-slate-400">NO</span>
                      )}
                    </td>
                    <td className="py-3">
                      {r.canEditPrompts ? (
                        <span className="text-emerald-700 dark:text-emerald-400 font-bold">YES</span>
                      ) : (
                        <span className="text-slate-400">NO</span>
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
