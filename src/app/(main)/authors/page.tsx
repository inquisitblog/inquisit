import reader from "@/lib/keystatic"
import { getAuthors } from "@/lib/data"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { ArrowRightIcon } from "@heroicons/react/24/outline"
import Link from "next/link"

export async function generateMetadata() {
  const authorspage = await reader.singletons.authorspage.read()
  if (!authorspage)
    throw new Error("Keystatic Content Not Found - Authors Page")

  const { metaTitle: title, metaDescription: description } = authorspage

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: "/authors",
    },
    twitter: {
      title,
      description,
    },
    alternates: {
      canonical: "/authors",
    },
  }
}

export default async function Authors() {
  const authorspage = await reader.singletons.authorspage.read()
  if (!authorspage)
    throw new Error("Keystatic Content Not Found - Categories Page")

  const { headline } = authorspage

  const authors = await getAuthors()

  return (
    <main className="mx-auto min-h-[80vh] max-w-screen-2xl px-8 py-8 md:px-16 md:py-16">
      <h1 className="mb-12 text-4xl font-bold text-accent md:mb-16 md:text-5xl xl:text-6xl">
        {headline}
      </h1>

      <div className="grid max-w-2xl grid-cols-1 gap-x-8 gap-y-14 xl:max-w-none xl:grid-cols-2">
        {authors.map((person, i) => {
          const isOdd = i % 2 !== 0
          return (
            <div
              key={person.slug}
              className="grid gap-6 rounded-xl bg-light p-6 shadow-md shadow-dark/5 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg"
            >
              <div
                className={cn(
                  "flex flex-col items-center gap-4 text-dark/70 xl:flex-row",
                  {
                    "sm:flex-row": isOdd,
                    "sm:flex-row-reverse": !isOdd,
                  },
                )}
              >
                <Image
                  src={`${person.avatar}`}
                  alt={`${person.name}'s image`}
                  height={200}
                  width={200}
                  priority
                  className="w-28 rounded-full md:w-36"
                />
                <p className="text-lg md:text-center md:text-xl">
                  {person.description}
                </p>
              </div>

              <div className="xs:justify-between flex flex-wrap items-center justify-center gap-4">
                <h2 className="text-2xl font-semibold md:text-3xl">
                  {person.name}
                </h2>
                <Link href={`/authors/${person.slug}`}>
                  <button className="group flex w-fit items-center gap-2 rounded border-2 border-dark px-3 py-2 font-medium text-dark transition-all hover:bg-dark hover:text-light md:text-lg">
                    <span>All my posts</span>
                    <ArrowRightIcon
                      className="aspect-square w-5 transition-transform group-hover:translate-x-1"
                      strokeWidth={2}
                    />
                  </button>
                </Link>
              </div>
            </div>
          )
        })}
      </div>
    </main>
  )
}
