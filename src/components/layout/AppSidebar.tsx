"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Bot,
  GitFork,
  Database,
  Boxes,
  Code2,
  Brain,
  ShieldCheck,
  FileSpreadsheet,
  Settings,
  Sparkles,
  Zap,
  CheckCircle2,
  ChevronRight,
  Layers
} from "lucide-react";

interface SidebarProps {
  pendingApprovalsCount?: number;
}

export const AppSidebar: React.FC<SidebarProps> = ({ pendingApprovalsCount = 1 }) => {
  const pathname = usePathname();

  const navItems = [
    {
      label: "Overview",
      href: "/dashboard",
      icon: LayoutDashboard,
      badge: "Live"
    },
    {
      label: "Agent Fleet",
      href: "/agents",
      icon: Bot,
      badge: "8 Ready"
    },
    {
      label: "Workflow Engine",
      href: "/workflows",
      icon: GitFork,
      badge: "LangGraph"
    },
    {
      label: "S/4HANA OData",
      href: "/odata",
      icon: Database
    },
    {
      label: "CAP Studio",
      href: "/cap-generator",
      icon: Boxes,
      badge: "CDS V4"
    },
    {
      label: "ABAP Modernizer",
      href: "/abap-modernizer",
      icon: Code2,
      badge: "Clean Core"
    },
    {
      label: "RAG Knowledge",
      href: "/knowledge",
      icon: Brain,
      badge: "HANA Vector"
    },
    {
      label: "Approval Center",
      href: "/approvals",
      icon: ShieldCheck,
      badgeCount: pendingApprovalsCount,
      highlight: true
    },
    {
      label: "Audit Logs",
      href: "/audit-logs",
      icon: FileSpreadsheet
    },
    {
      label: "Settings & RBAC",
      href: "/settings",
      icon: Settings
    }
  ];

  return (
    <aside className="w-64 flex-shrink-0 bg-[#0a0d14] dark:bg-[#0a0d14] light:bg-white border-r border-slate-800/80 dark:border-slate-800/80 light:border-slate-200 flex flex-col h-screen select-none z-30 transition-colors">
      {/* Brand Header with SAP Emblem */}
      <div className="p-4 border-b border-slate-800/70 dark:border-slate-800/70 light:border-slate-200 flex items-center justify-between">
        <Link href="/dashboard" className="flex items-center gap-2.5 group">
          {/* Official SAP Style Logo Badge */}
          <div className="flex items-center">
            <div className="h-8 px-2.5 rounded-lg bg-gradient-to-r from-[#0070f2] via-[#0050b3] to-[#003882] flex items-center justify-center shadow-md group-hover:scale-105 transition-all text-white font-bold tracking-tighter text-sm font-sans">
              <span className="font-extrabold text-[15px] tracking-tight mr-0.5">SAP</span>
              <span className="text-[11px] text-cyan-200 font-mono font-bold">AI</span>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1">
              <span className="font-bold tracking-tight text-white dark:text-white light:text-slate-900 text-base sap-logo-text">
                Nexus-Agent
              </span>
            </div>
            <p className="text-[10px] text-slate-400 light:text-slate-500 font-mono tracking-wide">
              Enterprise Agent Platform
            </p>
          </div>
        </Link>
      </div>

      {/* System Status Pill */}
      <div className="px-3 pt-3 pb-1">
        <div className="p-2.5 rounded-lg bg-surface-200/80 dark:bg-surface-200/80 light:bg-slate-50 border border-slate-800 dark:border-slate-800 light:border-slate-200 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-slate-300 dark:text-slate-300 light:text-slate-700 font-medium text-[11px]">S/4HANA Cloud 2023</span>
          </div>
          <span className="text-[10px] font-mono text-emerald-400 dark:text-emerald-400 light:text-emerald-700 bg-emerald-950/60 dark:bg-emerald-950/60 light:bg-emerald-100 px-1.5 py-0.5 rounded border border-emerald-800/50 light:border-emerald-300">
            SYNCED
          </span>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-2.5 py-2 space-y-1 overflow-y-auto">
        <div className="text-[10px] uppercase font-mono tracking-wider text-slate-500 light:text-slate-400 px-3 py-1.5 font-semibold">
          Workspaces
        </div>
        {navItems.map((item) => {
          const isActive = pathname === item.href || (item.href === "/dashboard" && pathname === "/");
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all group ${isActive
                  ? "bg-cyan-500/10 dark:bg-cyan-500/10 light:bg-blue-50 text-cyan-300 dark:text-cyan-300 light:text-blue-700 border border-cyan-500/30 dark:border-cyan-500/30 light:border-blue-300 font-bold shadow-sm"
                  : "text-slate-400 dark:text-slate-400 light:text-slate-600 hover:text-slate-200 dark:hover:text-slate-200 light:hover:text-slate-900 hover:bg-surface-100/70 dark:hover:bg-surface-100/70 light:hover:bg-slate-100 border border-transparent"
                }`}
            >
              <div className="flex items-center gap-2.5">
                <Icon
                  className={`w-4 h-4 transition-colors ${isActive
                      ? "text-cyan-400 dark:text-cyan-400 light:text-blue-600"
                      : "text-slate-400 dark:text-slate-400 light:text-slate-500 group-hover:text-slate-200 light:group-hover:text-slate-900"
                    }`}
                />
                <span>{item.label}</span>
              </div>

              <div className="flex items-center gap-1.5">
                {item.badgeCount && item.badgeCount > 0 ? (
                  <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 light:text-amber-700 border border-amber-500/40 animate-pulse">
                    {item.badgeCount}
                  </span>
                ) : null}

                {item.badge ? (
                  <span
                    className={`text-[9px] font-mono px-1.5 py-0.5 rounded ${isActive
                        ? "bg-cyan-950 dark:bg-cyan-950 light:bg-blue-100 text-cyan-300 dark:text-cyan-300 light:text-blue-700 border border-cyan-800 light:border-blue-200"
                        : "bg-surface-300 dark:bg-surface-300 light:bg-slate-200 text-slate-400 light:text-slate-600 border border-slate-800 light:border-slate-300"
                      }`}
                  >
                    {item.badge}
                  </span>
                ) : null}
              </div>
            </Link>
          );
        })}
      </nav>

      {/* Footer Tenant & User */}
      <div className="p-3 border-t border-slate-800/80 dark:border-slate-800/80 light:border-slate-200 bg-[#070a10] dark:bg-[#070a10] light:bg-slate-50">
        <div className="p-2.5 rounded-lg bg-surface-200/50 dark:bg-surface-200/50 light:bg-white border border-slate-800/80 dark:border-slate-800/80 light:border-slate-200 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-[#0070f2] to-[#0050b3] flex items-center justify-center text-xs font-bold text-white uppercase shadow-sm">
              PC
            </div>
            <div className="min-w-0">
              <p className="text-xs font-semibold text-slate-200 dark:text-slate-200 light:text-slate-800 truncate">
                Priyadharshan C.
              </p>
              <p className="text-[10px] text-cyan-400 dark:text-cyan-400 light:text-blue-600 font-mono flex items-center gap-1">
                <Zap className="w-2.5 h-2.5" /> SAP Architect
              </p>
            </div>
          </div>
          <span className="text-[10px] font-mono text-slate-400 light:text-slate-600 bg-slate-800/60 dark:bg-slate-800/60 light:bg-slate-100 px-1.5 py-0.5 rounded border border-slate-700/50 light:border-slate-200">
            BTP EU10
          </span>
        </div>
      </div>
    </aside>
  );
};
