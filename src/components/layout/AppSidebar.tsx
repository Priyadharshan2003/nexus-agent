"use client";

import React, { useState } from "react";
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
  Zap,
  PanelLeftClose,
  PanelLeft,
  Pin,
  PinOff,
  Star,
  Activity,
  ChevronRight,
  ExternalLink,
  Info
} from "lucide-react";
import { useNexusStore } from "@/lib/store/useNexusStore";
import { AboutModal } from "./AboutModal";

interface SidebarProps {
  pendingApprovalsCount?: number;
}

export const AppSidebar: React.FC<SidebarProps> = ({ pendingApprovalsCount = 1 }) => {
  const pathname = usePathname();
  const {
    isSidebarCollapsed,
    toggleSidebar,
    isMobileSidebarOpen,
    closeMobileSidebar,
    isSidebarPinned,
    toggleSidebarPinned,
    pinnedWorkflows,
    togglePinWorkflow,
    agents
  } = useNexusStore();

  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);

  const navItems = [
    {
      label: "Overview",
      href: "/dashboard",
      icon: LayoutDashboard,
      badge: "Live",
      shortcut: "⌘1",
      group: "Core"
    },
    {
      label: "Agent Fleet",
      href: "/agents",
      icon: Bot,
      badge: "8 Ready",
      shortcut: "⌘2",
      group: "Swarm"
    },
    {
      label: "Workflow Engine",
      href: "/workflows",
      icon: GitFork,
      badge: "LangGraph",
      shortcut: "⌘3",
      group: "Pipelines"
    },
    {
      label: "S/4HANA OData",
      href: "/odata",
      icon: Database,
      shortcut: "⌘4",
      group: "Connectors"
    },
    {
      label: "CAP Studio",
      href: "/cap-generator",
      icon: Boxes,
      badge: "CDS V4",
      shortcut: "⌘5",
      group: "Generation"
    },
    {
      label: "ABAP Modernizer",
      href: "/abap-modernizer",
      icon: Code2,
      badge: "Clean Core",
      shortcut: "⌘6",
      group: "Refactoring"
    },
    {
      label: "RAG Knowledge",
      href: "/knowledge",
      icon: Brain,
      badge: "HANA Vector",
      shortcut: "⌘7",
      group: "Intelligence"
    },
    {
      label: "Approval Center",
      href: "/approvals",
      icon: ShieldCheck,
      badgeCount: pendingApprovalsCount,
      highlight: true,
      shortcut: "⌘8",
      group: "Governance"
    },
    {
      label: "Audit Logs",
      href: "/audit-logs",
      icon: FileSpreadsheet,
      shortcut: "⌘9",
      group: "Compliance"
    },
    {
      label: "Settings & RBAC",
      href: "/settings",
      icon: Settings,
      shortcut: "⌘0",
      group: "System"
    },
    {
      label: "About",
      href: "/about",
      icon: Info,
      group: "System"
    }
  ];

  const quickFavorites = [
    { id: "wf_ecc_to_s4_migration", title: "ECC to Clean Core RAP", icon: Code2, target: "/workflows" },
    { id: "wf_cap_generator_preset", title: "CAP OData Synthesis", icon: Boxes, target: "/cap-generator" },
  ];

  return (
    <>
      {/* Mobile Backdrop Overlay */}
      {isMobileSidebarOpen && (
        <div
          onClick={closeMobileSidebar}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden animate-in fade-in duration-200"
          aria-hidden="true"
        />
      )}

      {/* Main Sidebar Container */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 flex flex-col h-screen select-none bg-white dark:bg-[#080d17] border-r border-slate-200 dark:border-slate-800/80 transition-all duration-200 ease-in-out ${
          isMobileSidebarOpen
            ? "translate-x-0 w-[260px] shadow-2xl"
            : "-translate-x-full lg:translate-x-0"
        } ${isSidebarCollapsed ? "lg:w-[72px]" : "lg:w-[260px]"}`}
      >
        {/* Brand Header */}
        <div className="h-16 border-b border-slate-200 dark:border-slate-800/70 flex items-center justify-between px-3.5 relative flex-shrink-0">
          <Link
            href="/dashboard"
            onClick={closeMobileSidebar}
            className={`flex items-center gap-2.5 group overflow-hidden ${
              isSidebarCollapsed ? "justify-center w-full" : ""
            }`}
          >
            {/* SAP Emblem */}
            <div className="h-8 px-2 rounded-lg bg-gradient-to-r from-[#0070f2] via-[#0050b3] to-[#003882] flex items-center justify-center shadow-md group-hover:scale-105 transition-all text-white font-bold tracking-tighter text-sm font-sans flex-shrink-0">
              <span className="font-extrabold text-[14px] tracking-tight mr-0.5">SAP</span>
              <span className="text-[10px] text-cyan-200 font-mono font-bold">AI</span>
            </div>

            {/* Product Title (Hidden in Collapsed) */}
            {!isSidebarCollapsed && (
              <div className="min-w-0 transition-opacity duration-200">
                <div className="flex items-center gap-1">
                  <span className="font-bold tracking-tight text-slate-900 dark:text-white text-base sap-logo-text truncate">
                    Nexus-Agent
                  </span>
                </div>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 font-mono tracking-wide truncate">
                  Enterprise Platform
                </p>
              </div>
            )}
          </Link>

          {/* Quick Collapse / Pin Button inside Header (Desktop only when expanded) */}
          {!isSidebarCollapsed && (
            <div className="hidden lg:flex items-center gap-1">
              <button
                onClick={toggleSidebarPinned}
                className={`p-1.5 rounded-lg text-xs transition-colors ${
                  isSidebarPinned
                    ? "text-blue-600 dark:text-cyan-400 hover:bg-blue-50 dark:hover:bg-cyan-950/40"
                    : "text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                }`}
                title={isSidebarPinned ? "Unpin Sidebar" : "Pin Sidebar"}
              >
                {isSidebarPinned ? <Pin className="w-3.5 h-3.5 rotate-45" /> : <PinOff className="w-3.5 h-3.5" />}
              </button>
              <button
                onClick={toggleSidebar}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                title="Collapse Sidebar (Ctrl+B)"
              >
                <PanelLeftClose className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>

        {/* System Environment Status Pill */}
        <div className="px-3 pt-3 pb-1 flex-shrink-0">
          {isSidebarCollapsed ? (
            <div
              className="w-10 h-8 mx-auto rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/50 flex items-center justify-center group relative cursor-help"
              title="S/4HANA Cloud 2023: SYNCED (Online)"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>

              {/* Tooltip for Collapsed Status */}
              <div className="absolute left-full ml-3 px-2.5 py-1 rounded-lg bg-slate-900 text-white text-xs font-mono whitespace-nowrap shadow-xl opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50 border border-slate-700">
                S/4HANA Cloud 2023 • SYNCED
              </div>
            </div>
          ) : (
            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-[#0c121e] border border-slate-200 dark:border-slate-800/80 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2 min-w-0">
                <span className="relative flex h-2 w-2 flex-shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-slate-700 dark:text-slate-300 font-medium text-[11px] truncate">
                  S/4HANA Cloud 2023
                </span>
              </div>
              <span className="text-[10px] font-mono text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/60 px-1.5 py-0.5 rounded border border-emerald-300 dark:border-emerald-800/50 font-semibold flex-shrink-0">
                SYNCED
              </span>
            </div>
          )}
        </div>

        {/* Navigation Links Scrollable Body */}
        <nav className="flex-1 px-2.5 py-2 space-y-1 overflow-y-auto overflow-x-hidden">
          {!isSidebarCollapsed && (
            <div className="text-[10px] uppercase font-mono tracking-wider text-slate-400 dark:text-slate-500 px-3 py-1.5 font-semibold">
              Workspaces
            </div>
          )}

          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href === "/dashboard" && pathname === "/");
            const Icon = item.icon;

            return (
              <div key={item.href} className="relative group">
                {item.label === "About" ? (
                  <button
                    onClick={() => {
                      if (isMobileSidebarOpen) closeMobileSidebar();
                      setIsAboutModalOpen(true);
                    }}
                    className={`flex items-center w-full rounded-xl text-xs font-medium transition-all ${
                      isSidebarCollapsed
                        ? "justify-center w-10 h-10 mx-auto"
                        : "justify-between px-3 py-2"
                    } ${
                      isActive
                        ? "bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-cyan-950/40 dark:to-blue-950/30 text-blue-700 dark:text-cyan-300 border border-blue-200 dark:border-cyan-500/40 font-bold shadow-sm"
                        : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800/60 border border-transparent"
                    }`}
                  >
                    <div className="flex items-center gap-2.5 min-w-0">
                      <Icon
                        className={`w-4 h-4 flex-shrink-0 transition-colors ${
                          isActive
                            ? "text-blue-600 dark:text-cyan-400"
                            : "text-slate-500 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-slate-200"
                        }`}
                      />
                      {!isSidebarCollapsed && <span className="truncate">{item.label}</span>}
                    </div>
                  </button>
                ) : (
                  <Link
                  href={item.href}
                  onClick={closeMobileSidebar}
                  className={`flex items-center rounded-xl text-xs font-medium transition-all ${
                    isSidebarCollapsed
                      ? "justify-center w-10 h-10 mx-auto"
                      : "justify-between px-3 py-2"
                  } ${
                    isActive
                      ? "bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-cyan-950/40 dark:to-blue-950/30 text-blue-700 dark:text-cyan-300 border border-blue-200 dark:border-cyan-500/40 font-bold shadow-sm"
                      : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800/60 border border-transparent"
                  }`}
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Icon
                      className={`w-4 h-4 flex-shrink-0 transition-colors ${
                        isActive
                          ? "text-blue-600 dark:text-cyan-400"
                          : "text-slate-500 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-slate-200"
                      }`}
                    />
                    {!isSidebarCollapsed && <span className="truncate">{item.label}</span>}
                  </div>

                  {!isSidebarCollapsed && (
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      {item.badgeCount && item.badgeCount > 0 ? (
                        <span className="px-1.5 py-0.2 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/40 animate-pulse">
                          {item.badgeCount}
                        </span>
                      ) : null}

                      {item.badge ? (
                        <span
                          className={`text-[9px] font-mono px-1.5 py-0.5 rounded font-semibold ${
                            isActive
                              ? "bg-blue-100 dark:bg-cyan-950 text-blue-700 dark:text-cyan-300 border border-blue-200 dark:border-cyan-800"
                              : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700/60"
                          }`}
                        >
                          {item.badge}
                        </span>
                      ) : null}
                    </div>
                  )}
                  </Link>
                )}

                {/* Rich Floating Tooltip in Collapsed State */}
                {isSidebarCollapsed && (
                  <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 px-3 py-2 rounded-xl bg-slate-900 dark:bg-[#0f172a] text-white text-xs font-mono whitespace-nowrap shadow-2xl opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-150 z-50 border border-slate-700/80 flex items-center gap-2.5">
                    <span className="font-bold text-slate-100">{item.label}</span>
                    {item.badge && (
                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
                        {item.badge}
                      </span>
                    )}
                    {item.badgeCount && item.badgeCount > 0 && (
                      <span className="text-[9px] px-1.5 py-0.5 rounded bg-amber-500 text-black font-bold">
                        {item.badgeCount}
                      </span>
                    )}
                    <span className="text-[10px] text-slate-400 bg-slate-800 px-1.5 py-0.5 rounded border border-slate-700">
                      {item.shortcut}
                    </span>
                  </div>
                )}
              </div>
            );
          })}

          {/* Favorites & Quick Workflows Section (Expanded only) */}
          {!isSidebarCollapsed && (
            <div className="pt-3">
              <div className="text-[10px] uppercase font-mono tracking-wider text-slate-400 dark:text-slate-500 px-3 py-1.5 font-semibold flex items-center justify-between">
                <span>Starred Workflows</span>
                <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
              </div>
              <div className="space-y-1">
                {quickFavorites.map((fav) => {
                  const Icon = fav.icon;
                  return (
                    <Link
                      key={fav.id}
                      href={fav.target}
                      onClick={closeMobileSidebar}
                      className="flex items-center justify-between px-3 py-1.5 rounded-lg text-xs text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-all group"
                    >
                      <div className="flex items-center gap-2 truncate">
                        <Icon className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400 flex-shrink-0" />
                        <span className="truncate text-[11px] font-mono">{fav.title}</span>
                      </div>
                      <ChevronRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity text-slate-400 flex-shrink-0" />
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </nav>

        {/* Footer Area: Agent Swarm Health + User Profile */}
        <div className="p-3 border-t border-slate-200 dark:border-slate-800/80 bg-slate-50 dark:bg-[#070a10] flex-shrink-0 space-y-2">
          {/* Agent Swarm Mini Health Gauge */}
          {!isSidebarCollapsed ? (
            <div className="p-2 rounded-xl bg-white dark:bg-[#0c121e] border border-slate-200 dark:border-slate-800/80">
              <div className="flex items-center justify-between text-[10px] font-mono text-slate-500 dark:text-slate-400 mb-1">
                <span className="flex items-center gap-1">
                  <Activity className="w-3 h-3 text-emerald-500" /> Swarm Health
                </span>
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">8/8 Online</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500 w-[99%]" />
              </div>
            </div>
          ) : (
            <div
              className="w-10 h-8 mx-auto rounded-xl bg-white dark:bg-[#0c121e] border border-slate-200 dark:border-slate-800/80 flex items-center justify-center text-emerald-500 cursor-help group relative"
              title="8/8 Agents Online (99.4% Health)"
            >
              <Activity className="w-4 h-4" />
              <div className="absolute left-full ml-3 px-2.5 py-1 rounded-lg bg-slate-900 text-white text-xs font-mono whitespace-nowrap shadow-xl opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50 border border-slate-700">
                8/8 Swarm Online (99.4%)
              </div>
            </div>
          )}

          {/* User Profile Card */}
          {isSidebarCollapsed ? (
            <div className="relative group">
              <div className="w-10 h-10 mx-auto rounded-xl bg-gradient-to-tr from-[#0070f2] to-[#0050b3] flex items-center justify-center text-xs font-bold text-white uppercase shadow-md cursor-pointer">
                PC
              </div>

              {/* Collapsed User Profile Tooltip */}
              <div className="absolute left-full ml-3 bottom-0 p-3 rounded-2xl bg-slate-900 dark:bg-[#0f172a] text-white text-xs font-mono whitespace-nowrap shadow-2xl opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-150 z-50 border border-slate-700/80 space-y-1">
                <p className="font-bold text-sm text-slate-100">Priyadharshan C.</p>
                <p className="text-[11px] text-cyan-400 font-semibold flex items-center gap-1">
                  <Zap className="w-3 h-3" /> SAP Architect
                </p>
                <p className="text-[10px] text-slate-400">Tenant: Global SAP Suite</p>
                <span className="inline-block mt-1 text-[9px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                  Region: BTP EU10
                </span>
              </div>
            </div>
          ) : (
            <div className="p-2.5 rounded-xl bg-white dark:bg-[#0c121e] border border-slate-200 dark:border-slate-800/80 flex items-center justify-between shadow-sm">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#0070f2] to-[#0050b3] flex items-center justify-center text-xs font-bold text-white uppercase shadow-sm flex-shrink-0">
                  PC
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">
                    Priyadharshan C.
                  </p>
                  <p className="text-[10px] text-blue-600 dark:text-cyan-400 font-mono flex items-center gap-1 font-semibold truncate">
                    <Zap className="w-2.5 h-2.5 flex-shrink-0" /> SAP Architect
                  </p>
                </div>
              </div>
              <span className="text-[10px] font-mono text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800/60 px-1.5 py-0.5 rounded border border-slate-200 dark:border-slate-700/50 flex-shrink-0">
                BTP EU10
              </span>
            </div>
          )}
        </div>
      </aside>
      
      <AboutModal isOpen={isAboutModalOpen} onClose={() => setIsAboutModalOpen(false)} />
    </>
  );
};
