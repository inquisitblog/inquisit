import Link from "next/link"

type NavLinkProps = {
  path: string
  text: string
  pathname?: string
  active?: boolean
}

const NavLink = ({ text, path, pathname, active }: NavLinkProps) => {
  const isActive = active ? true : pathname === path ? true : false

  return (
    <Link
      href={path}
      className={`relative w-fit transition-opacity before:absolute before:-bottom-1  before:left-0 before:h-[2px] before:w-full before:scale-x-0  before:bg-accent before:transition-transform hover:opacity-70 hover:before:scale-x-100 ${
        isActive ? "before:scale-x-100" : ""
      }`}
    >
      {text}
    </Link>
  )
}

export default NavLink
