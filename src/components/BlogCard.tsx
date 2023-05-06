import Image from "next/image"
import Link from "next/link"
import React, { FC } from "react"

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
  slug: string
}

const BlogCard: FC<BlogCardProps> = ({
  type,
  img,
  alt,
  date,
  title,
  description,
  slug,
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
        <Image src={img} alt={alt} className="rounded-lg object-cover" fill />
      </div>
      <div className="flex flex-col gap-4">
        <p
          className={`w-fit rounded border border-accent px-2 py-1 text-sm ${
            type === "Regular" && "xl:text-base"
          }`}
        >
          {date}
        </p>
        <div className="flex flex-col gap-2">
          <h3
            className={`text-2xl font-semibold leading-7 ${
              type === "Regular" && "xl:text-3xl"
            }`}
          >
            {title}
          </h3>
          <p
            className={`text-base leading-relaxed ${
              type === "Regular" && "xl:text-lg"
            }`}
          >
            {truncate(description, 190)}
          </p>
        </div>
        <Link
          href={`/blog/${slug}`}
          className={`text-base font-semibold text-accent underline hover:opacity-70 ${
            type === "Regular" && "xl:text-lg"
          }`}
        >
          Read More
        </Link>
      </div>
    </div>
  )
}

export default BlogCard
