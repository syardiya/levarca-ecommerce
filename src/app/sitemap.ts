import { MetadataRoute } from "next";
import { BRAND_CONFIG } from "@/data/hijabVariants";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: BRAND_CONFIG.siteUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
