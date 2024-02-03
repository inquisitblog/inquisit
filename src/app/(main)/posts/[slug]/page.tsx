import type { Viewport, Metadata } from "next"
import Image from "next/image"
import { notFound } from "next/navigation"
import { getHighlighter } from "shiki"

import { getSlug } from "@/lib/utils"
import reader from "@/lib/keystatic"
import { getCollectionFromPost, getPost } from "@/lib/data"
import { Code, H2, ImageBlock } from "@/keystatic/components"

import { DocumentRenderer } from "@keystatic/core/renderer"
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline"
import ScrollToTop from "@/components/ScrollToTop"
import BlogTags from "@/components/BlogTags"
import BlogAuthors from "@/components/BlogAuthors"
import BackTo from "@/components/BackTo"

type ParamsType = { params: { slug: string } }

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#FBEAD2",
}

export async function generateStaticParams() {
  const posts = await reader.collections.blogposts.list()

  return posts.map((slug) => ({
    slug,
  }))
}

export async function generateMetadata({ params }: ParamsType) {
  const { slug } = params

  const settings = await reader.singletons.settings.read()
  if (!settings) throw new Error("Keystatic Content Not Found - Site Settings")

  const { url, siteName } = settings

  const post = await getPost(slug)

  if (!post) {
    return { title: "Post not found" }
  }

  const { title, description, image, categories, authors, pubDate } = post

  const meta: Metadata = {
    title: `${title} | Inquisit Blog`,
    description,
    keywords: categories.map((category) => category.name),

    openGraph: {
      title: `${title} | Inquisit Blog`,
      description,
      images: [image],
      url,
      siteName,
      type: "article",
      authors: authors.map((author) => author.name),
      publishedTime: new Date(pubDate).toISOString(),
    },

    twitter: {
      title,
      description,
      images: [image],
      // creator: twitterUsername,
      card: "summary",
    },
    alternates: {
      canonical: `/blog/${slug}`,
    },
  }

  return meta
}

const BlogArticle = async ({ params }: ParamsType) => {
  const { slug } = params

  const post = await getPost(slug)

  if (!post) {
    return notFound()
  }

  const { image, imageAlt, categories, title, authors, pubDate, article } = post

  const collection = await getCollectionFromPost(slug)
  if (!collection) {
    throw new Error(
      `Error fetching the collection for blog - ${slug}. This may be because this post isn't assigned to a collection or assigned to more than 1 collection. `,
    )
  }

  const highlighter = await getHighlighter({
    theme: "monokai",
  })

  return (
    <main className="relative mx-auto max-w-screen-2xl space-y-4 px-8 py-8 md:space-y-8 md:px-16 md:py-16">
      <BackTo
        text="Back to collection"
        link={`/collections/${collection.slug}`}
      />
      <div className="relative aspect-[4/3] max-w-3xl">
        <Image
          src={image}
          alt={imageAlt}
          fill
          priority
          sizes="(min-width: 860px) 768px, 100vw"
          className="rounded-xl object-cover"
        />
      </div>

      <div className="flex flex-col gap-2 md:gap-4">
        <div className="flex flex-wrap items-center gap-2">
          <BlogTags tags={categories} />
        </div>
        <h1 className="max-w-4xl text-4xl font-bold text-accent md:text-5xl xl:text-6xl">
          {title}
        </h1>
        <BlogAuthors authors={authors} date={pubDate} />
      </div>

      {/* prose-quoteless is a custom class -> tailwind.config.js */}
      <article className="prose prose-base prose-quoteless md:prose-lg prose-headings:text-dark/80 prose-a:text-accent prose-a:transition-all focus-within:prose-a:text-accent hover:prose-a:opacity-80 prose-img:rounded-xl prose-img:object-cover prose-hr:my-4 prose-hr:border-dark/50 md:prose-hr:my-8">
        <DocumentRenderer
          document={article}
          // componentBlocks={}
          renderers={{
            inline: {
              link: (props) => (
                <a className="inline-flex w-fit items-center gap-2" {...props}>
                  <span>{props.children}</span>

                  {props.href.startsWith("http") && (
                    <span className="aspect-square h-5">
                      <ArrowTopRightOnSquareIcon strokeWidth={2} />
                    </span>
                  )}
                </a>
              ),
            },
            block: {
              heading: ({ children, level }) => {
                if (level !== 2) {
                  const Tag = `h${level}` as const
                  return <Tag>{children}</Tag>
                } else {
                  const slug = getSlug(children)

                  return <H2 id={slug}>{children}</H2>
                }
              },
              code: (props) => <Code highlighter={highlighter} {...props} />,
              image: (props) => <ImageBlock {...props} />,
            },
          }}
        />
      </article>
      <BackTo
        text="Back to collection"
        link={`/collections/${collection.slug}`}
      />

      <ScrollToTop />
    </main>
  )
}

export default BlogArticle
