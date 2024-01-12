/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  redirects: async () => [
    {
      source: "/stats",
      destination:
        "https://umami.neeshsamsi.com/websites/78a8ae54-c44a-4075-b1cc-c54cfe94789f",
      permanent: true,
    },
  ],
}

module.exports = nextConfig
