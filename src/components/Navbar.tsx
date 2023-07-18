"use client"

import Link from "next/link"
import { useState } from "react"

import { Squeeze as Hamburger } from "hamburger-react"
import NavLinks from "./NavLinks"

type Props = {
  logoText: string
  navLinks: readonly {
    readonly text: string
    readonly path: string
    readonly newWindow: boolean
    readonly btn: boolean
  }[]
}

const Navbar = ({logoText, navLinks}: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  return (
    <nav className="sticky top-0 z-10 bg-light shadow-xl shadow-dark/5">
      <div className="py-4 md:py-6">
        <div className="mx-auto flex max-w-screen-2xl items-center justify-between gap-4 px-8 md:gap-8 md:px-16">
          <Link
            href="/"
            className="text-2xl font-bold text-accent transition-opacity hover:opacity-70 xl:text-4xl"
          >
            {logoText}
          </Link>
          <div className="hidden flex-col flex-wrap items-center gap-6 text-base sm:flex-row md:flex md:text-lg xl:text-xl">
            <div className="flex flex-wrap items-center gap-6">
              <NavLinks navLinks={navLinks} />
            </div>
          </div>
          <div className="block md:hidden">
            <Hamburger
              label={!isOpen ? "Show menu" : "Close menu"}
              color="#182A3B"
              toggled={isOpen}
              toggle={setIsOpen}
              size={32}
              rounded
            />
          </div>
        </div>
      </div>

      <div
        className={`${
          isOpen ? "flex animate-nav-show" : "hidden"
        } h-screen flex-col items-center gap-8 overflow-hidden py-12 text-lg transition-all sm:text-xl md:hidden`}
      >
        <ul
          className="flex flex-col items-center gap-6"
          onClick={() => setIsOpen(false)}
        >
          <NavLinks navLinks={navLinks} />
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
