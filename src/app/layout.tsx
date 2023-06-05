import * as config from "@/lib/config"
import "./globals.css"
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
    <html lang="en" className="scroll-smooth text-dark">
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
