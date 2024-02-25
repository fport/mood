import { getUserFromClerkID } from '@/utils/auth'
import { prisma } from '@/utils/db'

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
  console.log('osman', entries)
  return (
    <div>JournalPage</div>
  )
}