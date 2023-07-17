import Chatbot from "@/models/chatbot"
import { connectToDB } from "@/utils/database"

export const GET = async (request: any, { params }: any) => {
  try {
    await connectToDB()

    const chatbots = await Chatbot.find({ creator: params.id }).populate(
      "creator"
    )

    return new Response(JSON.stringify(chatbots), { status: 200 })
  } catch (error) {
    return new Response("Failed to fetch chatbots created by user", {
      status: 500,
    })
  }
}
