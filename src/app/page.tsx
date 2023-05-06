import BlogCard from "@/components/BlogCard"
import Image from "next/image"

const verticalBlogGap = "gap-16 xl:gap-6"

export default function Home() {
  return (
    <>
      <main className="mx-auto flex max-w-screen-xl flex-col items-start gap-8 px-8 py-16 md:flex-row md:items-center md:gap-24">
        <div>
          <p className="mb-1 text-xl md:mb-2 xl:text-2xl">Hello, My name is</p>
          <h1 className="text-4xl font-semibold md:text-5xl xl:text-6xl">
            Darshan
          </h1>
          <p className="mb:mt-4 mt-2 text-2xl xl:text-3xl">
            I do x y z with my life. I like this in my free time.
          </p>
        </div>
        <div className="relative aspect-square w-3/5 overflow-hidden rounded-full shadow-lg shadow-stone-900/50 sm:w-2/5">
          <Image
            src="https://placebeard.it/800x800"
            alt="placeholder image"
            className="object-cover"
            fill
          />
        </div>
      </main>
      <section id="blog" className="mx-auto max-w-screen-xl px-8 py-16">
        <h2 className="text-5xl font-bold text-accent">My Blog</h2>
        <div
          className={`flex max-w-2xl flex-col py-16 xl:w-full xl:max-w-none xl:flex-row ${verticalBlogGap}`}
        >
          <div className="xl:w-1/2">
            <BlogCard
              type="Regular"
              img="https://cdn.tuk.dev/assets/components/111220/blg-17/blog1.png"
              alt="Blog card image"
              date="12th April, 2023"
              title="Beautiful Italy, Travel Blog"
              description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. It has survived not only five centuries. Lorem Ipsum is simply dummy text of the printing and typesetting industry."
              slug="one"
            />
          </div>
          <div className={`flex flex-col xl:w-1/2 ${verticalBlogGap}`}>
            <BlogCard
              type="Sidebar"
              img="https://cdn.tuk.dev/assets/components/111220/blg-17/blog2.png"
              alt="Blog card image"
              date="13th April, 2023"
              title="A Broken Backpack"
              description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. It has survived not only five centuries. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore consequuntur illo, ipsa quasi voluptatem totam minus iusto cumque sunt provident."
              slug="two"
            />

            <BlogCard
              type="Sidebar"
              img="https://cdn.tuk.dev/assets/components/111220/blg-17/blog3.png"
              alt="Blog card image"
              date="14th April, 2023"
              title="My life’s a Movie"
              description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. It has survived not only five centuries. Lorem Ipsum is simply dummy text of the printing and typesetting industry."
              slug="three"
            />

            <BlogCard
              type="Sidebar"
              img="https://cdn.tuk.dev/assets/components/111220/blg-17/blog4.png"
              alt="Blog card image"
              date="15th April, 2023"
              title="Lilii’s Travel Plans"
              description="Lorem Ipsum is simply dummy text of the printing and typesetting industry. It has survived not only five centuries. Lorem Ipsum is simply dummy text of the printing and typesetting industry."
              slug="three"
            />
          </div>
        </div>

        <button className="block rounded border-2 border-accent px-6 py-3 font-semibold text-accent transition-all hover:bg-accent hover:text-light focus:outline-none md:text-lg xl:mx-auto xl:px-8 xl:py-4 xl:text-2xl">
          Browse More
        </button>
      </section>
    </>
  )
}
