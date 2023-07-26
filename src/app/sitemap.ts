import { MetadataRoute } from "next"

import reader from "@/lib/keystatic"
import { getPosts } from "@/lib/data"


export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const settings = await reader.singletons.settings.read()
  if (!settings) throw new Error("Keystatic Content Not Found - Site Settings.")

  const categories = await reader.collections.categories.list()

  const { url } = settings

  const pages = ["", "blog", "categories"]
  const pageUrls = pages.map((page) => ({
    url: `${url}/${page}`,
    lastModified: new Date(),
  }))

  const posts = await getPosts()

  const postUrls = posts.map((post) => ({
    url: `${url}/blog/${post.slug}`,
    lastModified: new Date(post.updatedDate),
  }))

  const categoryUrls = categories.map((category) => ({
    url: `${url}/blog/categories/${category}`,
    lastModified: new Date(),
  }))

  return [...pageUrls, ...postUrls, ...categoryUrls]
}
