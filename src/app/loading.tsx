import { Loader } from '@/components'

export default function AppLoading() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4 py-20">
      <Loader className="mb-4 h-16" />
      <p className="text-small-semibold">Loading</p>
    </main>
  )
}
