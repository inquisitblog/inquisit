import Link from "next/link"
import React from "react"
import NavLink from "./NavLink"

const Navbar = ({ pathname }: { pathname: string }) => {
  return (
    <nav className="bg-light sticky py-8 top-0 shadow-lg shadow-stone-900/5 z-10">
      <div className="mx-auto max-w-screen-xl px-8 flex justify-between items-center flex-col sm:flex-row gap-8 sm:gap-0">
        <Link href="/" className="text-xl font-bold">
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
