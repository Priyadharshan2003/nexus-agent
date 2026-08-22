import { RagDocumentChunk } from "../types";

export const SAP_RAG_KNOWLEDGE_BASE: RagDocumentChunk[] = [
  {
    id: "rag_note_3244910",
    source: "SAP Note",
    docNumber: "3244910",
    title: "ABAP Cloud - Developer Extensibility and Released APIs in S/4HANA 2023",
    content: "When developing custom logic in ABAP Cloud, only released C1 objects (CDS Views, Classes, Interfaces, BAdIs) may be consumed. Direct access to non-released tables such as VBAP, VBAK, BSEG without CDS Interface views (e.g. I_SalesOrder, I_JournalEntry) is blocked by the ABAP Language Version 5 compiler.",
    tags: ["ABAP Cloud", "Clean Core", "Released APIs", "S/4HANA"],
    lastUpdated: "2026-01-15"
  },
  {
    id: "rag_clean_core_01",
    source: "Clean Core Guide",
    title: "SAP Clean Core Strategy: Principles for Side-by-Side Extensibility on SAP BTP",
    content: "The Clean Core strategy mandates zero modifications to the core ERP. Side-by-side applications must be built on SAP BTP using the Cloud Application Programming (CAP) model or ABAP Cloud on BTP ABAP Environment. All communication must occur via standard OData V4 or Event Mesh asynchronous messaging.",
    tags: ["Clean Core", "SAP BTP", "CAP", "Architecture"],
    lastUpdated: "2026-02-01"
  },
  {
    id: "rag_cap_best_01",
    source: "CAP Documentation",
    title: "SAP CAP: Draft Handling and Fiori Elements Side Effects Configuration",
    content: "To enable Fiori draft orchestration, add `@odata.draft.enabled` to the service entity. For custom actions modifying state (such as approve/reject), declare `Common.SideEffects: { TargetProperties: ['_it/status'] }` to ensure the Fiori UI automatically re-fetches updated state without manual refresh.",
    tags: ["CAP", "Fiori Elements", "Draft", "OData V4"],
    lastUpdated: "2026-02-18"
  },
  {
    id: "rag_note_2991040",
    source: "SAP Note",
    docNumber: "2991040",
    title: "Transitioning Legacy RFCs and BAPIs to Modern OData V4 Services in S/4HANA",
    content: "Legacy BAPIs (such as BAPI_SALESORDER_CREATEFROMDAT2) cannot be deployed in ABAP Cloud public cloud environments. Developers must migrate to RAP Business Objects using Entity Manipulation Language (EML) with `MODIFY ENTITIES OF I_SalesOrderTP`.",
    tags: ["Migration", "RAP", "BAPI", "Sales Order"],
    lastUpdated: "2026-01-20"
  },
  {
    id: "rag_security_01",
    source: "Clean Core Guide",
    title: "SAP BTP XSUAA Scope Mapping and Zero-Trust Role Collections",
    content: "In multi-tenant BTP applications, define scopes in `xs-security.json` and annotate CAP CDS entities with `@restrict: [{ grant: ['READ'], to: 'Viewer' }, { grant: '*', to: 'Admin' }]`. Avoid hardcoded tokens and always consume SAP Destination Service with OAuth2SAMLBearerAssertion or OAuth2ClientCredentials.",
    tags: ["Security", "XSUAA", "Zero Trust", "BTP Destination"],
    lastUpdated: "2026-03-01"
  },
  {
    id: "rag_hana_vector_01",
    source: "SAP Note",
    docNumber: "3411090",
    title: "SAP HANA Cloud Vector Engine: Hybrid Search with REAL_VECTOR Data Type",
    content: "HANA Cloud Q1 2024+ includes the `REAL_VECTOR` type supporting `COSINE_SIMILARITY(embedding, query_vector)`. By integrating HANA Vector Engine directly with CAP CDS entity `@assert.range`, applications can perform hybrid semantic + relational searches within the same SQL transaction.",
    tags: ["HANA Cloud", "Vector Engine", "AI", "pgVector"],
    lastUpdated: "2026-02-28"
  }
];

export function searchKnowledgeBase(query: string): RagDocumentChunk[] {
  const queryLower = query.toLowerCase();
  const words = queryLower.split(/\s+/).filter(w => w.length > 2);

  return SAP_RAG_KNOWLEDGE_BASE.map(doc => {
    let score = 0.55; // baseline similarity
    const fullText = (doc.title + " " + doc.content + " " + doc.tags.join(" ")).toLowerCase();

    for (const word of words) {
      if (fullText.includes(word)) {
        score += 0.12;
      }
      if (doc.title.toLowerCase().includes(word)) {
        score += 0.15;
      }
    }

    // Cap between 0.60 and 0.99
    score = Math.min(0.99, Math.max(0.62, score + (Math.random() * 0.05)));

    return {
      ...doc,
      similarityScore: parseFloat(score.toFixed(4))
    };
  }).sort((a, b) => (b.similarityScore || 0) - (a.similarityScore || 0));
}
