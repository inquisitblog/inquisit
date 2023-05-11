"use client"

import { useEffect, useState } from "react"
import { FiArrowUp } from "react-icons/fi"

const ScrollToTop = () => {
  const [scrollPos, setScrollPos] = useState<number>()

  const handleScroll = () => {
    const { scrollY } = window
    setScrollPos(scrollY)
  }

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  })

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <button
      className={`hover ring-none sticky bottom-4 right-4 w-12 self-end rounded-full bg-accent p-2 text-light shadow-md shadow-stone-900/50 outline-none transition-all duration-500 hover:border-2 hover:border-accent hover:bg-lighter hover:text-accent hover:outline-none focus:outline-none md:w-16 md:p-4 ${
        scrollPos && scrollPos > 0
          ? "translate-y-0 opacity-100"
          : "translate-y-24 opacity-0"
      }`}
      onClick={scrollToTop}
      aria-label="Scroll to the top"
    >
      <FiArrowUp size="100%" />
    </button>
  )
}

export default ScrollToTop
