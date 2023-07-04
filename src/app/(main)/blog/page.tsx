import * as config from "@/lib/config"
import { getPosts } from "@/lib/posts"
import BlogPostsGrid from "@/components/BlogPostsGrid"

export const metadata = {
  title: "Blog",
  description: config.blogDescription,
  openGraph: {
    title: config.blogTitle,
    description: config.blogDescription,
    url: "/blog",
  },
  twitter: {
    title: config.blogTitle,
    description: config.blogDescription,
  },
  alternates: {
    canonical: "/blog",
    types: {
      "application/rss+xml": `${config.url}/rss.xml`,
    },
  },
}

const Blog = async () => {
  const posts = await getPosts()

  return (
    <main
      id="blog"
      className="mx-auto max-w-screen-2xl px-8 py-8 md:px-16 md:py-16"
    >
      <h1 className="mb-12 text-4xl font-bold text-accent md:mb-16 md:text-5xl xl:text-6xl">
        Blog Posts
      </h1>
      <BlogPostsGrid posts={posts} />
    </main>
  )
}

export default Blog
