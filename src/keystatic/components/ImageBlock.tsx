import Image from "next/image"

const ImageBlock = async ({
  src,
  alt,
  title,
}: {
  src: string
  alt: string
  title?: string | undefined
}) => (
  <div className="not-prose">
    <Image
      src={src}
      alt={alt}
      width={750}
      height={750}
      sizes="(min-width: 960px) 735px, (min-width: 760px) calc(45.56vw + 307px), calc(94.77vw - 48px)"
      className="mb-4 object-cover"
    />
    <p>{title}</p>
  </div>
)

export default ImageBlock
