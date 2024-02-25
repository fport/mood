import { getUserFromClerkID } from '@/utils/auth'
import { prisma } from '@/utils/db'
import NewEntryCard from '@/components/NewEntryCard'
import EntryCard from '@/components/EntryCard'
import Link from 'next/link'

async function getEntries() {
  const user = await getUserFromClerkID()
  const entries = await prisma.cvEntry.findMany({
    where: {
      userId: user.id
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  return entries
}

export default async function JournalPage() {
  const entries = await getEntries()

  return (
    <div className="p-10 bg-zinc-400/10 h-full">
      <h2 className="text-3xl mb-8">CV Feedback</h2>
      <div className="grid grid-cols-3 gap-4">
        <NewEntryCard />
        {entries.map(entry => (
          <Link href={`/journal/${entry.id}`} key={entry.id}>
          <EntryCard entry={entry} />
          </Link>
        ))}
      </div>
    </div>
  )
}