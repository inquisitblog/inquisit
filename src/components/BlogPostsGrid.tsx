import { FC } from "react"
import PostCard from "./PostCard"

type Props = {
  posts: BlogPost[]
}

const BlogPostsGrid: FC<Props> = ({ posts }) => {
  return posts.length ? (
    <div className="grid max-w-2xl grid-cols-1 gap-x-8 gap-y-14 lg:max-w-none lg:grid-cols-2">
      {posts.map((post, i) => (
        <PostCard
          key={post.slug}
          type="single"
          img={post.image}
          alt={post.imageAlt}
          date={post.pubDate}
          authors={post.authors}
          title={post.title}
          description={post.description}
          tags={post.categories}
          slug={post.slug}
          // Prio image loading for the first 4 posts bcoz they will be above the fold
          priority={i < 4}
          sizes="(min-width: 1620px) 688px, (min-width: 1040px) 44.29vw, (min-width: 780px) calc(8.33vw + 587px), calc(94.78vw - 48px)"
        />
      ))}
    </div>
  ) : (
    <p className="text-xl">No articles to show.</p>
  )
}

export default BlogPostsGrid
