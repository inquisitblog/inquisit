import Link from "next/link"
import { ArrowRightIcon } from "@heroicons/react/24/outline"
import { cn } from "@/lib/utils"
import BlogAuthors from "./BlogAuthors"
import PostCard from "./PostCard"

type PostCollectionProps = {
  collection: PostCollection
  type: "single" | "multiple"
  postLimit?: number | 0
}

const PostCollection = ({
  collection,
  type,
  postLimit,
}: PostCollectionProps) => {
  let { posts } = collection

  if (postLimit !== 0 || -1) {
    posts = posts.slice(0, postLimit)
  }

  return (
    <div className="grid gap-6">
      <Link
        href={`/collections/${collection.slug}`}
        className={cn("group grid w-fit", {
          "gap-2": type === "multiple",
          "gap-4": type === "single",
        })}
      >
        {type === "single" ? (
          <h1 className="text-4xl font-bold text-accent xl:text-6xl">
            {collection.title}
          </h1>
        ) : (
          <h3 className="relative w-fit text-2xl font-semibold before:absolute before:-bottom-px before:left-0 before:h-[2px] before:w-full before:scale-x-0 before:bg-accent  before:transition-transform group-hover:before:scale-x-100 xl:text-3xl">
            {collection.title}
          </h3>
        )}
        <BlogAuthors authors={collection.authors} />
        <p className="max-w-[60ch] text-xl text-dark/70">
          {collection.description}
        </p>
      </Link>

      {posts.length > 0 ? (
        <PostsStack posts={posts} />
      ) : (
        <p>No posts to show here (Definitely not a mistake)</p>
      )}

      {type === "multiple" && (
        <Link
          href={`/collections/${collection.slug}`}
          className="inline-block w-fit"
        >
          <button className="group flex items-center gap-2 rounded border-2 border-dark px-3 py-2 text-lg font-medium text-dark transition-all hover:bg-dark hover:text-light">
            <span>{collection.buttonText || "Read complete collection"}</span>
            <ArrowRightIcon
              className="aspect-square w-6 transition-transform group-hover:translate-x-1"
              strokeWidth={2}
            />
          </button>
        </Link>
      )}
    </div>
  )
}

const PostsStack = ({ posts }: { posts: BlogPost[] }) => (
  <div className="grid grid-cols-1 gap-8 md:gap-8 xl:gap-10 2xl:grid-cols-2">
    {posts.map((post) => {
      return (
        <PostCard
          key={post.slug}
          type="minimal"
          img={post.image}
          alt={post.imageAlt}
          date={post.pubDate}
          authors={post.authors}
          title={post.title}
          description={post.description}
          tags={post.categories}
          slug={post.slug}
          sizes="100vw"
        />
      )
    })}
  </div>
)

export default PostCollection
