import NavLink from "./NavLink"

type Props = {
  navLinks: readonly {
    readonly text: string
    readonly path: string
    readonly newWindow: boolean
    readonly btn: boolean
  }[]
}

const NavLinks = ({ navLinks }: Props) => {
  return (
    <>
      {navLinks.map(({ text, path, newWindow, btn }) => {
        if (btn) {
          return (
            <CTA key={path} text={text} path={path} newWindow={newWindow} />
          )
        } else {
          return (
            <NavLink key={path} text={text} path={path} newWindow={newWindow} />
          )
        }
      })}
    </>
  )
}

const CTA = ({
  text,
  path,
  newWindow,
}: {
  text: string
  path: string
  newWindow: boolean
}) => {
  return (
    <a
      href={path}
      target={newWindow ? "_blank" : "_self"}
      className="block w-fit rounded border-2 border-accent px-3 py-1 font-medium text-accent transition-all hover:bg-accent hover:text-light focus:outline-none md:px-4 md:py-2 xl:mx-auto"
    >
      {text}
    </a>
  )
}

export default NavLinks
