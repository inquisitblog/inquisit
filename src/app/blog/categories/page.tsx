import * as config from "@/lib/config"
import { getPostCategories, getPosts } from "@/lib/posts"
import { capitalise } from "@/lib/utils"
import Link from "next/link"
import { FC } from "react"
import { FiArrowRight } from "react-icons/fi"

const title = "Categories"
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

const Category: FC = () => {
  const categories = getPostCategories()

  const tags = categories.map((tag) => ({
    tag,
    posts: getPosts(-1, tag),
  }))

  return (
    <main className="mx-auto max-w-screen-xl px-8 py-8 md:py-16">
      <h1 className="mb-12 text-4xl font-bold text-accent md:mb-16 md:text-5xl xl:text-6xl">
        Categories
      </h1>
      {tags.length ? (
        <div className="grid max-w-2xl grid-cols-1 gap-x-8 gap-y-14 lg:max-w-none lg:grid-cols-2">
          {tags.map(({ tag, posts }, i) => (
            <div
              className="flex flex-col gap-2 rounded-xl bg-light p-4 md:gap-4 md:p-8"
              key={i}
            >
              <h2 className="text-2xl font-semibold leading-7 xl:text-3xl">
                {capitalise(tag)}
              </h2>
              <p className="text-lg font-medium xl:text-xl">{`${posts.length} posts`}</p>
              <Link
                href={`/blog/${tag}`}
                className="flex w-fit items-center gap-2 rounded border-2 border-accent px-2 py-1 text-base font-semibold text-accent transition-all hover:bg-accent hover:text-light xl:text-lg"
              >
                <span>Check them out</span>
                <span className="w-6">
                  <FiArrowRight size="100%" strokeWidth={2} />
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

export default Category
