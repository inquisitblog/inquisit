let inDevEnv
process && process.env.NODE_ENV === "development"
  ? (inDevEnv = true)
  : (inDevEnv = false)

export const dev = inDevEnv

export const title = "Darshan"
export const description = "Description"
export const url = !dev
  ? "https://darshan-blog.vercel.app"
  : "http://localhost:3000"
export const author = "Darshan"
export const twitterUsername = ""
