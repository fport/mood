import { getUserFromClerkID } from '@/utils/auth'
import { prisma } from '@/utils/db'
import { NextResponse } from 'next/server'

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

  return NextResponse.json({ data: updatedEntry })
}