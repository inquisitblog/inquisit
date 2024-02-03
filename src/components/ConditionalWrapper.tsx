import { type ReactNode } from "react"

const ConditionalWrapper = ({
  condition,
  wrapper,
  children,
}: {
  condition: boolean
  wrapper: (children: ReactNode) => ReactNode
  children: ReactNode
}) => (condition ? wrapper(children) : children)

export default ConditionalWrapper
