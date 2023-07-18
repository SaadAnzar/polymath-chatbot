"use client"

import { useEffect, useState } from "react"
import { signOut, useSession } from "next-auth/react"

import ChatbotCard from "@/components/ChatbotCard"
import Login from "@/components/Login"

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

  if (!session) return <Login />

  return (
    <>
      <div className="flex justify-between bg-black p-2">
        <h1 className="mx-8 text-3xl font-semibold text-slate-300">
          {session?.user?.name}
        </h1>
        <span className="mx-8 text-3xl font-bold text-slate-200">
          My Chatbots
        </span>
        <button
          onClick={() => signOut()}
          className="mx-8 rounded-lg bg-[#FF9500] px-4 py-2 text-white hover:bg-[#ac6a0d]"
        >
          Sign Out
        </button>
      </div>

      {myChatbots.length === 0 && (
        <div className="m-4 flex h-full flex-col items-center justify-center">
          <h1 className="text-4xl font-bold text-gray-800">No chatbots yet</h1>
          <p className="mt-2 text-gray-500">Create a chatbot to view here</p>
        </div>
      )}

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
    </>
  )
}

export default MyProfile
