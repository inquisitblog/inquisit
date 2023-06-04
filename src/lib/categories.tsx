import categories from "@data/categories.json"

export function getCategories(): Category[] {
  return categories
}

export function getCategory(slug: string): Category | undefined {
  const category = categories.find((category) => category.slug === slug)

  return category
}
