import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import slugify from "slugify"

type DateStyle = Intl.DateTimeFormatOptions["dateStyle"]

export function formatDate(
  date: string,
  dateStyle: DateStyle = "medium",
  locales = "en",
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

export function getSlug(node: React.ReactNode) {
  return slugify(getTextNode(node), { lower: true, strict: true })
}

export function getTextNode(node: React.ReactNode): string {
  if (!node) {
    return ""
  }

  if (typeof node === "string") {
    return node
  }

  if (typeof node === "number") {
    return String(node)
  }

  if (
    typeof node === "object" &&
    "text" in node &&
    typeof node.text === "string"
  ) {
    return node.text
  }

  if (node instanceof Array) {
    return node.map(getTextNode).join("")
  }

  if (typeof node === "object" && "props" in node && "node" in node.props) {
    return getTextNode(node.props.node)
  }

  return ""
}
