import { prisma } from '@/libs'

type CreateOrUpdateUser = {
  id: string
  username: string
  fist_name: string
  last_name: string
  email_addresses: [{ email_address: string }]
  image_url: string
}

export const createOrUpdateUser = async (props: CreateOrUpdateUser) => {
  const data = {
    clerkId: props.id,
    firstName: props.fist_name,
    lastName: props.last_name,
    username: props.username,
    email: props.email_addresses[0].email_address,
    profilePhoto: props.image_url,
  }

  try {
    const user = await prisma.user.findFirst({ where: { clerkId: props.id } })

    if (!user) return await prisma.user.create({ data })

    return await prisma.user.update({ where: { id: user.id }, data })
  } catch (error) {
    console.log(error)
  }
}
