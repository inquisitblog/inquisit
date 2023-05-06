"use client"

import { usePathname } from "next/navigation"

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

// export const metadata = {
//   title: "Shan Blog - Home",
//   description: "Shan's little blog.",
//   openGraph: {
//     title: "Shan Blog - Home",
//     description: "Shan's little blog.",
//     image: "",
//     url: "",
//     siteName: "",

//     type: "article",
//     authors: ["Shan"],
//     publishedTime: "2023-01-01T00:00:00.000Z",
//   },
//   twitter: {
//     title: "",
//     description: "",
//     image: "",
//     creator: "",
//     card: "",
//   },
//   themeColor: "",
//   alternates: {
//     canonical: "",
//     types: {
//       "application/rss+xml": "url/rss.xml",
//     },
//   },
// }

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  return (
    <html lang="en" className="scroll-p-12 scroll-smooth">
      <body className={`${poppins.variable} bg-lighter font-sans`}>
        <Navbar pathname={pathname} />
        {children}
        <Footer />
      </body>
    </html>
  )
}
