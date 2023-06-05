interface BlogPostMeta {
  id: string
  title: string
  description: string
  tags: string[]
  imgUrl: string
  imgAlt: string
  authors: string[]
  date: string
}

interface BlogPostMetaParsed extends BlogPostMeta {
  tags: Category[]
  authors: Author[]
}

interface BlogPostWithHtml extends BlogPostMetaParsed {
  content: any
}

interface Category {
  name: string
  slug: string
}

interface Author {
  name: string
  slug: string
  avatar: string
  link?: string
}
