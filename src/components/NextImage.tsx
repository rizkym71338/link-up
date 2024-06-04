'use client'

import { useState } from 'react'
import Image, { ImageProps } from 'next/image'

import { cn } from '@/libs'

interface NextImageProps extends ImageProps {
  useSkeleton?: boolean
  blurClassName?: string
}

export const NextImage = ({
  useSkeleton = false,
  src,
  width = 200,
  height = 200,
  alt,
  className,
  blurClassName,
  ...props
}: NextImageProps) => {
  const [status, setStatus] = useState(useSkeleton ? 'loading' : 'complete')

  return (
    <Image
      className={cn(
        className,
        status === 'loading' &&
          cn('animate-pulse bg-gray-200 blur', blurClassName),
      )}
      src={src}
      width={width}
      height={height}
      alt={alt}
      onLoad={() => setStatus('complete')}
      {...props}
    />
  )
}
