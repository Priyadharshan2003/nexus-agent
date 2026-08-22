"use client";

import React from "react";
import { AppShell } from "@/components/layout/AppShell";
import { MetricCards } from "@/components/dashboard/MetricCards";
import { AgentFleetStatus } from "@/components/dashboard/AgentFleetStatus";
import { ExecutionGraphPreview } from "@/components/dashboard/ExecutionGraphPreview";
import { LiveActivityFeed } from "@/components/dashboard/LiveActivityFeed";
import { useNexusStore } from "@/lib/store/useNexusStore";
import { Sparkles, ArrowRight, Zap } from "lucide-react";
import Link from "next/link";

export const DashboardView: React.FC = () => {
  const {
    agents,
    activeWorkflow,
    stepForward,
    runWorkflowAuto,
    isRunning,
    approvals,
    auditLogs
  } = useNexusStore();

  return (
    <AppShell>
      {/* Hero Welcome Banner */}
      <div className="p-6 rounded-2xl glass-panel border border-slate-200 dark:border-slate-800/80 radial-glow relative overflow-hidden flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-blue-50 dark:bg-cyan-950/80 text-blue-700 dark:text-cyan-300 border border-blue-200 dark:border-cyan-800/80 flex items-center gap-1 font-bold">
              <Sparkles className="w-3 h-3 text-blue-600 dark:text-cyan-400" />
              <span>Nexus-Agent Multi-Agent Core v1.0</span>
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
              Tenant: Global SAP Enterprise Suite
            </span>
          </div>
          <h1 className="text-xl lg:text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Autonomous SAP BTP & S/4HANA Orchestrator
          </h1>
          <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 max-w-2xl">
            Accelerating SAP Clean Core migration, ABAP Cloud conversion, CAP service synthesis, and transport release validation with deterministic LangGraph multi-agent teams.
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <Link
            href="/abap-modernizer"
            className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-surface-200 hover:bg-slate-200 dark:hover:bg-surface-100 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs font-mono flex items-center gap-1.5 transition-colors font-medium"
          >
            <span>Scan ABAP</span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
          </Link>
          <Link
            href="/cap-generator"
            className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-surface-200 hover:bg-slate-200 dark:hover:bg-surface-100 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs font-mono flex items-center gap-1.5 transition-colors font-medium"
          >
            <span>Generate CAP</span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
          </Link>
          <Link
            href="/workflows"
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-semibold shadow-glow flex items-center gap-1.5 transition-all"
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Open LangGraph Canvas</span>
          </Link>
        </div>
      </div>

      {/* KPI Metrics */}
      <MetricCards />

      {/* Live LangGraph Execution Visualizer */}
      <ExecutionGraphPreview
        workflow={activeWorkflow}
        onStepForward={stepForward}
        onRunAuto={runWorkflowAuto}
        isRunning={isRunning}
      />

      {/* 8 Autonomous Agents Fleet */}
      <AgentFleetStatus agents={agents} />

      {/* Approvals & Live Audit Feed */}
      <LiveActivityFeed auditLogs={auditLogs} approvals={approvals} />
    </AppShell>
  );
};
