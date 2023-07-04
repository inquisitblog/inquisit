import * as config from "@/lib/config"
import "./globals.css"

import type { Metadata } from "next"
import Script from "next/script"
import { Poppins } from "next/font/google"

import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  variable: "--font-poppins",
  display: "swap",
})

export const metadata: Metadata = {
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
  verification: {
    google: "_Oxno2-E_ZcD4IzO5us4hYsO256n6ZuLis7bwvJ7n_8",
    yandex: "5f246635252f3ada",
  },
}

export default function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-p-36 scroll-smooth text-dark">
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

        <Footer />
      </body>
    </html>
  )
}
