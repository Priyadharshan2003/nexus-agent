import type { Metadata, Viewport } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://nexus-agent.vercel.app";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#07090e" },
    { media: "(prefers-color-scheme: light)", color: "#0070f2" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Nexus Agent | Autonomous SAP BTP Multi-Agent Orchestrator",
    template: "%s | Nexus Agent",
  },
  description:
    "Enterprise-grade Agentic AI SaaS platform for SAP BTP, S/4HANA Modernization, ABAP Cloud conversion, RAP Business Objects, and CAP service generation with Human-in-the-Loop governance.",
  applicationName: "Nexus Agent",
  authors: [{ name: "Nexus Agent Open Source Contributors", url: "https://github.com/Priyadharshan2003/nexus-agent" }],
  creator: "Nexus Agent Team",
  publisher: "Nexus Agent",
  keywords: [
    "SAP",
    "SAP BTP",
    "SAP S/4HANA",
    "Agentic AI",
    "Multi-Agent Swarm",
    "ABAP Modernizer",
    "Clean Core",
    "SAP CAP",
    "Cloud Application Programming",
    "RAP",
    "RESTful Application Programming",
    "CDS Views",
    "OData V4",
    "HANA Vector",
    "SAP AI Core",
    "Enterprise AI",
    "Open Source",
  ],
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/icon.svg", sizes: "180x180", type: "image/svg+xml" },
    ],
    shortcut: "/icon.svg",
  },
  manifest: "/manifest.webmanifest",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Nexus Agent",
    title: "Nexus Agent | Autonomous SAP BTP Multi-Agent Orchestrator",
    description:
      "Accelerate SAP S/4HANA & BTP modernization with an autonomous multi-agent swarm: ABAP Cloud refactoring, CAP service generation, and Clean Core governance.",
    images: [
      {
        url: "/icon.svg",
        width: 1200,
        height: 630,
        alt: "Nexus Agent - Autonomous SAP BTP Multi-Agent Orchestrator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nexus Agent | Autonomous SAP BTP Multi-Agent Orchestrator",
    description:
      "Accelerate SAP S/4HANA & BTP modernization with an autonomous multi-agent swarm: ABAP Cloud refactoring, CAP service generation, and Clean Core governance.",
    creator: "@NexusAgent",
    images: ["/icon.svg"],
  },
  category: "Enterprise AI Software",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Nexus Agent",
    operatingSystem: "Web Browser, Cloud, SAP BTP",
    applicationCategory: "BusinessApplication",
    description:
      "Enterprise Multi-Agent Orchestration & Modernization Platform for SAP S/4HANA, ABAP Cloud, Clean Core, and SAP CAP.",
    url: siteUrl,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    author: {
      "@type": "Organization",
      name: "Nexus Agent Community",
      url: "https://github.com/Priyadharshan2003/nexus-agent",
    },
  };

  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var saved = localStorage.getItem('nexus_theme');
                  var theme = saved ? saved : 'dark';
                  if (theme === 'light') {
                    document.documentElement.classList.remove('dark');
                    document.documentElement.classList.add('light');
                  } else {
                    document.documentElement.classList.remove('light');
                    document.documentElement.classList.add('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen overflow-x-hidden antialiased bg-[#f4f6fa] dark:bg-[#07090e] text-slate-900 dark:text-slate-100 transition-colors duration-200">
        {children}
      </body>
    </html>
  );
}
