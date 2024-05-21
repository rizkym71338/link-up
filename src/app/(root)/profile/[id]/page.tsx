'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

import { Loader, ProfileCard, ProfilePostList, ProfileTab } from '@/components'
import { getUser } from '@/services'

interface ProfilePageProps {
  params: { id: string }
}

export default function ProfilePage({ params }: ProfilePageProps) {
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

      <ProfilePostList user={data.user} />
    </section>
  )
}
