"use client";

import React, { useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { SAMPLE_ABAP_PROJECTS } from "@/lib/sap/abap-samples";
import { AbapAnalysisResult } from "@/lib/types";
import {
  Code2,
  Sparkles,
  ShieldAlert,
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
  RotateCw,
  Copy,
  Check,
  Zap,
  ArrowRight,
  Layers
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
            <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800">
              ABAP Cloud & RAP Refactorer
            </span>
            <span className="text-xs text-slate-400 font-mono">SAP Clean Core Strategy</span>
          </div>
          <h1 className="text-xl lg:text-2xl font-bold tracking-tight text-white mt-1">
            ABAP Refactoring & Clean Core Modernization
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Eliminate direct DB writes, refactor obsolete BAPIs to RAP Business Objects using EML and released C1 APIs.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start">
          <button
            onClick={handleCopyCode}
            className="px-3 py-1.5 rounded-xl bg-surface-200 hover:bg-surface-100 border border-slate-700 text-slate-200 text-xs font-mono flex items-center gap-1.5 transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
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
        <div className="p-4 rounded-2xl glass-panel border border-slate-800/80 md:col-span-1 space-y-2">
          <label className="block text-[10px] font-mono uppercase text-slate-400">
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
            className="w-full bg-[#080b11] border border-slate-700 rounded-xl px-3 py-2 text-xs font-mono text-cyan-300 focus:outline-none"
          >
            {SAMPLE_ABAP_PROJECTS.map((p) => (
              <option key={p.programName} value={p.programName}>
                {p.programName}
              </option>
            ))}
          </select>
          <div className="text-[11px] font-mono text-slate-400">
            Lines of Code: {selectedProject.linesOfCode}
          </div>
        </div>

        {/* Clean Core Readiness Gauge */}
        <div className="p-4 rounded-2xl glass-panel border border-slate-800/80 md:col-span-1">
          <span className="text-[10px] font-mono uppercase text-slate-400">
            Clean Core Readiness Score
          </span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-bold font-mono text-amber-400">
              {selectedProject.cleanCoreReadinessScore}%
            </span>
            <span className="text-xs font-mono text-emerald-400 flex items-center gap-0.5">
              <TrendingUp className="w-3 h-3" /> → 98% with RAP
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1 font-mono">
            Direct DB modifications blocked
          </p>
        </div>

        {/* Cyclomatic Complexity */}
        <div className="p-4 rounded-2xl glass-panel border border-slate-800/80 md:col-span-1">
          <span className="text-[10px] font-mono uppercase text-slate-400">
            Cyclomatic Complexity
          </span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-bold font-mono text-rose-400">
              {selectedProject.cyclomaticComplexity}
            </span>
            <span className="text-xs font-mono text-slate-400">/ High</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1 font-mono">
            Reduced to 6 in ABAP Cloud Class
          </p>
        </div>

        {/* Security & Auth Violations */}
        <div className="p-4 rounded-2xl glass-panel border border-slate-800/80 md:col-span-1">
          <span className="text-[10px] font-mono uppercase text-slate-400">
            Security & Auth Rules
          </span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-bold font-mono text-rose-400">
              {selectedProject.securityVulnerabilities.length} Alerts
            </span>
          </div>
          <p className="text-[11px] text-emerald-400 mt-1 font-mono">
            Auto-remediated via RAP EML
          </p>
        </div>
      </div>

      {/* Side-by-Side Diff Editor */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Legacy ABAP */}
        <div className="p-5 rounded-2xl glass-panel border border-slate-800/80 space-y-3">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-rose-300">
                Legacy ABAP 7.4 / ECC 6.0
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-rose-950 text-rose-400 border border-rose-800">
                NON-COMPLIANT
              </span>
            </div>
            <span className="text-xs font-mono text-slate-500">Read-Only Source</span>
          </div>

          <div className="p-4 rounded-xl bg-[#06080d] border border-slate-900 font-mono text-xs text-rose-300/80 overflow-x-auto max-h-[500px]">
            <pre>{selectedProject.legacyCode}</pre>
          </div>
        </div>

        {/* Right: Modernized ABAP Cloud */}
        <div className="p-5 rounded-2xl glass-panel border border-slate-800/80 space-y-3">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-emerald-300">
                ABAP Cloud / Clean Core (RAP)
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">
                CLEAN CORE CERTIFIED
              </span>
            </div>

            <div className="flex items-center gap-1 p-0.5 rounded-lg bg-surface-200 border border-slate-800">
              <button
                onClick={() => setActiveDiffTab("class")}
                className={`px-2 py-0.5 rounded text-[11px] font-mono ${
                  activeDiffTab === "class"
                    ? "bg-emerald-950 text-emerald-300 font-bold"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                RAP Handler Class
              </button>
              {selectedProject.modernizedRapBehavior && (
                <button
                  onClick={() => setActiveDiffTab("rap")}
                  className={`px-2 py-0.5 rounded text-[11px] font-mono ${
                    activeDiffTab === "rap"
                      ? "bg-emerald-950 text-emerald-300 font-bold"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  Behavior Def
                </button>
              )}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-[#06080d] border border-slate-900 font-mono text-xs text-emerald-300 overflow-x-auto max-h-[500px]">
            <pre>
              {activeDiffTab === "class"
                ? selectedProject.modernizedAbapCloud
                : selectedProject.modernizedRapBehavior}
            </pre>
          </div>
        </div>
      </div>

      {/* Security & Deprecations Breakdown Table */}
      <div className="p-5 rounded-2xl glass-panel border border-slate-800/80 space-y-3">
        <h3 className="text-xs font-mono uppercase text-slate-400">
          Detected Violations & Autonomous Remediation Steps
        </h3>

        <div className="space-y-2">
          {selectedProject.securityVulnerabilities.map((sec, idx) => (
            <div
              key={idx}
              className="p-3 rounded-xl bg-rose-950/20 border border-rose-800/40 flex items-start justify-between text-xs font-mono"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-rose-400" />
                  <span className="font-bold text-rose-300">
                    Line {sec.line}: {sec.ruleId} ({sec.severity} Severity)
                  </span>
                </div>
                <p className="text-slate-300 text-[11px]">{sec.description}</p>
                <div className="text-emerald-400 text-[11px] flex items-center gap-1">
                  <ArrowRight className="w-3 h-3" /> Remediation: {sec.remediation}
                </div>
              </div>
              <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 text-[10px]">
                REMEDIATED
              </span>
            </div>
          ))}

          {selectedProject.deprecatedStatements.map((dep, idx) => (
            <div
              key={idx}
              className="p-3 rounded-xl bg-amber-950/20 border border-amber-800/40 flex items-start justify-between text-xs font-mono"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-400" />
                  <span className="font-bold text-amber-300">
                    Line {dep.line}: Deprecated Syntax `{dep.statement}`
                  </span>
                </div>
                <div className="text-emerald-400 text-[11px] flex items-center gap-1">
                  <ArrowRight className="w-3 h-3" /> Modern Alternative: {dep.modernAlternative}
                </div>
              </div>
              <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 text-[10px]">
                CONVERTED
              </span>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
