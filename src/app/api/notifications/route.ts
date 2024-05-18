import { NextRequest } from 'next/server'

import { prisma } from '@/libs'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams

  const size = Number(searchParams.get('size')) || 15
  const offset = Number(searchParams.get('offset')) || 0
  const id = searchParams.get('id') || ''

  const notifications = await prisma.notification.findMany({
    where: { recipientId: id },
    include: { author: true, post: true },
    orderBy: { createdAt: 'desc' },
    take: size,
    skip: offset,
  })

  return Response.json(notifications)
}
