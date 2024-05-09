import { prisma } from '@/libs'

export default async function RootPage() {
  const user = await prisma.user.findFirst()

  return (
    <main className="flex items-center justify-center p-20">
      {user?.username}
    </main>
  )
}
