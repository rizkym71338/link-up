'use server'

import { prisma } from '@/libs'

interface readAllChatProps {
  authorId: string
  recipientId: string
}

export const readAllChat = async (props: readAllChatProps) => {
  return await prisma.chat.updateMany({
    where: props,
    data: { isRead: true },
  })
}
