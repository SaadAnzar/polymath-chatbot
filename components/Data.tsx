"use client"

import React from "react"

interface DataProps {
  file: File | undefined
  setFile: React.Dispatch<React.SetStateAction<File | undefined>>
  tags: string
  setTags: React.Dispatch<React.SetStateAction<string>>
}

const Data = ({ file, setFile, tags, setTags }: DataProps) => {
  const handleDataChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0]
    setFile(selectedFile)
  }

  return (
    <div>
      <h1 className="px-6 py-4 text-2xl font-semibold">Data</h1>
      <hr className="border-t border-gray-200" />
      <div>
        <div className="px-5 py-2.5 text-xl font-medium">
          <label htmlFor="data">Add New Files</label>
        </div>
        <hr className="border-t border-gray-200" />
        <div className="p-4">
          <label htmlFor="data" className="cursor-pointer">
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
          </label>

          <input
            type="file"
            id="data"
            accept=".csv, .json, .xlsx, .xls,.txt, .docx, .pdf"
            onChange={handleDataChange}
            className="hidden"
          />
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
    </div>
  )
}

export default Data
