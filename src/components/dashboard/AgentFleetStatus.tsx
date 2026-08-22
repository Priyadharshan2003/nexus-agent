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
  Activity,
  CheckCircle,
  Clock
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
    <div className="p-5 rounded-2xl glass-panel border border-slate-800/80">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
            <Activity className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white tracking-tight">
              Autonomous Agent Fleet (8 Specialized Units)
            </h3>
            <p className="text-xs text-slate-400 font-mono">
              Deterministic LangGraph subagents coordinating SAP business workflows
            </p>
          </div>
        </div>
        <Link
          href="/agents"
          className="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1 hover:underline"
        >
          <span>Manage Fleet</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        {agents.map((agent) => {
          const Icon = ICON_MAP[agent.avatarIcon] || Code2;
          const isBusy = agent.status === "running";

          return (
            <div
              key={agent.id}
              className="p-3.5 rounded-xl bg-surface-200/70 border border-slate-800/90 hover:border-slate-700 transition-all flex flex-col justify-between group"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2.5">
                  <div
                    className={`w-8 h-8 rounded-lg bg-gradient-to-br ${agent.accentColor} flex items-center justify-center text-white shadow-md`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-slate-200 group-hover:text-cyan-300 transition-colors">
                      {agent.name}
                    </h4>
                    <span className="text-[10px] font-mono text-slate-400">{agent.category}</span>
                  </div>
                </div>

                <span
                  className={`text-[9px] font-mono px-1.5 py-0.5 rounded-full flex items-center gap-1 ${
                    isBusy
                      ? "bg-amber-950 text-amber-300 border border-amber-800 animate-pulse"
                      : "bg-emerald-950/70 text-emerald-400 border border-emerald-800/60"
                  }`}
                >
                  <span
                    className={`h-1.5 w-1.5 rounded-full ${
                      isBusy ? "bg-amber-400" : "bg-emerald-400"
                    }`}
                  ></span>
                  {isBusy ? "ACTIVE" : "STANDBY"}
                </span>
              </div>

              <div className="mt-3 pt-2.5 border-t border-slate-800/70 flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span>{agent.metrics.totalRuns.toLocaleString()} runs</span>
                <span className="text-emerald-400 font-semibold">{agent.metrics.successRate}% acc</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
