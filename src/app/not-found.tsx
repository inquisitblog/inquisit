"use client"

import "@/app/(main)/globals.css"

import { Poppins } from "next/font/google"
import Image from "next/image"

import NavLink from "@/components/NavLink"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  variable: "--font-poppins",
  display: "swap",
})

export default function NotFound() {
  return (
    <main
      className={`${poppins.variable} flex h-screen flex-col items-center bg-lighter px-8 pt-8 text-center font-sans sm:px-12 md:px-16 lg:px-20 lg:pt-16 xl:px-0`}
    >
      <section className="mx-auto max-w-screen-2xl">
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
            ].map(({ text, path }) => (
              <NavLink text={text} path={path} key={path} active />
            ))}
          </div>
        </div>
        <div className="relative flex aspect-square max-w-xl lg:max-w-full">
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
