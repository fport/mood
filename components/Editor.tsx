'use client'

import * as React from 'react'
import { useAutosave } from 'react-autosave'
import { updateEntry } from '@/utils/api'

export default function Editor({ entry }: { entry: any }) {
  const [value, setValue] = React.useState(entry.content)
  const [isLoading, setIsLoading] = React.useState(false)
  const [analysis, setAnalysis] = React.useState(entry.analysis)

  const { mood, summary, color, subject, negative }: any = analysis

  const analysisData = [
    { name: 'Summary', value: summary },
    { name: 'Subject', value: subject },
    { name: 'Mood', value: mood },
    { name: 'Negative', value: negative ? 'True' : 'False' }
  ]

  useAutosave({
    data: value,
    onSave: async (_value) => {
      setIsLoading(true)
      const data = await updateEntry(entry.id, _value)
      setAnalysis(data.analysis)
      setIsLoading(false)
    }
  })

  return (
    <div className="w-full h-full grid grid-cols-3">
      <div className="col-span-2">
        {isLoading ? <div className="absolute inset-0 bg-gray-300 bg-opacity-50 flex items-center justify-center">
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

      <div className="border-l border-black/10">
        <div className="px-6 py-10" style={{ backgroundColor: color }}>
          <h2 className="text-2xl">Analysis</h2>
        </div>
        <div>
          <ul>
            {analysisData.map((item, index) => (
              <li key={index} className="flex items-center justify-between px-2 py-4 border-b border-black/10">
                <h3 className="text-lg font-semibold">{item.name} : </h3>
                <p>{item.value}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}