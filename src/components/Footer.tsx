import * as config from "@/lib/config"
import NavLink from "./NavLink"

function Footer() {
  return (
    <footer className="bg-light py-8">
      <div className="mx-auto max-w-screen-xl px-8 text-lg">
        <div className="flex flex-col justify-between gap-12 text-center md:flex-row md:gap-0 md:text-start">
          <div className="flex flex-col gap-2">
            <h6 className="text-xl font-[600]">{config.logoText}</h6>
            <p>{config.footerTagline}</p>
          </div>

          <div className="flex flex-col gap-2">
            <p className="font-[500]">Reach out</p>
            <a
              href={`mailto:${config.email}`}
              className="underline-offset-4 transition-all hover:underline"
            >
              {config.email}
            </a>
          </div>
          <div className="flex flex-col items-center gap-2">
            {[
              { text: "Home", path: "/" },
              { text: "Blog", path: "/blog" },
              { text: "About", path: "/about" },
              { text: "RSS", path: "/rss.xml", newWindow: true },
            ].map(({ text, path }, index) => (
              <NavLink text={text} path={path} key={index} newWindow />
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
