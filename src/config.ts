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
export const twitterUsername = ""

// Home Page
export const title = "Darshan"
export const description = "Description"

// Blog Page
export const blogTitle = "Blog" // | {title} is added to it => Blog | Darshan
export const blogDescription = "Check out my latest articles."
