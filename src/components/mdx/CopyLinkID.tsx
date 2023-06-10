"use client"

import * as config from "@/lib/config"
import { type FC, useState } from "react"
import { usePathname } from "next/navigation"
import { LinkIcon } from "@heroicons/react/24/outline"

export const CopyLinkID: FC<{ id?: string }> = ({ id }) => {
  const pathname = usePathname()
  const [tooltipText, setTooltipText] = useState<string>("Copy")

  const blogUrl = `${config.url}${pathname}#${id}`

  const handleClick = () => {
    navigator.clipboard.writeText(blogUrl)

    setTooltipText("Copied!")

    setTimeout(() => {
      setTooltipText("Copy")
    }, 2500)
  }

  return (
    <div className="group relative">
      <p className="absolute -top-full left-1/2 -translate-x-1/2 translate-y-1 rounded-md bg-dark/80 px-2 py-1 text-xs font-medium text-lighter opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100 md:text-sm">
        {tooltipText}
      </p>
      <div className="arrow-down absolute -top-2 left-1/2 -translate-x-1/2 translate-y-1 opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100 md:-top-3" />
      <button
        className="relative aspect-square w-5 transition-opacity before:absolute hover:opacity-80 md:w-7"
        onClick={handleClick}
      >
        <LinkIcon strokeWidth={2.5} />
      </button>
    </div>
  )
}
