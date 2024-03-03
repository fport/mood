'use client'

import * as React from 'react'
import { askQuestion } from '@/utils/api'

export default function Question() {
  const [value, setValue] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const [response, setResponse] = React.useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)

    const answer = await askQuestion(value)
    setResponse(answer)

    setValue('')
    setLoading(false)
  }

  function onChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value)
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          onChange={onChange}
          value={value}
          type="text"
          placeholder="Type your question here"
          className="border border-black/20 px-4 py-2 text-lg rounded-lg"
        />
        <button
          type="submit"
          className="bg-blue-400 px-4 py-2 rounded-lg text-lg ml-2"
          disabled={loading}
        >Ask</button>
      </form>
      {loading && <p>Loading...</p>}
      {response && <p>{response}</p>}
    </div>
  )
}