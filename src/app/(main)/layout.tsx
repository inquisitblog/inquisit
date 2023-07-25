import "./globals.css"

import Script from "next/script"
import { Poppins } from "next/font/google"

import reader from "@/lib/keystatic"

import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  variable: "--font-poppins",
  display: "swap",
})

export async function generateMetadata() {
  const settings = await reader.singletons.settings.read()
  if (!settings) throw new Error("Keystatic Content Not Found - Site Settings.")

  const {
    siteName,
    url,
    metaTitle: title,
    metaDescription: description,
  } = settings

  return {
    metadataBase: new URL(url),
    title: {
      default: title,
      template: `%s | ${siteName}`,
    },
    description,
    openGraph: {
      title,
      description,
      url: "/",
      siteName,
      type: "website",
    },
    twitter: {
      title,
      description,
      card: "summary",
    },
    themeColor: "#FBEAD2",
    alternates: {
      canonical: "/",
    },
    verification: {
      google: "_Oxno2-E_ZcD4IzO5us4hYsO256n6ZuLis7bwvJ7n_8",
      yandex: "5f246635252f3ada",
    },
  }
}

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const settings = await reader.singletons.settings.read()
  if (!settings) throw new Error("Keystatic Content Not Found - Site Settings.")
  const { siteName, footerTagline, email, navLinks } = settings

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
        <Navbar logoText={siteName} navLinks={navLinks} />
        
        {children}

        <Footer siteName={siteName} footerTagline={footerTagline} email={email} navLinks={navLinks} />
      </body>
    </html>
  )
}
