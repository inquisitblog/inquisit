import * as config from "@/lib/config"
import BlogCard from "@/components/BlogCard"
import { getPosts } from "@/lib/posts"
import Image from "next/image"
import Link from "next/link"

const verticalBlogGap = "gap-16 xl:gap-6"

export const metadata = {
  title: "Home | Darshan",
}

export default function Home() {
  const posts = getPosts().slice(0, 4)

  const featuredPost = posts.shift()

  return (
    <>
      <main className="mx-auto max-w-screen-xl px-8 py-12 md:py-24">
        <div className="text-center">
          <h1 className="text-4xl font-semibold md:text-5xl xl:text-6xl mb-4">
            Welcome to <span className="text-accent">{config.title}</span>
          </h1>
          <p className="text-xl md:text-2xl xl:text-3xl text-gray-700 mb-8">
            {config.heroTagline}
          </p>
          <button
            className="block rounded border-2 border-accent px-6 py-3 font-semibold text-accent transition-all hover:bg-accent hover:text-light focus:outline-none md:text-lg xl:mx-auto xl:px-8 xl:py-4 xl:text-2xl"
          >
            About
          </button>
        </div>
      </main>

      <section id="blog" className="mx-auto max-w-screen-xl px-8 pt-8 pb-16">
        <h1 className="text-5xl font-bold text-accent">Latest posts</h1>
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
                tags={featuredPost.tags}
                slug={featuredPost.id}
                priority
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
                  tags={post.tags}
                  slug={post.id}
                />
              ))}
            </div>
          </div>
        ) : (
          <p className="mb-16 mt-8 text-xl">No latest posts.</p>
        )}

        <Link href="/blog">
          <button className="block rounded border-2 border-accent px-6 py-3 font-semibold text-accent transition-all hover:bg-accent hover:text-light focus:outline-none md:text-lg xl:mx-auto xl:px-8 xl:py-4 xl:text-2xl">
            Browse More
          </button>
        </Link>
      </section>

      <section id="about" className="mx-auto max-w-screen-xl px-8 py-16">
        <h1 className="text-5xl font-bold text-accent mb-16">About</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">
          <div className="bg-light rounded-xl p-4 md:p-8">
            <h2 className="text-2xl font-semibold leading-7 xl:text-3xl mt-0 md:mt-4">
              The Blog
            </h2>
            {config.aboutBlog.map((paragraph, index) => (
              <p key={index} className="text-lg xl:text-xl text-gray-700 mt-4">
                {paragraph}
              </p>
            ))}
          </div>
          <div className="bg-light rounded-xl p-4 md:p-8">
            <h2 className="text-2xl font-semibold leading-7 xl:text-3xl mt-0 md:mt-4 mb-8">
              The People
            </h2>
            <div className="flex items-center mt-4 mb-8">
              <img
                src="https://iili.io/HrDCUqx.png"
                alt="Shan's image"
                className="w-40 h-40 rounded-full mr-4"
              />
              <p className="text-lg xl:text-xl text-gray-700">{config.aboutShan}</p>
            </div>
            <div className="flex items-center mt-4">
              <p className="text-lg xl:text-xl text-gray-700">{config.aboutNeesh}</p>
              <img
                src="https://iili.io/HrDCg0Q.png"
                alt="Neesh's image"
                className="w-40 h-40 rounded-full mr-4"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
