"use client";

import React from "react";
import Link from "next/link";
import {
  Search,
  Command,
  Plus,
  Bell,
  Sun,
  Moon
} from "lucide-react";
import { useNexusStore } from "@/lib/store/useNexusStore";

interface HeaderProps {
  onOpenCommand: () => void;
  onNewWorkflow: () => void;
  pendingApprovalsCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenCommand,
  onNewWorkflow,
  pendingApprovalsCount
}) => {
  const { theme, toggleTheme } = useNexusStore();

  return (
    <header className="h-16 border-b border-[#1a2236] dark:border-[#1a2236] light:border-slate-200 bg-[#08101a] dark:bg-[#08101a] light:bg-white/95 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-20 transition-colors">
      {/* Center Section: Wide Search Bar (~700px) */}
      <div className="flex-1 max-w-[700px]">
        <button
          onClick={onOpenCommand}
          className="w-full flex items-center justify-between px-4 py-2 rounded-xl bg-[#0e1726]/80 dark:bg-[#0e1726]/80 light:bg-slate-100/90 border border-[#1e2a42] dark:border-[#1e2a42] light:border-slate-200 hover:border-cyan-500/40 light:hover:border-blue-400 text-slate-400 light:text-slate-500 hover:text-slate-200 light:hover:text-slate-800 text-xs font-mono transition-all shadow-sm group"
        >
          <div className="flex items-center gap-2.5 min-w-0">
            <Search className="w-4 h-4 text-slate-400 group-hover:text-cyan-400 light:group-hover:text-blue-600 transition-colors flex-shrink-0" />
            <span className="truncate text-xs">Search SAP systems, ABAP objects, CAP services...</span>
          </div>
          <div className="flex items-center gap-1 text-[10px] text-slate-400 dark:text-slate-400 light:text-slate-600 bg-[#162032] dark:bg-[#162032] light:bg-slate-200 px-2 py-0.5 rounded-lg border border-slate-700/50 light:border-slate-300 font-mono flex-shrink-0">
            <Command className="w-3 h-3" />
            <span>K</span>
          </div>
        </button>
      </div>

      {/* Right Section: Status Order (Agents 8, RAG Active, Notifications, Theme, + New Run) */}
      <div className="flex items-center gap-4">
        {/* Status Chips: 🟢 Agents 8 & 🟢 RAG Active */}
        <div className="hidden md:flex items-center gap-3 text-xs font-mono text-slate-300 dark:text-slate-300 light:text-slate-600">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-950/40 dark:bg-emerald-950/40 light:bg-emerald-50 border border-emerald-800/40 light:border-emerald-200 text-emerald-400 dark:text-emerald-400 light:text-emerald-700">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
            <span className="font-semibold text-[11px]">Agents 8</span>
          </div>

          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-cyan-950/40 dark:bg-cyan-950/40 light:bg-blue-50 border border-cyan-800/40 light:border-blue-200 text-cyan-400 dark:text-cyan-400 light:text-blue-700">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 light:bg-blue-500"></span>
            <span className="font-semibold text-[11px]">RAG Active</span>
          </div>
        </div>

        {/* Notifications / Pending Badge */}
        <Link
          href="/approvals"
          className="relative p-2 rounded-xl text-slate-400 dark:text-slate-400 light:text-slate-600 hover:text-slate-200 light:hover:text-slate-900 hover:bg-slate-800/60 light:hover:bg-slate-100 transition-all"
          title={`${pendingApprovalsCount} Pending Approvals`}
        >
          <Bell className="w-4 h-4" />
          {pendingApprovalsCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 h-4 min-w-4 px-1 rounded-full bg-amber-500 text-black text-[10px] font-bold flex items-center justify-center animate-pulse">
              {pendingApprovalsCount}
            </span>
          )}
        </Link>

        {/* Theme Toggle (Icon Only) */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-xl text-slate-400 dark:text-slate-400 light:text-slate-600 hover:text-amber-400 dark:hover:text-amber-300 light:hover:text-blue-600 hover:bg-slate-800/60 light:hover:bg-slate-100 transition-all"
          title={`Switch to ${theme === "dark" ? "Light" : "Dark"} Mode`}
        >
          {theme === "dark" ? (
            <Sun className="w-4 h-4 text-amber-400" />
          ) : (
            <Moon className="w-4 h-4 text-blue-600" />
          )}
        </button>

        {/* Primary Single CTA: + New Run */}
        <button
          onClick={onNewWorkflow}
          className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-xs shadow-glow transition-all active:scale-95"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>New Run</span>
        </button>
      </div>
    </header>
  );
};
