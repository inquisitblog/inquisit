import { FC } from "react"
import BlogCard from "./BlogCard"

type Props = {
  posts: BlogPost[]
}

const BlogPostsGrid: FC<Props> = ({ posts }) => {
  return (
    <main>
      {posts ? (
        <div className="grid max-w-2xl grid-cols-1 gap-x-8 gap-y-14 lg:max-w-none lg:grid-cols-2">
          {posts.map((post) => (
            <BlogCard
              key={post.id}
              type="Regular"
              img={post.imgUrl}
              alt={post.imgAlt}
              date={post.date}
              title={post.title}
              description={post.description}
              tags={post.tags}
              slug={post.id}
            />
          ))}
        </div>
      ) : (
        <p>No posts to show.</p>
      )}
    </main>
  )
}

export default BlogPostsGrid
