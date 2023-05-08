import { MetadataRoute } from "next"
import { getPosts } from "@/posts"
import * as config from "@/config"

export default function sitemap(): MetadataRoute.Sitemap {
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
