import { getUserFromClerkID } from '@/utils/auth'
import { prisma } from '@/utils/db'
import { NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'

export const POST = async () => {
  const user = await getUserFromClerkID()
  const entry = await prisma.cvEntry.create({
    data: {
      userId: user.id,
      content: 'write about your CV here'
    }
  })

  revalidatePath('/journal')

  return NextResponse.json({ data: entry })
}