import { HTMLAttributes } from "react"

import reader from "@/lib/keystatic"
import { cn } from "@/lib/utils"

import { CopyLinkID } from "./CopyLinkID"

const H2 = async ({
  className,
  ...props
}: HTMLAttributes<HTMLHeadingElement>) => {
  const settings = await reader.singletons.settings.read()
  if (!settings) throw new Error("Keystatic Content Not Found - Site Settings")

  return (
    <div className="not-prose mb-6 mt-12 flex items-center gap-3 text-2xl font-bold text-dark/80 md:mb-8 md:mt-14 md:text-3xl/10">
      <h2 className={cn("", className)} {...props} />
      <CopyLinkID url={settings.url} id={props.id} />
    </div>
  )
}

export default H2
