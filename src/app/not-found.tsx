import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Not Found | Vibe Zone',
}

export default function AppNotFound() {
  return (
    <main className="flex h-screen flex-col items-center justify-center">
      <h2 className="mb-4 text-3xl font-bold">Not Found</h2>
      <p>Could not find requested resource</p>
      <a href="/" className="mt-8 rounded-full bg-purple-1 px-6 py-2">
        Return Home
      </a>
    </main>
  )
}
