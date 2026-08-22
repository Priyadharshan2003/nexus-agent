"use client";

import React, { useState } from "react";
import {
  Sparkles,
  GitFork,
  Boxes,
  Database,
  X,
  Server,
  Layers,
  Check
} from "lucide-react";
import { PRESET_WORKFLOW_TEMPLATES } from "@/lib/agents/langgraph-runner";

interface QuickActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLaunch: (templateId: string, customPrompt: string, targetSystem: string) => void;
}

export const QuickActionModal: React.FC<QuickActionModalProps> = ({
  isOpen,
  onClose,
  onLaunch
}) => {
  const [selectedTemplate, setSelectedTemplate] = useState<string>(PRESET_WORKFLOW_TEMPLATES[0].id);
  const [targetSystem, setTargetSystem] = useState<string>("SAP S/4HANA Cloud");
  const [customPrompt, setCustomPrompt] = useState<string>(
    PRESET_WORKFLOW_TEMPLATES[0].defaultPrompt
  );

  if (!isOpen) return null;

  const currentTmpl =
    PRESET_WORKFLOW_TEMPLATES.find((t) => t.id === selectedTemplate) || PRESET_WORKFLOW_TEMPLATES[0];

  const handleTemplateSelect = (tmpl: (typeof PRESET_WORKFLOW_TEMPLATES)[0]) => {
    setSelectedTemplate(tmpl.id);
    setTargetSystem(tmpl.targetSystem);
    setCustomPrompt(tmpl.defaultPrompt);
  };

  const handleRun = () => {
    onLaunch(selectedTemplate, customPrompt, targetSystem);
    onClose();
  };

  const systems = [
    "SAP S/4HANA Cloud",
    "SAP ECC 6.0",
    "SAP BTP",
    "SuccessFactors",
    "Multi-Cloud"
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-[#0d121c] border border-slate-700/80 rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        {/* Modal Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white tracking-tight">
                Launch Autonomous Multi-Agent Pipeline
              </h3>
              <p className="text-xs text-slate-400">
                Deploy 8 specialized agents orchestrating SAP business processes
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 space-y-4">
          {/* Preset selector */}
          <div>
            <label className="block text-xs font-mono uppercase text-slate-400 mb-2">
              Select Workflow Blueprint
            </label>
            <div className="grid grid-cols-3 gap-2.5">
              {PRESET_WORKFLOW_TEMPLATES.map((tmpl) => {
                const isSel = tmpl.id === selectedTemplate;
                return (
                  <button
                    key={tmpl.id}
                    onClick={() => handleTemplateSelect(tmpl)}
                    className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between ${
                      isSel
                        ? "bg-cyan-500/10 border-cyan-500/60 shadow-[0_0_15px_rgba(6,182,212,0.15)]"
                        : "bg-surface-200/60 hover:bg-surface-100 border-slate-800 hover:border-slate-700"
                    }`}
                  >
                    <div>
                      <span className="text-[10px] font-mono text-cyan-400 px-1.5 py-0.5 rounded bg-cyan-950/60 border border-cyan-900">
                        {tmpl.category}
                      </span>
                      <h4 className="text-xs font-semibold text-slate-200 mt-2 line-clamp-2">
                        {tmpl.title}
                      </h4>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Target SAP System */}
          <div>
            <label className="block text-xs font-mono uppercase text-slate-400 mb-2">
              Target SAP Enterprise System
            </label>
            <div className="flex flex-wrap gap-2">
              {systems.map((sys) => (
                <button
                  key={sys}
                  onClick={() => setTargetSystem(sys)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all flex items-center gap-1.5 ${
                    targetSystem === sys
                      ? "bg-blue-600 text-white font-medium shadow-sm"
                      : "bg-surface-200 text-slate-400 hover:text-slate-200 border border-slate-800"
                  }`}
                >
                  <Server className="w-3 h-3" />
                  <span>{sys}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Custom Prompt / Instructions */}
          <div>
            <label className="block text-xs font-mono uppercase text-slate-400 mb-2">
              Autonomous Instructions / Goal Description
            </label>
            <textarea
              rows={3}
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
              className="w-full bg-[#080b11] border border-slate-800 rounded-xl p-3 text-xs text-slate-200 font-mono focus:border-cyan-500/60 focus:outline-none resize-none"
              placeholder="Describe the modernization or automation goal..."
            />
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-[#0a0e16] border-t border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping"></span>
            <span>8 Agents Ready to Collaborate</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg text-xs font-medium text-slate-400 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleRun}
              className="px-5 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold text-xs shadow-glow transition-all active:scale-95 flex items-center gap-2"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Compile & Execute</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
