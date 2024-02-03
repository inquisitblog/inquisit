import { type Metadata } from "next"
import { notFound } from "next/navigation"
import reader from "@/lib/keystatic"
import { getAuthor, getCollections, getPosts } from "@/lib/data"

import Image from "next/image"
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline"
import PostCollection from "@/components/PostCollection"

type ParamsType = { params: { slug: string } }

export async function generateStaticParams() {
  const authors = await reader.collections.authors.list()

  return authors.map((slug) => ({
    slug,
  }))
}

export async function generateMetadata({ params: { slug } }: ParamsType) {
  const settings = await reader.singletons.settings.read()
  if (!settings) throw new Error("Keystatic Content Not Found - Site Settings")

  const { url, siteName } = settings

  const author = await getAuthor(slug)

  if (!author) {
    return { title: "Author not found" }
  }

  const { name, description, avatar } = author

  const title = `${name} - Author`

  const meta: Metadata = {
    title,
    description,

    openGraph: {
      title,
      description,
      images: [avatar],
      url,
      siteName,
      type: "website",
    },

    twitter: {
      title,
      description,
      // creator: twitterUsername,
      card: "summary",
    },
    alternates: {
      canonical: `/authors/${slug}`,
    },
  }

  return meta
}

export default async function Author({ params: { slug } }: ParamsType) {
  const author = await getAuthor(slug)
  if (!author) {
    return notFound()
  }

  const { avatar, name, description, link } = author

  const fullCollections = await getCollections({ author: slug })

  const finalCollections = await Promise.all(
    fullCollections.map(async (collection) => ({
      ...collection,
      posts: await getPosts({ author: slug }),
    })),
  )

  return (
    <main className="mx-auto min-h-[80vh] max-w-screen-2xl px-8 py-8 md:px-16 md:py-16">
      <h1 className="group mb-4 flex w-fit items-center gap-4 text-4xl font-bold text-accent md:mb-8 md:text-5xl xl:text-6xl">
        <span>{name}</span>
        {link && (
          <a href={link}>
            <ArrowTopRightOnSquareIcon
              className="aspect-square w-10 transition-all group-hover:-translate-y-1 group-hover:translate-x-1"
              strokeWidth={2}
            />
          </a>
        )}
      </h1>

      <div className="mb-12 grid gap-6 rounded-xl bg-light px-6 py-6 shadow-md shadow-dark/5 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg md:mb-16 xl:px-32">
        <div className="flex flex-col items-center gap-4 text-dark/70 xl:flex-row">
          <Image
            src={`${avatar}`}
            alt={`${name}'s image`}
            height={200}
            width={200}
            priority
            className="w-28 rounded-full md:w-36"
          />
          <p className="text-lg md:text-center md:text-xl">{description}</p>
        </div>
      </div>

      <div className="grid gap-12">
        {finalCollections.map((collection) => (
          <PostCollection
            key={collection.slug}
            collection={collection}
            type="multiple"
            postLimit={2}
          />
        ))}
      </div>
    </main>
  )
}
