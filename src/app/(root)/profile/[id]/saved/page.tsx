'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

import { Loader, ProfileCard, ProfilePostList, ProfileTab } from '@/components'
import { getUser } from '@/services'

interface SavedPageProps {
  params: { id: string }
}

export default function SavedPage({ params }: SavedPageProps) {
  const [data, setData] = useState({ user: null as any, isLoading: true })

  const router = useRouter()

  useEffect(() => {
    const fetch = async () => {
      const response = await getUser(params.id)

      if (!response) return router.replace('/404')

      setData({ user: response, isLoading: false })
    }

    fetch()
  }, [params.id, router])

  if (data.isLoading) return <Loader className="mx-auto my-4 h-8" />

  return (
    <section>
      <ProfileCard user={data.user} />

      <ProfileTab className="mb-4" />

      <ProfilePostList user={data.user} by="saved" />
    </section>
  )
}
