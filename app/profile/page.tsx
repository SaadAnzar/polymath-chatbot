"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"

import ChatbotCard from "@/components/ChatbotCard"

const MyProfile = () => {
  const { data: session } = useSession()

  const [myChatbots, setMyChatbots] = useState([])

  useEffect(() => {
    const fetchChatbots = async () => {
      const response = await fetch(`/api/users/${session?.user?.id}/chatbots`)
      const data = await response.json()

      setMyChatbots(data)
    }

    if (session?.user?.id) fetchChatbots()
  }, [session?.user?.id])

  const handleDelete = async (post: any) => {
    const hasConfirmed = confirm(
      "Are you sure you want to delete this chatbot?"
    )

    if (hasConfirmed) {
      try {
        await fetch(`/api/chatbot/${post._id.toString()}`, {
          method: "DELETE",
        })

        const filteredChatbots = myChatbots.filter(
          (item: any) => item._id !== post._id
        )

        setMyChatbots(filteredChatbots)
      } catch (error) {
        console.log(error)
      }
    }
  }

  return (
    <>
      {myChatbots.length !== 0 ? (
        <div>
          {myChatbots.map((chatbot: any) => (
            <ChatbotCard
              key={chatbot._id}
              uid={chatbot._id}
              imageURL={chatbot.imageURL}
              chatbotName={chatbot.chatbotName}
              welcomeMessage={chatbot.welcomeMessage}
              description={chatbot.description}
              tags={chatbot.tags}
              prompt={chatbot.prompt}
              handleDelete={() => handleDelete && handleDelete(chatbot)}
            />
          ))}
        </div>
      ) : (
        <div className="m-4 flex h-full flex-col items-center justify-center">
          <h1 className="text-4xl font-bold text-gray-800">No chatbots yet</h1>
          <p className="mt-2 text-gray-500">Create a chatbot to see here</p>
        </div>
      )}
    </>
  )
}

export default MyProfile
