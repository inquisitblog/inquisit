import type { FC } from "react"
import Link from "next/link"

type Props = {
  tags: Category[]
}

const BlogTags: FC<Props> = ({ tags }) => {
  return (
    <>
      {tags.map((tag, i) => (
        <Link
          key={i}
          className="w-fit rounded border border-accent px-2 py-1 text-base transition-all hover:bg-accent hover:text-light xl:text-lg"
          href={`/blog/categories/${tag.slug}`}
        >
          {tag.name}
        </Link>
      ))}
    </>
  )
}

export default BlogTags
