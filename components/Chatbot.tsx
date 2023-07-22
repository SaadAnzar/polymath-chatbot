"use client"

import React, { useEffect, useRef, useState } from "react"
import Image from "next/image"
import axios from "axios"
import { Grid } from "react-loader-spinner"

import { cn } from "@/lib/utils"
import { Avatar } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"

interface ChatbotProps {
  imagePreview: string
  name: string
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

export default function Chatbot({
  imagePreview,
  name,
  welcomeMessage,
  description,
  file,
  tags,
  prompt,
}: ChatbotProps) {
  const [input, setInput] = useState("")
  const [chats, setChats] = useState<Chat[]>([
    { message: welcomeMessage, author: "bot" },
  ])
  const [isLoading, setIsLoading] = useState(false)

  // Create a reference to the scroll area
  const scrollAreaRef = useRef<null | HTMLDivElement>(null)

  useEffect(() => {
    // Scroll to the bottom when the messages change
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: "smooth",
      })
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
    setIsLoading(true)

    axios
      .post("/api/conversation", { prompt, input })
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
        setIsLoading(false)
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
        setIsLoading(false)
      })
  }

  return (
    <Card className="w-[440px]">
      <CardHeader>
        <CardTitle className="text-lg">{name || "Polymath Chatbot"}</CardTitle>
        <CardDescription className="leading-3">
          Powered by <span className="font-medium text-black">Polymath</span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div
          ref={scrollAreaRef}
          className="spacy-y-4 h-[450px] w-full overflow-y-auto pr-4"
        >
          {chats.map((chat, index) => (
            <div
              key={index}
              className="my-4 flex flex-1 gap-3 text-sm text-gray-600"
            >
              {chat.author === "user" && (
                <Avatar className="h-8 w-8">
                  <div className="rounded-full border bg-gray-100 p-1">
                    <svg
                      stroke="none"
                      fill="black"
                      strokeWidth="0"
                      viewBox="0 0 16 16"
                      height="20"
                      width="20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z"></path>
                    </svg>
                  </div>
                </Avatar>
              )}
              {chat.author === "bot" && !imagePreview && (
                <Avatar className="h-8 w-8">
                  <div
                    className={cn(
                      "rounded-full border bg-gray-100 p-1",
                      isLoading && "animate-pulse"
                    )}
                  >
                    <svg
                      stroke="currentColor"
                      fill="currentColor"
                      strokeWidth="0"
                      viewBox="0 0 640 512"
                      height="1.5em"
                      width="1.5em"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M32,224H64V416H32A31.96166,31.96166,0,0,1,0,384V256A31.96166,31.96166,0,0,1,32,224Zm512-48V448a64.06328,64.06328,0,0,1-64,64H160a64.06328,64.06328,0,0,1-64-64V176a79.974,79.974,0,0,1,80-80H288V32a32,32,0,0,1,64,0V96H464A79.974,79.974,0,0,1,544,176ZM264,256a40,40,0,1,0-40,40A39.997,39.997,0,0,0,264,256Zm-8,128H192v32h64Zm96,0H288v32h64ZM456,256a40,40,0,1,0-40,40A39.997,39.997,0,0,0,456,256Zm-8,128H384v32h64ZM640,256V384a31.96166,31.96166,0,0,1-32,32H576V224h32A31.96166,31.96166,0,0,1,640,256Z"></path>
                    </svg>
                  </div>
                </Avatar>
              )}
              {chat.author === "bot" && imagePreview && (
                <Avatar className="h-8 w-8">
                  <div
                    className={cn(
                      "rounded-full border bg-gray-100",
                      isLoading && "animate-pulse"
                    )}
                  >
                    <Image
                      src={imagePreview}
                      alt="Chatbot Icon"
                      width={30}
                      height={30}
                      className="rounded-full"
                    />
                  </div>
                </Avatar>
              )}

              <div className="leading-relaxed">
                <span className="block font-bold text-gray-700">
                  {chat.author === "user"
                    ? "You"
                    : `${name || "Polymath Chatbot"}`}{" "}
                </span>
                {chat.message}
              </div>
            </div>
          ))}
          {isLoading && (
            <div className="px-2.5">
              <Grid
                height={12}
                width={12}
                radius={5}
                ariaLabel="grid-loading"
                color="#1a1a1a"
                ms-visible={true}
              />
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter>
        <form
          onSubmit={handleSubmit}
          className="flex w-full items-center justify-center space-x-2"
        >
          <Input
            placeholder="Type your message"
            value={input}
            onChange={(event) =>
              setInput(
                event.target.value.charAt(0).toUpperCase() +
                  event.target.value.slice(1)
              )
            }
          />
          <Button disabled={isLoading}>
            {isLoading ? (
              <div className="flex items-center gap-2">
                <Grid
                  height={12}
                  width={12}
                  radius={5}
                  ariaLabel="grid-loading"
                  color="#fff"
                  ms-visible={true}
                />
                {"Loading..."}
              </div>
            ) : (
              "Send"
            )}
          </Button>
        </form>
      </CardFooter>
    </Card>
  )
}
