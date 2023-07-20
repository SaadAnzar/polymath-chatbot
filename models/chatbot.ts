import { model, models, Schema } from "mongoose"

const ChatbotSchema = new Schema({
  creator: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  chatbotName: {
    type: String,
    required: [true, "Chatbot name is required."],
  },
  imageURL: {
    type: String,
  },
  welcomeMessage: {
    type: String,
    required: [true, "Welcome message is required."],
  },
  description: {
    type: String,
  },
  tags: {
    type: String,
  },
  prompt: {
    type: String,
    required: [true, "Prompt is required."],
  },
})

const Chatbot = models.Chatbot || model("Chatbot", ChatbotSchema)

export default Chatbot
