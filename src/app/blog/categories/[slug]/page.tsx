import * as config from "@/lib/config"
import BlogPostsGrid from "@/components/BlogPostsGrid"
import { getPosts } from "@/lib/posts"
import { singleCategory } from "@/lib/categories"
import { capitalise } from "@/lib/utils"
import { Metadata } from "next"
import { notFound } from "next/navigation"
import { FC } from "react"
import { allCategories } from "contentlayer/generated"

type ParamsType = {
  params: { name: string; slug: string }
}

export async function generateStaticParams() {
  const categories = allCategories

  return categories.map((category) => ({
    slug: category.slug,
  }))
}

export async function generateMetadata({ params }: ParamsType) {
  const { slug } = params

  const category = await singleCategory(slug)
  if (!category) {
    return {
      title: "Category not found",
    }
  }

  const title = `${capitalise(category.name)} - Blog Posts`
  const description = `${capitalise(category.name)} Category of Blog Posts.`
  const imgUrl = ""

  const meta: Metadata = {
    title,
    description,

    openGraph: {
      title,
      description,
      images: [imgUrl],
      url: config.url,
      siteName: config.title,
      type: "website",
    },

    twitter: {
      title: `${capitalise(category.name)} - Blog`,
      description,
      images: [imgUrl],
      creator: config.twitterUsername,
      card: "summary",
    },

    themeColor: "#FBEAD2",
    alternates: {
      canonical: `/blog/categories/${slug}`,
      types: {
        "application/rss+xml": `${config.url}/rss.xml`,
      },
    },
  }

  return meta
}

// @ts-expect-error Async Server Component
const Category: FC<ParamsType> = async ({ params }) => {
  const { slug } = params

  const category = await singleCategory(slug)
  if (!category) {
    return notFound()
  }

  const posts = await getPosts(-1, category.slug)

  return (
    <main className="mx-auto max-w-screen-2xl px-8 py-8 md:gap-6 md:py-16">
      <h1 className="mb-12 text-4xl font-bold text-accent md:mb-16 md:text-5xl xl:text-6xl">
        {capitalise(category.name)}
      </h1>
      <BlogPostsGrid posts={posts} />
    </main>
  )
}

export default Category
