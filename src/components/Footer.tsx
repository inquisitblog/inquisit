import reader from "@/lib/keystatic"

import NavLinks from "./NavLinks"

async function Footer() {
  const settings = await reader.singletons.settings.read()

  if (!settings) throw new Error("Keystatic Content Not Found - Site Settings")

  const { siteName, footerTagline, email } = settings

  return (
    <footer className="bg-light py-8">
      <div className="mx-auto max-w-screen-2xl px-8 text-lg">
        <div className="flex flex-col justify-between gap-12 text-center md:flex-row md:gap-0 md:text-start">
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
            <NavLinks />
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
