"use client"

import { signIn } from "next-auth/react"

const Login = () => {
  return (
    <div className="h-screen">
      <div className="flex h-full flex-col items-center justify-center">
        <div className="text-4xl font-bold">Welcome to Polymath Chatbot</div>
        <div className="mt-4 text-2xl font-medium">
          Customize chatbot for your website in minutes
        </div>
        <div className="mt-8">
          <button
            className="rounded-lg bg-[#FF9500] px-4 py-2 text-white hover:bg-[#ac6a0d]"
            onClick={() => signIn("google")}
          >
            Sign in
          </button>
        </div>
      </div>
    </div>
  )
}

export default Login
