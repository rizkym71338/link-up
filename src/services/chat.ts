import { prisma } from '@/libs'

export const findManyChatByAuthorAndRecipientId = async (
  currentUserId: string,
  recipientId: string,
) => {
  return await prisma.chat.findMany({
    where: {
      authorId: { in: [currentUserId, recipientId] },
      recipientId: { in: [currentUserId, recipientId] },
    },
    include: { author: true, recipient: true },
  })
}
