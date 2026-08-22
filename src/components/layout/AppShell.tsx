"use client";

import React, { useState, useEffect } from "react";
import { AppSidebar } from "./AppSidebar";
import { Header } from "./Header";
import { CommandPalette } from "./CommandPalette";
import { QuickActionModal } from "./QuickActionModal";
import { useNexusStore } from "@/lib/store/useNexusStore";

interface AppShellProps {
  children: React.ReactNode;
}

export const AppShell: React.FC<AppShellProps> = ({ children }) => {
  const {
    approvals,
    isCommandOpen,
    setIsCommandOpen,
    startNewWorkflow,
    runWorkflowAuto,
    toggleSidebar,
    closeMobileSidebar,
    isMobileSidebarOpen
  } = useNexusStore();

  const [isQuickLaunchOpen, setIsQuickLaunchOpen] = useState(false);

  const pendingApprovalsCount = approvals.filter((a) => a.status === "pending").length;

  const handleLaunchWorkflow = (templateId: string, prompt: string, targetSystem: string) => {
    const newWf = startNewWorkflow(templateId, prompt, targetSystem);
    setTimeout(() => {
      runWorkflowAuto(newWf.id);
    }, 400);
  };

  // Keyboard Shortcuts: Ctrl+B / Cmd+B to toggle sidebar, ESC to close mobile drawer
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "b") {
        e.preventDefault();
        toggleSidebar();
      } else if (e.key === "Escape") {
        if (isMobileSidebarOpen) {
          closeMobileSidebar();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [toggleSidebar, closeMobileSidebar, isMobileSidebarOpen]);

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#f4f6fa] dark:bg-[#07090e] text-slate-900 dark:text-slate-100 grid-bg transition-colors duration-200">
      {/* Collapsible SaaS Sidebar */}
      <AppSidebar pendingApprovalsCount={pendingApprovalsCount} />

      {/* Main Responsive Content Viewport */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden transition-all duration-200">
        <Header
          onOpenCommand={() => setIsCommandOpen(true)}
          onNewWorkflow={() => setIsQuickLaunchOpen(true)}
          pendingApprovalsCount={pendingApprovalsCount}
        />

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {children}
        </main>
      </div>

      {/* Modals & Command Palette */}
      <CommandPalette
        isOpen={isCommandOpen}
        onClose={() => setIsCommandOpen(false)}
        onSelectWorkflowPreset={(templateId) => {
          handleLaunchWorkflow(templateId, "", "SAP S/4HANA Cloud");
        }}
      />

      <QuickActionModal
        isOpen={isQuickLaunchOpen}
        onClose={() => setIsQuickLaunchOpen(false)}
        onLaunch={handleLaunchWorkflow}
      />
    </div>
  );
};
