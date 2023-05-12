import * as config from "@/lib/config"
import { getPosts } from "@/lib/posts"
import { NextResponse } from "next/server"

export async function GET() {
  const posts = getPosts()

  const xml = `
<rss xmlns:atom="http://www.w3.org/2005/Atom" version="2.0">
			<channel>
				<title>${config.title}</title>
				<description>${config.description}</description>
				<link>${config.url}</link>
				<atom:link href="${config.url}/rss.xml" rel="self" type="application/rss+xml"/>
				${posts
          .map(
            (post) => `
						<item>
							<title>${post.title}</title>
							<description>${post.description}</description>
							<link>${config.url}/${post.id}</link>
							<guid isPermaLink="true">${config.url}/${post.id}</guid>
							<pubDate>${new Date(post.date).toUTCString()}</pubDate>
						</item>
					`
          )
          .join("")}
			</channel>
		</rss>
	`.trim()

  return new NextResponse(xml, {
    status: 200,
    headers: { "Content-Type": "application/xml" },
  })
}
