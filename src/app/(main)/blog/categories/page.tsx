import * as config from "@/lib/config"
import { getPosts } from "@/lib/data"
import { capitalise } from "@/lib/utils"
import Link from "next/link"
import { ArrowRightIcon } from "@heroicons/react/24/outline"
import { allCategories } from "contentlayer/generated"

const title = "Blog Categories"
const description = "All categories of blog posts."

export const metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    url: "/blog/categories",
  },
  twitter: {
    title,
    description,
  },
  alternates: {
    canonical: "/blog/categories",
    types: {
      "application/rss+xml": `${config.url}/rss.xml`,
    },
  },
}

export default async function Category() {
  const categories = allCategories

  const tags = await Promise.all(
    categories.map(async (category) => ({
      name: category.name,
      slug: category.slug,
      posts: await getPosts(-1, category.slug),
    }))
  )

  return (
    <main className="mx-auto max-w-screen-2xl px-8 py-8 md:px-16 md:py-16">
      <h1 className="mb-12 text-4xl font-bold text-accent md:mb-16 md:text-5xl xl:text-6xl">
        Categories
      </h1>
      {tags.length ? (
        <div className="grid max-w-2xl grid-cols-1 gap-x-8 gap-y-14 lg:max-w-none lg:grid-cols-2">
          {tags.map(({ name, slug, posts }, i) => (
            <div
              className="flex flex-col gap-2 rounded-xl bg-light p-4 md:gap-4 md:p-8"
              key={i}
            >
              <h2 className="text-2xl font-semibold leading-7 xl:text-3xl">
                {capitalise(name)}
              </h2>
              <p className="text-lg font-medium xl:text-xl">{`${posts.length} posts`}</p>
              <Link
                href={`/blog/categories/${slug}`}
                className="flex w-fit items-center gap-2 rounded border-2 border-accent px-2 py-1 text-base font-semibold text-accent transition-all hover:bg-accent hover:text-light xl:text-lg"
              >
                <span>Check them out</span>
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
