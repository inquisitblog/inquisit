/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["cdn.tuk.dev", "placebeard.it"],
  },
  experimental: {
    appDir: true,
  },
}

module.exports = nextConfig
