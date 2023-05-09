import * as config from "@/config"
import BlogPostsGrid from "@/components/BlogPostsGrid"
import { getPosts } from "@/posts"
import { capitalise } from "@/utils"
import { Metadata } from "next"
import { notFound } from "next/navigation"
import { FC } from "react"

type ParamsType = {
  params: { slug: string }
}

export const fetchCache = "force-cache"

export async function generateMetadata({ params }: ParamsType) {
  const { slug } = params

  const posts = getPosts(-1, slug)

  if (!posts.length) {
    return {
      title: "Category not found",
    }
  }

  const title = `${capitalise(slug)} - Blog`
  const description = `${capitalise(slug)} Category of posts on the Blog.`
  const imgUrl = ""

  const meta: Metadata = {
    title,
    description: "",

    openGraph: {
      title,
      description,
      images: [imgUrl],
      url: config.url,
      siteName: config.title,
      type: "website",
    },

    twitter: {
      title: `${capitalise(slug)} - Blog`,
      description,
      images: [imgUrl],
      creator: config.twitterUsername,
      card: "summary",
    },

    themeColor: "#FBEAD2",
    alternates: {
      canonical: `/blog/${slug}`,
      //   types: {
      //     "application/rss+xml": "url/rss.xml",
      //   },
    },
  }

  return meta
}

const Category: FC<ParamsType> = ({ params }) => {
  const { slug } = params

  const posts = getPosts(-1, slug)

  if (!posts.length) {
    return notFound()
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
