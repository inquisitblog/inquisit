import fs from "fs"
import path from "path"
import { compileMDX } from "next-mdx-remote/rsc"
// import rehypeSlug from "rehype-slug"
// import rehypeAutolinkHeadings from "rehype-autolink-headings"
import { getCategory } from "./categories"
import { singleAuthor } from "./authors"
import matter from "gray-matter"

export const postsDir = path.join("data", "blogposts")

export function getPostIDs(): { id: string; date: string }[] {
  const fileNames = fs.readdirSync(postsDir)

  const postsIDs = fileNames.map((fileName) => {
    const id = fileName.replace(/\.mdx$/, "")

    const fullPath = path.join(postsDir, fileName)

    const fileContents = fs.readFileSync(fullPath, "utf8")
    const { data } = matter(fileContents)

    console.log(data.date)

    return { id, date: data.date }
  })

  return postsIDs
}

export async function getPosts(
  noOfPosts?: number,
  categorySlug?: string
): Promise<BlogPostMetaParsed[]> {
  // Get blog filenames
  const fileNames = fs.readdirSync(postsDir)

  const allPostsData = await Promise.all(
    fileNames.map(async (fileName) => {
      // Remove .mdx from name to get id
      const id = fileName.replace(/\.mdx$/, "")

      const { blogPost } = await parsePost(id, fileName)

      return blogPost
    })
  )

  let limit

  if (noOfPosts !== -1) {
    limit = noOfPosts
  }

  // Sort by date
  const sortedPosts = allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1))

  let allPosts = sortedPosts

  // If category is requested check category exists
  if (categorySlug) {
    const category = getCategory(categorySlug)

    if (!category) {
      return []
    } else {
      allPosts = sortedPosts.filter((post) => {
        return post.tags.some((tag) => tag.slug === categorySlug)
      })
    }
  }

  // If limit is requested, slice to that size
  allPosts = limit ? allPosts.slice(0, limit) : allPosts

  return allPosts
}

export async function getPost(id: string): Promise<BlogPostWithHtml> {
  const { blogPost, content } = await parsePost(id, id + ".mdx")

  const blogPostWithHtml: BlogPostWithHtml = {
    ...blogPost,
    content,
  }

  return blogPostWithHtml
}

async function parsePost(id: string, fileName: string) {
  // Read md file as string
  const fullPath = path.join(postsDir, fileName)
  const fileContents = fs.readFileSync(fullPath, "utf8")

  const { frontmatter, content } = await compileMDX<BlogPostMeta>({
    source: fileContents,
    options: {
      parseFrontmatter: true,
      // mdxOptions: {
      //   rehypePlugins: [
      //     rehypeSlug,
      //     [rehypeAutolinkHeadings, { behavior: "wrap" }],
      //   ],
      // },
    },
  })

  const tags: Category[] = frontmatter.tags.map((tag: string) => {
    const category = getCategory(tag)
    if (!category) {
      throw new Error(`Invalid tag in post: ${id}`)
    }
    return category
  })

  const authors: Author[] = frontmatter.authors.map((authorSlug: string) => {
    const author = singleAuthor(authorSlug)
    if (!author) {
      throw new Error(`Invalid author in post: ${id}`)
    }
    return author
  })

  const blogPost: BlogPostMetaParsed = {
    id,
    title: frontmatter.title,
    description: frontmatter.description,
    tags,
    imgUrl: frontmatter.imgUrl,
    imgAlt: frontmatter.imgAlt,
    authors,
    date: frontmatter.date,
  }

  return { blogPost, content }
}
