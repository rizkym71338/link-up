/* eslint-disable @next/next/no-sync-scripts */

import Script from 'next/script'

export default function NotFoundPage() {
  return (
    <html lang="en">
      <head>
        <script src="https://cdn.tailwindcss.com" />
      </head>
      <body>
        <main className="flex h-screen flex-col items-center justify-center bg-[#1D1928] text-white">
          <h2 className="mb-4 text-3xl font-bold">Not Found</h2>
          <p>Could not find requested resource</p>
          <a href="/" className="mt-8 rounded-full bg-[#7857FF] px-6 py-2">
            Return Home
          </a>
        </main>
      </body>
    </html>
  )
}
