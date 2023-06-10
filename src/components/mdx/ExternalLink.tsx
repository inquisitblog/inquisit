import type { FC } from "react"
import type { URL } from "url"
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline"

type Props = {
  text: string
  url: URL
}

const ExternalLink: FC<Props> = ({ text, url }) => {
  return (
    <a
      href={url.toString()}
      target="_blank"
      className="inline-flex w-fit items-center gap-2 px-1 no-underline"
    >
      <span>{text}</span>
      <span className="aspect-square w-5">
        <ArrowTopRightOnSquareIcon strokeWidth={2} />
      </span>
    </a>
  )
}

export default ExternalLink
