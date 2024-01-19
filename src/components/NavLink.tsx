"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"

type NavLinkProps = {
  path: string
  text: string
  active?: boolean
  newWindow?: boolean
}

const NavLink = ({ text, path, active, newWindow }: NavLinkProps) => {
  const pathname = usePathname()

  const isActive = active ? true : pathname === path ? true : false

  return (
    <Link
      href={path}
      className={cn(
        "relative w-fit transition-opacity before:absolute before:-bottom-1 before:left-0 before:h-[2px] before:w-full before:scale-x-0 before:bg-accent before:transition-transform hover:opacity-80 hover:before:scale-x-100",
        {
          "before:scale-x-100": isActive,
        },
      )}
      target={newWindow ? "_blank" : ""}
    >
      {text}
    </Link>
  )
}

export default NavLink
