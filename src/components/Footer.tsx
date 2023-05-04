import { Instagram, InstagramIcon } from "lucide-react"
import NavLink from "./NavLink"

function Footer() {
  return (
    <footer className="bg-light py-8">
      <div className="mx-auto max-w-screen-xl px-8 text-lg">
        <div className="flex justify-between">
          <div className="flex flex-col gap-2">
            <h6 className="text-xl font-[600]">Darshan</h6>
            <p>Some sort of tagline?</p>
          </div>

          <div className="flex flex-col gap-2">
            <p className="font-[500]">Reach out</p>
            <div className="flex gap-2">
              <a href="https://instagram.com">
                <InstagramIcon size={32} />
              </a>
            </div>
            <a href="mailto:reachout@email.com">reachout@email.com</a>
          </div>
          <div className="flex flex-col gap-2">
            {[
              { text: "Home", path: "/" },
              { text: "Blog", path: "/#blog" },
              { text: "About", path: "/about" },
            ].map(({ text, path }, index) => (
              <NavLink text={text} path={path} key={index} />
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer