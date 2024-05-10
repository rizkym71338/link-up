'use server'

import { auth } from '@clerk/nextjs/server'

import { prisma } from '@/libs'
import { revalidatePath } from 'next/cache'

export const followOrUnFollowUser = async (followId: string) => {
  const { userId } = auth()

  const user = await prisma.user.findFirst({ where: { clerkId: userId } })

  const isFollowing = user?.followingIds.includes(followId)

  await prisma.user.update({
    where: { id: followId },
    data: {
      followers: isFollowing
        ? { disconnect: { id: user?.id } }
        : { connect: { id: user?.id } },
    },
  })

  revalidatePath('')
}
