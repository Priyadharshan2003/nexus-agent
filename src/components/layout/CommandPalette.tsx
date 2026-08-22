"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  Bot,
  GitFork,
  Code2,
  Boxes,
  Database,
  Brain,
  ShieldCheck,
  Zap,
  ArrowRight,
  FileText,
  X
} from "lucide-react";

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectWorkflowPreset: (templateId: string) => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen,
  onClose,
  onSelectWorkflowPreset
}) => {
  const [query, setQuery] = useState("");
  const router = useRouter();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        onClose();
      }
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const quickActions = [
    {
      title: "Run ECC 6.0 to S/4HANA Modernization Pipeline",
      category: "Workflow",
      icon: GitFork,
      action: () => {
        onSelectWorkflowPreset("wf_ecc_to_s4_migration");
        onClose();
        router.push("/workflows");
      }
    },
    {
      title: "Generate CAP Employee Leave Service (CDS + Handlers)",
      category: "CAP Studio",
      icon: Boxes,
      action: () => {
        onClose();
        router.push("/cap-generator");
      }
    },
    {
      title: "Scan & Modernize Legacy ABAP Report Z_ECC_CUSTOM_SO_POSTING",
      category: "ABAP",
      icon: Code2,
      action: () => {
        onClose();
        router.push("/abap-modernizer");
      }
    },
    {
      title: "Explore SAP S/4HANA OData V4 Sales Order Metadata",
      category: "OData",
      icon: Database,
      action: () => {
        onClose();
        router.push("/odata");
      }
    },
    {
      title: "Query SAP Notes RAG Vector Hub (Clean Core Guidelines)",
      category: "Knowledge",
      icon: Brain,
      action: () => {
        onClose();
        router.push("/knowledge");
      }
    },
    {
      title: "Inspect Pending Transport Release Approvals",
      category: "Governance",
      icon: ShieldCheck,
      action: () => {
        onClose();
        router.push("/approvals");
      }
    }
  ];

  const filtered = quickActions.filter(
    (item) =>
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md flex items-start justify-center pt-24 px-4 animate-in fade-in duration-150">
      <div className="w-full max-w-2xl bg-[#0e131f] border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        {/* Search input header */}
        <div className="p-4 border-b border-slate-800 flex items-center gap-3">
          <Search className="w-5 h-5 text-cyan-400" />
          <input
            type="text"
            placeholder="Type a command, search SAP Notes, or launch multi-agent workflow..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="flex-1 bg-transparent text-slate-100 placeholder-slate-500 text-sm focus:outline-none"
          />
          <button
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-lg transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-2 space-y-1">
          <div className="px-3 py-1.5 text-[10px] uppercase font-mono tracking-wider text-slate-500">
            Recommended Enterprise Actions
          </div>
          {filtered.map((item, idx) => {
            const Icon = item.icon;
            return (
              <button
                key={idx}
                onClick={item.action}
                className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl hover:bg-cyan-500/10 hover:border-cyan-500/30 border border-transparent text-left transition-all group"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-surface-200 group-hover:bg-cyan-950/60 text-slate-400 group-hover:text-cyan-400 transition-colors">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-200 group-hover:text-cyan-300">
                      {item.title}
                    </p>
                    <span className="text-[10px] font-mono text-slate-500">{item.category}</span>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-600 group-hover:text-cyan-400 transition-colors" />
              </button>
            );
          })}
          {filtered.length === 0 && (
            <div className="py-8 text-center text-slate-500 text-xs">
              No direct actions matching "{query}". Try searching "ECC", "CAP", or "ABAP".
            </div>
          )}
        </div>

        {/* Keyboard shortcut footer */}
        <div className="p-3 bg-[#0a0d14] border-t border-slate-800 flex items-center justify-between text-[11px] font-mono text-slate-500">
          <div className="flex items-center gap-2">
            <span>Press <kbd className="px-1 py-0.5 rounded bg-slate-800 text-slate-300">ESC</kbd> to exit</span>
          </div>
          <div className="flex items-center gap-1 text-cyan-400">
            <Zap className="w-3 h-3" />
            <span>SAP Autonomous Multi-Agent Engine</span>
          </div>
        </div>
      </div>
    </div>
  );
};
