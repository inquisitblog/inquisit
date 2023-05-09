"use client"

import * as config from "@/lib/config"
import Link from "next/link"
import { usePathname } from "next/navigation"
import NavLink from "./NavLink"

const Navbar = () => {
  const pathname = usePathname()

  return (
    <nav className="sticky top-0 z-10 bg-light py-4 shadow-lg shadow-stone-900/5 md:py-8">
      <div className="mx-auto flex max-w-screen-xl flex-col items-center justify-between gap-2 px-8 md:flex-row md:gap-8">
        <Link
          href="/"
          className="text-xl font-bold text-accent transition-opacity hover:opacity-70"
        >
          {config.logoText}
        </Link>
        <div className="flex gap-6 text-lg">
          {[
            { text: "Home", path: "/" },
            { text: "Blog", path: "/blog" },
            { text: "About", path: "/about" },
          ].map(({ text, path }, index) => (
            <NavLink text={text} path={path} key={index} pathname={pathname} />
          ))}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
