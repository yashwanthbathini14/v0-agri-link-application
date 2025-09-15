"use client"

import { useState } from "react"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Mail, AlertCircle } from "lucide-react"

export function EmailVerificationBanner() {
  const { user, isEmailVerified, sendVerificationEmail } = useAuth()
  const [isSending, setIsSending] = useState(false)
  const [message, setMessage] = useState("")

  if (!user || isEmailVerified) return null

  const handleSendVerification = async () => {
    setIsSending(true)
    setMessage("")

    try {
      await sendVerificationEmail()
      setMessage("Verification email sent! Please check your inbox.")
    } catch (error) {
      setMessage("Failed to send verification email. Please try again.")
    } finally {
      setIsSending(false)
    }
  }

  return (
    <Alert className="mb-4 border-amber-200 bg-amber-50">
      <AlertCircle className="h-4 w-4 text-amber-600" />
      <AlertDescription className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Mail className="h-4 w-4 text-amber-600" />
          <span className="text-amber-800">Please verify your email address to access all features.</span>
        </div>
        <Button
          onClick={handleSendVerification}
          disabled={isSending}
          size="sm"
          className="bg-amber-600 hover:bg-amber-700"
        >
          {isSending ? "Sending..." : "Send Verification"}
        </Button>
      </AlertDescription>
      {message && <div className="mt-2 text-sm text-amber-700">{message}</div>}
    </Alert>
  )
}
