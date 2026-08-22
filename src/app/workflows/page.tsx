"use client";

import React, { useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { useNexusStore } from "@/lib/store/useNexusStore";
import {
  GitFork,
  Play,
  RotateCw,
  ArrowRight,
  CheckCircle2,
  Clock,
  ShieldCheck,
  Zap,
  Terminal,
  FileCode,
  Layers,
  Sparkles,
  RefreshCw,
  Plus
} from "lucide-react";
import Link from "next/link";
import { PRESET_WORKFLOW_TEMPLATES } from "@/lib/agents/langgraph-runner";

export default function WorkflowsPage() {
  const {
    workflows,
    activeWorkflow,
    activeWorkflowId,
    setActiveWorkflowId,
    stepForward,
    runWorkflowAuto,
    startNewWorkflow,
    isRunning
  } = useNexusStore();

  const [selectedNodeIndex, setSelectedNodeIndex] = useState<number>(0);
  const [selectedArtifactTab, setSelectedArtifactTab] = useState<number>(0);

  const currentWf = activeWorkflow || workflows[0];
  const currentNode = currentWf?.nodes[selectedNodeIndex] || currentWf?.nodes[0];

  const handleStartPreset = (templateId: string) => {
    const newWf = startNewWorkflow(templateId, "", "SAP S/4HANA Cloud");
    setSelectedNodeIndex(0);
    setTimeout(() => {
      runWorkflowAuto(newWf.id);
    }, 300);
  };

  return (
    <AppShell>
      {/* Page Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
              LangGraph State Graph Engine
            </span>
            <span className="text-xs text-slate-400 font-mono">
              Deterministic Multi-Agent DAG Execution
            </span>
          </div>
          <h1 className="text-xl lg:text-2xl font-bold tracking-tight text-white mt-1">
            Autonomous Workflow Canvas
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Real-time visual monitoring of sub-agent collaboration, state transitions, token consumption, and human-in-the-loop gates.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 flex-wrap">
          {currentWf?.status === "paused_for_approval" ? (
            <Link
              href="/approvals"
              className="px-4 py-2 rounded-xl bg-amber-500/20 border border-amber-500/50 text-amber-300 text-xs font-semibold hover:bg-amber-500/30 flex items-center gap-2 animate-pulse"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Pending Human Approval</span>
            </Link>
          ) : currentWf?.status === "completed" ? (
            <span className="px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-medium flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>DAG Completed (100%)</span>
            </span>
          ) : (
            <>
              <button
                onClick={() => stepForward()}
                disabled={isRunning}
                className="px-4 py-2 rounded-xl bg-surface-200 hover:bg-surface-100 border border-slate-700 text-slate-200 text-xs font-mono flex items-center gap-2 transition-colors disabled:opacity-50"
              >
                <span>Step Next</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => runWorkflowAuto()}
                disabled={isRunning}
                className="px-5 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-bold flex items-center gap-2 shadow-glow transition-all active:scale-95 disabled:opacity-50"
              >
                {isRunning ? (
                  <>
                    <RotateCw className="w-4 h-4 animate-spin" />
                    <span>Executing Nodes...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-current" />
                    <span>Autonomous Run</span>
                  </>
                )}
              </button>
            </>
          )}
        </div>
      </div>

      {/* Preset Blueprints Toolbar */}
      <div className="p-3.5 rounded-2xl bg-surface-200/60 border border-slate-800/80 flex items-center justify-between gap-3 overflow-x-auto">
        <div className="flex items-center gap-2 text-xs font-mono text-slate-400 flex-shrink-0">
          <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
          <span>Launch Preset Blueprint:</span>
        </div>
        <div className="flex items-center gap-2">
          {PRESET_WORKFLOW_TEMPLATES.map((tmpl) => (
            <button
              key={tmpl.id}
              onClick={() => handleStartPreset(tmpl.id)}
              className="px-3 py-1.5 rounded-lg bg-[#0a0e16] hover:bg-surface-100 border border-slate-800 hover:border-cyan-500/40 text-slate-300 text-xs font-mono transition-all flex-shrink-0"
            >
              + {tmpl.title}
            </button>
          ))}
        </div>
      </div>

      {/* Main Workflow DAG & Inspector Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Visual LangGraph DAG Steps (7 Cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="p-5 rounded-2xl glass-panel border border-slate-800/80">
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
              <div>
                <span className="text-[10px] font-mono text-cyan-400 uppercase">
                  Active Execution DAG
                </span>
                <h3 className="text-base font-bold text-white tracking-tight">
                  {currentWf?.title}
                </h3>
              </div>
              <div className="text-right">
                <span className="text-xs font-mono font-bold text-cyan-400">
                  {currentWf?.progressPercentage}%
                </span>
                <p className="text-[10px] text-slate-500 font-mono">Progress</p>
              </div>
            </div>

            {/* Step Nodes List */}
            <div className="space-y-2.5">
              {currentWf?.nodes.map((node, idx) => {
                const isSelected = selectedNodeIndex === idx;
                const isDone = node.status === "completed";
                const isCurrent = currentWf.currentStepIndex === idx && currentWf.status !== "completed";
                const isPaused = node.agentId === "security" && currentWf.status === "paused_for_approval";

                return (
                  <button
                    key={node.id}
                    onClick={() => {
                      setSelectedNodeIndex(idx);
                      setSelectedArtifactTab(0);
                    }}
                    className={`w-full p-4 rounded-xl border text-left transition-all relative flex items-center justify-between ${
                      isSelected
                        ? "bg-cyan-950/30 border-cyan-500 ring-1 ring-cyan-500/50 shadow-glow"
                        : isDone
                        ? "bg-surface-200/80 border-slate-800 hover:border-slate-700"
                        : isPaused
                        ? "bg-amber-950/20 border-amber-500/50"
                        : "bg-surface-300/40 border-slate-900 opacity-60"
                    }`}
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center font-mono text-xs font-bold ${
                          isDone
                            ? "bg-emerald-950 text-emerald-300 border border-emerald-800"
                            : isPaused
                            ? "bg-amber-950 text-amber-300 border border-amber-800 animate-pulse"
                            : isCurrent
                            ? "bg-cyan-500 text-black shadow-glow"
                            : "bg-slate-800 text-slate-400"
                        }`}
                      >
                        {idx + 1}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <h4 className="text-xs font-bold text-slate-200 truncate">
                            {node.agentName}
                          </h4>
                          <span className="text-[10px] font-mono text-slate-500">
                            {node.agentId}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 truncate mt-0.5">{node.title}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 text-[11px] font-mono flex-shrink-0">
                      {node.durationMs && (
                        <span className="text-slate-500">{(node.durationMs / 1000).toFixed(1)}s</span>
                      )}
                      {isDone ? (
                        <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800/80 text-[10px]">
                          DONE
                        </span>
                      ) : isPaused ? (
                        <span className="px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800 text-[10px] animate-pulse">
                          HITL GATE
                        </span>
                      ) : isCurrent ? (
                        <span className="px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800 text-[10px]">
                          RUNNING
                        </span>
                      ) : (
                        <span className="text-slate-600 text-[10px]">QUEUED</span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Node Trace & Artifact Inspector (5 Cols) */}
        <div className="lg:col-span-5">
          {currentNode ? (
            <div className="p-5 rounded-2xl glass-panel border border-slate-800/80 space-y-4 sticky top-20">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div>
                  <span className="text-[10px] font-mono text-slate-500 uppercase">
                    Node Step Details
                  </span>
                  <h3 className="text-sm font-bold text-white">{currentNode.agentName}</h3>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-surface-300 text-slate-300 border border-slate-700">
                  {currentNode.status.toUpperCase()}
                </span>
              </div>

              {/* Input */}
              <div>
                <label className="block text-[10px] font-mono uppercase text-slate-500 mb-1">
                  Step Input Prompt / State Context
                </label>
                <div className="p-3 rounded-xl bg-[#080b11] border border-slate-800 text-xs font-mono text-slate-300">
                  {currentNode.input}
                </div>
              </div>

              {/* Output */}
              {currentNode.output && (
                <div>
                  <label className="block text-[10px] font-mono uppercase text-slate-500 mb-1">
                    Step Output Summary
                  </label>
                  <div className="p-3 rounded-xl bg-cyan-950/20 border border-cyan-900/60 text-xs font-mono text-cyan-300">
                    {currentNode.output}
                  </div>
                </div>
              )}

              {/* Execution Logs */}
              <div>
                <label className="block text-[10px] font-mono uppercase text-slate-500 mb-1 flex items-center gap-1.5">
                  <Terminal className="w-3 h-3 text-cyan-400" />
                  <span>Agent Reasoning & Tool Logs</span>
                </label>
                <div className="p-3 rounded-xl bg-[#06080d] border border-slate-900 font-mono text-[11px] text-slate-300 space-y-1 max-h-48 overflow-y-auto">
                  {currentNode.logs.map((log, lidx) => (
                    <div key={lidx} className="flex items-start gap-1.5">
                      <span className="text-cyan-500 font-bold">&gt;</span>
                      <span>{log}</span>
                    </div>
                  ))}
                  {currentNode.logs.length === 0 && (
                    <div className="text-slate-600 italic">No logs recorded for this node yet.</div>
                  )}
                </div>
              </div>

              {/* Artifacts if present */}
              {currentNode.artifacts && currentNode.artifacts.length > 0 && (
                <div>
                  <label className="block text-[10px] font-mono uppercase text-slate-500 mb-1 flex items-center gap-1.5">
                    <FileCode className="w-3 h-3 text-cyan-400" />
                    <span>Generated Code Artifacts</span>
                  </label>
                  <div className="p-3 rounded-xl bg-[#080b11] border border-slate-800 font-mono text-xs text-slate-200">
                    <pre className="overflow-x-auto text-[11px] text-cyan-300">
                      {currentNode.artifacts[0].content}
                    </pre>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="p-8 rounded-2xl glass-panel text-center text-slate-500 text-xs">
              Select a node on the left to inspect its state trace and generated artifacts.
            </div>
          )}
        </div>
      </div>
    </AppShell>
  );
}
