'use client'

import { ChangeEvent, useState } from 'react'

export default function MediaPicker() {
  const [preview, setPreview] = useState<string | null>(null)

  const sendMemory = async (e: ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target

    if (!files) return
    const previewUrl = URL.createObjectURL(files[0])
    setPreview(previewUrl)
    console.log(e.target.files)
  }

  return (
    <>
      <input
        type="file"
        onChange={sendMemory}
        name="coverUrl"
        id="media"
        accept="image/*, video/*"
        className="invisible h-0"
      />
      {preview && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={preview}
          alt="preview"
          className="aspect-video w-full rounded-lg object-cover"
        />
      )}
    </>
  )
}
