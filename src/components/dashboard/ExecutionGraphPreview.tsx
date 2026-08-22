"use client";

import React from "react";
import Link from "next/link";
import {
  GitFork,
  Play,
  CheckCircle2,
  Clock,
  ArrowRight,
  ShieldCheck,
  Zap,
  RotateCw
} from "lucide-react";
import { WorkflowExecution } from "@/lib/types";

interface ExecutionGraphProps {
  workflow: WorkflowExecution | null;
  onStepForward: () => void;
  onRunAuto: () => void;
  isRunning: boolean;
}

export const ExecutionGraphPreview: React.FC<ExecutionGraphProps> = ({
  workflow,
  onStepForward,
  onRunAuto,
  isRunning
}) => {
  if (!workflow) {
    return (
      <div className="p-8 rounded-2xl glass-panel text-center text-slate-600 dark:text-slate-400">
        No active workflow running. Launch a new run to view the LangGraph execution canvas.
      </div>
    );
  }

  return (
    <div className="p-5 rounded-2xl glass-panel border border-slate-200 dark:border-slate-800/80 shadow-sm">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-blue-100 dark:bg-cyan-950 text-blue-800 dark:text-cyan-300 border border-blue-300 dark:border-cyan-800 font-bold">
              {workflow.category}
            </span>
            <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 font-medium">Target: {workflow.targetSystem}</span>
          </div>
          <h3 className="text-base font-bold text-slate-900 dark:text-white tracking-tight mt-1">{workflow.title}</h3>
        </div>

        {/* Interactive Controls */}
        <div className="flex items-center gap-2">
          {workflow.status === "paused_for_approval" ? (
            <Link
              href="/approvals"
              className="px-3 py-1.5 rounded-lg bg-amber-500/20 border border-amber-500/50 text-amber-800 dark:text-amber-300 text-xs font-semibold hover:bg-amber-500/30 flex items-center gap-1.5 animate-pulse"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Resolve Approval Gate</span>
            </Link>
          ) : workflow.status === "completed" ? (
            <span className="px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-800 dark:text-emerald-400 text-xs font-mono font-semibold flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4" />
              <span>Pipeline Complete (100%)</span>
            </span>
          ) : (
            <>
              <button
                onClick={onStepForward}
                disabled={isRunning}
                className="px-3.5 py-1.5 rounded-lg bg-slate-100 dark:bg-surface-200 hover:bg-slate-200 dark:hover:bg-surface-100 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs font-mono font-medium flex items-center gap-1.5 transition-colors disabled:opacity-50 shadow-sm"
              >
                <span>Step Next</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={onRunAuto}
                disabled={isRunning}
                className="px-4 py-1.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-glow transition-all active:scale-95 disabled:opacity-50"
              >
                {isRunning ? (
                  <>
                    <RotateCw className="w-3.5 h-3.5 animate-spin" />
                    <span>Executing DAG...</span>
                  </>
                ) : (
                  <>
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Autonomous Run</span>
                  </>
                )}
              </button>
            </>
          )}

          <Link
            href="/workflows"
            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            title="Open Full Canvas"
          >
            <GitFork className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-200 dark:bg-slate-900 h-2 rounded-full overflow-hidden border border-slate-300 dark:border-slate-800 mb-4">
        <div
          className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 transition-all duration-500"
          style={{ width: `${workflow.progressPercentage}%` }}
        ></div>
      </div>

      {/* Interactive Node Graph Steps */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-2.5 relative">
        {workflow.nodes.map((node, index) => {
          const isDone = node.status === "completed";
          const isCurrent = workflow.currentStepIndex === index && workflow.status !== "completed";
          const isPaused = node.agentId === "security" && workflow.status === "paused_for_approval";

          return (
            <div
              key={node.id}
              className={`p-3 rounded-xl border text-left transition-all relative flex flex-col justify-between min-h-[96px] shadow-sm ${
                isPaused
                  ? "bg-amber-50 dark:bg-amber-950/30 border-amber-400 dark:border-amber-500/50"
                  : isDone
                  ? "bg-emerald-50/80 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-500/40"
                  : isCurrent
                  ? "bg-blue-50 dark:bg-cyan-950/50 border-blue-500 dark:border-cyan-500 ring-2 ring-blue-400/40 dark:ring-cyan-500/40"
                  : "bg-white dark:bg-[#0c121e] border-slate-200 dark:border-slate-800/80"
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-mono font-semibold text-slate-500 dark:text-slate-400">Step {index + 1}</span>
                  {isDone ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  ) : isPaused ? (
                    <ShieldCheck className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 animate-pulse" />
                  ) : isCurrent ? (
                    <span className="h-2 w-2 rounded-full bg-blue-500 animate-ping"></span>
                  ) : (
                    <Clock className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
                  )}
                </div>

                <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 line-clamp-1">{node.agentName}</h4>
                <p className="text-[10px] text-slate-600 dark:text-slate-400 line-clamp-2 mt-0.5 font-mono">{node.title}</p>
              </div>

              {node.durationMs ? (
                <div className="mt-1.5 text-[9px] font-mono text-cyan-700 dark:text-cyan-400 font-semibold">
                  {(node.durationMs / 1000).toFixed(1)}s • {node.tokensUsed} tokens
                </div>
              ) : null}
            </div>
          );
        })}
      </div>

      {/* Latest active log terminal preview */}
      <div className="mt-4 p-3.5 rounded-xl bg-slate-900 dark:bg-[#06080d] border border-slate-800 dark:border-slate-900 font-mono text-[11px] text-slate-200 dark:text-slate-300 shadow-inner">
        <div className="flex items-center justify-between text-slate-400 pb-2 mb-2 border-b border-slate-800 text-[10px]">
          <div className="flex items-center gap-1.5 text-cyan-400 font-semibold">
            <Zap className="w-3.5 h-3.5" />
            <span>Real-Time LangGraph Execution Trace</span>
          </div>
          <span className="px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-[9px] font-mono border border-slate-700">
            STATUS: {workflow.status.toUpperCase()}
          </span>
        </div>
        <div className="space-y-1">
          {workflow.nodes.flatMap((n) => n.logs).length > 0 ? (
            workflow.nodes
              .flatMap((n) => n.logs)
              .slice(-3)
              .map((log, lidx) => (
                <div key={lidx} className="flex items-center gap-2">
                  <span className="text-cyan-400 font-bold">&gt;</span>
                  <span className="truncate text-slate-300">{log}</span>
                </div>
              ))
          ) : (
            <div className="text-slate-400 italic text-[11px]">
              No execution logs yet. Click &quot;Step Next&quot; or &quot;Autonomous Run&quot; to trigger agents.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
