import { getUserFromClerkID } from '@/utils/auth'
import { prisma } from '@/utils/db'
import NewEntryCard from '@/components/NewEntryCard'
import EntryCard from '@/components/EntryCard'
import Link from 'next/link'
import { analyze } from '@/utils/ai'

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

  // TODO: Remove this once we have real data
  const propmt = `I'm going to give you an journal entry, and I want you to analyze
   for a few things. I need the mood, a summary, what the subject is, and a color 
   representing the mood. You need to respond back with formatted JSON like so: {"mood": "", "subject": "", "color": "", "negative": ""}.
   
   entry: 
   Today was a really great day. I went to the park and played with my dog. 
   I also got to see my friends and we had a great time. I'm really happy today.
   `

  await analyze(propmt)

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