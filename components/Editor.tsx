'use client'

import * as React from 'react'
import { useAutosave } from 'react-autosave'
import { updateEntry } from '@/utils/api'

export default function Editor({ entry }: { entry: any }) {
  const [value, setValue] = React.useState(entry.content)
  const [isLoading, setIsLoading] = React.useState(false)

  useAutosave({
    data: value,
    onSave: async (_value) => {
      setIsLoading(true)
      const updated = await updateEntry(entry.id, _value)
      setIsLoading(false)
    }
  })

  return (
    <div className="w-full h-full">
      {isLoading ? <div className="absolute inset-0 bg-orange-300 bg-opacity-50 flex items-center justify-center">
        <h1>🎶✨🎶✨🎶✨</h1>
        <span className="text-4xl mx-4 italic font-bold">Loading</span>
        <h1>🎶✨🎶✨🎶✨</h1>
      </div> : null}
      <textarea
        className="w-full h-full p-8 text-xl"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  )
}