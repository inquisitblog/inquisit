import BlogCard from "@/components/BlogCard"
import { getPosts } from "@/posts"
import Image from "next/image"
import Link from "next/link"

const verticalBlogGap = "gap-16 xl:gap-6"

export default function Home() {
  const posts = getPosts().slice(0, 4)

  const featuredPost = posts.shift()

  return (
    <>
      <main className="mx-auto flex max-w-screen-xl flex-col items-start gap-8 px-8 py-8 md:flex-row md:items-center md:gap-24 md:py-16">
        <div>
          <p className="mb-1 text-xl md:mb-2 xl:text-2xl">Hello, My name is</p>
          <h1 className="text-4xl font-semibold md:text-5xl xl:text-6xl">
            Darshan
          </h1>
          <p className="mb:mt-4 mt-2 text-2xl xl:text-3xl">
            I do x y z with my life. I like this in my free time.
          </p>
        </div>
        <div className="relative aspect-square w-3/5 overflow-hidden rounded-full shadow-lg shadow-stone-900/50 sm:w-2/5">
          <Image
            src="https://placebeard.it/800x800"
            alt="placeholder image"
            className="object-cover"
            fill
          />
        </div>
      </main>
      <section id="blog" className="mx-auto max-w-screen-xl px-8 py-16">
        <h2 className="text-5xl font-bold text-accent">Latest posts</h2>
        {featuredPost && posts ? (
          <div
            className={`flex max-w-2xl flex-col py-16 xl:w-full xl:max-w-none xl:flex-row ${verticalBlogGap}`}
          >
            <div className="xl:w-1/2">
              <BlogCard
                type="Regular"
                img={featuredPost.imgUrl}
                alt={featuredPost.imgAlt}
                date={featuredPost.date}
                title={featuredPost.title}
                description={featuredPost.description}
                slug={featuredPost.id}
              />
            </div>
            <div className={`flex flex-col xl:w-1/2 ${verticalBlogGap}`}>
              {posts.map((post) => (
                <BlogCard
                  key={post.id}
                  type="Sidebar"
                  img={post.imgUrl}
                  alt={post.imgAlt}
                  date={post.date}
                  title={post.title}
                  description={post.description}
                  slug={post.id}
                />
              ))}
            </div>
          </div>
        ) : (
          <p>No latest posts.</p>
        )}

        <Link href="/blog">
          <button className="block rounded border-2 border-accent px-6 py-3 font-semibold text-accent transition-all hover:bg-accent hover:text-light focus:outline-none md:text-lg xl:mx-auto xl:px-8 xl:py-4 xl:text-2xl">
            Browse More
          </button>
        </Link>
      </section>
    </>
  )
}
