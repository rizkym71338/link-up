'use client'

import Image, { ImageProps } from 'next/image'

export const CustomImage = ({ width, height, alt, ...props }: ImageProps) => {
  return <Image width={200} height={200} alt={alt} {...props} />
}

export default CustomImage
