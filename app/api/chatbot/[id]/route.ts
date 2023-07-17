import Chatbot from "@/models/chatbot"
import { connectToDB } from "@/utils/database"

// GET (read)
export const GET = async (request: any, { params }: any) => {
  try {
    await connectToDB()

    const chatbot = await Chatbot.findById(params.id).populate("creator")
    if (!chatbot) return new Response("Chatbot Not Found", { status: 404 })

    return new Response(JSON.stringify(chatbot), { status: 200 })
  } catch (error) {
    return new Response("Internal Server Error", { status: 500 })
  }
}

// DELETE (delete)
export const DELETE = async (request: any, { params }: any) => {
  try {
    await connectToDB()

    // Find the chatbot by ID and remove it
    await Chatbot.findByIdAndRemove(params.id)

    return new Response("Chatbot deleted successfully", { status: 200 })
  } catch (error) {
    return new Response("Error deleting chatbot", { status: 500 })
  }
}
