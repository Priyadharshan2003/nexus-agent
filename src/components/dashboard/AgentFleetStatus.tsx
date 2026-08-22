"use client";

import React from "react";
import Link from "next/link";
import {
  Compass,
  Building2,
  Code2,
  Boxes,
  FlaskConical,
  ShieldCheck,
  FileText,
  Rocket,
  ArrowUpRight,
  Activity
} from "lucide-react";
import { AgentDefinition } from "@/lib/types";

interface AgentFleetProps {
  agents: AgentDefinition[];
}

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

export const AgentFleetStatus: React.FC<AgentFleetProps> = ({ agents }) => {
  return (
    <div className="p-5 rounded-2xl glass-panel border border-slate-200 dark:border-slate-800/80 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-blue-50 dark:bg-cyan-500/10 text-blue-600 dark:text-cyan-400 border border-blue-200 dark:border-cyan-500/30">
            <Activity className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white tracking-tight">
              Autonomous Agent Fleet (8 Specialized Units)
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
              Deterministic LangGraph subagents coordinating SAP business workflows
            </p>
          </div>
        </div>
        <Link
          href="/agents"
          className="text-xs font-mono text-blue-600 dark:text-cyan-400 hover:text-blue-500 dark:hover:text-cyan-300 flex items-center gap-1 hover:underline font-semibold"
        >
          <span>Manage Fleet</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {agents.map((agent) => {
          const Icon = ICON_MAP[agent.avatarIcon] || Code2;
          const isBusy = agent.status === "running";

          return (
            <Link
              key={agent.id}
              href="/agents"
              className="p-4 rounded-2xl bg-white dark:bg-[#0c121e] border border-slate-200 dark:border-slate-800/80 hover:border-blue-400 dark:hover:border-cyan-500/50 transition-all flex flex-col justify-between group shadow-sm hover:shadow-md"
            >
              <div>
                {/* Top Row: Avatar + Category + Status Badge */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2 min-w-0">
                    <div
                      className={`w-8 h-8 rounded-xl bg-gradient-to-br ${agent.accentColor} flex items-center justify-center text-white shadow-md flex-shrink-0 group-hover:scale-105 transition-transform`}
                    >
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700/60 font-medium truncate">
                      {agent.category}
                    </span>
                  </div>

                  <span
                    className={`text-[9px] font-mono px-2 py-0.5 rounded-full flex items-center gap-1.5 flex-shrink-0 ${
                      isBusy
                        ? "bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800 animate-pulse font-semibold"
                        : "bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-800/60 font-semibold"
                    }`}
                  >
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${
                        isBusy ? "bg-amber-500" : "bg-emerald-500"
                      }`}
                    ></span>
                    {isBusy ? "ACTIVE" : "STANDBY"}
                  </span>
                </div>

                {/* Agent Name & Role (Full Width, No Collision) */}
                <div className="min-w-0">
                  <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors truncate">
                    {agent.name}
                  </h4>
                  <p className="text-[11px] text-cyan-700 dark:text-cyan-400 font-mono mt-0.5 truncate font-medium">
                    {agent.role}
                  </p>
                </div>
              </div>

              {/* Bottom Metrics Bar */}
              <div className="mt-3.5 pt-2.5 border-t border-slate-100 dark:border-slate-800/70 flex items-center justify-between text-[11px] font-mono text-slate-500 dark:text-slate-400">
                <span>{agent.metrics.totalRuns.toLocaleString()} runs</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold">
                  {agent.metrics.successRate}% acc
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};
