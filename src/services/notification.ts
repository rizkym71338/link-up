import { prisma } from '@/libs'

export const findManyNotificationNoRead = async (recipientId: string) => {
  return await prisma.notification.findMany({
    where: { recipientId, isRead: false },
  })
}

export const findManyNotificationByRecipientId = async (
  recipientId: string,
) => {
  return await prisma.notification.findMany({
    where: { recipientId },
    include: { author: true, post: true },
  })
}
