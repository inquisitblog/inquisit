import reader from "@/lib/keystatic"
import { getPosts } from "@/lib/data"

import BlogPostsGrid from "@/components/BlogPostsGrid"

export async function generateMetadata() {
  const blogpage = await reader.singletons.blogpage.read()
  if (!blogpage) throw new Error("Keystatic Content Not Found - Blog Page")

  const { metaTitle: title, metaDescription: description } = blogpage

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: "/blog",
    },
    twitter: {
      title,
      description,
    },
    alternates: {
      canonical: "/blog",
    },
  }
}

const Blog = async () => {
  const blogpage = await reader.singletons.blogpage.read()
  if (!blogpage) throw new Error("Keystatic Content Not Found - Blog Page")

  const { headline } = blogpage

  const posts = await getPosts()

  return (
    <main
      id="blog"
      className="mx-auto min-h-[80vh] max-w-screen-2xl px-8 py-8 md:px-16 md:py-16"
    >
      <h1 className="mb-12 text-4xl font-bold text-accent md:mb-16 md:text-5xl xl:text-6xl">
        {headline}
      </h1>

      <BlogPostsGrid posts={posts} />
    </main>
  )
}

export default Blog
