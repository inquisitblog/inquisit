// import rehypeSlug from "rehype-slug"
// import rehypeAutolinkHeadings from "rehype-autolink-headings"
import { singleCategory } from "./categories"
import { singleAuthor } from "./authors"
import { Post, allPosts } from "contentlayer/generated"

export function getPosts(
  noOfPosts?: number,
  categorySlug?: string
): BlogPost[] | [] {
  const rawPosts: Post[] = allPosts

  let posts: BlogPost[] = rawPosts.map((rawPost) => {
    const { post } = parsePost(rawPost, false)

    return post
  })

  let limit

  if (noOfPosts !== -1) {
    limit = noOfPosts
  }

  // Sort by date
  posts = posts.sort((a, b) => (a.date < b.date ? 1 : -1))

  // If category is requested, check category exists
  if (categorySlug) {
    const category = singleCategory(categorySlug)

    if (!category) {
      return []
    } else {
      posts = posts.filter((post) => {
        return post.tags.some((tag) => tag.slug === categorySlug)
      })
    }
  }

  if (limit) {
    posts = posts.slice(0, limit)
  }

  return posts
}

export function getPost(slug: string): BlogPostWithHtml | undefined {
  const posts = allPosts

  const rawPost = posts.find((post) => slug === post.slug)

  if (rawPost) {
    const { post, content } = parsePost(rawPost, true)

    return { ...post, content }
  } else {
    return
  }
}

function parsePost(
  rawPost: Post,
  withContent: boolean
): { post: BlogPost; content: string } {
  // Remove unnecessary contentlayer properties
  const { _id, _raw, type, body, ...post } = rawPost

  // Parse string[] into Category[]
  const tags: Category[] = post.tags.map((tag: string) => {
    const category = singleCategory(tag)
    if (!category) {
      throw new Error(`Invalid tag ${tag} in post: ${post.slug}`)
    }
    return category
  })

  // Parse string[] into Author[]
  const authors: Author[] = post.authors.map((authorSlug: string) => {
    const author = singleAuthor(authorSlug)
    if (!author) {
      throw new Error(`Invalid author - ${authorSlug} in post: ${post.slug}`)
    }
    return author
  })

  // Overwrite post with parsed values
  const blogPost: BlogPost = { ...post, tags, authors }

  return { post: blogPost, content: body.code }
}
