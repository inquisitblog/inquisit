import { MetadataRoute } from "next"
import * as config from "@/lib/config"
import { getPosts } from "@/lib/posts"
import { getCategories } from "@/lib/categories"

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "blog", "categories"]
  const pageUrls = pages.map((page) => ({
    url: `${config.url}/${page}`,
    lastModified: new Date(),
  }))

  const posts = getPosts()
  const postUrls =
    posts &&
    posts.map((post) => ({
      url: `${config.url}/posts/${post.id}`,
      lastModified: new Date(post.date),
    }))

  const categories = getCategories()
  const categoryUrls = categories.map((tag) => ({
    url: `${config.url}/blog/categories/${tag}`,
    lastModified: new Date(),
  }))

  return [...pageUrls, ...postUrls, ...categoryUrls]
}
