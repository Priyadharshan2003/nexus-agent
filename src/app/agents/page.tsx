"use client";

import React, { useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { useNexusStore } from "@/lib/store/useNexusStore";
import { AgentDefinition, AgentId } from "@/lib/types";
import {
  Compass,
  Building2,
  Code2,
  Boxes,
  FlaskConical,
  ShieldCheck,
  FileText,
  Rocket,
  CheckCircle2,
} from "lucide-react";

const ICON_MAP: Record<string, any> = {
  Compass,
  Building2,
  Code2,
  Boxes,
  FlaskConical,
  ShieldCheck,
  FileText,
  Rocket
};

export default function AgentsPage() {
  const { agents, setAgents } = useNexusStore();
  const [selectedAgent, setSelectedAgent] = useState<AgentDefinition | null>(agents[0]);
  const [categoryFilter, setCategoryFilter] = useState<string>("All");
  const [testPrompt, setTestPrompt] = useState<string>("");
  const [testResponse, setTestResponse] = useState<string | null>(null);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);

  const categories = ["All", "Strategy", "Engineering", "Governance", "Operations"];

  const filteredAgents =
    categoryFilter === "All"
      ? agents
      : agents.filter((a) => a.category === categoryFilter);

  const handleTestAgent = () => {
    if (!testPrompt.trim() || !selectedAgent) return;
    setIsSimulating(true);
    setTestResponse(null);

    setTimeout(() => {
      setIsSimulating(false);
      if (selectedAgent.id === "planner") {
        setTestResponse(
          `[Planner Agent Response]\n1. Analyzed goal: "${testPrompt}"\n2. Identified 4 subtasks: Extract OData metadata -> Generate CDS Aspect -> Audit Security -> Synthesize Tests.\n3. Scheduled parallel execution in LangGraph cluster.`
        );
      } else if (selectedAgent.id === "abap") {
        setTestResponse(
          `[ABAP Agent Response]\n✓ Detected legacy query pattern in target.\n✓ Replaced direct SQL with RAP EML expression:\nMODIFY ENTITIES OF I_SalesOrderTP ENTITY SalesOrder CREATE ...\n✓ Clean Core readiness score: 98/100.`
        );
      } else if (selectedAgent.id === "security") {
        setTestResponse(
          `[Security Agent Response]\n✓ Scanned authorization objects: S_DEVELOP and V_VBAK_VKO.\n✓ Zero Trust check PASSED.\n⚠️ High-risk transport release flagged. Checkpoint gate prepared.`
        );
      } else {
        setTestResponse(
          `[${selectedAgent.name} Response]\nProcessed request with temperature ${selectedAgent.temperature} on ${selectedAgent.model}.\n✓ Verified SAP Clean Core compatibility.\n✓ Artifacts compiled successfully.`
        );
      }
    }, 900);
  };

  const handleUpdateTemperature = (agentId: AgentId, temp: number) => {
    setAgents((prev) =>
      prev.map((a) => (a.id === agentId ? { ...a, temperature: temp } : a))
    );
    if (selectedAgent && selectedAgent.id === agentId) {
      setSelectedAgent((prev) => (prev ? { ...prev, temperature: temp } : null));
    }
  };

  const handleUpdateModel = (agentId: AgentId, model: string) => {
    setAgents((prev) =>
      prev.map((a) => (a.id === agentId ? { ...a, model } : a))
    );
    if (selectedAgent && selectedAgent.id === agentId) {
      setSelectedAgent((prev) => (prev ? { ...prev, model } : null));
    }
  };

  return (
    <AppShell>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-cyan-100 dark:bg-cyan-950 text-cyan-800 dark:text-cyan-300 border border-cyan-300 dark:border-cyan-800 font-semibold">
              Autonomous Swarm
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">8 Active Specialized Agents</span>
          </div>
          <h1 className="text-xl lg:text-2xl font-bold tracking-tight text-slate-900 dark:text-white mt-1">
            Multi-Agent Control Center
          </h1>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
            Configure agent personas, adjust reasoning temperature, select foundation LLMs, and test prompts in real-time.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-surface-200 border border-slate-200 dark:border-slate-800 self-start">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1 rounded-lg text-xs font-mono transition-all font-semibold ${
                categoryFilter === cat
                  ? "bg-cyan-500/20 text-cyan-800 dark:text-cyan-300 border border-cyan-400 dark:border-cyan-500/40 font-bold"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Main Split Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Agent Cards List (7 Cols) */}
        <div className="lg:col-span-7 space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {filteredAgents.map((agent) => {
              const Icon = ICON_MAP[agent.avatarIcon] || Code2;
              const isSelected = selectedAgent?.id === agent.id;

              return (
                <button
                  key={agent.id}
                  onClick={() => {
                    setSelectedAgent(agent);
                    setTestResponse(null);
                  }}
                  className={`p-4 rounded-2xl border text-left transition-all relative flex flex-col justify-between group ${
                    isSelected
                      ? "bg-cyan-50 dark:bg-cyan-950/20 border-cyan-500 ring-1 ring-cyan-500/40 shadow-sm"
                      : "bg-white dark:bg-surface-200/60 hover:bg-slate-50 dark:hover:bg-surface-100/90 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 shadow-sm"
                  }`}
                >
                  <div>
                    <div className="flex items-start justify-between">
                      <div
                        className={`w-10 h-10 rounded-xl bg-gradient-to-br ${agent.accentColor} flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-surface-300 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 font-semibold">
                        {agent.category}
                      </span>
                    </div>

                    <h3 className="text-sm font-bold text-slate-800 dark:text-slate-100 mt-3 group-hover:text-cyan-700 dark:group-hover:text-cyan-300 transition-colors">
                      {agent.name}
                    </h3>
                    <p className="text-[11px] text-cyan-700 dark:text-cyan-400 font-mono mt-0.5 font-semibold">{agent.role}</p>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 line-clamp-2">
                      {agent.description}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800/80 flex items-center justify-between text-[11px] font-mono text-slate-500 dark:text-slate-400">
                    <span>{agent.metrics.totalRuns.toLocaleString()} runs</span>
                    <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                      {agent.metrics.successRate}% success
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Agent Inspector & Playground (5 Cols) */}
        <div className="lg:col-span-5">
          {selectedAgent ? (
            <div className="p-5 rounded-2xl glass-panel border border-slate-200 dark:border-slate-800/80 space-y-5 sticky top-20">
              {/* Header */}
              <div className="flex items-start justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-11 h-11 rounded-xl bg-gradient-to-br ${selectedAgent.accentColor} flex items-center justify-center text-white shadow-lg`}
                  >
                    {React.createElement(ICON_MAP[selectedAgent.avatarIcon] || Code2, {
                      className: "w-6 h-6"
                    })}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">{selectedAgent.name}</h3>
                    <p className="text-xs text-cyan-700 dark:text-cyan-400 font-mono font-semibold">{selectedAgent.role}</p>
                  </div>
                </div>
                <span className="text-[10px] font-mono px-2 py-1 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 font-semibold">
                  ONLINE
                </span>
              </div>

              {/* Capabilities */}
              <div>
                <label className="block text-[11px] font-mono uppercase text-slate-500 dark:text-slate-400 mb-2 font-semibold">
                  Specialized Autonomous Capabilities
                </label>
                <div className="space-y-1.5">
                  {selectedAgent.capabilities.map((cap, i) => (
                    <div
                      key={i}
                      className="p-2 rounded-lg bg-slate-50 dark:bg-surface-200/70 border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 flex items-center gap-2"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400 flex-shrink-0" />
                      <span>{cap}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* LLM & Parameter Tuning */}
              <div className="space-y-3 p-3.5 rounded-xl bg-slate-50 dark:bg-surface-200/50 border border-slate-200 dark:border-slate-800">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-500 dark:text-slate-400">Foundation Model</span>
                  <select
                    value={selectedAgent.model}
                    onChange={(e) => handleUpdateModel(selectedAgent.id, e.target.value)}
                    className="bg-white dark:bg-[#0a0d14] border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 rounded-lg px-2 py-1 text-xs font-mono focus:outline-none"
                  >
                    <option value="gpt-4o-enterprise">GPT-4o Enterprise</option>
                    <option value="claude-3-7-sonnet">Claude 3.7 Sonnet</option>
                    <option value="gemini-2.5-pro">Gemini 2.5 Pro</option>
                    <option value="sap-joule-fine-tuned">SAP Joule Fine-Tuned</option>
                  </select>
                </div>

                <div>
                  <div className="flex items-center justify-between text-xs font-mono mb-1">
                    <span className="text-slate-500 dark:text-slate-400">Temperature (Creativity vs Determinism)</span>
                    <span className="text-cyan-700 dark:text-cyan-400 font-bold">{selectedAgent.temperature}</span>
                  </div>
                  <input
                    type="range"
                    min="0.0"
                    max="1.0"
                    step="0.05"
                    value={selectedAgent.temperature}
                    onChange={(e) =>
                      handleUpdateTemperature(selectedAgent.id, parseFloat(e.target.value))
                    }
                    className="w-full accent-cyan-500 bg-slate-300 dark:bg-slate-800 h-1.5 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 font-mono mt-1">
                    <span>Deterministic (0.0)</span>
                    <span>Creative (1.0)</span>
                  </div>
                </div>
              </div>

              {/* Live Test Playground */}
              <div>
                <label className="block text-[11px] font-mono uppercase text-slate-500 dark:text-slate-400 mb-1.5 font-semibold">
                  Direct Agent Prompt Sandbox
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder={`Ask ${selectedAgent.name} a task...`}
                    value={testPrompt}
                    onChange={(e) => setTestPrompt(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleTestAgent()}
                    className="flex-1 bg-slate-50 dark:bg-[#080b11] border border-slate-300 dark:border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-900 dark:text-slate-200 font-mono focus:border-cyan-500 focus:outline-none"
                  />
                  <button
                    onClick={handleTestAgent}
                    disabled={isSimulating}
                    className="px-3.5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-white font-bold text-xs shadow-sm transition-all disabled:opacity-50"
                  >
                    {isSimulating ? "Thinking..." : "Send"}
                  </button>
                </div>

                {testResponse && (
                  <div className="mt-3 p-3 rounded-xl bg-slate-900 dark:bg-[#06080d] border border-cyan-800 dark:border-cyan-900/60 font-mono text-[11px] text-cyan-300 whitespace-pre-line animate-in fade-in">
                    {testResponse}
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="p-8 rounded-2xl glass-panel text-center text-slate-500 text-xs">
              Select an agent from the left to view detailed architecture and configuration.
            </div>
          )}
        </div>
      </div>
    </AppShell>
  );
}
