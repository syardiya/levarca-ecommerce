import { MetadataRoute } from "next";
import { BRAND_CONFIG } from "@/data/hijabVariants";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${BRAND_CONFIG.siteUrl}/sitemap.xml`,
  };
}
