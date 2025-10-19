"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { type User, onAuthStateChanged, signOut, sendEmailVerification } from "firebase/auth"
import { doc, onSnapshot } from "firebase/firestore"
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
    let unsubscribeProfile: (() => void) | null = null
    const loadingTimeout = setTimeout(() => {
      if (loading) {
        console.warn("[v0] Loading timeout reached, forcing loading to false")
        setLoading(false)
      }
    }, 3000)

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setUser(user)
      setIsEmailVerified(user?.emailVerified || false)

      if (unsubscribeProfile) {
        unsubscribeProfile()
        unsubscribeProfile = null
      }

      if (user) {
        try {
          await ensureFirestoreConnection()

          const userDocRef = doc(db, "users", user.uid)
          unsubscribeProfile = onSnapshot(
            userDocRef,
            { includeMetadataChanges: true },
            (snap) => {
              if (snap.exists()) {
                setUserProfile(snap.data() as UserProfile)
                console.log("[v0] User profile loaded via snapshot")
              } else {
                const defaultProfile: UserProfile = {
                  uid: user.uid,
                  email: user.email || "",
                  role: "farmer",
                  name: user.displayName || user.email?.split("@")[0] || "User",
                  createdAt: new Date(),
                }
                setUserProfile(defaultProfile)
                console.log("[v0] Using default user profile (no doc yet)")
              }
              setLoading(false)
              clearTimeout(loadingTimeout)
            },
            (err) => {
              console.warn("[v0] Profile snapshot error:", err)
              const fallbackProfile: UserProfile = {
                uid: user.uid,
                email: user.email || "",
                role: "farmer",
                name: user.displayName || user.email?.split("@")[0] || "User",
                createdAt: new Date(),
              }
              setUserProfile(fallbackProfile)
              setLoading(false)
              clearTimeout(loadingTimeout)
            },
          )
        } catch (error) {
          console.warn("Error initializing profile listener (continuing with fallback):", error)
          const fallbackProfile: UserProfile = {
            uid: user.uid,
            email: user.email || "",
            role: "farmer",
            name: user.displayName || user.email?.split("@")[0] || "User",
            createdAt: new Date(),
          }
          setUserProfile(fallbackProfile)
          setLoading(false)
          clearTimeout(loadingTimeout)
        }
      } else {
        setUserProfile(null)
        setLoading(false)
        clearTimeout(loadingTimeout)
      }
    })

    return () => {
      clearTimeout(loadingTimeout)
      if (unsubscribeProfile) unsubscribeProfile()
      unsubscribe()
    }
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
