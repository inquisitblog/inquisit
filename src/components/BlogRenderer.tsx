import type { FC } from "react"
import { useMDXComponent } from "next-contentlayer/hooks"
import ExternalLink from "./mdx/ExternalLink"
import H2 from "./mdx/H2"

type Props = {
  content: string
}

const components: any = { h2: H2!, ExternalLink }

const BlogRenderer: FC<Props> = ({ content }) => {
  const MDXComponent = useMDXComponent(content)

  // prose-quoteless is a custom class -> tailwind.config.js
  return (
    <article className="prose prose-base prose-quoteless md:prose-lg prose-headings:text-dark/80 prose-a:text-accent prose-a:transition-all focus-within:prose-a:text-accent hover:prose-a:opacity-80 prose-img:rounded-xl prose-img:object-cover prose-hr:my-4 prose-hr:border-dark/50 md:prose-hr:my-8">
      <MDXComponent components={components} />
    </article>
  )
}

export default BlogRenderer
