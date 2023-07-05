import { MetadataRoute } from "next"
import * as config from "@/lib/config"
import { getPosts } from "@/lib/data"
import { allCategories } from "contentlayer/generated"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pages = ["", "blog", "categories"]
  const pageUrls = pages.map((page) => ({
    url: `${config.url}/${page}`,
    lastModified: new Date(),
  }))

  const posts = await getPosts()

  const postUrls = posts.map((post) => ({
    url: `${config.url}/blog/${post.slug}`,
    lastModified: new Date(post.date),
  }))

  const categories = allCategories
  const categoryUrls = categories.map((tag) => ({
    url: `${config.url}/blog/categories/${tag.slug}`,
    lastModified: new Date(),
  }))

  return [...pageUrls, ...postUrls, ...categoryUrls]
}
