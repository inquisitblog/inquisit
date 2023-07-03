const { withContentlayer } = require("next-contentlayer")

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["iili.io"],
    formats: ["image/avif", "image/webp"],
  },
  redirects: async () => [
    {
      source: "/categories",
      destination: "/blog/categories",
      permanent: true,
    },
    {
      source: "/stats",
      destination:
        "https://neesh-umami.vercel.app/websites/78a8ae54-c44a-4075-b1cc-c54cfe94789f",
      permanent: true,
    },
  ],
}

module.exports = withContentlayer(nextConfig)
