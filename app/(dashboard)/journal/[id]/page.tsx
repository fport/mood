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
  const analysis =[
    {name: 'Summary', value: ''},
    {name: 'Subject', value: ''},
    {name: 'Mood', value: ''},
    {name: 'Negative', value: 'False'},
  ]
  return (
    <div className="h-full w-full grid grid-cols-3">
      <div className="col-span-2">
        <Editor entry={entry} />
      </div>
      <div className="border-l border-black/10">
        <div className="bg-blue-300 px-6 py-10">
          <h2 className="text-2xl">Analysis</h2>
        </div>
        <div>
          <ul>
            {analysis.map((item, index) => (
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