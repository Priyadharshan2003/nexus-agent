import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "NEXUS Agent | Autonomous SAP BTP Multi-Agent Orchestrator",
  description: "Enterprise-grade Agentic AI SaaS platform for SAP BTP, S/4HANA Modernization, ABAP Cloud conversion, and CAP service generation.",
  icons: {
    icon: "/favicon.ico"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="bg-[#07090e] text-slate-100 min-h-screen overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
