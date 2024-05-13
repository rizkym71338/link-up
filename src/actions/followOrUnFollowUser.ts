'use server'

import { revalidatePath } from 'next/cache'
import { auth } from '@clerk/nextjs/server'

import { prisma } from '@/libs'

export const followOrUnFollowUser = async (followId: string) => {
  const { userId } = auth()

  const user = await prisma.user.findFirst({ where: { clerkId: userId } })

  if (!user) return

  const isFollowing = user.followingIds.includes(followId)

  await prisma.user.update({
    where: { id: followId },
    data: {
      followers: isFollowing
        ? { disconnect: { id: user.id } }
        : { connect: { id: user.id } },
    },
  })

  if (isFollowing) {
    const notification = await prisma.notification.findFirst({
      where: { type: 'following', authorId: user.id, recipientId: followId },
    })
    if (notification)
      await prisma.notification.delete({ where: { id: notification.id } })
  } else {
    await prisma.notification.create({
      data: {
        type: 'following',
        authorId: user.id,
        recipientId: followId,
        message: 'started following you',
        isRead: false,
      },
    })
  }

  revalidatePath('')
}
