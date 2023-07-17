import { NextResponse } from "next/server"
import Chatbot from "@/models/chatbot"
import { connectToDB } from "@/utils/database"

export const GET = async ({ params }: { params: { id: string } }) => {
  try {
    await connectToDB()

    const chatbots = await Chatbot.find({ creator: params.id }).populate(
      "creator"
    )

    return new NextResponse(JSON.stringify(chatbots), { status: 200 })
  } catch (error) {
    return new NextResponse("Failed to fetch chatbots created by user", {
      status: 500,
    })
  }
}
