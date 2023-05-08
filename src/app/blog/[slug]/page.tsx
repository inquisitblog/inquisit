import * as config from "@/config"
import { getPost, getPosts } from "@/posts"
import { formatDate } from "@/utils"
import { notFound } from "next/navigation"
import { FiArrowLeftCircle } from "react-icons/fi"
import Link from "next/link"
import Image from "next/image"

type ParamsType = { params: { slug: string } }

const BlogArticle = async ({ params }: ParamsType) => {
  const posts = getPosts()
  const { slug } = params

  if (!posts.find((post) => post.id === slug)) {
    return notFound()
  }

  const { date, title, imgUrl, imgAlt, contentHtml } = await getPost(slug)

  return (
    <main className="mx-auto flex max-w-screen-xl flex-col gap-4 px-8 py-8 md:gap-6 md:py-16">
      <Link
        href="/blog"
        className="flex items-center gap-3 text-lg transition-all hover:opacity-70 lg:text-xl"
      >
        <div className="w-6 lg:w-8">
          <FiArrowLeftCircle size="auto" strokeWidth={1.5} />
        </div>
        <p>Back to blog posts</p>
      </Link>
      <div className="relative aspect-[4/3] max-w-3xl">
        <Image
          src={imgUrl}
          alt={imgAlt}
          fill
          className="rounded-lg object-cover"
        />
      </div>
      <p className="w-fit rounded border border-accent px-2 py-1 text-sm md:text-base">
        {formatDate(date)}
      </p>
      <h1 className="text-4xl font-bold text-accent md:text-5xl xl:text-6xl">
        {title}
      </h1>

      <article>
        <section
          dangerouslySetInnerHTML={{ __html: contentHtml }}
          className="prose prose-base md:prose-lg"
        />
      </article>

      <Link
        href="/blog"
        className="flex items-center gap-3 text-lg transition-all hover:opacity-70 lg:text-xl"
      >
        <div className="w-6 lg:w-8">
          <FiArrowLeftCircle size="auto" strokeWidth={1.5} />
        </div>
        <p>Back to blog posts</p>
      </Link>
    </main>
  )
}

export default BlogArticle
