import Link from "next/link"

import reader from "@/lib/keystatic"
import { getCategories, getPosts } from "@/lib/data"
import { capitalise } from "@/lib/utils"

import pluralize from "pluralize"
import { ArrowRightIcon } from "@heroicons/react/24/outline"

export async function generateMetadata() {
  const categoriespage = await reader.singletons.categoriespage.read()
  if (!categoriespage)
    throw new Error("Keystatic Content Not Found - Categories Page")

  const { metaTitle: title, metaDescription: description } = categoriespage

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: "/categories",
    },
    twitter: {
      title,
      description,
    },
    alternates: {
      canonical: "/categories",
    },
  }
}

export default async function Category() {
  const categoriespage = await reader.singletons.categoriespage.read()
  if (!categoriespage)
    throw new Error("Keystatic Content Not Found - Categories Page")

  const { headline, ctaText } = categoriespage

  const categories = await getCategories()

  const categoriesWithPosts = await Promise.all(
    categories.map(async ({ name, slug }) => ({
      name,
      slug,
      posts: await getPosts({ number: -1, category: slug }),
    })),
  )

  return (
    <main className="mx-auto min-h-[80vh] max-w-screen-2xl px-8 py-8 md:px-16 md:py-16">
      <h1 className="mb-12 text-4xl font-bold text-accent md:mb-16 md:text-5xl xl:text-6xl">
        {headline}
      </h1>

      {categoriesWithPosts.length ? (
        <div className="grid max-w-2xl grid-cols-1 gap-x-8 gap-y-14 lg:max-w-none lg:grid-cols-2">
          {categoriesWithPosts.map(({ name, slug, posts }, i) => (
            <div
              className="flex flex-col gap-2 rounded-xl bg-light p-4 md:gap-4 md:p-8"
              key={i}
            >
              <h2 className="text-2xl font-semibold leading-7 xl:text-3xl">
                {capitalise(name)}
              </h2>
              <p className="text-lg font-medium xl:text-xl">
                {pluralize("post", posts.length, true)}
              </p>
              <Link
                href={`/categories/${slug}`}
                className="flex w-fit items-center gap-2 rounded border-2 border-accent px-2 py-1 text-base font-semibold text-accent transition-all hover:bg-accent hover:text-light xl:text-lg"
              >
                <span>{ctaText}</span>
                <span className="w-5">
                  <ArrowRightIcon strokeWidth={2} />
                </span>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-xl">No categories to show.</p>
      )}
    </main>
  )
}
