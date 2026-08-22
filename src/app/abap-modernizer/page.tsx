"use client";

import React, { useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { SAMPLE_ABAP_PROJECTS } from "@/lib/sap/abap-samples";
import { AbapAnalysisResult } from "@/lib/types";
import {
  Sparkles,
  ShieldAlert,
  AlertTriangle,
  TrendingUp,
  RotateCw,
  Copy,
  Check,
  ArrowRight,
} from "lucide-react";

export default function AbapModernizerPage() {
  const [selectedProject, setSelectedProject] = useState<AbapAnalysisResult>(
    SAMPLE_ABAP_PROJECTS[0]
  );
  const [isModernizing, setIsModernizing] = useState<boolean>(false);
  const [activeDiffTab, setActiveDiffTab] = useState<"class" | "rap">("class");
  const [copied, setCopied] = useState<boolean>(false);

  const handleRunModernization = () => {
    setIsModernizing(true);
    setTimeout(() => {
      setIsModernizing(false);
    }, 1200);
  };

  const handleCopyCode = async () => {
    try {
      const code =
        activeDiffTab === "class"
          ? selectedProject.modernizedAbapCloud
          : selectedProject.modernizedRapBehavior || selectedProject.modernizedAbapCloud;
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(code);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
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
            <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-800 font-semibold">
              ABAP Cloud & RAP Refactorer
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">SAP Clean Core Strategy</span>
          </div>
          <h1 className="text-xl lg:text-2xl font-bold tracking-tight text-slate-900 dark:text-white mt-1">
            ABAP Refactoring & Clean Core Modernization
          </h1>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
            Eliminate direct DB writes, refactor obsolete BAPIs to RAP Business Objects using EML and released C1 APIs.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start">
          <button
            onClick={handleCopyCode}
            className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-surface-200 hover:bg-slate-200 dark:hover:bg-surface-100 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs font-mono flex items-center gap-1.5 transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? "Copied" : "Copy ABAP Cloud"}</span>
          </button>

          <button
            onClick={handleRunModernization}
            disabled={isModernizing}
            className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-black font-bold text-xs shadow-glow-amber flex items-center gap-2 transition-all disabled:opacity-50"
          >
            {isModernizing ? (
              <>
                <RotateCw className="w-3.5 h-3.5 animate-spin" />
                <span>Refactoring AST...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5" />
                <span>Auto-Modernize to RAP</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Program Selector & Telemetry Banner */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Project Selector */}
        <div className="p-4 rounded-2xl glass-panel border border-slate-200 dark:border-slate-800/80 md:col-span-1 space-y-2">
          <label className="block text-[10px] font-mono uppercase text-slate-500 dark:text-slate-400 font-semibold">
            Selected ABAP Program
          </label>
          <select
            value={selectedProject.programName}
            onChange={(e) => {
              const found = SAMPLE_ABAP_PROJECTS.find(
                (p) => p.programName === e.target.value
              );
              if (found) setSelectedProject(found);
            }}
            className="w-full bg-slate-50 dark:bg-[#080b11] border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-xs font-mono text-cyan-700 dark:text-cyan-300 focus:outline-none font-medium"
          >
            {SAMPLE_ABAP_PROJECTS.map((p) => (
              <option key={p.programName} value={p.programName}>
                {p.programName}
              </option>
            ))}
          </select>
          <div className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
            Lines of Code: {selectedProject.linesOfCode}
          </div>
        </div>

        {/* Clean Core Readiness Gauge */}
        <div className="p-4 rounded-2xl glass-panel border border-slate-200 dark:border-slate-800/80 md:col-span-1">
          <span className="text-[10px] font-mono uppercase text-slate-500 dark:text-slate-400 font-semibold">
            Clean Core Readiness Score
          </span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-bold font-mono text-amber-500 dark:text-amber-400">
              {selectedProject.cleanCoreReadinessScore}%
            </span>
            <span className="text-xs font-mono text-emerald-600 dark:text-emerald-400 flex items-center gap-0.5 font-semibold">
              <TrendingUp className="w-3 h-3" /> → 98% with RAP
            </span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 font-mono">
            Direct DB modifications blocked
          </p>
        </div>

        {/* Cyclomatic Complexity */}
        <div className="p-4 rounded-2xl glass-panel border border-slate-200 dark:border-slate-800/80 md:col-span-1">
          <span className="text-[10px] font-mono uppercase text-slate-500 dark:text-slate-400 font-semibold">
            Cyclomatic Complexity
          </span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-bold font-mono text-rose-500 dark:text-rose-400">
              {selectedProject.cyclomaticComplexity}
            </span>
            <span className="text-xs font-mono text-slate-500 dark:text-slate-400">/ High</span>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 font-mono">
            Reduced to 6 in ABAP Cloud Class
          </p>
        </div>

        {/* Security & Auth Violations */}
        <div className="p-4 rounded-2xl glass-panel border border-slate-200 dark:border-slate-800/80 md:col-span-1">
          <span className="text-[10px] font-mono uppercase text-slate-500 dark:text-slate-400 font-semibold">
            Security & Auth Rules
          </span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-bold font-mono text-rose-500 dark:text-rose-400">
              {selectedProject.securityVulnerabilities.length} Alerts
            </span>
          </div>
          <p className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-1 font-mono font-medium">
            Auto-remediated via RAP EML
          </p>
        </div>
      </div>

      {/* Side-by-Side Diff Editor */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Legacy ABAP */}
        <div className="p-5 rounded-2xl glass-panel border border-slate-200 dark:border-slate-800/80 space-y-3">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-rose-600 dark:text-rose-300">
                Legacy ABAP 7.4 / ECC 6.0
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-rose-100 dark:bg-rose-950 text-rose-700 dark:text-rose-400 border border-rose-300 dark:border-rose-800 font-semibold">
                NON-COMPLIANT
              </span>
            </div>
            <span className="text-xs font-mono text-slate-500">Read-Only Source</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 dark:bg-[#06080d] border border-slate-800 dark:border-slate-900 font-mono text-xs text-rose-300 overflow-x-auto max-h-[500px]">
            <pre>{selectedProject.legacyCode}</pre>
          </div>
        </div>

        {/* Right: Modernized ABAP Cloud */}
        <div className="p-5 rounded-2xl glass-panel border border-slate-200 dark:border-slate-800/80 space-y-3">
          <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-300">
                ABAP Cloud / Clean Core (RAP)
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 border border-emerald-300 dark:border-emerald-800 font-semibold">
                CLEAN CORE CERTIFIED
              </span>
            </div>

            <div className="flex items-center gap-1 p-0.5 rounded-lg bg-slate-100 dark:bg-surface-200 border border-slate-200 dark:border-slate-800">
              <button
                onClick={() => setActiveDiffTab("class")}
                className={`px-2 py-0.5 rounded text-[11px] font-mono transition-colors ${
                  activeDiffTab === "class"
                    ? "bg-emerald-600 dark:bg-emerald-950 text-white dark:text-emerald-300 font-bold"
                    : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                }`}
              >
                RAP Handler Class
              </button>
              {selectedProject.modernizedRapBehavior && (
                <button
                  onClick={() => setActiveDiffTab("rap")}
                  className={`px-2 py-0.5 rounded text-[11px] font-mono transition-colors ${
                    activeDiffTab === "rap"
                      ? "bg-emerald-600 dark:bg-emerald-950 text-white dark:text-emerald-300 font-bold"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  Behavior Def
                </button>
              )}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 dark:bg-[#06080d] border border-slate-800 dark:border-slate-900 font-mono text-xs text-emerald-300 overflow-x-auto max-h-[500px]">
            <pre>
              {activeDiffTab === "class"
                ? selectedProject.modernizedAbapCloud
                : selectedProject.modernizedRapBehavior}
            </pre>
          </div>
        </div>
      </div>

      {/* Security & Deprecations Breakdown Table */}
      <div className="p-5 rounded-2xl glass-panel border border-slate-200 dark:border-slate-800/80 space-y-3">
        <h3 className="text-xs font-mono uppercase text-slate-500 dark:text-slate-400 font-semibold">
          Detected Violations & Autonomous Remediation Steps
        </h3>

        <div className="space-y-2">
          {selectedProject.securityVulnerabilities.map((sec, idx) => (
            <div
              key={idx}
              className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-800/40 flex items-start justify-between text-xs font-mono shadow-sm"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                  <span className="font-bold text-rose-700 dark:text-rose-300">
                    Line {sec.line}: {sec.ruleId} ({sec.severity} Severity)
                  </span>
                </div>
                <p className="text-slate-700 dark:text-slate-300 text-[11px]">{sec.description}</p>
                <div className="text-emerald-700 dark:text-emerald-400 text-[11px] flex items-center gap-1 font-semibold">
                  <ArrowRight className="w-3 h-3" /> Remediation: {sec.remediation}
                </div>
              </div>
              <span className="px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 text-[10px] font-semibold">
                REMEDIATED
              </span>
            </div>
          ))}

          {selectedProject.deprecatedStatements.map((dep, idx) => (
            <div
              key={idx}
              className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/40 flex items-start justify-between text-xs font-mono shadow-sm"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                  <span className="font-bold text-amber-800 dark:text-amber-300">
                    Line {dep.line}: Deprecated Syntax `{dep.statement}`
                  </span>
                </div>
                <div className="text-emerald-700 dark:text-emerald-400 text-[11px] flex items-center gap-1 font-semibold">
                  <ArrowRight className="w-3 h-3" /> Modern Alternative: {dep.modernAlternative}
                </div>
              </div>
              <span className="px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 text-[10px] font-semibold">
                CONVERTED
              </span>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
