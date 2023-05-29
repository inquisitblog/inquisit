/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["placebeard.it", "imgur.com", "i.imgur.com", "cdn.tuk.dev", "iili.io"],
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

module.exports = nextConfig
