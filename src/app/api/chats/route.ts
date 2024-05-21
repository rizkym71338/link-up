import { NextRequest, NextResponse } from 'next/server'

import { prisma } from '@/libs'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams

  const currentUserId = searchParams.get('currentUserId') || ''
  const recipientId = searchParams.get('recipientId') || ''

  const users = await prisma.chat.findMany({
    where: {
      authorId: { in: [currentUserId, recipientId] },
      recipientId: { in: [currentUserId, recipientId] },
    },
    include: { author: true, recipient: true },
  })

  return NextResponse.json(users)
}
