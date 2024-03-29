import { collection, config, fields, singleton } from "@keystatic/core"

export default config({
  storage: {
    kind: "github",
    repo: {
      owner: "inquisitblog",
      name: "inquisit",
    },
  },

  ui: {
    brand: { name: "Inquisit" },
    navigation: {
      "Site Settings": ["settings"],
      "Page Settings": [
        "homepage",
        "collectionspage",
        "categoriespage",
        "authorspage",
      ],
      Collections: ["collections", "blogposts", "categories", "authors"],
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
                "This can be either a relative path (/colletions) or an absolute path (https://typeform.com). If it's an absolute path, consider opening the link in a new tab.",
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
          },
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
        aboutBlog: fields.array(
          fields.text({
            label: "Paragraph",
            multiline: true,
            validation: { length: { min: 1 } },
          }),
          {
            label: "About Blog Card",
            description: "List of paragraphs in the About Blog Card.",
            validation: { length: { min: 1 } },
            itemLabel: (props) => props.value,
          },
        ),
        aboutPeople: fields.array(
          fields.object({
            name: fields.text({
              label: "Name",
              validation: { length: { min: 1 } },
            }),
            description: fields.text({
              label: "Description",
              multiline: true,
              validation: { length: { min: 1 } },
            }),
            avatar: fields.text({
              label: "Image Path",
              description: "Path to image in public folder.",
              validation: { length: { min: 1 } },
            }),
          }),
          {
            label: "About People Card",
            description: "List of People Cards",
            validation: { length: { min: 1 } },
            itemLabel: (props) => props.fields.name.value,
          },
        ),

        blogHeadline: fields.text({
          label: "Headline - Collections Section",
          description: "The headline above the Collections Grid.",
          validation: {
            length: { min: 1 },
          },
        }),
        blogButtonText: fields.text({
          label: "Call to Action - Collections Button",
          description:
            "The button text that links to the All Collections page.",
          validation: {
            length: { min: 1 },
          },
        }),
      },
    }),

    collectionspage: singleton({
      label: "Collections Page",
      path: "src/data/pages/collections",
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
        headline: fields.text({
          label: "Headline - Main Section",
          validation: {
            length: { min: 1 },
          },
        }),
      },
    }),

    categoriespage: singleton({
      label: "Post Categories Page",
      path: "src/data/pages/categories",
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
        headline: fields.text({
          label: "Headline - Main Section",
          validation: {
            length: { min: 1 },
          },
        }),
        ctaText: fields.text({
          label: "Button Text - Call to Action",
          validation: {
            length: { min: 1 },
          },
        }),
      },
    }),

    authorspage: singleton({
      label: "Authors Page",
      path: "src/data/pages/authors",
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
        headline: fields.text({
          label: "Headline - Main Section",
          validation: {
            length: { min: 1 },
          },
        }),
      },
    }),
  },

  collections: {
    collections: collection({
      label: "Collections",
      path: "src/data/collections/*",
      slugField: "title",
      columns: ["title"],
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
          description:
            "Displayed on the Collection Section and on the Collection Page.",
          multiline: true,
          validation: {
            length: { min: 1 },
          },
        }),
        authors: fields.array(
          fields.relationship({
            label: "Authors",
            collection: "authors",
            validation: { isRequired: true },
          }),
          {
            label: "Authors",
            itemLabel: (props) => props.value ?? "Please select an Author",
          },
        ),
        posts: fields.array(
          fields.relationship({
            label: "Post",
            collection: "blogposts",
            validation: { isRequired: true },
          }),
          {
            label: "Posts",
            itemLabel: (props) => props.value ?? "Please select a Post",
          },
        ),
        buttonText: fields.text({
          label: "Button Text (Optional)",
          description:
            "The text on the full collection button - default text is 'Read complete collection'",
        }),
      },
    }),

    blogposts: collection({
      label: "Posts",
      path: "src/data/blogposts/*",
      entryLayout: "content",
      format: {
        contentField: "article",
      },
      slugField: "title",
      columns: ["updatedDate", "title", "published"],
      schema: {
        published: fields.checkbox({
          label: "Published",
          description:
            "Check it to publish. Unchecked posts remain as drafts in Keystatic and do not make it to the live site.",
          defaultValue: false,
        }),
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
          description: "Displayed on the Post Card.",
          multiline: true,
          validation: {
            length: { min: 1 },
          },
        }),
        authors: fields.array(
          fields.relationship({
            label: "Authors",
            collection: "authors",
            validation: { isRequired: true },
          }),
          {
            label: "Authors",
            itemLabel: (props) => props.value ?? "Please select an Author",
          },
        ),
        categories: fields.array(
          fields.relationship({
            label: "Categories",
            collection: "categories",
            validation: { isRequired: true },
          }),
          {
            label: "Categories",
            itemLabel: (props) => props.value ?? "Please select a Category",
          },
        ),
        image: fields.image({
          label: "Image",
          description:
            "Displayed on the Post Card and prominently on the Post Page.",
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
        article: fields.document({
          label: "Post",
          description:
            "Actual Post content. ONLY use Paragraphs, Heading 2s and Heading 3s.",
          formatting: {
            inlineMarks: {
              bold: true,
              italic: true,
              underline: true,
              strikethrough: true,
              code: true,
              superscript: true,
              subscript: true,
              keyboard: true,
            },
            listTypes: {
              ordered: true,
              unordered: true,
            },
            headingLevels: [2, 3, 4, 5, 6],
            blockTypes: {
              blockquote: true,
              code: true,
            },
          },
          links: true,
          dividers: true,
          // componentBlocks,
          images: {
            directory: "public/images/blogposts/img",
            publicPath: "/images/blogposts/img",
            schema: {
              alt: fields.text({
                label: "Image Alternate Text",
                description:
                  "This is read out to visually impaired users and displayed in a situation where the image was unable to load for any reason.",
                validation: {
                  length: { min: 1 },
                },
              }),
              title: fields.text({
                label: "Image Caption",
                description: "This is optional. Displayed under the image.",
              }),
            },
          },
        }),
      },
    }),

    categories: collection({
      label: "Categories",
      path: "src/data/categories/*",
      slugField: "name",
      columns: ["name"],
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
      columns: ["name", "description", "link"],
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
        link: fields.url({
          label: "External Link",
          description:
            "Optional link to something you'd like to show off or link to.",
        }),
      },
    }),
  },
})
