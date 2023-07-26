import { type Metadata } from "next"
import { notFound } from "next/navigation"

import reader from "@/lib/keystatic"
import { getPosts, getCategory } from "@/lib/data"
import { capitalise } from "@/lib/utils"

import BlogPostsGrid from "@/components/BlogPostsGrid"

type ParamsType = {
  params: { name: string; slug: string }
}

export async function generateStaticParams() {
  const categories = await reader.collections.categories.list()

  return categories.map((slug) => ({
    slug,
  }))
}

export async function generateMetadata({ params }: ParamsType) {
  const { slug } = params

  const settings = await reader.singletons.settings.read()
  if (!settings) throw new Error("Keystatic Content Not Found - Site Settings")

  const { url, siteName } = settings

  const category = await getCategory(slug)
  if (!category) {
    return {
      title: "Category not found",
    }
  }

  const { name } = category

  const title = `${capitalise(name)} - Blog Posts`
  const description = `${capitalise(name)} Category of Blog Posts.`
  const imgUrl = ""

  const meta: Metadata = {
    title,
    description,

    openGraph: {
      title,
      description,
      images: [imgUrl],
      url,
      siteName,
      type: "website",
    },

    twitter: {
      title: `${capitalise(name)} - Blog`,
      description,
      images: [imgUrl],
      // creator: twitterUsername,
      card: "summary",
    },

    themeColor: "#FBEAD2",
    alternates: {
      canonical: `/blog/categories/${slug}`,
    },
  }

  return meta
}

const Category = async ({ params }: ParamsType) => {
  const { slug } = params

  const category = await getCategory(slug)
  if (!category) {
    return notFound()
  }

  const posts = await getPosts({ number: -1, category: slug })

  return (
    <main className="mx-auto min-h-[80vh] max-w-screen-2xl px-8 py-8 md:gap-6 md:px-16 md:py-16">
      <h1 className="mb-12 text-4xl font-bold text-accent md:mb-16 md:text-5xl xl:text-6xl">
        {capitalise(category.name)}
      </h1>
      <BlogPostsGrid posts={posts} />
    </main>
  )
}

export default Category
