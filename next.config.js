/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["placebeard.it", "imgur.com", "i.imgur.com", "cdn.tuk.dev"],
  },
  experimental: {
    appDir: true,
  },
}

module.exports = nextConfig
