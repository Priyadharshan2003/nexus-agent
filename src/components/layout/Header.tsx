"use client";

import React from "react";
import Link from "next/link";
import {
  Search,
  Command,
  Plus,
  Bell,
  Sun,
  Moon,
  PanelLeftClose,
  PanelLeft,
  Menu
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
  const {
    theme,
    toggleTheme,
    isSidebarCollapsed,
    toggleSidebar,
    toggleMobileSidebar
  } = useNexusStore();

  return (
    <header className="h-16 border-b border-slate-200 dark:border-[#1a2236] bg-white/95 dark:bg-[#08101a] backdrop-blur-md px-4 sm:px-6 flex items-center justify-between sticky top-0 z-20 transition-colors">
      {/* Left Section: Sidebar Toggle Button + Wide Search Bar */}
      <div className="flex items-center gap-3 flex-1 max-w-[760px] mr-4">
        {/* Desktop Sidebar Toggle Button */}
        <button
          onClick={toggleSidebar}
          className="hidden lg:flex items-center justify-center p-2 rounded-xl text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-cyan-400 hover:bg-slate-100 dark:hover:bg-slate-800/80 border border-slate-200 dark:border-slate-800 transition-all duration-200 group relative flex-shrink-0"
          title={`Toggle Sidebar (Ctrl+B)`}
          aria-label="Toggle Sidebar"
        >
          {isSidebarCollapsed ? (
            <PanelLeft className="w-4 h-4 transition-transform duration-200 group-hover:scale-110" />
          ) : (
            <PanelLeftClose className="w-4 h-4 transition-transform duration-200 group-hover:scale-110" />
          )}
        </button>

        {/* Mobile Hamburger Drawer Button */}
        <button
          onClick={toggleMobileSidebar}
          className="flex lg:hidden items-center justify-center p-2 rounded-xl text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-cyan-400 hover:bg-slate-100 dark:hover:bg-slate-800/80 border border-slate-200 dark:border-slate-800 transition-all flex-shrink-0"
          title="Open Navigation Menu"
          aria-label="Open Navigation Menu"
        >
          <Menu className="w-4 h-4" />
        </button>

        {/* Wide Search Bar (~700px) */}
        <div className="flex-1 max-w-[700px]">
          <button
            onClick={onOpenCommand}
            className="w-full flex items-center justify-between px-3.5 py-2 rounded-xl bg-slate-100/90 dark:bg-[#0e1726]/80 border border-slate-200 dark:border-[#1e2a42] hover:border-blue-400 dark:hover:border-cyan-500/40 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 text-xs font-mono transition-all shadow-sm group"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <Search className="w-4 h-4 text-slate-400 group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors flex-shrink-0" />
              <span className="truncate text-xs">Search SAP systems, ABAP objects, CAP services...</span>
            </div>
            <div className="hidden sm:flex items-center gap-1 text-[10px] text-slate-600 dark:text-slate-400 bg-slate-200 dark:bg-[#162032] px-2 py-0.5 rounded-lg border border-slate-300 dark:border-slate-700/50 font-mono flex-shrink-0">
              <Command className="w-3 h-3" />
              <span>K</span>
            </div>
          </button>
        </div>
      </div>

      {/* Right Section: Status Order (Agents 8, RAG Active, Notifications, Theme, + New Run) */}
      <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
        {/* Status Chips: 🟢 Agents 8 & 🟢 RAG Active */}
        <div className="hidden xl:flex items-center gap-2.5 text-xs font-mono">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/40 text-emerald-700 dark:text-emerald-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 dark:bg-emerald-400"></span>
            <span className="font-semibold text-[11px]">Agents 8</span>
          </div>

          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-blue-50 dark:bg-cyan-950/40 border border-blue-200 dark:border-cyan-800/40 text-blue-700 dark:text-cyan-400">
            <span className="h-1.5 w-1.5 rounded-full bg-blue-500 dark:bg-cyan-400"></span>
            <span className="font-semibold text-[11px]">RAG Active</span>
          </div>
        </div>

        {/* Notifications / Pending Badge */}
        <Link
          href="/approvals"
          className="relative p-2 rounded-xl text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-all"
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
          className="p-2 rounded-xl text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-amber-300 hover:bg-slate-100 dark:hover:bg-slate-800/60 transition-all"
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
          className="flex items-center gap-1.5 px-3.5 sm:px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-xs shadow-glow transition-all active:scale-95 flex-shrink-0"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span className="hidden sm:inline">New Run</span>
        </button>
      </div>
    </header>
  );
};
