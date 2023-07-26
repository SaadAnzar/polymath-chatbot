import { NextResponse } from "next/server"
import Chatbot from "@/models/chatbot"
import { connectToDB } from "@/utils/database"

export const POST = async (request: Request) => {
  const {
    userId,
    chatbotName,
    imageURL,
    welcomeMessage,
    description,
    namespace,
    indexName,
    tags,
    prompt,
  } = await request.json()

  try {
    await connectToDB()
    const newChatbot = new Chatbot({
      creator: userId,
      chatbotName: chatbotName,
      imageURL: imageURL,
      welcomeMessage: welcomeMessage,
      description: description,
      namespace: namespace,
      indexName: indexName,
      tags: tags,
      prompt: prompt,
    })

    await newChatbot.save()
    return new NextResponse(JSON.stringify(newChatbot), { status: 201 })
  } catch (error) {
    return new NextResponse("Failed to create a new chatbot", { status: 500 })
  }
}
