"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { useSession } from "next-auth/react"

import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import Basics from "@/components/Basics"
import Chatbot from "@/components/Chatbot"
import Data from "@/components/Data"
import Login from "@/components/Login"
import Prompt from "@/components/Prompt"
import SideBar from "@/components/SideBar"

export default function Home() {
  const { data: session } = useSession()

  const { toast } = useToast()

  const router = useRouter()

  const [activeTab, setActiveTab] = useState("basics")

  const [imagePreview, setImagePreview] = useState("")
  const [name, setName] = useState("")
  const [welcomeMessage, setWelcomeMessage] = useState("")
  const [description, setDescription] = useState("")

  const [file, setFile] = useState<File>()
  const [tags, setTags] = useState("")

  const [prompt, setPrompt] = useState("")

  const handleButtonClick1 = () => {
    if (!name) {
      toast({
        description: "Please enter a name for your chatbot.",
      })
    } else if (name.length < 3) {
      toast({
        description: "Name must be at least 3 characters long.",
      })
    } else if (!welcomeMessage) {
      toast({
        description: "Please enter a welcome message for your chatbot.",
      })
    } else if (welcomeMessage.length < 3) {
      toast({
        description: "Welcome message must be at least 3 characters long.",
      })
    } else {
      setActiveTab("data")
    }
  }

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

      if (response.ok) {
        router.push("/profile")
      }
    } catch (error) {
      console.log(error)
    }
  }

  if (!session) return <Login />

  return (
    <div className="flex h-screen w-full">
      <SideBar activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="w-[45%]">
        <div className="h-full w-3/4 border-r-2">
          <form onSubmit={createChatbot}>
            {activeTab === "basics" && (
              <div>
                <Basics
                  imagePreview={imagePreview}
                  setImagePreview={setImagePreview}
                  name={name}
                  setName={setName}
                  welcomeMessage={welcomeMessage}
                  setWelcomeMessage={setWelcomeMessage}
                  description={description}
                  setDescription={setDescription}
                />
                <div className="m-2 flex justify-center">
                  <Button
                    onClick={handleButtonClick1}
                    // disabled={name.length < 3 || welcomeMessage.length < 3}
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}
            {activeTab === "data" && (
              <div>
                <Data
                  file={file}
                  setFile={setFile}
                  tags={tags}
                  setTags={setTags}
                />
                <div className="m-2 flex justify-center">
                  <Button
                    onClick={() => setActiveTab("prompt")}
                    // disabled={file === undefined || tags === ""}
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}
            {activeTab === "prompt" && (
              <div>
                <Prompt prompt={prompt} setPrompt={setPrompt} />
                <div className="m-2 flex justify-center">
                  <Button
                    type="submit"
                    disabled={
                      name === "" || welcomeMessage === "" || prompt === ""
                    }
                  >
                    Create Chatbot
                  </Button>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
      <div className="w-[40%] p-4">
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
  )
}
