import Editor from '@/components/Editor'
import { getUserFromClerkID } from '@/utils/auth'
import { prisma } from '@/utils/db'

async function getEntry(id: string) {
  const user = await getUserFromClerkID()
  const entry = await prisma.cvEntry.findUnique({
    where: {
      userId_id: {
        userId: user.id,
        id
      }
    }
  })
  return entry
}

export default async function EntryPage({ params }: { params: { id: string } }) {
  const entry = await getEntry(params.id)

  return (
    <div className="h-full w-full">
      <Editor entry={entry} />
    </div>
  )
}