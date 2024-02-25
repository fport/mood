'use client'

import { createNewEntry } from '@/utils/api'
import { useRouter } from 'next/navigation'

export default function NewEntryCard() {
  const router = useRouter()

  async function handleOnClick() {
    const data =await createNewEntry()
    router.push(`/jorunal/${data.id}`)
  }

  return (
    <div className="cursor-pointer overflow-hidden rounded-lg bg-white shadow">
      <div className="px-4 py-5 sm:p-6" onClick={handleOnClick}>
        <span className="text-3xl">New Entry 🐨</span>
      </div>
    </div>
  )
}