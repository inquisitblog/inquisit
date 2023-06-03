import { formatDate } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import React, { FC } from "react"
import { ArrowRightIcon } from "@heroicons/react/24/outline"

function truncate(str: string, n: number) {
  return str.length > n ? str.slice(0, n - 1) + "..." : str
}

type BlogCardProps = {
  type: "Regular" | "Sidebar"
  img: string
  alt: string
  date: string
  title: string
  description: string
  tags: string[]
  slug: string
  priority?: boolean
}

const BlogCard: FC<BlogCardProps> = ({
  type,
  img,
  alt,
  date,
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
          {tags.map((tag, i) => (
            <Link
              key={i}
              className={`w-fit rounded border border-accent px-2 py-1 text-sm transition-all hover:bg-accent hover:text-light  ${
                type === "Regular" && "xl:text-base"
              }`}
              href={`/blog/categories/${tag}`}
            >
              {tag}
            </Link>
          ))}
        </div>
        <h2
          className={`text-2xl font-semibold leading-7 ${
            type === "Regular" && "xl:text-3xl"
          }`}
        >
          {title}
        </h2>
        <p className="text-sm font-semibold xl:text-base">{formatDate(date)}</p>
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
