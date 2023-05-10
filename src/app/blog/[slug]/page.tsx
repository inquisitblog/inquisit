import * as config from "@/lib/config"
import { getPost, getPosts } from "@/lib/posts"
import { formatDate } from "@/lib/utils"
import { notFound } from "next/navigation"
import { FiArrowLeftCircle } from "react-icons/fi"
import Link from "next/link"
import Image from "next/image"
import { Metadata } from "next"

type ParamsType = { params: { slug: string } }

export async function generateStaticParams() {
  const posts = getPosts()

  return posts.map((post) => ({
    slug: post.id,
  }))
}

export async function generateMetadata({ params }: ParamsType) {
  const posts = getPosts()
  const { slug } = params

  if (!posts.find((post) => post.id === slug)) {
    return { title: "Article not found" }
  }

  const { date, title, description, tags, imgUrl } = await getPost(slug)

  const meta: Metadata = {
    title,
    description,
    keywords: tags,

    openGraph: {
      title,
      description,
      images: [imgUrl],
      url: config.url,
      siteName: config.title,
      type: "article",
      authors: [config.author],
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
  const posts = getPosts()
  const { slug } = params

  if (!posts.find((post) => post.id === slug)) {
    return notFound()
  }

  const { date, title, tags, imgUrl, imgAlt, contentHtml } = await getPost(slug)

  return (
    <main className="mx-auto flex max-w-screen-xl flex-col gap-4 px-8 py-8 md:gap-8 md:py-16">
      <BackToBlog />
      <div className="relative aspect-[4/3] max-w-3xl">
        <Image
          src={imgUrl}
          alt={imgAlt}
          fill
          className="rounded-xl object-cover"
        />
      </div>

      <div className="flex flex-col gap-2 md:gap-4">
        <div className="flex items-center gap-2">
          {tags.map((tag, i) => (
            <Link
              key={i}
              className="w-fit rounded border border-accent px-2 py-1 text-base transition-all hover:bg-accent hover:text-light xl:text-lg"
              href={`/blog/categories/${tag}`}
            >
              {tag}
            </Link>
          ))}
        </div>
        <h1 className="text-4xl font-bold text-accent md:text-5xl xl:text-6xl">
          {title}
        </h1>
        <p className="text-lg font-semibold md:text-xl">{formatDate(date)}</p>
      </div>

      <article>
        <section
          dangerouslySetInnerHTML={{ __html: contentHtml }}
          className="prose prose-base md:prose-lg prose-a:text-accent focus-within:prose-a:text-accent hover:prose-a:opacity-70 prose-img:aspect-[4/3] prose-img:rounded-xl prose-img:object-cover prose-hr:my-4 prose-hr:border-dark/50 md:prose-hr:my-8"
        />
      </article>
      <BackToBlog />
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
        <FiArrowLeftCircle size="auto" strokeWidth={1.5} />
      </div>
      <p>Back to blog posts</p>
    </Link>
  )
}

export default BlogArticle
