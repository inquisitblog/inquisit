import { Categories, allCategories } from "contentlayer/generated"

export function singleCategory(slug: string): Category | undefined {
  const categories: Categories[] = allCategories

  const clCategory = categories.find((category) => category.slug === slug)

  if (clCategory) {
    const { _id, _raw, type, ...category } = clCategory
    return category
  } else {
    return undefined
  }
}
