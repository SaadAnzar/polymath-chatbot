import { NextResponse } from "next/server"
import Chatbot from "@/models/chatbot"
import { connectToDB } from "@/utils/database"

// GET (read)
export const GET = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  try {
    await connectToDB()

    const chatbot = await Chatbot.findById(params.id).populate("creator")
    if (!chatbot) return new NextResponse("Chatbot Not Found", { status: 404 })

    return new NextResponse(JSON.stringify(chatbot), { status: 200 })
  } catch (error) {
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}

// DELETE (delete)
export const DELETE = async (
  request: Request,
  { params }: { params: { id: string } }
) => {
  try {
    await connectToDB()

    // Find the chatbot by ID and remove it
    await Chatbot.findByIdAndRemove(params.id)

    return new NextResponse("Chatbot deleted successfully", { status: 200 })
  } catch (error) {
    return new NextResponse("Error deleting chatbot", { status: 500 })
  }
}
