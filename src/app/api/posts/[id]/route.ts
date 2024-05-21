import { NextRequest, NextResponse } from 'next/server'

import { prisma } from '@/libs'

interface Params {
  params: { id: string }
}

export async function GET(request: NextRequest, { params }: Params) {
  const post = await prisma.post.findFirst({
    where: { id: params.id },
    include: {
      likes: true,
      author: true,
      saves: true,
      comments: { include: { author: true } },
    },
  })

  return NextResponse.json(post)
}
