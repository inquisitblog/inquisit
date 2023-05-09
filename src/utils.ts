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
