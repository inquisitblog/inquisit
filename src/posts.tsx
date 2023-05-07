import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { remark } from "remark"
import html from "remark-html"

const postsDirectory = path.join(process.cwd(), "blogposts")

export function getPosts(limit?: number): BlogPost[] {
  // Get blog filenames
  const fileNames = fs.readdirSync(postsDirectory)

  const allPostsData = fileNames.map((fileName) => {
    // Remove .md from name to get id
    const id = fileName.replace(/\.md$/, "")

    // Read md file as string
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, "utf8")

    // Use matter to parse metadata
    const matterResult = matter(fileContents)

    const blogPost: BlogPost = {
      id,
      title: matterResult.data.title,
      description: matterResult.data.description,
      imgUrl: matterResult.data.imgUrl,
      imgAlt: matterResult.data.imgAlt,
      date: matterResult.data.date,
    }

    return blogPost
  })

  // Sort by date
  const sortedPosts = allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1))

  const allPosts = limit ? sortedPosts.slice(0, limit) : sortedPosts

  return sortedPosts
}

export async function getPost(id: string) {
  const fullPath = path.join(postsDirectory, id + ".md")
  const fileContents = fs.readFileSync(fullPath, "utf8")

  // Use matter to parse metadata
  const matterResult = matter(fileContents)

  // Process md into html
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content)
  const contentHtml = processedContent.toString()

  // Meta + html content + id
  const blogPostWithHtml: BlogPost & { contentHtml: string } = {
    id,
    title: matterResult.data.title,
    description: matterResult.data.description,
    imgUrl: matterResult.data.imgUrl,
    imgAlt: matterResult.data.imgAlt,
    date: matterResult.data.date,
    contentHtml,
  }

  return blogPostWithHtml
}
