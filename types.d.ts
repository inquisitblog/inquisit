type BlogPost = {
  id: string
  title: string
  description: string
  tags: Category[]
  imgUrl: string
  imgAlt: string
  authors: string[]
  date: string
}

type BlogPostWithHtml = BlogPost & { contentHtml: string }

type Category = {
  name: string
  slug: string
}

type Author = {
  name: string
  slug: string
  avatar: string
  link?: string
}
