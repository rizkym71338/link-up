'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { CldUploadWidget } from 'next-cloudinary'
import { PhotoIcon } from '@heroicons/react/24/outline'

interface ImageInputProps {
  name: string
  defaultValue?: string
}

export const ImageInput = ({ name, defaultValue }: ImageInputProps) => {
  const [imagePreview, setImagePreview] = useState<string>(defaultValue || '')

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
          className="flex cursor-pointer items-center justify-center rounded-lg bg-dark-1"
        >
          {imagePreview ? (
            <Image src={imagePreview} alt="preview" width={250} height={200} />
          ) : (
            <div className="flex w-full flex-col items-center justify-center p-6">
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
