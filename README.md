# Guide

## Getting Started - Clone this repo

1. Navigate to this repo - [neeshsamsi/shan-blog](https://github.com/neeshsamsi/shan-blog)
2. Click on Code on the top right
3. Under the local tab, copy the command to clone the repo based on if you want to use https, ssh or the cli

## Writing Articles

1. To create a new article, start by copying the `template.md` file from the root directory into the `app/blogposts` directory.
2. Rename the file to whatever you want the url of the post. This means that you cannot have special characters or spaces. Words can be divided by -. Example: `post-one.md`
3. Fill in all the metadata enclosed within the 2 `---`
   - **title:** This is the title of your post. It shows in the Blog Card, Blog Article and in the Browser Window when a post is open
   - **description:** This is the description or excerpt of your post. This shows in the Blog Cards & metadata of the page (helps in SEO)
   - **tags:** These are to be written in lower case, (kebab case separated by dashes) as they will become urls. I am not accounting for you having too many tags and messing up the layout so try having about 20-30 characters in all tags of a single article combined.
   - **imgUrl:** This is the url of your article's cover image. Use a complete link if it's an external image host. Use `/filename.ext` if you're using local images. [More about images](#using-images-in-your-articles-images)
   - **imgAlt:** This is alternate text that will show if/when the image cannot load. This may be due to the link provided being broken or simply because the user has a slow network. More importantly it helps make your website accessible to those visually impaired.
4. Now to write your blog. You need to write in markdown. Refer to this [Markdown Guide](https://www.markdownguide.org/basic-syntax/) for help
5. Now to publish this:
   - Open your terminal, or any GitHub GUI if you have it.
   - `git add your-post-title.md`
   - `git commit -m "feat: Add Your post title"`
   - `git push` or `git push origin main`
   - Once something is pushed to the repo, Vercel automatically detects it and deploys the latest version of the app.

If we were smart or concerned that we might make a git mistake that could be fatal to the app -

- Before copying the `template.md` file and editing it
- We could create a new branch with `git branch post_title`
- Then create the post file and edit it within this branch.
- Once ready to publish, commit this file to this branch. Run the project locally to see that nothing's wrong.
- And once everything's all fine, open [GitHub](https://github.com/neeshsamsi/shan-blog) and merge our new branch into main.

## Using images in your articles

- **Image Size:** Create an image that's ideally 1200x630 px.

This is the the required size for images that show when you share a link on Social Media. The size that will show in the website will be the centre 852x630 px out of the total 1200x630 px

Anything lower will pixelate at large screen sizes and anything bigger unnecessarily adds to the image size and therefore to load times.

- Once you have your image, we need to optimize it further to get the lowest file size without losing quality.
  - To do this visit [Convertio](https://convertio.co/)
  - Upload your file and choose `webp` as the format to convert it to.
- Once we have an optimized `.webp` image, you have 2 options to upload it -
  - You can upload your image locally by putting it into the `public` directory.
  - Alternatively You can use a third-party host like [Imgur](imgur.com) - Upload your image. Hover the image, click the 3 dots and Get share links. Now find the `i.imgur.com` link that has a `.webp` extension. (It doesn't work if there isn't an extension in the url).
  - If you're using local images your url will look like `/image.webp` - no need to add darshan-blog.vercel.app, it automatically adds the url. If you're using a third party, your url will be a complete `https://host.com/image.webp`.
  - When using third party image hosts, their domain name needs to be noted in the `next.config.js` or they won't work. I've added `i.imgur.com` but anything else will need to be added.
