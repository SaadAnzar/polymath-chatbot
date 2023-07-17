"use client"

import Image from "next/image"

interface BasicsProps {
  image: File | undefined
  setImage: React.Dispatch<React.SetStateAction<File | undefined>>
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
  image,
  setImage,
  imagePreview,
  setImagePreview,
  name,
  setName,
  welcomeMessage,
  setWelcomeMessage,
  description,
  setDescription,
}: BasicsProps) => {
  const handleImageChange = (event: any) => {
    const selectedImage = event.target.files[0]
    if (selectedImage) {
      setImage(selectedImage)
    }
  }

  const handleImageUpload = () => {
    if (image) {
      // setImagePreview(URL.createObjectURL(image))
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(image)
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
              <button
                onClick={handleImageUpload}
                className="rounded-lg border-2 border-gray-200 px-8 py-1  hover:bg-black hover:text-white"
              >
                Upload
              </button>
            </div>
            <input
              type="file"
              id="icon"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
            <label htmlFor="icon">
              {image ? (
                <Image
                  src={URL.createObjectURL(image)}
                  alt="Selected Image"
                  width={50}
                  height={50}
                  className="cursor-pointer rounded-full"
                />
              ) : (
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  strokeWidth="0"
                  viewBox="0 0 24 24"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                  className="cursor-pointer"
                >
                  <path
                    fill="none"
                    stroke="#000"
                    strokeWidth="2"
                    d="M8,1 L14,1 L8,1 Z M19.188,19.472 L16,22 L12.5,17.5 L9.5,21 L7,7 L20,13.5 L15.5,15 L19.188,19.472 Z M19,4 L19,1 L16,1 M6,1 L3,1 L3,4 M3,14 L3,17 L6,17 M19,6 L19,10 L19,6 Z M3,12 L3,6 L3,12 Z"
                  ></path>
                </svg>
              )}
            </label>
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
          <label htmlFor="description">Description(Optional)</label>
        </div>
        <hr className="border-t border-gray-200" />
        <div className="p-4">
          <textarea
            id="description"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter a description for your chatbot."
            className="h-16 w-full rounded border border-gray-300 px-2 py-1 font-semibold shadow-sm outline-none focus:border-gray-400 focus:ring-0"
          />
        </div>
      </div>
      <hr className="border-t border-gray-200" />
    </div>
  )
}

export default Basics
