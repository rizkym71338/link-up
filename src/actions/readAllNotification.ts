'use server'

import { revalidatePath } from 'next/cache'
import { auth } from '@clerk/nextjs/server'

import { prisma } from '@/libs'

export const readAllNotification = async () => {
  const user = await prisma.user.findFirst({
    where: { clerkId: auth().userId },
  })

  if (!user) return

  await prisma.notification.updateMany({
    where: { recipientId: user.id, isRead: false },
    data: { isRead: true },
  })

  revalidatePath('')
}
