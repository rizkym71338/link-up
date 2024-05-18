import axios from 'axios'

import { prisma } from '@/libs'

interface GetNotificationsProps {
  id: string
  offset?: number
  size?: number
}

export const getNotifications = async (props?: GetNotificationsProps) => {
  const response = await axios.get(`/api/notifications`, { params: props })

  return response.data
}

export const findManyNotificationNoRead = async (recipientId: string) => {
  return await prisma.notification.findMany({
    where: { recipientId, isRead: false },
  })
}
