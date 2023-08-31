import type { FC } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRightIcon } from "@heroicons/react/24/outline"
import BlogTags from "./BlogTags"
import BlogAuthors from "./BlogAuthors"
import { cn, formatDate } from "@/lib/utils"

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
      className={cn(
        "flex flex-col gap-6 overflow-hidden rounded-xl bg-light",
        "shadow-md shadow-dark/5 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg", // card hover
        {
          "h-full": type === "Regular",
          "gap-4 xl:grid xl:grid-cols-1-2": type === "Sidebar",
        },
      )}
    >
      <div
        className={cn("relative aspect-[4/3] w-full", {
          "h-full xl:aspect-square": type === "Sidebar",
        })}
      >
        <Image
          src={img}
          alt={alt}
          className="object-cover"
          fill
          priority={priority}
          sizes={
            type === "Regular"
              ? "(min-width: 1640px) 684px, (min-width: 1280px) calc(37.65vw + 74px), (min-width: 780px) calc(4.17vw + 620px), calc(94.78vw - 48px)"
              : "(min-width: 1640px) 286px, (min-width: 1280px) calc(16.18vw + 24px), (min-width: 780px) calc(4.17vw + 620px), calc(94.78vw - 48px)"
          }
        />
      </div>

      <div
        className={cn(
          "flex flex-grow flex-col justify-between gap-4 px-4 pb-4 md:px-6 md:pb-6",
          {
            "xl:p-0 xl:py-4 xl:pr-4 ": type === "Sidebar",
          },
        )}
      >
        <div className="grid gap-3">
          {type === "Regular" && (
            <div className="flex flex-wrap items-center gap-2">
              <BlogTags tags={tags} />
            </div>
          )}
          <h2
            className={cn("text-2xl font-semibold leading-7", {
              "xl:text-3xl 2xl:text-4xl": type === "Regular",
            })}
          >
            {title}
          </h2>

          <BlogAuthors
            authors={authors}
            date={date}
            className={type === "Sidebar" ? "xl:hidden" : ""}
          />
          <p
            className={cn("hidden font-medium text-dark xl:text-lg", {
              "xl:block": type === "Sidebar",
            })}
          >
            {formatDate(date)}
          </p>

          <p className="text-base leading-relaxed xl:text-lg">
            {type === "Regular"
              ? truncate(description, 380)
              : truncate(description, 142)}
          </p>
        </div>

        <Link
          href={`/blog/${slug}`}
          className={cn(
            "flex items-center gap-2 text-base font-semibold text-accent transition-opacity hover:opacity-70 xl:text-lg",
            {
              "2xl:text-xl": type === "Regular",
            },
          )}
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
