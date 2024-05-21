import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'

import { prisma } from '@/libs'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams

  const size = Number(searchParams.get('size')) || 5
  const offset = Number(searchParams.get('offset')) || 0
  const query = searchParams.get('query') || ''

  const users = await prisma.user.findMany({
    where: {
      OR: [
        { username: { contains: query, mode: 'insensitive' } },
        { firstName: { contains: query, mode: 'insensitive' } },
        { lastName: { contains: query, mode: 'insensitive' } },
      ],
      NOT: { clerkId: auth().userId },
    },
    orderBy: { createdAt: 'desc' },
    take: size,
    skip: offset,
  })

  return NextResponse.json(users)
}
