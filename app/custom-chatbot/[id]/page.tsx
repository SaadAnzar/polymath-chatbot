"use client"

import React, { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { useParams } from "next/navigation"
import axios from "axios"
import { motion } from "framer-motion"
import { UserCircle2 } from "lucide-react"

interface ChatbotProps {
  imageURL: string
  chatbotName: string
  welcomeMessage: string
  description: string
  file: File | undefined
  tags: string
  prompt: string
}

interface Chat {
  message: string
  author: string
}

const CustomChatbot = () => {
  const params = useParams()

  const chatbotId = params?.id

  const [chatbotDetails, setChatbotDetails] = useState({} as ChatbotProps)

  useEffect(() => {
    const getChatbotDetails = async () => {
      const response = await fetch(`/api/chatbot/${chatbotId}`)
      const data = await response.json()

      setChatbotDetails(data)
    }

    if (chatbotId) getChatbotDetails()
  }, [chatbotId])

  const {
    imageURL,
    chatbotName,
    welcomeMessage,
    description,
    tags,
    prompt,
  }: ChatbotProps = {
    ...chatbotDetails,
  }

  const [input, setInput] = useState("")
  const [chats, setChats] = useState<Chat[]>([
    { message: welcomeMessage, author: "bot" },
  ])
  const [loading, setLoading] = useState(false)

  const chatContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
    }
  }, [chats])

  useEffect(() => {
    setChats([
      { message: welcomeMessage || "Hi, How can I help you?", author: "bot" },
    ])
  }, [welcomeMessage])

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    setChats([...chats, { message: input, author: "user" }])
    setLoading(true)

    const url = "/api/chat"

    const data = {
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: prompt },
        { role: "user", content: input },
      ],
    }

    axios
      .post(url, data)
      .then((response) => {
        const Answer = response.data.choices[0].message.content

        setChats([
          ...chats,
          {
            message: input,
            author: "user",
          },
          {
            message: Answer,
            author: "bot",
          },
        ])
        setInput("")
        setLoading(false)
      })
      .catch((error) => {
        console.log(error)
        setChats([
          ...chats,
          { message: input, author: "user" },
          {
            message:
              "Sorry, We've ran out of Open AI credits right now! We know its not ideal.",
            author: "bot",
          },
        ])
        setInput("")
        setLoading(false)
      })
  }

  return (
    <div className="h-full rounded-2xl bg-[#f3f3ee] shadow">
      <div className="flex rounded-t-2xl bg-gray-50 px-4 py-2 shadow-sm">
        <div className="grow items-center justify-between">
          <div className="flex justify-between">
            <h1 className="inline-block text-lg font-bold">
              {chatbotName || "Polymath Chatbot"}
            </h1>
            <span className="text-sm text-gray-500">{tags || "AI, GPT-3"}</span>
          </div>
          <span className="text-sm text-gray-500">
            {description || "This is your AI assistant. Ask whatever you want."}
          </span>
        </div>
      </div>

      <div ref={chatContainerRef} className="m-2 h-[75vh] overflow-y-auto p-1">
        {chats.map((chat, index) => (
          <div
            key={index}
            className={`mx-2.5 my-2 rounded-lg py-0.5 ${
              chat.author === "user" ? "text-right" : "w-[90%] text-left"
            }`}
          >
            <div className="inline-flex items-center">
              {chat.author === "bot" && !imageURL && (
                <UserCircle2 width={30} height={30} />
              )}
              {chat.author === "bot" && imageURL && (
                <Image
                  src={imageURL}
                  alt="Chatbot Icon"
                  width={30}
                  height={30}
                  className="rounded-full"
                />
              )}

              <span
                className={`mx-2 inline-block rounded-lg p-2 text-base font-medium ${
                  chat.author === "user"
                    ? "rounded-br-none bg-[#FFEFD9] text-[#FF9500]"
                    : "rounded-bl-none bg-white text-gray-700"
                }`}
              >
                {chat.message}
              </span>

              {chat.author === "user" && <UserCircle2 width={30} height={30} />}
            </div>
          </div>
        ))}
        {loading && (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity }}
            className="ml-2 mt-2 flex h-4 w-4 animate-spin items-start rounded-full ring-gray-400"
          >
            <div className="h-2 w-2 rounded-full bg-gray-400"></div>
          </motion.div>
        )}
      </div>
      <div className="m-2 rounded-[2rem] bg-white py-2 drop-shadow-sm">
        <form onSubmit={handleSubmit}>
          <div className="flex items-center px-4 py-1">
            <input
              type="text"
              value={input}
              placeholder="Ask anything..."
              onChange={(event) =>
                setInput(
                  event.target.value.charAt(0).toUpperCase() +
                    event.target.value.slice(1)
                )
              }
              className="m-0 w-full border-none bg-inherit p-0 outline-none placeholder:text-[#707070] focus:outline-none focus:ring-0"
            />
            <button
              type="submit"
              className="ml-2 rounded-full bg-[#f3f3ee] p-1 hover:bg-[wheat]"
            >
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 24 24"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g>
                  <path fill="none" d="M0 0h24v24H0z"></path>
                  <path d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"></path>
                </g>
              </svg>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CustomChatbot
