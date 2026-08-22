import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://nexus-agent.vercel.app";
  const now = new Date();

  const routes = [
    { path: "", priority: 1.0, changeFrequency: "daily" as const },
    { path: "/dashboard", priority: 0.9, changeFrequency: "daily" as const },
    { path: "/agents", priority: 0.9, changeFrequency: "weekly" as const },
    { path: "/workflows", priority: 0.8, changeFrequency: "weekly" as const },
    { path: "/abap-modernizer", priority: 0.8, changeFrequency: "weekly" as const },
    { path: "/cap-generator", priority: 0.8, changeFrequency: "weekly" as const },
    { path: "/odata", priority: 0.7, changeFrequency: "weekly" as const },
    { path: "/knowledge", priority: 0.7, changeFrequency: "weekly" as const },
    { path: "/approvals", priority: 0.6, changeFrequency: "daily" as const },
    { path: "/audit-logs", priority: 0.6, changeFrequency: "daily" as const },
    { path: "/settings", priority: 0.5, changeFrequency: "monthly" as const },
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route.path}`,
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
