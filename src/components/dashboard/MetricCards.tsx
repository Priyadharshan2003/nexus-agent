"use client";

import React from "react";
import {
  TrendingUp,
  DollarSign,
  Clock,
  CheckCircle2,
  Cpu
} from "lucide-react";

export const MetricCards: React.FC = () => {
  const metrics = [
    {
      label: "Total Cost Savings",
      value: "$428,500",
      change: "+34.2%",
      period: "vs manual ABAP consulting",
      icon: DollarSign,
      color: "text-emerald-500 dark:text-emerald-400",
      glow: "border-emerald-500/30 bg-emerald-50 dark:bg-emerald-950/10",
      accent: "from-emerald-500 to-teal-600"
    },
    {
      label: "Developer Hours Saved",
      value: "1,840 hrs",
      change: "+78.4%",
      period: "2–8 wks → 4 hours avg",
      icon: Clock,
      color: "text-cyan-600 dark:text-cyan-400",
      glow: "border-cyan-500/30 bg-cyan-50 dark:bg-cyan-950/10",
      accent: "from-cyan-500 to-blue-600"
    },
    {
      label: "Automation Completion Rate",
      value: "97.8%",
      change: "+2.1%",
      period: "99.4% first-time clean core",
      icon: CheckCircle2,
      color: "text-indigo-600 dark:text-indigo-400",
      glow: "border-indigo-500/30 bg-indigo-50 dark:bg-indigo-950/10",
      accent: "from-indigo-500 to-purple-600"
    },
    {
      label: "Autonomous Tool Executions",
      value: "14,890",
      change: "+120/day",
      period: "across S/4HANA & BTP",
      icon: Cpu,
      color: "text-amber-600 dark:text-amber-400",
      glow: "border-amber-500/30 bg-amber-50 dark:bg-amber-950/10",
      accent: "from-amber-500 to-orange-600"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {metrics.map((m, idx) => {
        const Icon = m.icon;
        return (
          <div
            key={idx}
            className={`p-4 rounded-2xl border ${m.glow} glass-panel relative overflow-hidden group hover:border-slate-400 dark:hover:border-slate-600 transition-all shadow-md dark:shadow-lg`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase tracking-wider text-slate-500 dark:text-slate-400">
                {m.label}
              </span>
              <div className={`p-2 rounded-xl bg-white dark:bg-surface-200 border border-slate-200 dark:border-slate-800 shadow-sm ${m.color}`}>
                <Icon className="w-4 h-4" />
              </div>
            </div>

            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white font-mono">
                {m.value}
              </span>
              <span className="text-[11px] font-semibold font-mono text-emerald-600 dark:text-emerald-400 flex items-center gap-0.5">
                <TrendingUp className="w-3 h-3 inline" /> {m.change}
              </span>
            </div>

            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 font-mono">{m.period}</p>
          </div>
        );
      })}
    </div>
  );
};
