"use client";

import React, { useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { searchKnowledgeBase } from "@/lib/rag/sap-knowledge-base";
import { RagDocumentChunk } from "@/lib/types";
import {
  Search,
  Sparkles,
  Calendar,
  Upload,
  Tag,
} from "lucide-react";

export default function KnowledgePage() {
  const [searchQuery, setSearchQuery] = useState<string>("ABAP Cloud Released APIs and Clean Core");
  const [results, setResults] = useState<RagDocumentChunk[]>(() =>
    searchKnowledgeBase("ABAP Cloud Released APIs and Clean Core")
  );
  const [selectedDoc, setSelectedDoc] = useState<RagDocumentChunk | null>(results[0]);
  const [isSearching, setIsSearching] = useState<boolean>(false);

  const handleSearch = (q: string) => {
    setSearchQuery(q);
    setIsSearching(true);
    setTimeout(() => {
      const res = searchKnowledgeBase(q);
      setResults(res);
      if (res.length > 0) setSelectedDoc(res[0]);
      setIsSearching(false);
    }, 400);
  };

  return (
    <AppShell>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-purple-100 dark:bg-purple-950 text-purple-800 dark:text-purple-300 border border-purple-300 dark:border-purple-800 font-semibold">
              HANA Vector Engine & pgVector
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">REAL_VECTOR (1536 dims)</span>
          </div>
          <h1 className="text-xl lg:text-2xl font-bold tracking-tight text-slate-900 dark:text-white mt-1">
            Enterprise RAG Knowledge Hub
          </h1>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
            Perform hybrid semantic search across SAP Notes, Clean Core guidelines, CAP architecture standards, and custom ABAP repositories.
          </p>
        </div>

        <button
          onClick={() => alert("Simulating PDF & Z-Doc ingestion to SAP HANA Vector Engine...")}
          className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-surface-200 hover:bg-slate-200 dark:hover:bg-surface-100 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 text-xs font-mono flex items-center gap-2 transition-colors self-start"
        >
          <Upload className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
          <span>Ingest Custom Documentation</span>
        </button>
      </div>

      {/* Semantic Search Bar */}
      <div className="p-4 rounded-2xl glass-panel border border-slate-200 dark:border-slate-800/80 space-y-3">
        <label className="block text-xs font-mono uppercase text-slate-500 dark:text-slate-400 font-semibold">
          Semantic Query Vector Embedding Sandbox
        </label>
        <div className="flex flex-col sm:flex-row gap-2">
          <div className="flex-1 flex items-center bg-slate-50 dark:bg-[#080b11] border border-slate-300 dark:border-slate-800 rounded-xl px-4 py-2.5 text-xs font-mono text-slate-900 dark:text-slate-200">
            <Search className="w-4 h-4 text-purple-600 dark:text-purple-400 mr-2 flex-shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch(searchQuery)}
              className="flex-1 bg-transparent text-slate-900 dark:text-slate-200 focus:outline-none"
              placeholder="Search SAP Notes, CDS draft guidelines, RAP behaviors, or BTP destinations..."
            />
          </div>
          <button
            onClick={() => handleSearch(searchQuery)}
            disabled={isSearching}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs shadow-glow-purple transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{isSearching ? "Searching Vector..." : "Vector Search"}</span>
          </button>
        </div>

        {/* Quick query tags */}
        <div className="flex items-center gap-2 pt-1 text-xs font-mono overflow-x-auto">
          <span className="text-slate-500 flex-shrink-0">Suggested:</span>
          {["SAP Note 3244910", "Clean Core Side-by-Side", "CAP Fiori Draft Side Effects", "HANA Vector Engine REAL_VECTOR"].map((tag) => (
            <button
              key={tag}
              onClick={() => handleSearch(tag)}
              className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-surface-200 hover:bg-slate-200 dark:hover:bg-surface-100 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 text-[11px] transition-colors flex-shrink-0 font-medium"
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Results list & Document Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Results List (6 Cols) */}
        <div className="lg:col-span-6 space-y-3">
          <div className="text-xs font-mono uppercase text-slate-500 dark:text-slate-400 px-1 font-semibold">
            Matched Knowledge Chunks ({results.length})
          </div>

          <div className="space-y-3">
            {results.map((doc) => {
              const isSelected = selectedDoc?.id === doc.id;
              const simPercent = Math.round((doc.similarityScore || 0.85) * 100);

              return (
                <button
                  key={doc.id}
                  onClick={() => setSelectedDoc(doc)}
                  className={`w-full p-4 rounded-2xl border text-left transition-all relative flex flex-col justify-between shadow-sm ${
                    isSelected
                      ? "bg-purple-50 dark:bg-purple-950/20 border-purple-500 ring-1 ring-purple-500/40"
                      : "bg-white dark:bg-surface-200/60 hover:bg-slate-50 dark:hover:bg-surface-100/90 border-slate-200 dark:border-slate-800"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-surface-300 text-purple-800 dark:text-purple-300 border border-slate-200 dark:border-purple-900 font-semibold">
                          {doc.source} {doc.docNumber ? `#${doc.docNumber}` : ""}
                        </span>
                        <span className="text-[10px] font-mono text-slate-500 flex items-center gap-1">
                          <Calendar className="w-3 h-3" /> {doc.lastUpdated}
                        </span>
                      </div>

                      <span className="text-[11px] font-mono font-bold text-emerald-800 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-300 dark:border-emerald-800">
                        {simPercent}% Match
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 mt-2 line-clamp-2">
                      {doc.title}
                    </h4>

                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-1.5 line-clamp-2">
                      {doc.content}
                    </p>
                  </div>

                  <div className="mt-3 pt-2.5 border-t border-slate-200 dark:border-slate-800/80 flex items-center gap-1.5 flex-wrap">
                    {doc.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[9px] font-mono text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-[#080b11] px-2 py-0.5 rounded border border-slate-200 dark:border-slate-800 font-medium"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Document Details (6 Cols) */}
        <div className="lg:col-span-6">
          {selectedDoc ? (
            <div className="p-5 rounded-2xl glass-panel border border-slate-200 dark:border-slate-800/80 space-y-4 sticky top-20 shadow-sm">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono uppercase text-purple-700 dark:text-purple-400 font-semibold">
                    {selectedDoc.source}
                  </span>
                  {selectedDoc.docNumber && (
                    <span className="text-xs font-mono text-slate-500 dark:text-slate-400 font-bold">
                      #{selectedDoc.docNumber}
                    </span>
                  )}
                </div>
                <div className="text-[11px] font-mono text-emerald-800 dark:text-emerald-400 font-bold bg-emerald-100 dark:bg-emerald-950 px-2 py-0.5 rounded border border-emerald-300 dark:border-emerald-800">
                  Cosine Similarity: {selectedDoc.similarityScore}
                </div>
              </div>

              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white tracking-tight">
                  {selectedDoc.title}
                </h3>
                <p className="text-[11px] font-mono text-slate-500 mt-1">
                  Last verified against S/4HANA Cloud: {selectedDoc.lastUpdated}
                </p>
              </div>

              {/* Full Content Body */}
              <div className="p-4 rounded-xl bg-slate-900 dark:bg-[#06080d] border border-slate-800 dark:border-slate-900 text-xs text-slate-200 leading-relaxed font-mono">
                {selectedDoc.content}
              </div>

              {/* Verified Tags */}
              <div>
                <label className="block text-[10px] font-mono uppercase text-slate-500 mb-1.5 font-semibold">
                  Semantic Metadata & Entity Entities
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {selectedDoc.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-surface-200 border border-slate-200 dark:border-slate-800 text-xs font-mono text-cyan-800 dark:text-cyan-300 flex items-center gap-1 font-semibold"
                    >
                      <Tag className="w-3 h-3 text-cyan-600 dark:text-cyan-400" />
                      <span>{tag}</span>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="p-8 rounded-2xl glass-panel text-center text-slate-500 text-xs">
              Select a document from the left to read full knowledge chunk.
            </div>
          )}
        </div>
      </div>
    </AppShell>
  );
}
