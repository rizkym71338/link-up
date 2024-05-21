import { ChatBox } from '@/components'

export default function DirectPage() {
  return <ChatBox ABLY_KEY={process.env.ABLY_KEY || ''} />
}
