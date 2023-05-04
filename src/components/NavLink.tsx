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
      className={`hover:opacity-70 transition-opacity relative before:absolute  before:w-full before:h-[2px] before:bottom-0 before:left-0  before:bg-dark before:scale-x-0 before:transition-transform hover:before:scale-x-100 ${
        pathname === path ? "before:scale-x-100" : ""
      }`}
    >
      {text}
    </Link>
  )
}

export default NavLink
