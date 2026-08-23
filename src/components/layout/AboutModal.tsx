import React from "react";
import { Cpu, Heart, Github, Code, Shield, ExternalLink, X } from "lucide-react";
import Link from "next/link";

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AboutModal({ isOpen, onClose }: AboutModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={onClose}
      />
      
      {/* Modal Container */}
      <div className="relative w-full max-w-4xl bg-[#080b11] border border-white/10 rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-50 p-2 text-slate-400 hover:text-white bg-black/20 hover:bg-white/10 rounded-full transition-colors"
        >
          <X size={18} />
        </button>

        {/* Grid Background */}
        <div 
          className="absolute inset-0 pointer-events-none opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }}
        />
        
        {/* Ambient Glows */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-sap-blue/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-500/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 p-5 sm:p-8">
          <div className="mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">About Nexus Agent</h1>
            <p className="text-slate-400 font-mono text-[10px] sm:text-xs uppercase tracking-wide">
              Autonomous SAP BTP & S/4HANA Modernization Platform.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
            {/* Left Card: Platform & Creator */}
            <div className="bg-surface-200/50 backdrop-blur-md border border-white/10 rounded-2xl p-5 flex flex-col justify-between">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-sap-gold flex items-center justify-center bg-sap-gold/10 text-sap-gold">
                  <Cpu size={20} className="sm:w-6 sm:h-6" />
                </div>
                <div>
                  <h2 className="text-base sm:text-lg font-bold text-white">Nexus Agent Platform</h2>
                  <p className="text-slate-400 font-mono text-[10px] sm:text-xs">Version 1.0.0 (MVP)</p>
                </div>
              </div>

              <div className="bg-surface-300/80 border border-white/5 rounded-xl p-4 sm:p-5">
                <h3 className="text-[10px] sm:text-xs font-bold text-white mb-2">Created & Maintained By</h3>
                <p className="text-base sm:text-lg font-bold text-brand-400 mb-0.5">
                  Priyadharshan Chandranath
                </p>
                <p className="text-slate-400 text-[10px] sm:text-xs mb-4 font-medium">
                  Senior Analyst & SAP Product Engineer
                </p>
                
                <Link 
                  href="https://priyadharshan-tau.vercel.app/" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sap-gold hover:text-yellow-400 font-medium text-xs sm:text-sm transition-colors"
                >
                  Contact Author <ExternalLink size={14} />
                </Link>
              </div>
            </div>

            {/* Right Card: Support & Contribute */}
            <div className="bg-surface-200/50 backdrop-blur-md border border-white/10 rounded-2xl p-5 flex flex-col">
              <div className="flex items-center gap-3 mb-5">
                <Heart className="text-rose-400" size={20} />
                <h2 className="text-base sm:text-lg font-bold text-white">Support & Contribute</h2>
              </div>
              
              <p className="text-slate-400 text-[11px] sm:text-xs leading-relaxed mb-6">
                Nexus Agent is built to help SAP engineering teams save time, automate complex migrations, and maintain Clean Core compliance. If it has helped your workflow, consider supporting the project!
              </p>

              <div className="space-y-3 mb-6 flex-grow">
                <div className="flex items-center gap-3 text-white text-xs sm:text-sm font-medium hover:text-brand-400 transition-colors cursor-pointer">
                  <Github size={16} className="text-slate-400" />
                  <span>Star the repository on GitHub</span>
                </div>
                <div className="flex items-center gap-3 text-white text-xs sm:text-sm font-medium hover:text-brand-400 transition-colors cursor-pointer">
                  <Code size={16} className="text-slate-400" />
                  <span>Contribute new agent modules</span>
                </div>
                <div className="flex items-center gap-3 text-white text-xs sm:text-sm font-medium hover:text-brand-400 transition-colors cursor-pointer">
                  <Shield size={16} className="text-slate-400" />
                  <span>Report vulnerabilities or bugs</span>
                </div>
              </div>

              <Link 
                href="https://github.com/Priyadharshan2003/nexus-agent"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-2.5 px-4 bg-white hover:bg-slate-200 text-black font-bold text-xs sm:text-sm rounded-xl flex items-center justify-center gap-2 transition-all active:scale-[0.98]"
              >
                <Github size={16} /> View Source Code
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
