let inDevEnv
process && process.env.NODE_ENV === "development"
  ? (inDevEnv = true)
  : (inDevEnv = false)

export const dev = inDevEnv

type NavLink = { text: string; path: string; newWindow?: boolean }
export const navLinks: NavLink[] = [
  { text: "Home", path: "/" },
  { text: "Blog", path: "/blog" },
  { text: "Categories", path: "/categories" },
  { text: "Submit Post", path: "https://r2fma1pv48c.typeform.com/to/wXC7QnZC", newWindow: true},
  // { text: "Feed", path: "/rss.xml", newWindow: true },
]

// IGNORE ABOVE THIS

// General Settings
export const url = !dev
  ? "https://darshan-blog.vercel.app"
  : "http://localhost:3000"
export const author = "Darshan" // Shows in the page's metadata
export const logoText = "Inquisit" // Shows in the Navigation & Footer
export const twitterUsername = "" // Shows in the page's metadata. Helps when the page is shared on Twitter. If it's empty no issues, it won't be shown.

// Footer
export const footerTagline = "Some sort of tagline?"
export const email = "darshan2004s@gmail.com"

// Home Page
export const title = "Inquisit"
export const description = "Inquisit is a project intended to incentivize and share academic adventures across a variety of fields. I hope you find value in this blog as a source of inspiration and a platform for showcasing your own interdisciplinary pursuits."
export const heroTagline = "A project intended to incentivize and share academic adventures across a variety fields. I hope you find value in this blog as a source of inspiration and a platform for showcasing your own interdisciplinary pursuits."

// About Section
export const aboutBlog = [
  "Science and philosophy have been inseparable for most of their history. The Greek pioneers of Western scientific inquiry made no distinction between the two, nor did they separate the range of disciplines such as natural sciences, arts, and literature, that we do today.",
  "The recent three centuries have seen the reduction of science into restrictive disciplines. Today, even as many fields advance rapidly on their own, a loss of the broader perspective hinders the ability of science to address real problems. The need to recultivate a holistic approach to inquiry is important."
]
export const aboutShan = "Hi, I’m Darshan, a gap-year student just having bid farewell to Sahyadri School. I’m interested in studying AI and Cognitive Science through an array of interdisciplinary lenses."
export const aboutNeesh = "Neesh Neesh Neesh Neesh, consectetur adipiscing elit. Nullam interdum eleifend nibh, eget gravida urna bibendum ac. Fusce id volutpat justo. "

// Blog Page
export const blogTitle = "Blog" // Shows as "this | {title}" => Blog | Darshan
export const blogDescription = "Check out my latest articles."