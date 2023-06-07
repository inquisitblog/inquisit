import * as config from "@/lib/config"
import { getPost, getPosts } from "@/lib/posts"
import { formatDate } from "@/lib/utils"
import { notFound } from "next/navigation"
import { ArrowLeftCircleIcon } from "@heroicons/react/24/outline"
import Link from "next/link"
import Image from "next/image"
import { Metadata } from "next"
import ScrollToTop from "@/components/ScrollToTop"
import BlogTags from "@/components/BlogTags"
import BlogAuthors from "@/components/BlogAuthors"
import BlogRenderer from "@/components/BlogRenderer"

type ParamsType = { params: { slug: string } }

export async function generateStaticParams() {
  const posts = await getPosts()

  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export async function generateMetadata({ params }: ParamsType) {
  const { slug } = params

  const post = getPost(slug)

  if (!post) {
    return { title: "Article not found" }
  }

  const { date, title, description, tags, authors, imgUrl } = post

  const meta: Metadata = {
    title,
    description,
    keywords: tags.map((tag) => tag.name),

    openGraph: {
      title,
      description,
      images: [imgUrl],
      url: config.url,
      siteName: config.title,
      type: "article",
      authors: authors.map((author) => author.name),
      publishedTime: new Date(date).toISOString(),
    },

    twitter: {
      title,
      description,
      images: [imgUrl],
      creator: config.twitterUsername,
      card: "summary",
    },

    themeColor: "#FBEAD2",
    alternates: {
      canonical: `/blog/${slug}`,
      types: {
        "application/rss+xml": `${config.url}/rss.xml`,
      },
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

  const { date, title, tags, imgUrl, imgAlt, authors, content } = post

  return (
    <main className="relative mx-auto flex max-w-screen-xl flex-col gap-4 px-8 py-8 md:gap-8 md:py-16">
      <BackToBlog />
      <div className="relative aspect-[4/3] max-w-3xl">
        <Image
          src={imgUrl}
          alt={imgAlt}
          fill
          priority
          // 100vw on till 860px - max 768px
          sizes="(min-width: 860px) 768px, 100vw"
          className="rounded-xl object-cover"
        />
      </div>

      <div className="flex flex-col gap-2 md:gap-4">
        <div className="flex items-center gap-2">
          <BlogTags tags={tags} />
        </div>
        <h1 className="text-4xl font-bold text-accent md:text-5xl xl:text-6xl">
          {title}
        </h1>
        <BlogAuthors authors={authors} date={date} />
      </div>

      <BlogRenderer content={content} />
      <BackToBlog />

      <ScrollToTop />
    </main>
  )
}

function BackToBlog() {
  return (
    <Link
      href="/blog"
      className="flex items-center gap-3 text-lg transition-all hover:opacity-70 lg:text-xl"
    >
      <div className="w-6 lg:w-8">
        <ArrowLeftCircleIcon strokeWidth={1.5} />
      </div>
      <p>Back to blog posts</p>
    </Link>
  )
}

export default BlogArticle
