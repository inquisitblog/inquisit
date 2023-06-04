import authors from "@data/authors.json"

export function getAuthors(): Author[] {
  return authors
}

export function getAuthor(slug: string): Author | undefined {
  const author = authors.find((author) => author.slug === slug)

  return author
}
