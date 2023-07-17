"use client"

import { useState } from "react"
import Image from "next/image"
import { Copy, CopyCheck, Trash2 } from "lucide-react"

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

  const iframe_url = `<div style="position: fixed; bottom: 1rem; right: 2rem; width: 350px; height: 630px; overflow: hidden;"><iframe src="http://localhost:3000/custom-chatbot/${uid}" width="100%" height="100%" style="border: 0px" allowtransparency="true"></iframe></div>`

  const handleCopy = () => {
    setCopied(iframe_url)
    navigator.clipboard.writeText(iframe_url)
    setTimeout(() => setCopied(false), 3000)
  }
  return (
    <div className="mx-auto my-6 w-[80%]">
      <div className="flex rounded-md border-2 border-dashed border-black">
        <div className="flex-col">
          <div className="">
            <Image
              className="rounded"
              src={imageURL}
              alt={chatbotName}
              width={20}
              height={20}
            />
          </div>

          <div className="px-8 py-4">
            <div className="p-3">
              <p className="text-base text-gray-700">
                <span className="font-medium">Chatbot Name: </span>
                {chatbotName}
              </p>
            </div>
            <div className="p-4">
              <p className="text-base text-gray-700">
                <span className="font-medium">Welcome Message: </span>
                {welcomeMessage}
              </p>
            </div>
            <div className="p-4">
              <p className="text-base text-gray-700">
                <span className="font-medium">Description: </span>
                {description}
              </p>
            </div>
            <div className="p-4">
              <p className="text-base text-gray-700">
                <span className="font-medium">Tags: </span>
                {tags}
              </p>
            </div>
            <div className="p-4">
              <p className="text-base text-gray-700">
                <span className="font-medium">Prompt: </span>
                {prompt}
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-end justify-between gap-10">
          <div className="" onClick={handleCopy}>
            {copied === iframe_url ? (
              <CopyCheck className="cursor-pointer" size={20} />
            ) : (
              <Copy className="cursor-pointer" size={20} />
            )}
          </div>
          <div className="justify-end">
            <Trash2 className="cursor-pointer" onClick={handleDelete} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatbotCard
