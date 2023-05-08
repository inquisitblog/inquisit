let inDevEnv
process && process.env.NODE_ENV === "development"
  ? (inDevEnv = true)
  : (inDevEnv = false)

export const dev = inDevEnv

// IGNORE ABOVE THIS

// General Settings
export const url = !dev
  ? "https://darshan-blog.vercel.app"
  : "http://localhost:3000"
export const author = "Darshan"
export const logoText = "Darshan" // Shows in the Navigation & Footer
export const twitterUsername = ""

// Footer
export const footerTagline = "Some sort of tagline?"
export const email = "darshan2004s@gmail.com"

// Home Page
export const title = "Darshan"
export const description = "Description"
export const heroTagline =
  "I do x y z with my life. I like this in my free time."

// Blog Page
export const blogTitle = "Blog" // | {title} is added to it => Blog | Darshan
export const blogDescription = "Check out my latest articles."
