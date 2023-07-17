import mongoose from "mongoose"

let isConnected = false // track the connection

export const connectToDB = async () => {
  mongoose.set("strictQuery", true)

  if (isConnected) {
    console.log("MongoDB is already connected")
    return
  }

  // const mongoDB_URI = process.env.MONGODB_URI as string

  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      dbName: "custom-chatbot",
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })

    isConnected = true

    console.log("MongoDB connected")
  } catch (error) {
    console.log(error)
  }
}
