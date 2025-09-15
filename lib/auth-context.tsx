"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { type User, onAuthStateChanged, signOut, sendEmailVerification } from "firebase/auth"
import { doc, getDoc } from "firebase/firestore"
import { auth, db, ensureFirestoreConnection } from "./firebase"

interface UserProfile {
  uid: string
  email: string
  role: "landowner" | "farmer" | "worker"
  name: string
  phone?: string
  location?: string
  createdAt: Date
}

interface AuthContextType {
  user: User | null
  userProfile: UserProfile | null
  loading: boolean
  logout: () => Promise<void>
  sendVerificationEmail: () => Promise<void>
  isEmailVerified: boolean
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  userProfile: null,
  loading: true,
  logout: async () => {},
  sendVerificationEmail: async () => {},
  isEmailVerified: false,
})

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [isEmailVerified, setIsEmailVerified] = useState(false)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user)
      setIsEmailVerified(user?.emailVerified || false)

      if (user) {
        try {
          await ensureFirestoreConnection()

          const userDoc = await getDoc(doc(db, "users", user.uid))
          if (userDoc.exists()) {
            setUserProfile(userDoc.data() as UserProfile)
            console.log("[v0] User profile loaded successfully")
          } else {
            const defaultProfile: UserProfile = {
              uid: user.uid,
              email: user.email || "",
              role: "farmer",
              name: user.displayName || user.email?.split("@")[0] || "User",
              createdAt: new Date(),
            }
            setUserProfile(defaultProfile)
            console.log("[v0] Created default user profile")
          }
        } catch (error) {
          console.error("Error fetching user profile:", error)
          const fallbackProfile: UserProfile = {
            uid: user.uid,
            email: user.email || "",
            role: "farmer",
            name: user.displayName || user.email?.split("@")[0] || "User",
            createdAt: new Date(),
          }
          setUserProfile(fallbackProfile)
          console.log("[v0] Using fallback profile due to connection error")
        }
      } else {
        setUserProfile(null)
      }

      setLoading(false)
    })

    return unsubscribe
  }, [])

  const logout = async () => {
    try {
      await signOut(auth)
      setUser(null)
      setUserProfile(null)
    } catch (error) {
      console.error("Error signing out:", error)
    }
  }

  const sendVerificationEmail = async () => {
    if (user && !user.emailVerified) {
      try {
        await sendEmailVerification(user)
        console.log("[v0] Verification email sent successfully")
      } catch (error) {
        console.error("Error sending verification email:", error)
        throw error
      }
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        userProfile,
        loading,
        logout,
        sendVerificationEmail,
        isEmailVerified,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
