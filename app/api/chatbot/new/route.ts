import Chatbot from "@/models/chatbot"
import { connectToDB } from "@/utils/database"

export const POST = async (request: any) => {
  const {
    userId,
    chatbotName,
    imageURL,
    welcomeMessage,
    description,
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
      tags: tags,
      prompt: prompt,
    })

    await newChatbot.save()
    return new Response(JSON.stringify(newChatbot), { status: 201 })
  } catch (error) {
    return new Response("Failed to create a new chatbot", { status: 500 })
  }
}
