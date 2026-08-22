"use client";

import React, { useState } from "react";
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
    runWorkflowAuto
  } = useNexusStore();

  const [isQuickLaunchOpen, setIsQuickLaunchOpen] = useState(false);

  const pendingApprovalsCount = approvals.filter((a) => a.status === "pending").length;

  const handleLaunchWorkflow = (templateId: string, prompt: string, targetSystem: string) => {
    const newWf = startNewWorkflow(templateId, prompt, targetSystem);
    setTimeout(() => {
      runWorkflowAuto(newWf.id);
    }, 400);
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#07090e] grid-bg">
      {/* Sidebar */}
      <AppSidebar pendingApprovalsCount={pendingApprovalsCount} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        <Header
          onOpenCommand={() => setIsCommandOpen(true)}
          onNewWorkflow={() => setIsQuickLaunchOpen(true)}
          pendingApprovalsCount={pendingApprovalsCount}
        />

        <main className="flex-1 overflow-y-auto p-6 space-y-6">
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
