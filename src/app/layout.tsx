import * as config from "@/lib/config"
import "./globals.css"
import { Poppins } from "next/font/google"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import GoogleAnalytics from "@/components/GoogleAnalytics"
import CookieBanner from "@/components/CookieBanner"
import Script from "next/script"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  variable: "--font-poppins",
  display: "swap",
})

export const metadata = {
  metadataBase: new URL(config.url),
  title: {
    default: config.title,
    template: `%s | ${config.title}`,
  },
  description: config.description,
  openGraph: {
    title: config.title,
    description: config.description,
    url: "/",
    siteName: config.title,
    type: "website",
  },
  twitter: {
    title: config.title,
    description: config.description,
    creator: config.twitterUsername,
    card: "summary",
  },
  themeColor: "#FBEAD2",
  alternates: {
    canonical: "/",
    types: {
      "application/rss+xml": `${config.url}/rss.xml`,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-p-36 scroll-smooth text-dark">
      {/* <GoogleAnalytics GA_MEASUREMENT_ID="G-1M1T3QCWPN" /> */}
      <Script
        strategy="lazyOnload"
        src="https://neesh-umami.vercel.app/script.js"
        data-website-id="78a8ae54-c44a-4075-b1cc-c54cfe94789f"
      />

      <body
        className={`${poppins.variable} bg-lighter font-sans selection:bg-accent/25`}
      >
        <Navbar />
        {children}
        {/* <CookieBanner /> */}
        <Footer />
      </body>
    </html>
  )
}
