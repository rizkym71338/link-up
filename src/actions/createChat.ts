'use server'

import { prisma } from '@/libs'

interface CreateChatProps {
  authorId: string
  recipientId: string
  message: string
}

export const createChat = async (props: CreateChatProps) => {
  return await prisma.chat.create({
    data: { ...props, isRead: false },
    include: { author: true, recipient: true },
  })
}
