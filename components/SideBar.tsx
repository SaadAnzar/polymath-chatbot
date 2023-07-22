"use client"

import React from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Database, SlidersHorizontal, TerminalSquare } from "lucide-react"
import { useSession } from "next-auth/react"

type Props = {
  activeTab: string
  setActiveTab: React.Dispatch<React.SetStateAction<string>>
}

const SideBar = ({ activeTab, setActiveTab }: Props) => {
  const { data: session } = useSession()
  const router = useRouter()

  return (
    <div className="flex w-[15%] flex-col justify-between bg-[#f3f3ee] px-1.5 pt-4">
      <div>
        <ul>
          <li
            className={`list-style-none m-2 flex cursor-pointer items-center gap-x-4 rounded-lg p-1 px-2 hover:bg-white ${
              activeTab === "basics" ? "bg-white shadow-sm" : ""
            }`}
            onClick={() => setActiveTab("basics")}
          >
            <TerminalSquare size={18} />
            Basics
          </li>
          <li
            className={`list-style-none m-2 flex cursor-pointer items-center gap-x-4 rounded-lg p-1 px-2 hover:bg-white ${
              activeTab === "data" ? "bg-white shadow-sm" : ""
            }`}
            onClick={() => setActiveTab("data")}
          >
            <Database size={18} />
            Data
          </li>
          <li
            className={`list-style-none m-2 flex cursor-pointer items-center gap-x-4 rounded-lg p-1 px-2 hover:bg-white ${
              activeTab === "prompt" ? "bg-white shadow-sm" : ""
            }`}
            onClick={() => setActiveTab("prompt")}
          >
            <SlidersHorizontal size={18} />
            Prompt
          </li>
        </ul>
      </div>
      <div className="mb-4 flex justify-center">
        {session && (
          <div
            onClick={() => router.push("/profile")}
            className="flex cursor-pointer flex-col items-center hover:opacity-50"
          >
            <Image
              src={session.user?.image!}
              alt="Profile pic"
              className="mx-auto mb-2 rounded-full"
              width={32}
              height={32}
            />
            <span className="text-center text-base">{session.user?.name}</span>
          </div>
        )}
      </div>
    </div>
  )
}

export default SideBar
