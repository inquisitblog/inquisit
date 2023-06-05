import { MetadataRoute } from "next"
import * as config from "@/lib/config"
import { postsDir } from "@/lib/posts"
import { getCategories } from "@/lib/categories"
import fs from "fs"
import path from "path"
import matter from "gray-matter"

function getPostIDs(): { id: string; date: string }[] {
  const fileNames = fs.readdirSync(postsDir)

  const postsIDs = fileNames.map((fileName) => {
    const id = fileName.replace(/\.mdx$/, "")

    const fullPath = path.join(postsDir, fileName)

    const fileContents = fs.readFileSync(fullPath, "utf8")
    const matterResult = matter(fileContents)

    return { id, date: matterResult.data.date }
  })

  return postsIDs
}

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = ["", "blog", "categories"]
  const pageUrls = pages.map((page) => ({
    url: `${config.url}/${page}`,
    lastModified: new Date(),
  }))

  const postUrls = getPostIDs().map((post) => ({
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
