import { MetadataRoute } from "next"

import reader from "@/lib/keystatic"
import { getPosts } from "@/lib/data"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const settings = await reader.singletons.settings.read()
  if (!settings) throw new Error("Keystatic Content Not Found - Site Settings.")

  const collections = await reader.collections.collections.list()
  const categories = await reader.collections.categories.list()
  const authors = await reader.collections.authors.list()

  const { url } = settings

  const pages = ["", "blog", "collections", "categories", "authors"]
  const pageUrls = pages.map((page) => ({
    url: `${url}/${page}`,
    lastModified: new Date(),
  }))

  const posts = await getPosts()

  const postUrls = posts.map((post) => ({
    url: `${url}/posts/${post.slug}`,
    lastModified: new Date(post.updatedDate),
  }))

  const collectionUrls = collections.map((collection) => ({
    url: `${url}/collections/${collection}`,
    lastModified: new Date(),
  }))

  const categoryUrls = categories.map((category) => ({
    url: `${url}/categories/${category}`,
    lastModified: new Date(),
  }))

  const authorUrls = authors.map((author) => ({
    url: `${url}/authors/${author}`,
    lastModified: new Date(),
  }))

  return [
    ...pageUrls,
    ...postUrls,
    ...collectionUrls,
    ...categoryUrls,
    ...authorUrls,
  ]
}
