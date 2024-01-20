import { ArrowLeftCircleIcon } from "@heroicons/react/24/outline"
import Link from "next/link"

export default function BackTo({ link, text }: { link: string; text: string }) {
  return (
    <Link
      href={link}
      className="flex items-center gap-3 text-lg transition-all hover:opacity-70 lg:text-xl"
    >
      <div className="w-6 lg:w-8">
        <ArrowLeftCircleIcon strokeWidth={1.5} />
      </div>
      <p>{text}</p>
    </Link>
  )
}
