let inDevEnv
process && process.env.NODE_ENV === "development"
  ? (inDevEnv = true)
  : (inDevEnv = false)

export const dev = inDevEnv

type NavLink = { text: string; path: string }
export const navLinks: NavLink[] = [
  { text: "Home", path: "/" },
  { text: "Blog", path: "/blog" },
  { text: "Categories", path: "/categories" },
  { text: "Feed", path: "/rss.xml" },
]

// IGNORE ABOVE THIS

// General Settings
export const url = !dev
  ? "https://darshan-blog.vercel.app"
  : "http://localhost:3000"
export const author = "Darshan" // Shows in the page's metadata
export const logoText = "Darshan" // Shows in the Navigation & Footer
export const twitterUsername = "" // Shows in the page's metadata. Helps when the page is shared on Twitter. If it's empty no issues, it won't be shown.

// Footer
export const footerTagline = "Some sort of tagline?"
export const email = "darshan2004s@gmail.com"

// Home Page
export const title = "Darshan"
export const description = "Description"
export const heroTagline =
  "I do x y z with my life. I like this in my free time."
export const homeImg = "https://placebeard.it/800x800"

// Blog Page
export const blogTitle = "Blog" // | {title} is added to it => Blog | Darshan
export const blogDescription = "Check out my latest articles."
