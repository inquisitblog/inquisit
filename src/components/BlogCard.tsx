import { formatDate } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import React, { FC } from "react"
import { ArrowRightIcon } from "@heroicons/react/24/outline"
import BlogTags from "./BlogTags"
import BlogAuthors from "./BlogAuthors"

function truncate(str: string, n: number) {
  return str.length > n ? str.slice(0, n - 1) + "..." : str
}

type BlogCardProps = {
  type: "Regular" | "Sidebar"
  img: string
  alt: string
  date: string
  authors: Author[]
  title: string
  description: string
  tags: Category[]
  slug: string
  priority?: boolean
}

const BlogCard: FC<BlogCardProps> = ({
  type,
  img,
  alt,
  date,
  authors,
  title,
  description,
  tags,
  slug,
  priority,
}) => {
  return (
    <div
      className={`grid grid-cols-1 gap-6 ${
        type === "Sidebar" && "gap-4 xl:grid-cols-1-2"
      }`}
    >
      <div
        className={`relative aspect-[4/3] w-full ${
          type === "Sidebar" && "xl:aspect-square"
        }`}
      >
        <Image
          src={img}
          alt={alt}
          className="rounded-xl object-cover"
          fill
          priority={priority}
          sizes="(min-width: 1280px) 580px, (min-width: 740px) 672px, 100vw"
        />
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <BlogTags tags={tags} />
        </div>
        <h2
          className={`text-2xl font-semibold leading-7 ${
            type === "Regular" && "xl:text-3xl"
          }`}
        >
          {title}
        </h2>
        <BlogAuthors authors={authors} date={date} />
        <p
          className={`text-base leading-relaxed ${
            type === "Regular" && "xl:text-lg"
          }`}
        >
          {truncate(description, 500)}
        </p>
        <Link
          href={`/blog/${slug}`}
          className={`flex items-center gap-2 text-base font-semibold text-accent transition-opacity hover:opacity-70 ${
            type === "Regular" && "xl:text-lg"
          }`}
        >
          <span>Full article </span>
          <span className="w-4">
            <ArrowRightIcon strokeWidth={2} />
          </span>
        </Link>
      </div>
    </div>
  )
}

export default BlogCard
