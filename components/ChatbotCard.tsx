"use client"

import { useState } from "react"
import Image from "next/image"
import { ClipboardCheck, Copy, Trash2 } from "lucide-react"

interface CardProps {
  uid: string
  imageURL: string
  chatbotName: string
  welcomeMessage: string
  description: string
  tags: string
  prompt: string
  handleDelete: any
}

const ChatbotCard: React.FC<CardProps> = ({
  uid,
  imageURL,
  chatbotName,
  welcomeMessage,
  description,
  tags,
  prompt,
  handleDelete,
}) => {
  const [copied, setCopied] = useState<string | false>(false)

  const iframe_url = `<iframe src="https://polymath-chatbot.vercel.app/custom-chatbot/${uid}" style="position: fixed; bottom: 1rem; right: 1rem" width="100%" height="100%" frameborder="0" allowtransparency="true"><iframe>`

  const handleCopy = () => {
    setCopied(iframe_url)
    navigator.clipboard.writeText(iframe_url)
    setTimeout(() => setCopied(false), 3000)
  }

  return (
    <div className="mx-auto my-4 flex w-[70%] items-center rounded-lg border-2 border-dashed border-black p-4">
      <div className="flex w-1/4 justify-center">
        <Image
          className="rounded-full object-cover"
          src={imageURL}
          alt={chatbotName}
          width={80}
          height={80}
        />
      </div>
      <div className="w-2/4 px-2">
        <h2 className="mb-2 text-xl font-bold">{chatbotName}</h2>
        {/* <p className="text-base text-gray-700">
          <span className="font-medium">Chatbot ID: </span>
          {uid}
        </p> */}
        <p className="text-base text-gray-700">
          <span className="font-medium">Welcome Message: </span>
          {welcomeMessage}
        </p>
        <p className="text-base text-gray-700">
          <span className="font-medium">Description: </span>
          {description}
        </p>
        <p className="text-base text-gray-700">
          <span className="font-medium">Tags: </span>
          {tags}
        </p>
        <p className="text-base text-gray-700">
          <span className="font-medium">Prompt: </span>
          {prompt}
        </p>
      </div>
      <div className="flex w-1/4 flex-col items-center justify-center">
        <button className="cursor-pointer text-white" onClick={handleCopy}>
          {copied === iframe_url ? (
            <span className="m-2 inline-flex items-center gap-x-2 rounded-lg bg-green-700 p-2">
              Copied <ClipboardCheck size={20} />
            </span>
          ) : (
            <span className="m-2 inline-flex items-center gap-x-2 rounded-lg bg-gray-950 p-2 hover:bg-gray-800">
              Embed <Copy size={20} />
            </span>
          )}
        </button>
        <button
          onClick={handleDelete}
          className="m-2 inline-flex cursor-pointer items-center gap-x-2 rounded-lg bg-red-500 p-2 text-white hover:bg-red-600"
        >
          Delete <Trash2 size={20} />
        </button>
      </div>
    </div>
  )
}

export default ChatbotCard
