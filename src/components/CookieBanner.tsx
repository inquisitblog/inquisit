"use client"

import { getLocalStorage, setLocalStorage } from "@/lib/storageHelper"
import { useState, useEffect } from "react"

export default function CookieBanner() {
  const [cookieConsent, setCookieConsent] = useState<boolean>(false)

  useEffect(() => {
    const storedCookieConsent = getLocalStorage("cookie_consent", null)

    setCookieConsent(storedCookieConsent)
  }, [setCookieConsent])

  useEffect(() => {
    const newValue = cookieConsent ? "granted" : "denied"

    window.gtag("consent", "update", {
      analytics_storage: newValue,
    })

    setLocalStorage("cookie_consent", cookieConsent)
  }, [cookieConsent])

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 mx-auto my-10 flex max-w-max flex-col items-center justify-between gap-4 rounded-lg bg-lighter px-3 py-3 text-sm shadow-xl shadow-dark/10 sm:flex-row md:max-w-screen-sm md:px-4 lg:text-base 2xl:text-lg ${
        cookieConsent === null ? "flex" : "hidden"
      }`}
    >
      <p>We use Cookies on our site.</p>

      <div className="flex gap-2">
        <button
          className="rounded-md border-light px-5 py-2 text-dark transition-all hover:bg-light"
          onClick={() => setCookieConsent(false)}
        >
          Decline
        </button>
        <button
          className="rounded-lg border-2 border-accent px-5 py-2 text-accent transition-all hover:bg-accent hover:text-light"
          onClick={() => setCookieConsent(true)}
        >
          Allow 🍪
        </button>
      </div>
    </div>
  )
}
