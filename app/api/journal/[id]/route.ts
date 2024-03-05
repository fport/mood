import { getUserFromClerkID } from '@/utils/auth'
import { prisma } from '@/utils/db'
import { NextResponse } from 'next/server'
import { analyze } from '@/utils/ai'
import { revalidatePath } from 'next/cache'

export const PATCH = async (request: any, { params }: { params: any }) => {
  const { content } = await request.json()
  const user = await getUserFromClerkID()

  const updatedEntry = await prisma.cvEntry.update({
    where: {
      userId_id: {
        userId: user.id,
        id: params.id
      }
    },
    data: {
      content
    }
  })

  const analysis = await analyze(updatedEntry.content)

  const updated = await prisma.analysis.upsert({
    where: {
      entryId: updatedEntry.id
    },
    // @ts-ignore
    create: {
      userId: user.id,
      entryId: updatedEntry.id,
      ...analysis
    },
    // @ts-ignore
    update: analysis
  })

  return NextResponse.json({ data: {...updatedEntry, analysis: updated} })
}