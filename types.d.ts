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

interface BlogPost {
  slug: string
  title: string
  description: string
  tags: Category[]
  imgUrl: string
  imgAlt: string
  authors: Author[]
  date: string
}

interface BlogPostWithHtml extends BlogPost {
  content: string
}
