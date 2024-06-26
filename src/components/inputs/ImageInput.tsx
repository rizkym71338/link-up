'use client'

import { useState } from 'react'
import { CldUploadWidget } from 'next-cloudinary'
import { PhotoIcon } from '@heroicons/react/24/outline'

import { NextImage } from '@/components'

interface ImageInputProps {
  name: string
  defaultValue?: string
}

export const ImageInput = ({ name, defaultValue }: ImageInputProps) => {
  const [imagePreview, setImagePreview] = useState(defaultValue || '')

  return (
    <CldUploadWidget
      uploadPreset="vibe-zone"
      onSuccess={(result) => {
        const image = result?.info as any
        setImagePreview(image?.secure_url || '')
      }}
    >
      {({ open }) => (
        <div
          onClick={() => open()}
          className="mb-4 flex aspect-video cursor-pointer items-center justify-center overflow-hidden rounded-md bg-gray-100"
        >
          {imagePreview ? (
            <NextImage
              src={imagePreview}
              alt="preview"
              className="aspect-video w-full object-cover"
            />
          ) : (
            <div className="flex w-full flex-col items-center justify-center p-4">
              <PhotoIcon className="aspect-square h-24" />
              <p>Upload a photo</p>
            </div>
          )}
          <input
            id={name}
            name={name}
            value={imagePreview}
            type="text"
            className="hidden"
            readOnly
          />
        </div>
      )}
    </CldUploadWidget>
  )
}
