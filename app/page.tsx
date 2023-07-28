"use client"

import React, { useState } from "react"
import { useRouter } from "next/navigation"
import { Loader2 } from "lucide-react"
import { useSession } from "next-auth/react"

import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import Basics from "@/components/Basics"
import Chatbot from "@/components/Chatbot"
import Data from "@/components/Data"
import Login from "@/components/Login"
import Model from "@/components/Model"
import SideBar from "@/components/SideBar"

export default function Home() {
  const { data: session } = useSession()

  const { toast } = useToast()

  const router = useRouter()

  const [activeTab, setActiveTab] = useState("properties")

  const [loading, setLoading] = useState(false)

  const [imagePreview, setImagePreview] = useState("")

  const [name, setName] = useState("Polymath Chatbot")

  const [welcomeMessage, setWelcomeMessage] = useState(
    "Hi, How can I help you?"
  )

  const [description, setDescription] = useState("")

  const [indexName, setIndexName] = useState("")

  const [tags, setTags] = useState("")

  const [prompt, setPrompt] = useState("")

  const [namespace, setNamespace] = useState("")

  const handleButtonClick = (e: any) => {
    e.preventDefault()

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
    } else if (!prompt && !indexName) {
      toast({
        description:
          "Please either enter a prompt for your chatbot or upload a document to query about.",
      })
      // } else if (prompt.length < 3) {
      //   toast({
      //     description: "Prompt must be at least 3 characters long.",
      //   })
    } else
      try {
        setLoading(true)
        const response = await fetch("/api/chatbot/new", {
          method: "POST",
          body: JSON.stringify({
            userId: uid,
            chatbotName: name,
            imageURL: imagePreview,
            welcomeMessage: welcomeMessage,
            description: description,
            namespace: namespace,
            indexName: indexName,
            tags: tags,
            prompt: prompt,
          }),
        })

        if (response.ok) {
          setLoading(false)
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
            {activeTab === "properties" && (
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
                  <Button onClick={handleButtonClick}>Next</Button>
                </div>
              </div>
            )}
            {activeTab === "data" && (
              <div>
                <Data
                  namespace={namespace}
                  setNamespace={setNamespace}
                  indexName={indexName}
                  setIndexName={setIndexName}
                  tags={tags}
                  setTags={setTags}
                  prompt={prompt}
                  setPrompt={setPrompt}
                />
                <div className="m-2 flex justify-center">
                  <Button onClick={() => setActiveTab("model")}>Next</Button>
                </div>
              </div>
            )}
            {activeTab === "model" && (
              <div>
                <Model />
                <div className="m-2 flex justify-center">
                  {!loading ? (
                    <Button type="submit">Create Chatbot</Button>
                  ) : (
                    <Button disabled>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating Chatbot...
                    </Button>
                  )}
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
          indexName={indexName}
          namespace={namespace}
          tags={tags}
          prompt={prompt}
        />
      </div>
    </div>
  )
}
