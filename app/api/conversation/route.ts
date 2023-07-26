import { NextResponse } from "next/server"
import { Configuration, OpenAIApi } from "openai"

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
})

const openai = new OpenAIApi(configuration)

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { prompt, input } = body

    if (!configuration.apiKey) {
      return new NextResponse("OpenAI API Key not configured.", { status: 500 })
    }

    if (!prompt) {
      return new NextResponse("Prompt is required.", { status: 500 })
    }

    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: prompt },
        { role: "user", content: input },
      ],
    })

    return NextResponse.json(response.data)
  } catch (error) {
    console.log("[CONVERSATION_ERROR]", error)
    return new NextResponse("Internal Error", { status: 500 })
  }
}
