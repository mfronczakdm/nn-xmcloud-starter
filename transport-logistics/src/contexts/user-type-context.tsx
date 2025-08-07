"use client"

import { createContext, useContext, useState, ReactNode } from "react"

type UserType = "personal" | "small-business" | "commercial"

interface UserTypeContextType {
  userType: UserType
  setUserType: (type: UserType) => void
}

const UserTypeContext = createContext<UserTypeContextType | undefined>(undefined)

export function UserTypeProvider({ children }: { children: ReactNode }) {
  const [userType, setUserType] = useState<UserType>("personal")

  const value = {
    userType,
    setUserType
  }

  return (
    <UserTypeContext.Provider value={value}>
      {children}
    </UserTypeContext.Provider>
  )
}

export function useUserType() {
  const context = useContext(UserTypeContext)
  if (context === undefined) {
    throw new Error("useUserType must be used within a UserTypeProvider")
  }
  return context
}
