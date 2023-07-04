import type { MetadataRoute } from "next"
import * as config from "@/lib/config"

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/keystatic/"],
    },
    sitemap: `${config.url}/sitemap.xml`,
  }
}
