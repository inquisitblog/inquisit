import { MetadataRoute } from "next"
import * as config from "@/lib/config"
import { getPostCategories, getPosts } from "@/lib/posts"

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "blog", "categories"]
  const pageUrls = pages.map((page) => ({
    url: `${config.url}/${page}`,
  }))

  const posts = getPosts()
  const postUrls =
    posts &&
    posts.map((post) => ({
      url: `${config.url}/posts/${post.id}`,
      lastModified: new Date(post.date),
    }))

  const categories = getPostCategories()
  const categoryUrls = categories.map((tag) => ({
    url: `${config.url}/blog/categories/${tag}`,
    lastModified: new Date(),
  }))

  return [...pageUrls, ...postUrls, ...categoryUrls]
}
