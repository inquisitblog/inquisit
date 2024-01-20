import reader from "@/lib/keystatic"
import { getCollections } from "@/lib/data"
import PostCollection from "@/components/PostCollection"

export async function generateMetadata() {
  const collectionspage = await reader.singletons.collectionspage.read()
  const settings = await reader.singletons.settings.read()

  if (!collectionspage)
    throw new Error("Keystatic Content Not Found - Collections Page")
  if (!settings) throw new Error("Keystatic Content Not Found - Site Settings")

  return {
    title: `${collectionspage.metaTitle}`,
    description: collectionspage.metaDescription,
    alternates: {
      canonical: `/collections`,
    },
  }
}

export default async function Collections() {
  const collectionspage = await reader.singletons.collectionspage.read()
  if (!collectionspage)
    throw new Error("Keystatic Content Not Found - Collections Page")

  const collections = await getCollections()

  return (
    <main className="mx-auto min-h-[80vh] max-w-screen-2xl px-8 py-8 md:px-16 md:py-16">
      <h1 className="mb-12 text-4xl font-bold text-accent md:mb-16 md:text-5xl xl:text-6xl">
        {collectionspage.headline}
      </h1>

      <div className="grid gap-12">
        {collections.map((collection) => (
          <PostCollection
            key={collection.slug}
            collection={collection}
            type="multiple"
            postLimit={2}
          />
        ))}
      </div>
    </main>
  )
}
