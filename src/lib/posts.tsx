import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { remark } from "remark"
import html from "remark-html"

export const postsDir = path.join("data", "blogposts")

export function getPosts(noOfPosts?: number, tag?: string): BlogPost[] {
  // Get blog filenames
  const fileNames = fs.readdirSync(postsDir)

  const allPostsData = fileNames.map((fileName) => {
    // Remove .md from name to get id
    const id = fileName.replace(/\.md$/, "")

    const { blogPost } = parsePost(id, fileName, false)

    return blogPost
  })

  let limit

  if (noOfPosts !== -1) {
    limit = noOfPosts
  }

  // Sort by date
  const sortedPosts = allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1))

  let allPosts = sortedPosts

  // If category is requested check category exists
  if (tag) {
    if (sortedPosts.find((post) => post.tags.includes(tag)) === undefined) {
      return []
    } else {
      allPosts = sortedPosts.filter((post) => post.tags.includes(tag))
    }
  }

  // If limit is requested, slice to that size
  allPosts = limit ? allPosts.slice(0, limit) : allPosts

  return allPosts
}

export async function getPost(id: string): Promise<BlogPostWithHtml> {
  const { blogPost, matterResult } = await parsePost(id, id + ".md", true)

  // Process md into html
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content)
  const contentHtml = processedContent.toString()

  const blogPostWithHtml: BlogPostWithHtml = {
    ...blogPost,
    contentHtml,
  }

  return blogPostWithHtml
}

function parsePost(id: string, fileName: string, withHtml: boolean) {
  // Read md file as string
  const fullPath = path.join(postsDir, fileName)
  const fileContents = fs.readFileSync(fullPath, "utf8")

  // Use matter to parse metadata
  const matterResult = matter(fileContents)

  const blogPost: BlogPost = {
    id,
    title: matterResult.data.title,
    description: matterResult.data.description,
    tags: matterResult.data.tags.split(", "),
    imgUrl: matterResult.data.imgUrl,
    imgAlt: matterResult.data.imgAlt,
    authors: matterResult.data.authors,
    date: matterResult.data.date,
  }

  return { blogPost, matterResult }
}
