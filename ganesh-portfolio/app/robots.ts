import { MetadataRoute } from "next";
import { DEVELOPER_INFO } from "@/lib/constants";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = DEVELOPER_INFO.siteUrl || "https://ganeshwakchaure.dev";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
      },
      {
        userAgent: "Bingbot",
        allow: "/",
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
