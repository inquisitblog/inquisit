
import type { MetadataRoute } from "next";
import * as config from '@/config'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: '/',
      disallow: "/api/",
    },
    sitemap: `${config.url}/sitemap.xml`
  }
}