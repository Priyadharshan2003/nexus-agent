"use client";

import React, { useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { CAP_STARTER_PROJECTS } from "@/lib/sap/cap-templates";
import {
  Boxes,
  Sparkles,
  FileCode,
  Layers,
  Copy,
  Check,
  Download,
  Play,
  RotateCw,
  FolderTree,
  Terminal,
  Database
} from "lucide-react";

export default function CapGeneratorPage() {
  const [selectedProjectId, setSelectedProjectId] = useState<string>("leave_management");
  const [activeFileIndex, setActiveFileIndex] = useState<number>(0);
  const [prompt, setPrompt] = useState<string>(
    "Build an enterprise employee leave request microservice with multi-level manager approvals, audit log composition, and SAP HANA Cloud persistence."
  );
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const project = CAP_STARTER_PROJECTS[selectedProjectId] || CAP_STARTER_PROJECTS.leave_management;
  const currentFile = project.files[activeFileIndex] || project.files[0];

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
    }, 1000);
  };

  const handleCopy = async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(currentFile.content);
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
            <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800">
              SAP BTP CAP Generator
            </span>
            <span className="text-xs text-slate-400 font-mono">@sap/cds 8.x • OData V4</span>
          </div>
          <h1 className="text-xl lg:text-2xl font-bold tracking-tight text-white mt-1">
            CAP Service Generator Studio
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Synthesize full-stack SAP Cloud Application Programming services, CDS schemas, Node.js handlers, and MTA deployment descriptors.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start">
          <button
            onClick={handleCopy}
            className="px-3 py-1.5 rounded-xl bg-surface-200 hover:bg-surface-100 border border-slate-700 text-slate-200 text-xs font-mono flex items-center gap-1.5 transition-colors"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? "Copied" : "Copy Active File"}</span>
          </button>

          <button
            onClick={() => alert("Packaging full CAP microservice ZIP bundle for download...")}
            className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white text-xs font-semibold shadow-glow-emerald flex items-center gap-1.5 transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CAP Project</span>
          </button>
        </div>
      </div>

      {/* Interactive Prompt Generator Bar */}
      <div className="p-4 rounded-2xl glass-panel border border-slate-800/80 space-y-3">
        <label className="block text-xs font-mono uppercase text-slate-400">
          Autonomous CAP Prompt & Template Selection
        </label>

        <div className="flex gap-2">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="flex-1 bg-[#080b11] border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-200 font-mono focus:border-emerald-500/60 focus:outline-none"
            placeholder="Describe your CAP microservice requirement..."
          />
          <button
            onClick={handleGenerate}
            disabled={isGenerating}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-bold text-xs shadow-glow-emerald transition-all flex items-center gap-2 disabled:opacity-50"
          >
            {isGenerating ? (
              <>
                <RotateCw className="w-3.5 h-3.5 animate-spin" />
                <span>Synthesizing CDS...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5" />
                <span>Synthesize CAP Service</span>
              </>
            )}
          </button>
        </div>

        {/* Quick presets */}
        <div className="flex items-center gap-2 pt-1 text-xs font-mono">
          <span className="text-slate-500">Presets:</span>
          <button
            onClick={() => {
              setSelectedProjectId("leave_management");
              setActiveFileIndex(0);
            }}
            className={`px-2.5 py-1 rounded-lg border text-[11px] transition-colors ${
              selectedProjectId === "leave_management"
                ? "bg-emerald-950 text-emerald-300 border-emerald-800"
                : "bg-surface-200 text-slate-400 border-slate-800 hover:text-white"
            }`}
          >
            Employee Leave Service
          </button>
          <button
            onClick={() => {
              setSelectedProjectId("sales_fasttrack");
              setActiveFileIndex(0);
            }}
            className={`px-2.5 py-1 rounded-lg border text-[11px] transition-colors ${
              selectedProjectId === "sales_fasttrack"
                ? "bg-emerald-950 text-emerald-300 border-emerald-800"
                : "bg-surface-200 text-slate-400 border-slate-800 hover:text-white"
            }`}
          >
            Sales FastTrack API
          </button>
        </div>
      </div>

      {/* Main Studio Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left File Tree & Schema Visualizer (4 Cols) */}
        <div className="lg:col-span-4 space-y-4">
          {/* File Tree */}
          <div className="p-4 rounded-2xl glass-panel border border-slate-800/80 space-y-2">
            <h3 className="text-xs font-mono uppercase text-slate-400 flex items-center gap-1.5">
              <FolderTree className="w-3.5 h-3.5 text-emerald-400" />
              <span>Project Explorer ({project.files.length} Files)</span>
            </h3>

            <div className="space-y-1">
              {project.files.map((file, idx) => {
                const isSelected = activeFileIndex === idx;
                return (
                  <button
                    key={file.path}
                    onClick={() => setActiveFileIndex(idx)}
                    className={`w-full p-2.5 rounded-xl border text-left text-xs font-mono transition-all flex items-center justify-between ${
                      isSelected
                        ? "bg-emerald-950/40 border-emerald-500/60 text-emerald-300 font-bold"
                        : "bg-surface-200/50 hover:bg-surface-100 border-slate-800/80 text-slate-300"
                    }`}
                  >
                    <div className="flex items-center gap-2 truncate">
                      <FileCode className="w-3.5 h-3.5 text-slate-400" />
                      <span className="truncate">{file.path}</span>
                    </div>
                    <span className="text-[10px] uppercase text-slate-500">{file.language}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Database Entities Card */}
          <div className="p-4 rounded-2xl glass-panel border border-slate-800/80 space-y-2.5">
            <h3 className="text-xs font-mono uppercase text-slate-400 flex items-center gap-1.5">
              <Database className="w-3.5 h-3.5 text-emerald-400" />
              <span>Database Architecture</span>
            </h3>

            <div className="p-2.5 rounded-lg bg-surface-200/60 border border-slate-800 text-xs font-mono">
              <span className="text-slate-400">Target Engine:</span>{" "}
              <span className="text-emerald-400 font-bold">{project.database}</span>
            </div>

            <div className="space-y-2">
              {project.entities.map((entity) => (
                <div key={entity.name} className="p-3 rounded-xl bg-[#080b11] border border-slate-800">
                  <div className="flex items-center justify-between text-xs font-mono font-bold text-slate-200">
                    <span>{entity.name}</span>
                    <span className="text-[10px] text-slate-500 font-normal">
                      {entity.elements.length} fields
                    </span>
                  </div>
                  <div className="mt-2 space-y-1">
                    {entity.elements.slice(0, 4).map((el) => (
                      <div
                        key={el.name}
                        className="flex items-center justify-between text-[11px] font-mono text-slate-400"
                      >
                        <span className={el.key ? "text-amber-400 font-bold" : ""}>
                          {el.key ? "🔑 " : ""}{el.name}
                        </span>
                        <span className="text-slate-500">{el.type}</span>
                      </div>
                    ))}
                    {entity.elements.length > 4 && (
                      <div className="text-[10px] text-slate-600 font-mono italic">
                        +{entity.elements.length - 4} more elements
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Code Editor View (8 Cols) */}
        <div className="lg:col-span-8">
          <div className="p-5 rounded-2xl glass-panel border border-slate-800/80 space-y-3">
            {/* Editor Top Bar */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-slate-200">
                  {currentFile.path}
                </span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">
                  {currentFile.language.toUpperCase()}
                </span>
              </div>
              <span className="text-xs font-mono text-slate-500">
                {currentFile.content.split("\n").length} lines
              </span>
            </div>

            {/* Code Body */}
            <div className="p-4 rounded-xl bg-[#06080d] border border-slate-900 font-mono text-xs text-emerald-300 overflow-x-auto max-h-[520px]">
              <pre>{currentFile.content}</pre>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
