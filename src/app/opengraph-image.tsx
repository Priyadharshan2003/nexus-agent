import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const alt = "Nexus Agent - Autonomous SAP BTP Multi-Agent Orchestrator";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "60px 80px",
          background: "linear-gradient(135deg, #070b14 0%, #0c162d 40%, #030712 100%)",
          fontFamily: "system-ui, -apple-system, sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Glow Effects */}
        <div
          style={{
            position: "absolute",
            top: "-10%",
            right: "-10%",
            width: "500px",
            height: "500px",
            background: "radial-gradient(circle, rgba(0, 112, 242, 0.25) 0%, rgba(0,0,0,0) 70%)",
            borderRadius: "50%",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "-15%",
            left: "10%",
            width: "450px",
            height: "450px",
            background: "radial-gradient(circle, rgba(99, 102, 241, 0.2) 0%, rgba(0,0,0,0) 70%)",
            borderRadius: "50%",
          }}
        />

        {/* Top Header / Badges */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", zIndex: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "8px 18px",
                borderRadius: "12px",
                background: "linear-gradient(135deg, #0070f2 0%, #0050b3 100%)",
                color: "#ffffff",
                fontWeight: 900,
                fontSize: 22,
                letterSpacing: "-0.02em",
                boxShadow: "0 4px 20px rgba(0, 112, 242, 0.4)",
              }}
            >
              SAP AI
            </div>
            <span style={{ fontSize: 26, fontWeight: 800, color: "#ffffff", letterSpacing: "-0.03em" }}>
              Nexus Agent
            </span>
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "8px 18px",
              borderRadius: "999px",
              background: "rgba(56, 189, 248, 0.1)",
              border: "1px solid rgba(56, 189, 248, 0.3)",
              color: "#38bdf8",
              fontSize: 16,
              fontWeight: 600,
            }}
          >
            ⚡ Autonomous Swarm Control Plane
          </div>
        </div>

        {/* Center Title & Tagline */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px", zIndex: 10 }}>
          <h1
            style={{
              fontSize: 54,
              fontWeight: 900,
              color: "#ffffff",
              letterSpacing: "-0.04em",
              lineHeight: 1.15,
              margin: 0,
            }}
          >
            Autonomous Multi-Agent Swarm for{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #38bdf8 0%, #0070f2 50%, #a855f7 100%)",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              SAP BTP & Clean Core
            </span>
          </h1>
          <p style={{ fontSize: 22, color: "#94a3b8", lineHeight: 1.5, margin: 0, maxWidth: "900px" }}>
            Refactor legacy ABAP monoliths into RAP Business Objects, generate full-stack SAP CAP services, and enforce
            enterprise Human-in-the-Loop governance.
          </p>
        </div>

        {/* Feature Pills Footer */}
        <div style={{ display: "flex", gap: "14px", zIndex: 10 }}>
          {["ABAP Modernizer", "CAP CDS Studio", "S/4HANA OData", "HANA Vector RAG", "Audit Governance"].map(
            (tag, idx) => (
              <div
                key={idx}
                style={{
                  padding: "10px 18px",
                  borderRadius: "10px",
                  background: "rgba(15, 23, 42, 0.8)",
                  border: "1px solid rgba(148, 163, 184, 0.2)",
                  color: "#e2e8f0",
                  fontSize: 15,
                  fontWeight: 600,
                }}
              >
                {tag}
              </div>
            )
          )}
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
