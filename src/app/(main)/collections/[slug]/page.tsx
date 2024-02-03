import { type Metadata } from "next"
import { notFound } from "next/navigation"

import reader from "@/lib/keystatic"
import { getCollection } from "@/lib/data"

import PostCollection from "@/components/PostCollection"
import BackTo from "@/components/BackTo"

type ParamsType = { params: { slug: string } }

export async function generateStaticParams() {
  const collections = await reader.collections.collections.list()

  return collections.map((slug) => ({
    slug,
  }))
}

export async function generateMetadata({ params: { slug } }: ParamsType) {
  const settings = await reader.singletons.settings.read()
  if (!settings) throw new Error("Keystatic Content Not Found - Site Settings")

  const { url, siteName } = settings

  const collection = await getCollection(slug)

  if (!collection) {
    return { title: "Collection not found" }
  }

  const { title, description, authors, posts, buttonText } = collection

  // Array with all categories from all posts
  const keywords: string[] = []
  collection.posts.forEach((post) => {
    const categories = post.categories.map((category) => category.name)
    keywords.push(...categories)
  })

  const meta: Metadata = {
    title,
    description,
    // Removes duplicates
    keywords: keywords.filter((c, i) => keywords.indexOf(c) === i),

    openGraph: {
      title,
      description,
      url,
      siteName,
      type: "article",
      authors: authors.map((author) => author.name),
    },

    twitter: {
      title,
      description,
      // creator: twitterUsername,
      card: "summary",
    },
    alternates: {
      canonical: `/collections/${slug}`,
    },
  }

  return meta
}

export default async function Collection({ params: { slug } }: ParamsType) {
  const collection = await getCollection(slug)
  if (!collection) {
    return notFound()
  }

  return (
    <main className="mx-auto min-h-[80vh] max-w-screen-2xl items-start space-y-4 px-8 py-8 md:space-y-8 md:px-16 md:py-16">
      <BackTo text="Back to all collections" link={"/collections"} />
      <PostCollection collection={collection} type="single" />
    </main>
  )
}
