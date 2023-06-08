import {
  defineDocumentType,
  // defineNestedType,
  makeSource,
} from "contentlayer/source-files"
import rehypePrettyCode from "rehype-pretty-code"
import rehypeSlug from "rehype-slug"
import remarkGfm from "remark-gfm"

const resolve = (file: any) => {
  return file._raw.flattenedPath.split("/").slice(1).join()
}

// export const Author = defineNestedType(() => ({
//   name: "Author",
//   fields: {
//     name: { type: "string", required: true },
//   },
// }))
// export const Category = defineNestedType(() => ({
//   name: "Category",
//   fields: {
//     name: { type: "string", required: true },
//   },
// }))

export const Categories = defineDocumentType(() => ({
  name: "Categories",
  filePathPattern: "categories/*.json",
  contentType: "data",
  computedFields: {
    slug: { type: "string", resolve },
  },
  fields: {
    name: { type: "string", required: true },
  },
}))

export const Authors = defineDocumentType(() => ({
  name: "Authors",
  filePathPattern: "authors/*.json",
  contentType: "data",
  computedFields: {
    slug: { type: "string", resolve },
  },
  fields: {
    name: { type: "string", required: true },
    avatar: { type: "string", required: true },
    link: { type: "string" },
  },
}))

export const Post = defineDocumentType(() => ({
  name: "Post",
  filePathPattern: `blogposts/*.mdx`,
  contentType: "mdx",
  fields: {
    title: { type: "string", required: true },
    description: { type: "string", required: true },
    tags: { type: "list", of: { type: "string" }, required: true },
    imgUrl: { type: "string", required: true },
    imgAlt: { type: "string", required: true },
    authors: { type: "list", of: { type: "string" }, required: true },
    date: { type: "date", required: true },
  },
  computedFields: {
    slug: { type: "string", resolve },
  },
}))

export default makeSource({
  contentDirPath: "data",
  documentTypes: [Post, Authors, Categories],
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [
        rehypePrettyCode,
        {
          theme: "monokai",
        },
      ],
    ],
  },
})
