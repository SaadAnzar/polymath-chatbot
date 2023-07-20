"use client"

import Image from "next/image"

import { buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface BasicsProps {
  imagePreview: string
  setImagePreview: React.Dispatch<React.SetStateAction<string>>
  name: string
  setName: React.Dispatch<React.SetStateAction<string>>
  welcomeMessage: string
  setWelcomeMessage: React.Dispatch<React.SetStateAction<string>>
  description: string
  setDescription: React.Dispatch<React.SetStateAction<string>>
}

const Basics = ({
  imagePreview,
  setImagePreview,
  name,
  setName,
  welcomeMessage,
  setWelcomeMessage,
  description,
  setDescription,
}: BasicsProps) => {
  const handleImageUpload = (event: any) => {
    const selectedImage = event.target.files[0]
    if (selectedImage) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(selectedImage)
    }
  }

  return (
    <div>
      <h1 className="px-6 py-4 text-2xl font-semibold">Chatbot Basics</h1>
      <hr className="border-t border-gray-200" />
      <div>
        <div className="px-5 py-3 text-xl font-medium">
          <label htmlFor="icon">Chatbot Icon</label>
        </div>
        <hr className="border-t border-gray-200" />
        <div className="p-4">
          <div className="flex items-center justify-between p-2">
            <div>
              <h3 className="mb-4 text-xl font-medium">Upload an image</h3>
              <Input
                type="file"
                id="icon"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <label htmlFor="icon">
                <div className={buttonVariants({ variant: "outline" })}>
                  Upload
                </div>
              </label>
            </div>
            {imagePreview ? (
              <Image
                src={imagePreview}
                alt="Selected Image"
                width={50}
                height={50}
                className="rounded-full"
              />
            ) : (
              <svg
                stroke="currentColor"
                fill="currentColor"
                strokeWidth="0"
                viewBox="0 0 640 512"
                height="2em"
                width="2em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M32,224H64V416H32A31.96166,31.96166,0,0,1,0,384V256A31.96166,31.96166,0,0,1,32,224Zm512-48V448a64.06328,64.06328,0,0,1-64,64H160a64.06328,64.06328,0,0,1-64-64V176a79.974,79.974,0,0,1,80-80H288V32a32,32,0,0,1,64,0V96H464A79.974,79.974,0,0,1,544,176ZM264,256a40,40,0,1,0-40,40A39.997,39.997,0,0,0,264,256Zm-8,128H192v32h64Zm96,0H288v32h64ZM456,256a40,40,0,1,0-40,40A39.997,39.997,0,0,0,456,256Zm-8,128H384v32h64ZM640,256V384a31.96166,31.96166,0,0,1-32,32H576V224h32A31.96166,31.96166,0,0,1,640,256Z"></path>
              </svg>
            )}
          </div>
        </div>
      </div>
      <hr className="border-t border-gray-200" />
      <div>
        <div className="px-5 py-3 text-xl font-medium">
          <label htmlFor="name">Chatbot Name</label>
        </div>
        <hr className="border-t border-gray-200" />
        <div className="p-4">
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter a name for your chatbot."
            required
            minLength={3}
            title="Please enter a name for your chatbot."
            className="h-10 w-full rounded border border-gray-300 px-2 py-1 font-semibold shadow-sm outline-none focus:border-gray-400 focus:ring-0"
          />
        </div>
      </div>
      <hr className="border-t border-gray-200" />
      <div>
        <div className="px-5 py-3 text-xl font-medium">
          <label htmlFor="welcomeMessage">Welcome Message</label>
        </div>
        <hr className="border-t border-gray-200" />
        <div className="p-4">
          <input
            type="text"
            id="welcomeMessage"
            name="welcomeMessage"
            value={welcomeMessage}
            onChange={(e) => setWelcomeMessage(e.target.value)}
            placeholder="Enter a welcome message."
            required
            className="h-10 w-full rounded border border-gray-300 px-2 py-1 font-semibold shadow-sm outline-none focus:border-gray-400 focus:ring-0"
          />
        </div>
      </div>
      <hr className="border-t border-gray-200" />
      <div>
        <div className="px-5 py-3 text-xl font-medium">
          <label htmlFor="description">
            Description
            <span className="text-sm font-normal text-gray-500">
              (Optional)
            </span>
          </label>
        </div>
        <hr className="border-t border-gray-200" />
        <div className="p-4">
          <textarea
            id="description"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter a description for your chatbot."
            className="w-full rounded border border-gray-300 px-2 py-1 font-semibold shadow-sm outline-none focus:border-gray-400 focus:ring-0"
            rows={2}
          />
        </div>
      </div>
      <hr className="border-t border-gray-200" />
    </div>
  )
}

export default Basics
