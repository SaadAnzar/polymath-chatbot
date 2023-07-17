"use client"

import { Session } from "next-auth"
import { SessionProvider } from "next-auth/react"

type Props = {
  children: React.ReactNode
  session: Session | null
}

const Provider = ({ children, session }: Props) => (
  <SessionProvider session={session}>{children}</SessionProvider>
)

export default Provider
