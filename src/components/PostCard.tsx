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

type PostCardProps = {
  type: "full" | "minimal"
  img: string
  alt: string
  date: string
  authors: Author[]
  title: string
  description: string
  tags: Category[]
  slug: string
  priority?: boolean
  sizes?: string
}

const PostCard: FC<PostCardProps> = ({
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
  sizes,
}) => {
  return (
    <Link
      href={`/posts/${slug}`}
      className="flex max-w-3xl flex-col-reverse overflow-hidden rounded-xl bg-light shadow-md shadow-dark/5 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg sm:flex-row"
    >
      <div className="flex flex-col gap-2 p-4 sm:w-[60%]">
        <div className="flex flex-wrap items-center gap-2">
          <BlogTags tags={tags} />
        </div>

        <h2
          className={cn("text-2xl leading-7", {
            "font-semibold": type === "full",
            "font-medium": type === "minimal",
          })}
        >
          {title}
        </h2>

        {type === "full" ? (
          <BlogAuthors authors={authors} date={date} />
        ) : (
          <p className="text-base leading-relaxed text-dark/70 xl:text-lg">
            {formatDate(date)}
          </p>
        )}

        <p className="hidden font-medium text-dark xl:text-lg">
          {formatDate(date)}
        </p>

        <p className="text-base leading-relaxed xl:text-lg">
          {truncate(description, 165)}
        </p>

        {type === "full" && (
          <Link
            href={`/posts/${slug}`}
            className="flex items-center gap-2 text-base font-semibold text-accent transition-opacity hover:opacity-70 xl:text-lg"
          >
            <span>Full article </span>
            <span className="w-4">
              <ArrowRightIcon strokeWidth={2} />
            </span>
          </Link>
        )}
      </div>

      <div className="sm:aspect-none relative aspect-video w-full sm:w-[40%]">
        <Image
          src={img}
          alt={alt}
          className="object-cover"
          fill
          priority={priority}
          sizes={sizes}
        />
      </div>
    </Link>
  )
}

export default PostCard
