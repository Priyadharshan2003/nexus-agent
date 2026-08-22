"use client";

import React, { useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { useNexusStore } from "@/lib/store/useNexusStore";
import {
  CheckCircle2,
  RotateCw
} from "lucide-react";

export default function ApprovalsPage() {
  const { approvals, decideApproval } = useNexusStore();
  const [selectedApprovalId, setSelectedApprovalId] = useState<string>(
    approvals[0]?.id || ""
  );
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [commentInput, setCommentInput] = useState<string>("");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const selectedApproval =
    approvals.find((a) => a.id === selectedApprovalId) || approvals[0];

  const filteredApprovals = approvals.filter((a) => {
    if (filterStatus === "all") return true;
    return a.status === filterStatus;
  });

  const handleDecision = (decision: "approved" | "rejected" | "changes_requested") => {
    if (!selectedApproval) return;
    setIsProcessing(true);

    setTimeout(() => {
      decideApproval(selectedApproval.id, decision, commentInput || `Decision [${decision}] confirmed.`);
      setIsProcessing(false);
      setCommentInput("");
    }, 600);
  };

  return (
    <AppShell>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800 font-semibold">
              Human-in-the-Loop Governance
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
              Zero-Trust Deployment & Transport Gates
            </span>
          </div>
          <h1 className="text-xl lg:text-2xl font-bold tracking-tight text-slate-900 dark:text-white mt-1">
            Human Approval Center
          </h1>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
            Authorize high-impact SAP CTS+ transport releases, production BTP microservice deployments, and role assignments.
          </p>
        </div>

        {/* Status Filters */}
        <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-100 dark:bg-surface-200 border border-slate-200 dark:border-slate-800 self-start">
          {["all", "pending", "approved", "rejected"].map((status) => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              className={`px-3 py-1 rounded-lg text-xs font-mono uppercase transition-all ${
                filterStatus === status
                  ? "bg-amber-500/20 text-amber-800 dark:text-amber-300 border border-amber-400 dark:border-amber-500/40 font-bold"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Approvals List (5 Cols) */}
        <div className="lg:col-span-5 space-y-3">
          <div className="text-xs font-mono uppercase text-slate-500 dark:text-slate-400 px-1 font-semibold">
            Approval Queue ({filteredApprovals.length})
          </div>

          <div className="space-y-3">
            {filteredApprovals.map((appr) => {
              const isSelected = selectedApproval?.id === appr.id;
              const isPending = appr.status === "pending";
              const isApproved = appr.status === "approved";

              return (
                <button
                  key={appr.id}
                  onClick={() => {
                    setSelectedApprovalId(appr.id);
                    setCommentInput("");
                  }}
                  className={`w-full p-4 rounded-2xl border text-left transition-all relative flex flex-col justify-between ${
                    isSelected
                      ? "bg-amber-50 dark:bg-amber-950/20 border-amber-500 ring-1 ring-amber-500/40 shadow-sm"
                      : "bg-white dark:bg-surface-200/60 hover:bg-slate-50 dark:hover:bg-surface-100/90 border-slate-200 dark:border-slate-800 shadow-sm"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-slate-100 dark:bg-surface-300 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 font-semibold">
                        {appr.actionType}
                      </span>
                      <span
                        className={`text-[9px] font-mono font-bold uppercase px-2 py-0.5 rounded ${
                          isPending
                            ? "bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800 animate-pulse"
                            : isApproved
                            ? "bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-800"
                            : "bg-rose-100 dark:bg-rose-950 text-rose-800 dark:text-rose-400 border border-rose-300 dark:border-rose-800"
                        }`}
                      >
                        {appr.status}
                      </span>
                    </div>

                    <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 mt-2 line-clamp-2">
                      {appr.summary}
                    </h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 font-mono mt-1">
                      System: {appr.targetSystem} {appr.transportRequestNumber ? `• ${appr.transportRequestNumber}` : ""}
                    </p>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-slate-200 dark:border-slate-800/80 flex items-center justify-between text-[10px] font-mono text-slate-500 dark:text-slate-400">
                    <span>Requested by Security Agent</span>
                    <span className="text-amber-600 dark:text-amber-400 font-bold">{appr.riskLevel} Risk</span>
                  </div>
                </button>
              );
            })}

            {filteredApprovals.length === 0 && (
              <div className="p-8 rounded-2xl glass-panel text-center text-slate-500 text-xs font-mono">
                No approvals matching filter.
              </div>
            )}
          </div>
        </div>

        {/* Selected Approval Details & Action Terminal (7 Cols) */}
        <div className="lg:col-span-7">
          {selectedApproval ? (
            <div className="p-5 rounded-2xl glass-panel border border-slate-200 dark:border-slate-800/80 space-y-5 sticky top-20">
              {/* Header */}
              <div className="flex items-start justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800 font-bold">
                      {selectedApproval.actionType}
                    </span>
                    <span className="text-xs font-mono text-slate-500 dark:text-slate-400">
                      ID: {selectedApproval.id}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white mt-1.5">
                    {selectedApproval.summary}
                  </h3>
                </div>

                <span className="text-xs font-mono font-bold uppercase text-amber-700 dark:text-amber-400 bg-amber-100 dark:bg-amber-950/80 px-2.5 py-1 rounded border border-amber-300 dark:border-amber-800">
                  {selectedApproval.riskLevel} Risk
                </span>
              </div>

              {/* Impact Breakdown */}
              <div>
                <label className="block text-[11px] font-mono uppercase text-slate-500 dark:text-slate-400 mb-2 font-semibold">
                  System Impact & Changeset Summary
                </label>
                <div className="space-y-2">
                  {selectedApproval.impactDetails.map((detail, idx) => (
                    <div
                      key={idx}
                      className="p-2.5 rounded-xl bg-slate-50 dark:bg-surface-200/70 border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 flex items-center gap-2.5"
                    >
                      <span className="h-1.5 w-1.5 rounded-full bg-cyan-500 flex-shrink-0"></span>
                      <span>{detail}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Target Details */}
              <div className="grid grid-cols-2 gap-3 p-3.5 rounded-xl bg-slate-50 dark:bg-surface-200/50 border border-slate-200 dark:border-slate-800 text-xs font-mono">
                <div>
                  <span className="text-slate-500">Target Environment:</span>
                  <p className="text-slate-800 dark:text-slate-200 font-semibold mt-0.5">
                    {selectedApproval.targetSystem}
                  </p>
                </div>
                <div>
                  <span className="text-slate-500">CTS+ Transport Request:</span>
                  <p className="text-cyan-700 dark:text-cyan-400 font-semibold mt-0.5">
                    {selectedApproval.transportRequestNumber || "BTP-KYMA-PROD"}
                  </p>
                </div>
              </div>

              {/* Human Decision Form */}
              {selectedApproval.status === "pending" ? (
                <div className="space-y-3 pt-2 border-t border-slate-200 dark:border-slate-800">
                  <label className="block text-[11px] font-mono uppercase text-slate-500 dark:text-slate-400 font-semibold">
                    Reviewer Audit Sign-off Comment
                  </label>
                  <textarea
                    rows={2}
                    value={commentInput}
                    onChange={(e) => setCommentInput(e.target.value)}
                    placeholder="Enter approval rationale or change requirements (logged to immutable audit trail)..."
                    className="w-full bg-slate-50 dark:bg-[#080b11] border border-slate-300 dark:border-slate-800 rounded-xl p-3 text-xs text-slate-900 dark:text-slate-200 font-mono focus:border-amber-500 focus:outline-none resize-none"
                  />

                  <div className="flex items-center justify-end gap-2.5 pt-1">
                    <button
                      onClick={() => handleDecision("rejected")}
                      disabled={isProcessing}
                      className="px-4 py-2 rounded-xl bg-rose-50 dark:bg-rose-500/10 hover:bg-rose-100 dark:hover:bg-rose-500/20 border border-rose-300 dark:border-rose-500/30 text-rose-700 dark:text-rose-400 font-semibold text-xs transition-all disabled:opacity-50"
                    >
                      Reject
                    </button>
                    <button
                      onClick={() => handleDecision("changes_requested")}
                      disabled={isProcessing}
                      className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-surface-200 hover:bg-slate-200 dark:hover:bg-surface-100 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-semibold text-xs transition-all disabled:opacity-50"
                    >
                      Request Changes
                    </button>
                    <button
                      onClick={() => handleDecision("approved")}
                      disabled={isProcessing}
                      className="px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold text-xs shadow-glow-emerald transition-all active:scale-95 flex items-center gap-2 disabled:opacity-50"
                    >
                      {isProcessing ? (
                        <>
                          <RotateCw className="w-3.5 h-3.5 animate-spin" />
                          <span>Signing Release...</span>
                        </>
                      ) : (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Approve & Release to BTP</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-surface-200/50 border border-slate-200 dark:border-slate-800 space-y-1.5 text-xs font-mono">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                    <span className="text-slate-800 dark:text-slate-200 font-bold">
                      Decided by {selectedApproval.decidedBy} at {new Date(selectedApproval.decidedAt || "").toLocaleString()}
                    </span>
                  </div>
                  <p className="text-slate-600 dark:text-slate-400 pl-6">
                    Comment: {selectedApproval.reviewComment}
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="p-8 rounded-2xl glass-panel text-center text-slate-500 text-xs">
              Select an item on the left to review and sign off.
            </div>
          )}
        </div>
      </div>
    </AppShell>
  );
}
