import BlogPostsGrid from "@/components/BlogPostsGrid"
import { getPosts } from "@/posts"
import { notFound } from "next/navigation"
import { FC } from "react"

type Props = {
  params: { slug: string }
}

const Category: FC<Props> = ({ params }) => {
  const { slug } = params

  const posts = getPosts(-1, slug)

  if (!posts.length) {
    return notFound()
  }

  function capitalise(str: string) {
    return str.charAt(0)?.toUpperCase() + str.slice(1)
  }

  return (
    <main className="mx-auto max-w-screen-xl px-8 py-8 md:gap-6 md:py-16">
      <h1 className="mb-12 text-4xl font-bold text-accent md:mb-16 md:text-5xl xl:text-6xl">
        {capitalise(slug)}
      </h1>
      <BlogPostsGrid posts={posts} />
    </main>
  )
}

export default Category
