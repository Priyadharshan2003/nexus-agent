import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Nexus Agent | Autonomous SAP BTP Multi-Agent Platform",
    short_name: "Nexus Agent",
    description:
      "Enterprise-grade Agentic AI SaaS platform for SAP BTP, S/4HANA Modernization, ABAP Cloud conversion, and CAP service generation.",
    start_url: "/dashboard",
    display: "standalone",
    background_color: "#07090e",
    theme_color: "#0070f2",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
      {
        src: "/icon",
        sizes: "32x32",
        type: "image/png",
      },
      {
        src: "/apple-icon",
        sizes: "180x180",
        type: "image/png",
      },
    ],
    categories: ["business", "developer-tools", "productivity"],
  };
}
