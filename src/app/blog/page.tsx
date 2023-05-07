import { getPosts } from "@/posts"
import BlogCard from "@/components/BlogCard"

const Blog = () => {
  const posts = getPosts()

  return (
    <main id="blog" className="mx-auto max-w-screen-xl px-8 py-16">
      <h1 className="mb-16 text-4xl font-bold text-accent md:text-5xl xl:text-6xl">
        Blog Posts
      </h1>
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

export default Blog
