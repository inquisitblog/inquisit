import {
  collection,
  component,
  config,
  fields,
  singleton,
} from "@keystatic/core"

import ExternalLink from "@/components/mdx/ExternalLink"

export default config({
  storage: {
    kind: "github",
    repo: {
      owner: "inquisitblog",
      name: "inquisit",
    },
  },

  singletons: {
    settings: singleton({
      label: "Site Settings",
      path: "src/data/settings",
      schema: {
        siteName: fields.text({
          label: "Site Name",
          description:
            "Shows in the Navigation menu. And used in the metadata.",
          validation: { length: { min: 1 } },
        }),
        metaTitle: fields.text({
          label: "Metadata Title",
          description:
            "This is the metadata title of the site. It will be prepended to the Site Name in Site Settings. It will be displayed when this page is shared, in the browser tab and used by search engines to rank this page.",
          validation: {
            length: { min: 1 },
          },
        }),
        metaDescription: fields.text({
          label: "Metadata Description",
          description:
            "This is the metadata description of the page. It will be displayed when this site is shared and used by search engines to rank this page.",
          multiline: true,
          validation: {
            length: { min: 1 },
          },
        }),
        url: fields.url({
          label: "Deployed URL",
          description: "Used in the site's metadata.",
          validation: { isRequired: true },
        }),
        email: fields.text({
          label: "Email Contact",
          description:
            "The email displayed in the footer under the Reach out section.",
          validation: {
            length: { min: 1 },
          },
        }),

        navLinks: fields.array(
          fields.object({
            text: fields.text({
              label: "Link Text",
              validation: { length: { min: 1 } },
            }),
            path: fields.text({
              label: "Link Path",
              description:
                "This can be either a relative path (/blog) or an absolute path (https://typeform.com). If it's an absolute path, consider opening the link in a new tab.",
              validation: { length: { min: 1 } },
            }),
            newWindow: fields.checkbox({
              label: "Open link in New Tab?",
              defaultValue: false,
            }),
            btn: fields.checkbox({
              label: "Display as a Call to Action Button?",
              defaultValue: false,
            }),
          }),
          {
            label: "Navigation Menu Links",
            itemLabel: (props) => props.fields.text.value,
          }
        ),

        footerTagline: fields.text({
          label: "Footer Tagline",
          description: "Tagline under the Site Name in the footer.",
          validation: {
            length: { min: 1 },
          },
        }),
      },
    }),

    homepage: singleton({
      label: "Home Page",
      path: "src/data/pages/home",
      schema: {
        metaTitle: fields.text({
          label: "Metadata Title",
          description:
            "This is the metadata title of the site. It will be prepended to the Site Name in Site Settings. It will be displayed when this page is shared, in the browser tab and used by search engines to rank this page.",
          validation: {
            length: { min: 1 },
          },
        }),
        metaDescription: fields.text({
          label: "Metadata Description",
          description:
            "This is the metadata description of the page. It will be displayed when this site is shared and used by search engines to rank this page.",
          multiline: true,
          validation: {
            length: { min: 1 },
          },
        }),
        subheadline: fields.text({
          label: "Subheadline - Main Section",
          description: "The sub headline shown under the main headline.",
          multiline: true,
          validation: {
            length: { min: 1 },
          },
        }),

        blogHeadline: fields.text({
          label: "Headline - Blog Section",
          description: "The headline above the Blog Grid.",
          validation: {
            length: { min: 1 },
          },
        }),
        blogButtonText: fields.text({
          label: "Call to Action - Blog Button",
          description: "The button text that links to the full Blog page.",
          validation: {
            length: { min: 1 },
          },
        }),
      },
    }),
  },

  collections: {
    blogposts: collection({
      label: "Blog Posts",
      path: "src/data/blogposts/*",
      slugField: "title",
      schema: {
        title: fields.slug({
          name: {
            label: "Title",
            validation: { length: { min: 1 } },
          },
          slug: {
            label: "Slug",
            description: "A unique url safe identifier for this article.",
          },
        }),
        description: fields.text({
          label: "Description",
          description: "Displayed on the Blog Card and on the Blog Page.",
          multiline: true,
          validation: {
            length: { min: 1 },
          },
        }),
        authors: fields.array(
          fields.relationship({
            label: "Blog Authors",
            collection: "authors",
            validation: { isRequired: true },
          }),
          {
            label: "Blog Authors",
            itemLabel: (props) => props.value ?? "Please select an Author",
          }
        ),
        categories: fields.array(
          fields.relationship({
            label: "Blog Categories",
            collection: "categories",
            validation: { isRequired: true },
          }),
          {
            label: "Blog Categories",
            itemLabel: (props) => props.value ?? "Please select a Category",
          }
        ),
        image: fields.image({
          label: "Image",
          description:
            "Displayed on the Blog Card and prominently on the Blog Page.",
          validation: { isRequired: true },
          directory: "/public/images/blogposts/",
          publicPath: "/images/blogposts/",
        }),
        imageAlt: fields.text({
          label: "Image Alternate Text",
          description:
            "This is read out to visually impaired users and displayed in a situation where the image was unable to load for any reason.",
          validation: {
            length: { min: 1 },
          },
        }),
        pubDate: fields.date({
          label: "Published Date",
          defaultValue: { kind: "today" },
          validation: { isRequired: true },
        }),
        updatedDate: fields.date({
          label: "Updated At",
          description: "Used in the metadata to show when content is updated.",
          defaultValue: { kind: "today" },
          validation: { isRequired: true },
        }),
        post: fields.document({
          label: "Blog Post",
          description:
            "Actual blog post. ONLY use Paragraphs, Heading 2s and Heading 3s.",
          formatting: true,
          links: true,
          dividers: true,
          componentBlocks: {
            externalLink: component({
              preview: (props) => <p>{props.fields.text.value}</p>,
              label: "External Link",
              schema: {
                text: fields.text({
                  label: "Link Text",
                  validation: { length: { min: 1 } },
                }),
                path: fields.text({
                  label: "Link Path",
                  validation: { length: { min: 1 } },
                }),
              },
            }),
          },
          // images: {
          //   directory: "/public/images/projects/individual/",
          //   publicPath: "/images/projects/individual/",
          //   schema: {
          //     alt: fields.text({
          //       label: "Image Alternate Text",
          //       description:
          //         "This is read out to visually impaired users and displayed in a situation where the image was unable to load for any reason.",
          //       validation: {
          //         length: { min: 1 },
          //       },
          //     }),
          //     title: fields.text({
          //       label: "Image Caption",
          //       description: "This is optional. Displayed under the image.",
          //     }),
          //   },
          // },
        }),
      },
    }),

    categories: collection({
      label: "Blog Categories",
      path: "src/data/categories/*",
      slugField: "name",
      schema: {
        name: fields.slug({
          name: {
            label: "Name",
            validation: { length: { min: 1 } },
          },
          slug: {
            label: "Slug",
            description: "A unique url safe identifier for this article.",
          },
        }),
        description: fields.text({
          label: "Description",
          description:
            "Displayed on the Category Card and on the Category Page.",
          multiline: true,
          validation: {
            length: { min: 1 },
          },
        }),
        // image: fields.image({
        //   label: "Image",
        //   description:
        //     "Displayed on the Category Card and prominently on the Category Page.",
        //   validation: { isRequired: true },
        //   directory: "/public/images/categories/",
        //   publicPath: "/images/categories/",
        // }),
        // imageAlt: fields.text({
        //   label: "Image Alternate Text",
        //   description:
        //     "This is read out to visually impaired users and displayed in a situation where the image was unable to load for any reason.",
        //   validation: {
        //     length: { min: 1 },
        //   },
        // }),
      },
    }),

    authors: collection({
      label: "Authors",
      path: "src/data/authors/*",
      slugField: "name",
      schema: {
        name: fields.slug({
          name: {
            label: "Name",
            validation: { length: { min: 1 } },
          },
          slug: {
            label: "Slug",
            description: "A unique url safe identifier for this article.",
          },
        }),
        description: fields.text({
          label: "Description",
          description: "Displayed on the Author Card and on the Author Page.",
          multiline: true,
          validation: {
            length: { min: 1 },
          },
        }),
        avatar: fields.image({
          label: "Author's Avatar",
          description:
            "Displayed on the Author Card and prominently on the Author Page.",
          validation: { isRequired: true },
          directory: "/public/images/authors/",
          publicPath: "/images/authors/",
        }),
      },
    }),
  },
})
