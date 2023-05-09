import { MetadataRoute } from "next"
import * as config from "@/lib/config"
import { getPosts } from "@/lib/posts"

export default function sitemap(): MetadataRoute.Sitemap {
  const pageUrls = ["", "/blog"]

  const posts = getPosts()
  const postUrls =
    posts &&
    posts.map((post) => {
      return {
        url: `${config.url}/posts/post.id`,
        lastModified: new Date(post.date),
      }
    })

  return [
    { url: `${config.url}`, lastModified: new Date() },
    { url: `${config.url}/blog`, lastModified: new Date() },
    // {url: '/about', lastModified: new Date()},
    ...postUrls,
  ]
}
