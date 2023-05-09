import { getPosts } from "@/posts"
import { notFound } from "next/navigation"
import { FC } from "react"

type Props = {
  params: { slug: string }
}

const Category: FC<Props> = ({ params }) => {
  const { slug } = params

  const posts = getPosts(-1, slug)

  if (!posts.length) {
    return notFound()
  }

  return (
    <main className="mx-auto flex max-w-screen-xl flex-col gap-4 px-8 py-8 md:gap-6 md:py-16">
      <pre>
        <code>{JSON.stringify(posts, null, 2)}</code>
      </pre>
    </main>
  )
}

export default Category
