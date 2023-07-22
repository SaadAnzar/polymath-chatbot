"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ClipboardCheck, Copy, ExternalLink, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"

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
      <div className="flex w-1/4 flex-col items-center justify-center gap-y-2">
        <Button asChild>
          <Link href={`/custom-chatbot/${uid}`}>
            View <ExternalLink className="ml-2 h-4 w-4" />
          </Link>
        </Button>
        <Button variant="outline" onClick={handleCopy}>
          {copied === iframe_url ? (
            <>
              Copied <ClipboardCheck className="ml-2 h-4 w-4" />
            </>
          ) : (
            <>
              Embed <Copy className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
        <Button variant="destructive" onClick={handleDelete}>
          Delete <Trash2 className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

export default ChatbotCard
