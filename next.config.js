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
      source: "/blog/feed",
      destination: "/rss.xml",
      permanent: true,
    },
    {
      source: "/categories",
      destination: "/blog/categories",
      permanent: true,
    },
  ],
}

module.exports = withContentlayer(nextConfig)
