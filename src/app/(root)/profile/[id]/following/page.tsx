'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

import { FollowingList, Loader, ProfileCard, ProfileTab } from '@/components'
import { getUser } from '@/services'

interface FollowingPageProps {
  params: { id: string }
}

export default function FollowingPage({ params }: FollowingPageProps) {
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

      <ProfileTab />

      <FollowingList user={data.user} />
    </section>
  )
}
