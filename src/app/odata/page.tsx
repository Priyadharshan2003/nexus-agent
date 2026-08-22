"use client";

import React, { useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { MOCK_ODATA_ENTITIES } from "@/lib/sap/odata-mock-data";
import { ODataEntity } from "@/lib/types";
import {
  Database,
  Search,
  Code2,
  Play,
  Copy,
  Check,
  Sparkles,
  ExternalLink,
  Layers,
  Key,
  Server,
  ArrowRight
} from "lucide-react";
import Link from "next/link";

export default function ODataPage() {
  const [selectedEntity, setSelectedEntity] = useState<ODataEntity>(MOCK_ODATA_ENTITIES[0]);
  const [filterQuery, setFilterQuery] = useState<string>("$filter=TotalNetAmount gt 50000");
  const [activeTab, setActiveTab] = useState<"fields" | "sandbox" | "metadata">("sandbox");
  const [isQueryRunning, setIsQueryRunning] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  const handleRunQuery = () => {
    setIsQueryRunning(true);
    setTimeout(() => {
      setIsQueryRunning(false);
    }, 600);
  };

  const handleCopyJson = async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(JSON.stringify(selectedEntity.sampleRecords, null, 2));
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Ignore clipboard rejection
    }
  };

  return (
    <AppShell>
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800">
              OData V2 / V4 Connectors
            </span>
            <span className="text-xs text-slate-400 font-mono">SAP S/4HANA Cloud 2023</span>
          </div>
          <h1 className="text-xl lg:text-2xl font-bold tracking-tight text-white mt-1">
            SAP S/4HANA OData Integrations Explorer
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Browse live SAP OData service metadata, execute query sandboxes, and compile CDS side-by-side models.
          </p>
        </div>

        <Link
          href="/cap-generator"
          className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-semibold shadow-glow flex items-center gap-2 transition-all self-start"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Generate CAP Service from OData</span>
        </Link>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Entity List (4 Cols) */}
        <div className="lg:col-span-4 space-y-3">
          <div className="p-4 rounded-2xl glass-panel border border-slate-800/80 space-y-3">
            <h3 className="text-xs font-mono uppercase text-slate-400">
              Registered SAP OData APIs
            </h3>

            <div className="space-y-2">
              {MOCK_ODATA_ENTITIES.map((entity) => {
                const isSelected = selectedEntity.name === entity.name;
                return (
                  <button
                    key={entity.name}
                    onClick={() => setSelectedEntity(entity)}
                    className={`w-full p-3.5 rounded-xl border text-left transition-all flex flex-col justify-between ${
                      isSelected
                        ? "bg-cyan-950/30 border-cyan-500 ring-1 ring-cyan-500/40 shadow-glow"
                        : "bg-surface-200/60 hover:bg-surface-100 border-slate-800"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-200 font-mono">
                        {entity.name}
                      </span>
                      <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-surface-300 text-cyan-400 border border-slate-700">
                        {entity.version}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">
                      {entity.description}
                    </p>
                    <div className="mt-2 text-[10px] font-mono text-slate-500 truncate">
                      {entity.serviceUri}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Sandbox & Metadata Tabs (8 Cols) */}
        <div className="lg:col-span-8">
          <div className="p-5 rounded-2xl glass-panel border border-slate-800/80 space-y-4">
            {/* Entity Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-white font-mono">
                    {selectedEntity.name}
                  </h3>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">
                    OData {selectedEntity.version}
                  </span>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">{selectedEntity.description}</p>
              </div>

              {/* Tabs */}
              <div className="flex items-center gap-1 p-1 rounded-xl bg-surface-200 border border-slate-800">
                <button
                  onClick={() => setActiveTab("sandbox")}
                  className={`px-3 py-1 rounded-lg text-xs font-mono transition-all ${
                    activeTab === "sandbox"
                      ? "bg-cyan-500/20 text-cyan-300 font-semibold"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  Test Sandbox
                </button>
                <button
                  onClick={() => setActiveTab("fields")}
                  className={`px-3 py-1 rounded-lg text-xs font-mono transition-all ${
                    activeTab === "fields"
                      ? "bg-cyan-500/20 text-cyan-300 font-semibold"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  Field Schema ({selectedEntity.fields.length})
                </button>
                <button
                  onClick={() => setActiveTab("metadata")}
                  className={`px-3 py-1 rounded-lg text-xs font-mono transition-all ${
                    activeTab === "metadata"
                      ? "bg-cyan-500/20 text-cyan-300 font-semibold"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  $metadata XML
                </button>
              </div>
            </div>

            {/* Tab 1: Test Sandbox */}
            {activeTab === "sandbox" && (
              <div className="space-y-4">
                {/* Query bar */}
                <div className="space-y-2">
                  <label className="block text-[10px] font-mono uppercase text-slate-400">
                    OData Service Endpoint & Query Parameters
                  </label>
                  <div className="flex gap-2">
                    <div className="flex-1 flex items-center bg-[#080b11] border border-slate-800 rounded-xl px-3 py-2 text-xs font-mono text-slate-300">
                      <span className="text-slate-500 mr-1">GET</span>
                      <span className="text-cyan-400">{selectedEntity.serviceUri}?</span>
                      <input
                        type="text"
                        value={filterQuery}
                        onChange={(e) => setFilterQuery(e.target.value)}
                        className="flex-1 bg-transparent text-slate-200 focus:outline-none ml-1"
                      />
                    </div>
                    <button
                      onClick={handleRunQuery}
                      disabled={isQueryRunning}
                      className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-bold text-xs shadow-glow transition-all flex items-center gap-1.5 disabled:opacity-50"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>{isQueryRunning ? "Fetching..." : "Send Request"}</span>
                    </button>
                  </div>
                </div>

                {/* Response Viewer */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs font-mono">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800 font-bold">
                        200 OK
                      </span>
                      <span className="text-slate-400">Time: 142ms</span>
                    </div>
                    <button
                      onClick={handleCopyJson}
                      className="text-slate-400 hover:text-cyan-300 flex items-center gap-1 transition-colors"
                    >
                      {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copied ? "Copied" : "Copy Payload"}</span>
                    </button>
                  </div>

                  <div className="p-4 rounded-xl bg-[#06080d] border border-slate-900 font-mono text-xs text-cyan-300 overflow-x-auto max-h-96">
                    <pre>{JSON.stringify({ d: { results: selectedEntity.sampleRecords } }, null, 2)}</pre>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 2: Field Schema */}
            {activeTab === "fields" && (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs font-mono">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400">
                      <th className="pb-2">Field Name</th>
                      <th className="pb-2">EDM Type</th>
                      <th className="pb-2">Key?</th>
                      <th className="pb-2">Label / Description</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {selectedEntity.fields.map((field) => {
                      const isKey = selectedEntity.keyFields.includes(field.name);
                      return (
                        <tr key={field.name} className="hover:bg-surface-200/40">
                          <td className="py-2.5 font-bold text-slate-200 flex items-center gap-1.5">
                            {isKey && <Key className="w-3 h-3 text-amber-400" />}
                            <span>{field.name}</span>
                          </td>
                          <td className="py-2.5 text-cyan-400">{field.type}</td>
                          <td className="py-2.5">
                            {isKey ? (
                              <span className="text-[10px] text-amber-400 font-bold bg-amber-950 px-1.5 py-0.5 rounded border border-amber-800">
                                PRIMARY KEY
                              </span>
                            ) : (
                              <span className="text-slate-500">-</span>
                            )}
                          </td>
                          <td className="py-2.5 text-slate-300">{field.label}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}

            {/* Tab 3: $metadata XML */}
            {activeTab === "metadata" && (
              <div className="p-4 rounded-xl bg-[#06080d] border border-slate-900 font-mono text-xs text-slate-300 overflow-x-auto max-h-96">
                <pre>{`<edmx:Edmx xmlns:edmx="http://docs.oasis-open.org/odata/ns/edmx" Version="4.0">
  <edmx:DataServices>
    <Schema xmlns="http://docs.oasis-open.org/odata/ns/edm" Namespace="sap.s4.odata">
      <EntityType Name="${selectedEntity.name}">
        <Key>
          ${selectedEntity.keyFields.map((k) => `<PropertyRef Name="${k}" />`).join("\n          ")}
        </Key>
        ${selectedEntity.fields
          .map(
            (f) =>
              `<Property Name="${f.name}" Type="${f.type}" Nullable="${f.nullable}" />`
          )
          .join("\n        ")}
      </EntityType>
      <EntityContainer Name="EntityContainer">
        <EntitySet Name="${selectedEntity.entitySet}" EntityType="sap.s4.odata.${selectedEntity.name}" />
      </EntityContainer>
    </Schema>
  </edmx:DataServices>
</edmx:Edmx>`}</pre>
              </div>
            )}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
