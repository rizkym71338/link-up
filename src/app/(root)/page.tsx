import { UserButton } from '@clerk/nextjs'

export default function RootPage() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <UserButton afterSignOutUrl="/sign-in" />
    </main>
  )
}
