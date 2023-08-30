import reader from "./keystatic"

async function parseCategories(slugs: string[]) {
  const categories = Promise.all(
    slugs.map(async (slug) => {
      const category = await reader.collections.categories.read(slug)
      if (!category)
        throw new Error(`Keystatic Content Not Found - Category - ${slug}`)

      return { slug, ...category }
    }),
  )

  return categories
}

async function parseAuthors(slugs: string[]) {
  const authors = Promise.all(
    slugs.map(async (slug) => {
      const author = await reader.collections.authors.read(slug)
      if (!author)
        throw new Error(`Keystatic Content Not Found - Author - ${slug}`)

      return { slug, ...author }
    }),
  )

  return authors
}

async function parsePosts(slugs: string[]) {
  const posts = await Promise.all(
    slugs.map(async (slug) => {
      const post = await reader.collections.blogposts.read(slug, {
        resolveLinkedFiles: true,
      })

      if (!post)
        throw new Error(`Keystatic Content Not Found - Blog Post - ${slug}`)

      return {
        slug,
        ...post,
        authors: await parseAuthors([...post.authors]),
        categories: await parseCategories([...post.categories]),
      }
    }),
  )

  return posts
}

export async function getPosts(options?: {
  number?: number
  category?: string
  author?: string
}) {
  const slugs = await reader.collections.blogposts.list()

  let posts = await parsePosts(slugs)

  posts = posts.sort((a, b) => (a.pubDate < b.pubDate ? 1 : -1))

  // If no options, return all posts
  if (!options) {
    return posts
  }

  // Now we know we have options, let's work with them
  const { author, category, number } = options

  if (category) {
    posts = posts.filter((post) => {
      return post.categories.some((element) => element.slug === category)
    })
  }

  // if (author) {
  //   posts = posts.filter((post) => {
  //     return post.authors.some((element) => element.slug === author)
  //   })
  // } else {
  //   return []
  // }

  if (number && number !== -1) {
    posts = posts.slice(0, number)
  }

  return posts
}

export async function getPost(slug: string) {
  const post = await reader.collections.blogposts.read(slug, {
    resolveLinkedFiles: true,
  })

  if (post) {
    return {
      slug,
      ...post,
      authors: await parseAuthors([...post.authors]),
      categories: await parseCategories([...post.categories]),
    }
  } else {
    return undefined
  }
}

export async function getCategories() {
  const categories = await reader.collections.categories.all()

  return categories.map(({ slug, entry }) => ({ slug, ...entry }))
}
export async function getCategory(slug: string) {
  const category = await reader.collections.categories.read(slug)

  if (category) {
    return { slug, ...category }
  } else {
    return undefined
  }
}

export async function getAuthors() {
  const authors = await reader.collections.authors.all()

  return authors.map(({ slug, entry }) => ({ slug, ...entry }))
}
export async function getAuthor(slug: string) {
  const author = await reader.collections.authors.read(slug)

  if (author) {
    return { slug, ...author }
  } else {
    return undefined
  }
}
