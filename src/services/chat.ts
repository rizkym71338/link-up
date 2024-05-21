import axios from 'axios'

interface GetChatsProps {
  currentUserId: string
  recipientId: string
}

export const getChats = async (props: GetChatsProps) => {
  const response = await axios.get(`/api/chats`, {
    params: props,
  })

  return response.data
}
