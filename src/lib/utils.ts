import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

type DateStyle = Intl.DateTimeFormatOptions["dateStyle"]

export function formatDate(
  date: string,
  dateStyle: DateStyle = "medium",
  locales = "en"
) {
  const formatter = new Intl.DateTimeFormat(locales, { dateStyle })
  return formatter.format(new Date(date))
}

export function capitalise(str: string) {
  return str.charAt(0)?.toUpperCase() + str.slice(1)
}

export function displayNames(names: string[]) {
  const last = names.pop()
  const first = names.join(", ")
  if (first) {
    return `${first} and ${last}`
  } else {
    return last
  }
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const cardHoverClasses =
  "transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg shadow-md shadow-dark/5"
