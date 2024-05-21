import { NextRequest, NextResponse } from 'next/server'

import { prisma } from '@/libs'

interface Params {
  params: { id: string }
}

export async function GET(request: NextRequest, { params }: Params) {
  const user = await prisma.user.findFirst({
    where: { id: params.id },
    include: { posts: true },
  })

  return NextResponse.json(user)
}
