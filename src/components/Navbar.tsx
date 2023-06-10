"use client"

import * as config from "@/lib/config"
import Link from "next/link"
import { usePathname } from "next/navigation"
import NavLink from "./NavLink"

const Navbar = () => {
  const pathname = usePathname()

  return (
    <nav className="sticky top-0 z-10 bg-light py-4 shadow-lg shadow-stone-900/5 md:py-8">
      <div className="mx-auto flex max-w-screen-xl flex-col items-center justify-between gap-4 px-8 md:flex-row md:gap-8">
        <Link
          href="/"
          className="text-3xl font-bold text-accent transition-opacity hover:opacity-70"
        >
          {config.logoText}
        </Link>
        <div className="flex flex-col flex-wrap items-center gap-4 text-base sm:flex-row md:text-lg xl:text-xl">
          <div className="flex flex-wrap items-center gap-6">
            {config.navLinks.map(({ text, path, newWindow }, index) => (
              <NavLink
                text={text}
                path={path}
                key={index}
                pathname={pathname}
                newWindow={newWindow}
              />
            ))}
          </div>
          <a
            href="https://r2fma1pv48c.typeform.com/to/wXC7QnZC"
            className="block rounded border-2 border-accent px-3 py-1 text-base font-medium text-accent transition-all hover:bg-accent hover:text-light focus:outline-none md:px-4 md:py-2 md:text-lg xl:mx-auto xl:text-xl"
          >
            Get involved
          </a>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
