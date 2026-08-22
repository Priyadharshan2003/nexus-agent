"use client";

import React from "react";
import Link from "next/link";
import {
  Activity,
  ShieldCheck,
  ArrowUpRight,
  User,
  Bot
} from "lucide-react";
import { AuditLogEntry, HumanApprovalItem } from "@/lib/types";

interface LiveActivityFeedProps {
  auditLogs: AuditLogEntry[];
  approvals: HumanApprovalItem[];
}

export const LiveActivityFeed: React.FC<LiveActivityFeedProps> = ({
  auditLogs,
  approvals
}) => {
  const pendingApprovals = approvals.filter((a) => a.status === "pending");

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      {/* Pending Approvals & Risk Gates */}
      <div className="p-5 rounded-2xl glass-panel border border-slate-200 dark:border-slate-800/80">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-amber-500 dark:text-amber-400" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white tracking-tight">
              Human-in-the-Loop Approval Gates
            </h3>
          </div>
          <Link
            href="/approvals"
            className="text-xs font-mono text-cyan-600 dark:text-cyan-400 hover:text-cyan-500 dark:hover:text-cyan-300 flex items-center gap-1 font-semibold"
          >
            <span>View All ({approvals.length})</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="space-y-3">
          {pendingApprovals.map((appr) => (
            <div
              key={appr.id}
              className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-500/30 flex flex-col justify-between"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] font-mono uppercase px-1.5 py-0.5 rounded bg-amber-200 dark:bg-amber-900/60 text-amber-900 dark:text-amber-300 border border-amber-300 dark:border-amber-700 font-semibold">
                      {appr.actionType}
                    </span>
                    <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400">
                      {appr.transportRequestNumber || "BTP-CF-PRD"}
                    </span>
                  </div>
                  <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-1.5">{appr.summary}</h4>
                </div>
                <span className="text-[10px] font-mono text-amber-700 dark:text-amber-400 font-semibold uppercase px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-950 border border-amber-300 dark:border-amber-800">
                  {appr.riskLevel} RISK
                </span>
              </div>

              <div className="mt-3 flex items-center justify-between pt-2 border-t border-amber-200 dark:border-amber-900/40">
                <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">
                  Requested by Security Agent
                </span>
                <Link
                  href="/approvals"
                  className="px-3 py-1 rounded bg-amber-500 hover:bg-amber-400 text-black font-semibold text-[11px] transition-colors"
                >
                  Review & Authorize
                </Link>
              </div>
            </div>
          ))}

          {pendingApprovals.length === 0 && (
            <div className="p-6 text-center text-slate-500 dark:text-slate-400 text-xs font-mono">
              ✓ All high-impact actions authorized. Zero pending approval bottlenecks.
            </div>
          )}
        </div>
      </div>

      {/* Live Autonomous Audit Stream */}
      <div className="p-5 rounded-2xl glass-panel border border-slate-200 dark:border-slate-800/80">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />
            <h3 className="text-sm font-bold text-slate-900 dark:text-white tracking-tight">
              Live Autonomous Audit Stream
            </h3>
          </div>
          <Link
            href="/audit-logs"
            className="text-xs font-mono text-cyan-600 dark:text-cyan-400 hover:text-cyan-500 dark:hover:text-cyan-300 flex items-center gap-1 font-semibold"
          >
            <span>Audit Trail</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="space-y-2.5 max-h-72 overflow-y-auto pr-1">
          {auditLogs.slice(0, 5).map((log) => (
            <div
              key={log.id}
              className="p-2.5 rounded-xl bg-slate-50 dark:bg-[#0c121e] border border-slate-200 dark:border-slate-800/80 flex items-start gap-2.5 text-xs shadow-sm"
            >
              <div className="p-1.5 rounded-lg bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 mt-0.5">
                {log.actor.type === "agent" ? (
                  <Bot className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                ) : (
                  <User className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-800 dark:text-slate-200 truncate">{log.actor.name}</span>
                  <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400">
                    {new Date(log.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </span>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5 font-mono line-clamp-1">
                  {log.details}
                </p>
                <div className="mt-1 flex items-center gap-2 text-[9px] font-mono text-slate-500 dark:text-slate-400">
                  <span className="text-cyan-600 dark:text-cyan-400">{log.action}</span>
                  <span>•</span>
                  <span>{log.verifiedHash}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
