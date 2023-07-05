import type { FC, PropsWithChildren } from "react"
import * as config from "@/lib/config"

import Image from "next/image"
import Link from "next/link"

import { getPosts } from "@/lib/data"
import { cn } from "@/lib/utils"

import BlogCard from "@/components/BlogCard"

const verticalBlogGap = "gap-16 xl:gap-10"

export const metadata = {
  title: "Home | Inquisit",
}

export default async function Home() {
  const posts = (await getPosts())?.slice(4)
  const featuredPost = posts?.shift()

  return (
    <>
      <main className="mx-auto max-w-screen-2xl px-8 py-12 text-center md:px-16 md:py-20">
        <h1 className="text-4xl font-semibold md:text-5xl xl:text-6xl">
          Welcome to <span className="text-accent">{config.title}</span>
        </h1>
        <p className="mx-auto mt-4 max-w-[60ch] text-xl text-dark/70 md:mt-8 md:text-2xl xl:text-3xl">
          {config.heroTagline}
        </p>
        <div className="mt-12 grid grid-cols-1 gap-8 md:mt-24 md:gap-8 lg:grid-cols-2 xl:gap-10">
          <InfoCard title={{ text: "The", accent: "Blog" }}>
            {config.aboutBlog.map((paragraph, index) => (
              <p
                key={index}
                className="mt-6 text-left text-lg text-dark/70 md:text-xl"
              >
                {paragraph}
              </p>
            ))}
          </InfoCard>
          <InfoCard title={{ text: "The", accent: "People" }}>
            {config.people.map((person, i) => {
              const isOdd = i % 2 !== 0
              return (
                <div
                  className={cn(
                    "mt-6 flex flex-col items-center gap-4 text-lg text-dark/70 md:text-xl",
                    {
                      "md:flex-row-reverse": isOdd,
                      "md:flex-row": !isOdd,
                    }
                  )}
                  key={i}
                >
                  <Image
                    src={`/${person.avatar}`}
                    alt={`${person.name}'s image`}
                    height={200}
                    width={200}
                    priority
                    className="w-28 flex-1 rounded-full md:w-36"
                  />
                  <p className="md:text-center">{person.about}</p>
                </div>
              )
            })}
          </InfoCard>
        </div>
      </main>

      <section
        id="blog"
        className="mx-auto max-w-screen-2xl px-8 pb-16 pt-8 md:px-16"
      >
        <h3 className="text-5xl font-bold text-accent">Latest posts</h3>
        {featuredPost && posts ? (
          <div
            className={`flex max-w-2xl flex-col py-16 xl:w-full xl:max-w-none xl:flex-row ${verticalBlogGap}`}
          >
            <div className="xl:w-1/2">
              <BlogCard
                type="Regular"
                img={featuredPost.image}
                alt={featuredPost.imageAlt}
                date={featuredPost.pubDate}
                authors={featuredPost.authors}
                title={featuredPost.title}
                description={featuredPost.description}
                tags={featuredPost.categories}
                slug={featuredPost.slug}
              />
            </div>
            <div className={`flex flex-col xl:w-1/2 ${verticalBlogGap}`}>
              {posts.map((post) => (
                <BlogCard
                  key={post.slug}
                  type="Sidebar"
                  img={post.image}
                  alt={post.imageAlt}
                  date={post.pubDate}
                  authors={post.authors}
                  title={post.title}
                  description={post.description}
                  tags={post.categories}
                  slug={post.slug}
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
    </>
  )
}

const InfoCard: FC<
  PropsWithChildren<{ title: { text: string; accent: string } }>
> = ({ title, children }) => {
  return (
    <div
      className={cn(
        "rounded-xl bg-light px-8 py-6 lg:px-12 lg:py-10",
        "shadow-md shadow-dark/5 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg" // card hover
      )}
    >
      <h2 className="text-2xl font-semibold md:text-3xl">
        {title.text} <span className="text-accent">{title.accent}</span>
      </h2>
      {children}
    </div>
  )
}
