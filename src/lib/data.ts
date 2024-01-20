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

async function parseCollections(slugs: string[]) {
  const collections = await Promise.all(
    slugs.map(async (slug) => {
      const collection = await reader.collections.collections.read(slug)

      if (!collection)
        throw new Error(`Keystatic Content Not Found - Collection - ${slug}`)

      return {
        slug,
        ...collection,
        authors: await parseAuthors([...collection.authors]),
        posts: await parsePosts([...collection.posts]),
      }
    }),
  )

  return collections
}
export async function getCollections(options?: {
  number?: number
  author?: string
}) {
  const slugs = await reader.collections.collections.list()

  let collections = await parseCollections(slugs)

  // Sort each collections posts by latest -> Use the latest post from each to sort collections by latest
  collections = collections.sort((a, b) => {
    const aPost = a.posts.sort((a, b) => (a.pubDate < b.pubDate ? 1 : -1))[0]
    const bPost = b.posts.sort((a, b) => (a.pubDate < b.pubDate ? 1 : -1))[0]

    return aPost.pubDate < bPost.pubDate ? 1 : -1
  })

  // If no options, return all collections
  if (!options) {
    return collections
  }

  const { author, number } = options

  if (author) {
    collections = collections.filter((collection) => {
      // If any posts have any matching authors, return true so it gets added
      if (
        collection.posts.filter((post) => {
          // If any postAuthor matches provided author, the array will have a length
          if (
            post.authors.filter((postAuthor) => author === postAuthor.slug)
              .length > 0
          )
            return true
        }).length > 0
      )
        return true
    })
  }

  if (number && number !== -1) {
    collections = collections.slice(0, number)
  }

  return collections
}

export async function getCollection(slug: string) {
  const collection = await reader.collections.collections.read(slug)

  if (collection) {
    return {
      slug,
      ...collection,
      authors: await parseAuthors([...collection.authors]),
      posts: await parsePosts([...collection.posts]),
    }
  } else return undefined
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

  posts = posts.filter((post) => post.published)

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

  if (author) {
    posts = posts.filter((post) => {
      // If any postAuthor matches provided author, the array will have a length
      if (
        post.authors.filter((postAuthor) => author === postAuthor.slug).length >
        0
      ) {
        return true
      }
    })
  }

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

export async function getCollectionFromPost(postSlug: string) {
  const collections = await getCollections()

  const result = collections.filter(
    (collection) =>
      collection.posts.filter((post) => post.slug === postSlug).length > 0,
  )

  if (result.length === 1) {
    return result[0]
  } else return undefined
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
