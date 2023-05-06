import Link from "next/link"

type NavLinkProps = {
  path: string
  text: string
  pathname?: string
}

const NavLink = ({ text, path, pathname }: NavLinkProps) => {
  return (
    <Link
      href={path}
      className={`relative transition-opacity before:absolute before:bottom-0  before:left-0 before:h-[2px] before:w-full before:scale-x-0  before:bg-accent before:transition-transform hover:opacity-70 hover:before:scale-x-100 ${
        pathname === path ? "before:scale-x-100" : ""
      }`}
    >
      {text}
    </Link>
  )
}

export default NavLink
