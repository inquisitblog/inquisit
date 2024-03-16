import type {
  BundledLanguage,
  SpecialLanguage,
  StringLiteralUnion,
} from "shiki"
import { codeToHtml } from "shiki"

export default async function Code({
  children,
  language,
}: {
  children: string
  language?:
    | StringLiteralUnion<BundledLanguage | SpecialLanguage, string>
    | undefined
}) {
  let codeBlock: string

  try {
    codeBlock = await codeToHtml(children, {
      lang: language ? language : "typescript",
      theme: "monokai",
    })
  } catch (_error) {
    throw new Error(`Failed to highlight code block with language: ${language}`)
  }

  return <div dangerouslySetInnerHTML={{ __html: codeBlock }} />
}
