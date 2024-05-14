import { Prisma } from '@prisma/client'

import { prisma } from '@/libs'

export const findManyNotification = async (
  props?: Prisma.NotificationFindManyArgs,
) => {
  return await prisma.notification.findMany({
    ...props,
    include: { ...props?.include },
    orderBy: { createdAt: 'desc' },
  })
}
