import type { Component, FC, HTMLAttributes } from "react"
import { CopyLinkID } from "./CopyLinkID"
import { cn } from "@/lib/utils"

const H2: FC<HTMLAttributes<HTMLHeadingElement>> = ({
  className,
  ...props
}) => {
  return (
    <div className="not-prose mb-6 mt-12 flex items-center gap-3 text-2xl font-bold text-dark/80 md:mb-8 md:mt-14 md:text-3xl/10">
      <h2 className={cn("", className)} {...props} />
      <CopyLinkID id={props.id} />
    </div>
  )
}

export default H2
