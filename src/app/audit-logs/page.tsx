"use client";

import React, { useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { useNexusStore } from "@/lib/store/useNexusStore";
import {
  Search,
  Download,
  Bot,
  User,
  Lock,
  Copy,
  Check
} from "lucide-react";

export default function AuditLogsPage() {
  const { auditLogs } = useNexusStore();
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [actorFilter, setActorFilter] = useState<string>("all");
  const [severityFilter, setSeverityFilter] = useState<string>("all");
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const filteredLogs = auditLogs.filter((log) => {
    const matchesQuery =
      log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.target.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.details.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.actor.name.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesActor =
      actorFilter === "all" || log.actor.type === actorFilter;

    const matchesSeverity =
      severityFilter === "all" || log.severity === severityFilter;

    return matchesQuery && matchesActor && matchesSeverity;
  });

  const handleExportCsv = () => {
    const headers = "ID,Timestamp,Actor Type,Actor Name,Action,Target,Severity,Details,Verified Hash\n";
    const rows = filteredLogs
      .map(
        (l) =>
          `"${l.id}","${l.timestamp}","${l.actor.type}","${l.actor.name}","${l.action}","${l.target}","${l.severity}","${l.details.replace(/"/g, '""')}","${l.verifiedHash}"`
      )
      .join("\n");
    const blob = new Blob([headers + rows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `nexus_agent_audit_trail_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCopyHash = async (hash: string, id: string) => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(hash);
      }
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch {
      // Ignore clipboard rejection
    }
  };

  return (
    <AppShell>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 border border-blue-300 dark:border-blue-800 font-semibold">
              Enterprise Compliance & SOC2
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">Immutable Cryptographic Trail</span>
          </div>
          <h1 className="text-xl lg:text-2xl font-bold tracking-tight text-slate-900 dark:text-white mt-1">
            Audit & Compliance Logs
          </h1>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
            Every autonomous agent decision, SAP OData mutation, human authorization, and transport release is recorded with SHA-256 verification.
          </p>
        </div>

        <button
          onClick={handleExportCsv}
          className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-surface-200 hover:bg-slate-200 dark:hover:bg-surface-100 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs font-mono flex items-center gap-2 transition-colors self-start"
        >
          <Download className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
          <span>Export Audit Trail (CSV)</span>
        </button>
      </div>

      {/* Filter Toolbar */}
      <div className="p-4 rounded-2xl glass-panel border border-slate-200 dark:border-slate-800/80 flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Search */}
        <div className="w-full md:w-80 flex items-center bg-slate-50 dark:bg-[#080b11] border border-slate-300 dark:border-slate-800 rounded-xl px-3 py-2 text-xs font-mono text-slate-900 dark:text-slate-200">
          <Search className="w-3.5 h-3.5 text-slate-400 mr-2" />
          <input
            type="text"
            placeholder="Search action, actor, or TRK number..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-transparent text-slate-900 dark:text-slate-200 focus:outline-none"
          />
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 w-full md:w-auto overflow-x-auto">
          {/* Actor filter */}
          <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-100 dark:bg-surface-200 border border-slate-200 dark:border-slate-800 text-xs font-mono">
            <span className="text-slate-500 px-2">Actor:</span>
            {["all", "agent", "user"].map((a) => (
              <button
                key={a}
                onClick={() => setActorFilter(a)}
                className={`px-2.5 py-0.5 rounded uppercase font-semibold transition-colors ${
                  actorFilter === a
                    ? "bg-cyan-500/20 text-cyan-800 dark:text-cyan-300 font-bold"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                {a}
              </button>
            ))}
          </div>

          {/* Severity filter */}
          <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-100 dark:bg-surface-200 border border-slate-200 dark:border-slate-800 text-xs font-mono">
            <span className="text-slate-500 px-2">Severity:</span>
            {["all", "info", "warning", "security"].map((s) => (
              <button
                key={s}
                onClick={() => setSeverityFilter(s)}
                className={`px-2.5 py-0.5 rounded uppercase font-semibold transition-colors ${
                  severityFilter === s
                    ? "bg-cyan-500/20 text-cyan-800 dark:text-cyan-300 font-bold"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Audit Table */}
      <div className="p-5 rounded-2xl glass-panel border border-slate-200 dark:border-slate-800/80 overflow-x-auto shadow-sm">
        <table className="w-full text-left text-xs font-mono">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-500 text-[10px] uppercase">
              <th className="pb-3">Timestamp</th>
              <th className="pb-3">Actor</th>
              <th className="pb-3">Action Event</th>
              <th className="pb-3">Target Asset</th>
              <th className="pb-3">Severity</th>
              <th className="pb-3">Cryptographic Signature</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 dark:divide-slate-800/60">
            {filteredLogs.map((log) => {
              const isSec = log.severity === "security";
              const isWarn = log.severity === "warning";

              return (
                <tr key={log.id} className="hover:bg-slate-50 dark:hover:bg-surface-200/40 transition-colors">
                  {/* Timestamp */}
                  <td className="py-3 text-slate-500 dark:text-slate-400 whitespace-nowrap">
                    {new Date(log.timestamp).toLocaleString()}
                  </td>

                  {/* Actor */}
                  <td className="py-3">
                    <div className="flex items-center gap-2">
                      <div className="p-1 rounded bg-slate-100 dark:bg-surface-300 text-slate-600 dark:text-slate-400">
                        {log.actor.type === "agent" ? (
                          <Bot className="w-3 h-3 text-cyan-600 dark:text-cyan-400" />
                        ) : (
                          <User className="w-3 h-3 text-indigo-600 dark:text-indigo-400" />
                        )}
                      </div>
                      <span className="font-bold text-slate-800 dark:text-slate-200">{log.actor.name}</span>
                    </div>
                  </td>

                  {/* Action */}
                  <td className="py-3">
                    <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-surface-300 text-cyan-800 dark:text-cyan-300 border border-slate-200 dark:border-slate-700 font-semibold">
                      {log.action}
                    </span>
                    <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1 line-clamp-1">
                      {log.details}
                    </p>
                  </td>

                  {/* Target */}
                  <td className="py-3 text-slate-700 dark:text-slate-300 font-semibold">{log.target}</td>

                  {/* Severity */}
                  <td className="py-3">
                    <span
                      className={`text-[9px] uppercase font-bold px-2 py-0.5 rounded ${
                        isSec
                          ? "bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800"
                          : isWarn
                          ? "bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-300 border border-rose-300 dark:border-rose-800"
                          : "bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-400 border border-blue-300 dark:border-blue-900"
                      }`}
                    >
                      {log.severity}
                    </span>
                  </td>

                  {/* Verified Hash */}
                  <td className="py-3 text-slate-500 whitespace-nowrap">
                    <button
                      onClick={() => handleCopyHash(log.verifiedHash, log.id)}
                      className="flex items-center gap-1 hover:text-cyan-600 dark:hover:text-cyan-300 transition-colors"
                      title="Click to copy hash"
                    >
                      <Lock className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                      <span>{log.verifiedHash}</span>
                      {copiedId === log.id ? (
                        <Check className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                      ) : (
                        <Copy className="w-3 h-3 text-slate-400" />
                      )}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {filteredLogs.length === 0 && (
          <div className="py-8 text-center text-slate-500 text-xs font-mono">
            No audit records matching filter criteria.
          </div>
        )}
      </div>
    </AppShell>
  );
}
