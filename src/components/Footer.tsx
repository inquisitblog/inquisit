import NavLinks from "./NavLinks"

type Props = {
  siteName: string
  footerTagline: string
  email: string
  navLinks: readonly {
    readonly text: string
    readonly path: string
    readonly newWindow: boolean
    readonly btn: boolean
  }[]
}

const Footer = ({ siteName, footerTagline, email, navLinks }: Props) => {
  return (
    <footer className="bg-light py-8">
      <div className="mx-auto flex max-w-screen-2xl flex-col justify-between gap-12 px-8 text-center text-lg md:flex-row md:gap-0 md:px-16 md:text-start">
        <div className="flex flex-col gap-2">
          <p className="text-xl font-[600]">{siteName}</p>
          <p>{footerTagline}</p>
        </div>

        <div className="flex flex-col gap-2">
          <p className="font-[500]">Reach out</p>
          <a
            href={`mailto:${email}`}
            className="underline-offset-4 transition-all hover:underline"
          >
            {email}
          </a>
        </div>
        <div className="flex flex-col items-center gap-2">
          <NavLinks navLinks={navLinks} />
        </div>
      </div>
    </footer>
  )
}

export default Footer
