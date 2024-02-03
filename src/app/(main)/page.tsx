import type { FC, PropsWithChildren } from "react"

import Image from "next/image"
import Link from "next/link"

import reader from "@/lib/keystatic"
import { getCollections } from "@/lib/data"
import { cn } from "@/lib/utils"

import PostCollection from "@/components/PostCollection"

export async function generateMetadata() {
  const homepage = await reader.singletons.homepage.read()
  const settings = await reader.singletons.settings.read()

  if (!homepage) throw new Error("Keystatic Content Not Found - Home Page")
  if (!settings) throw new Error("Keystatic Content Not Found - Site Settings")

  return {
    title: `${homepage.metaTitle} | ${settings.siteName}`,
    description: homepage.metaDescription,
  }
}

export default async function Home() {
  const homepage = await reader.singletons.homepage.read()
  const settings = await reader.singletons.settings.read()

  if (!homepage) throw new Error("Keystatic Content Not Found - Home Page")
  if (!settings) throw new Error("Keystatic Content Not Found - Site Settings")

  const { siteName } = settings
  const { subheadline, aboutBlog, aboutPeople, blogHeadline, blogButtonText } =
    homepage

  const collections = (await getCollections()).slice(0, 6)

  return (
    <>
      <main className="mx-auto max-w-screen-2xl px-8 py-12 text-center md:px-16 md:py-20">
        <h1 className="text-4xl font-semibold md:text-5xl xl:text-6xl">
          Welcome to <span className="text-accent">{siteName}</span>
        </h1>
        <p className="mx-auto mt-4 max-w-[60ch] text-xl text-dark/70 md:mt-8 md:text-2xl xl:text-3xl">
          {subheadline}
        </p>
        <div className="mt-12 grid grid-cols-1 gap-8 md:mt-24 md:gap-8 lg:grid-cols-2 xl:gap-10">
          <InfoCard title={{ text: "The", accent: "Blog" }}>
            {aboutBlog.map((paragraph, index) => (
              <p
                key={index}
                className="mt-6 text-left text-lg text-dark/70 md:text-xl"
              >
                {paragraph}
              </p>
            ))}
          </InfoCard>
          <InfoCard title={{ text: "The", accent: "People" }}>
            {aboutPeople.map((person, i) => {
              const isOdd = i % 2 !== 0
              return (
                <div
                  className={cn(
                    "mt-6 flex flex-col items-center gap-4 text-lg text-dark/70 md:text-xl",
                    {
                      "md:flex-row-reverse": isOdd,
                      "md:flex-row": !isOdd,
                    },
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
                  <p className="md:text-center">{person.description}</p>
                </div>
              )
            })}
          </InfoCard>
        </div>
      </main>

      <section
        id="blog"
        className="mx-auto grid max-w-screen-2xl gap-y-12 px-8 pb-16 pt-8 md:px-16"
      >
        <h2 className="text-4xl font-bold text-accent xl:text-5xl">
          {blogHeadline}
        </h2>

        <div className="grid gap-12">
          {collections.length > 0 ? (
            collections.map((collection) => (
              <PostCollection
                key={collection.slug}
                collection={collection}
                type="multiple"
                postLimit={2}
              />
            ))
          ) : (
            <p>No collections to show here (Definitely not a mistake)</p>
          )}
        </div>

        <Link href="/collections" className="mx-auto inline-block w-fit">
          <button className="rounded border-2 border-accent px-6 py-3 font-semibold text-accent transition-all hover:bg-accent hover:text-light focus:outline-none md:text-lg xl:px-8 xl:py-4 xl:text-xl">
            {blogButtonText}
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
    <div className="rounded-xl bg-light px-8 py-6 shadow-md shadow-dark/5 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg lg:px-12 lg:py-10">
      <h2 className="text-2xl font-semibold md:text-3xl">
        {title.text} <span className="text-accent">{title.accent}</span>
      </h2>
      {children}
    </div>
  )
}
