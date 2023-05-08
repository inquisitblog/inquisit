"use client"
import NavLink from "@/components/NavLink"
import Image from "next/image"
import { usePathname } from "next/navigation"

export default function NotFound() {
  const pathname = usePathname()
  return (
    <main className="mx-auto flex max-w-screen-xl flex-col items-center justify-between px-8 pt-8 text-center lg:pt-16">
      <section>
        <h1 className="mb-2 text-2xl font-bold text-accent md:mb-4 md:text-3xl xl:text-4xl">
          404 - Not Found
        </h1>
        <h2 className="mb-4 text-3xl font-bold md:mb-10 md:text-4xl xl:text-5xl">
          Whoops! That page doesn&rsquo;t exist.
        </h2>
        <div className="flex flex-col gap-2 text-lg md:gap-4 md:text-xl xl:text-2xl">
          <p>Here&rsquo;s some useful links instead:</p>
          <div className="flex justify-center gap-6">
            {[
              { text: "Home", path: "/" },
              { text: "Blog", path: "/blog" },
              { text: "About", path: "/about" },
            ].map(({ text, path }, index) => (
              <NavLink
                text={text}
                path={path}
                key={index}
                pathname={pathname}
                active
              />
            ))}
          </div>
        </div>
        <div className="relative flex aspect-square h-full max-w-xl lg:max-w-full">
          <Image
            src="/404.svg"
            alt="Illustration of a person with a laptop and question mark."
            fill
            className="object-cover"
          />
        </div>
      </section>
    </main>
  )
}