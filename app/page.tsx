"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"

import Basics from "@/components/Basics"
import Chatbot from "@/components/Chatbot"
import Data from "@/components/Data"
import Login from "@/components/Login"
import Prompt from "@/components/Prompt"
import SideBar from "@/components/SideBar"

export default function Home() {
  const { data: session } = useSession()

  const router = useRouter()

  const [activeTab, setActiveTab] = useState("basics")

  const [image, setImage] = useState<File>()
  const [imagePreview, setImagePreview] = useState("")
  const [name, setName] = useState("")
  const [welcomeMessage, setWelcomeMessage] = useState("")
  const [description, setDescription] = useState("")

  const [file, setFile] = useState<File>()
  const [tags, setTags] = useState("")

  const [prompt, setPrompt] = useState("")

  const createChatbot = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const uid = session?.user?.id

    try {
      const response = await fetch("/api/chatbot/new", {
        method: "POST",
        body: JSON.stringify({
          userId: uid,
          chatbotName: name,
          imageURL: imagePreview,
          welcomeMessage: welcomeMessage,
          description: description,
          tags: tags,
          prompt: prompt,
        }),
      })

      console.log(response)

      if (response.ok) {
        router.push("/profile")
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      {!session ? (
        <Login />
      ) : (
        <div className="flex h-screen w-full">
          <SideBar activeTab={activeTab} setActiveTab={setActiveTab} />

          <div className="w-[45%]">
            <div className="h-full w-3/4 border-r-2">
              <form onSubmit={createChatbot}>
                {activeTab === "basics" && (
                  <Basics
                    image={image}
                    setImage={setImage}
                    imagePreview={imagePreview}
                    setImagePreview={setImagePreview}
                    name={name}
                    setName={setName}
                    welcomeMessage={welcomeMessage}
                    setWelcomeMessage={setWelcomeMessage}
                    description={description}
                    setDescription={setDescription}
                  />
                )}
                {activeTab === "data" && (
                  <Data
                    file={file}
                    setFile={setFile}
                    tags={tags}
                    setTags={setTags}
                  />
                )}
                {activeTab === "prompt" && (
                  <Prompt prompt={prompt} setPrompt={setPrompt} />
                )}
                <div className="m-2 flex justify-center">
                  <button
                    type="submit"
                    className="rounded bg-black px-4 py-2 font-bold text-white hover:bg-zinc-700"
                  >
                    Create Chatbot
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="w-[55%] p-4 pr-20">
            <Chatbot
              imagePreview={imagePreview}
              name={name}
              welcomeMessage={welcomeMessage}
              description={description}
              file={file}
              tags={tags}
              prompt={prompt}
            />
          </div>
        </div>
      )}
    </>
  )
}
