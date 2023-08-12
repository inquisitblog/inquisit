interface BlogPost {
  slug: string
  title: string
  description: string
  authors: Author[]
  categories: Category[]
  image: string
  imageAlt: string
  pubDate: string
  updatedDate: string
  article: DocumentElement[]
}

interface Author {
  slug: string
  name: string
  description: string
  avatar: string
  link: string | null
}

interface Category {
  slug: string
  name: string
  description: string
}
