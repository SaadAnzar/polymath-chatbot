"use client"

import React, { useState } from "react"
import { Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/components/ui/use-toast"

function generateID() {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
  let id = ""
  for (let i = 0; i < 8; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length)
    id += characters.charAt(randomIndex)
  }
  return id
}

interface DataProps {
  namespace: string
  setNamespace: React.Dispatch<React.SetStateAction<string>>
  indexName: string
  setIndexName: React.Dispatch<React.SetStateAction<string>>
  tags: string
  setTags: React.Dispatch<React.SetStateAction<string>>
  prompt: string
  setPrompt: React.Dispatch<React.SetStateAction<string>>
}

const Data = ({
  namespace,
  setNamespace,
  indexName,
  setIndexName,
  tags,
  setTags,
  prompt,
  setPrompt,
}: DataProps) => {
  const [file, setFile] = useState<File>()

  const [loading, setLoading] = useState(false)

  const handleDataChange = (event: any) => {
    const selectedFile = event.target.files[0]
    setFile(selectedFile)
  }

  const handleDataUpload = async (e: any) => {
    e.preventDefault()

    const uuid = generateID()
    setNamespace(uuid)

    const formData = new FormData()
    formData.append("file", file as Blob)

    try {
      setLoading(true)
      const res = await fetch(
        `https://langchainchatbot-64e6d01e9116.herokuapp.com/PDUpload?namespace=${uuid}`,
        {
          method: "POST",
          body: formData,
        }
      )
      const body = await res.json()
      const indexName = body.index_name
      setIndexName(indexName)
      setLoading(false)
      toast({
        description: "Document uploaded successfully.",
      })
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <h1 className="px-6 py-4 text-2xl font-semibold">Data/Prompt</h1>
      <hr className="border-t border-gray-200" />
      <p className="px-6 py-4 text-lg font-medium text-zinc-600">
        (You can either upload a document to query about or enter a prompt for
        your chatbot.)
      </p>
      <hr className="border-t border-gray-200" />

      <Tabs defaultValue="data">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="data" disabled={prompt.length > 3}>
            Data
          </TabsTrigger>
          <TabsTrigger value="prompt" disabled={indexName.length > 3}>
            Prompt
          </TabsTrigger>
        </TabsList>
        <TabsContent value="data">
          <div>
            <div className="px-5 py-2.5 text-xl font-medium">
              <label htmlFor="data">Add New Document</label>
            </div>
            <hr className="border-t border-gray-200" />
            <div className="p-4">
              {/* <label htmlFor="data" className="cursor-pointer">
            <div className="flex h-60 flex-col items-center justify-center rounded-lg border-2 p-2">
              <svg
                stroke="currentColor"
                fill="none"
                strokeWidth="2"
                viewBox="0 0 24 24"
                strokeLinecap="round"
                strokeLinejoin="round"
                height="1em"
                width="1em"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                <polyline points="17 8 12 3 7 8"></polyline>
                <line x1="12" y1="3" x2="12" y2="15"></line>
              </svg>
              <h2 className="text-gray-500">Click to upload files</h2>
              <span className="text-sm text-gray-400">
                10 MB max (Recommended){" "}
              </span>
            </div>
          </label> */}

              <input
                type="file"
                id="data"
                accept=".pdf"
                onChange={handleDataChange}
                // className="hidden"
              />
              {/* <p className="mt-2 text-gray-500">
            {file?.name || "No file selected"}
          </p> */}

              <div className="p-4">
                {!loading ? (
                  <Button
                    variant="outline"
                    onClick={handleDataUpload}
                    disabled={!file}
                  >
                    Upload
                  </Button>
                ) : (
                  <Button variant="outline" disabled>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Uploading
                  </Button>
                )}
              </div>
            </div>
          </div>
          <hr className="border-t border-gray-200" />
          <div>
            <div className="px-5 py-2.5 text-xl font-medium">
              <label htmlFor="name">
                Add Tags to Your Data
                <span className="text-sm font-normal text-gray-500">
                  (Optional)
                </span>
              </label>
            </div>
            <hr className="border-t border-gray-200" />
            <div className="p-4">
              <input
                type="text"
                id="tags"
                name="tags"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="Please enter tags for your data like 'Chatbot, GPT-3'."
                className="h-10 w-full rounded border border-gray-300 px-2 py-1 font-semibold shadow-sm outline-none focus:border-gray-400 focus:ring-0"
              />
            </div>
          </div>

          <hr className="border-t border-gray-200" />
        </TabsContent>
        <TabsContent value="prompt">
          {!indexName && (
            <div>
              <div className="px-5 py-2.5 text-xl font-medium">
                <label htmlFor="prompt">Prompt Text</label>
              </div>
              <hr className="border-t border-gray-200" />
              <div className="p-4">
                <textarea
                  id="prompt"
                  name="prompt"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Please enter a prompt for your chatbot here."
                  className="w-full rounded border border-gray-300 px-2 py-1 font-semibold shadow-sm outline-none focus:border-gray-400 focus:ring-0"
                  rows={3}
                />
              </div>
            </div>
          )}
          <hr className="border-t border-gray-200" />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default Data
