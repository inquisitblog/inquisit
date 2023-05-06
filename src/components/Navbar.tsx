import Link from "next/link"
import React from "react"
import NavLink from "./NavLink"

const Navbar = ({ pathname }: { pathname: string }) => {
  return (
    <nav className="sticky top-0 z-10 bg-light py-8 shadow-lg shadow-stone-900/5">
      <div className="mx-auto flex max-w-screen-xl flex-col items-center justify-between gap-8 px-8 sm:flex-row sm:gap-0">
        <Link
          href="/"
          className="text-xl font-bold text-accent transition-opacity hover:opacity-70"
        >
          Darshan
        </Link>
        <div className="flex gap-6 text-lg">
          {[
            { text: "Home", path: "/" },
            { text: "Blog", path: "/#blog" },
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
