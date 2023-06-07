import { Authors, allAuthors } from "contentlayer/generated"

export function singleAuthor(slug: string): Author | undefined {
  const authors: Authors[] = allAuthors

  const clAuthor = authors.find((author) => author.slug === slug)

  if (clAuthor) {
    const { _id, _raw, type, ...author } = clAuthor

    return author
  } else {
    return undefined
  }
}
