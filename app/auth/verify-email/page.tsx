"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Mail, RefreshCw } from "lucide-react"

export default function VerifyEmailPage() {
  const { user, isEmailVerified, sendVerificationEmail } = useAuth()
  const [isSending, setIsSending] = useState(false)
  const [message, setMessage] = useState("")
  const router = useRouter()

  useEffect(() => {
    if (isEmailVerified) {
      router.push("/dashboard")
    }
  }, [isEmailVerified, router])

  const handleResendVerification = async () => {
    setIsSending(true)
    setMessage("")

    try {
      await sendVerificationEmail()
      setMessage("Verification email sent! Please check your inbox and spam folder.")
    } catch (error) {
      setMessage("Failed to send verification email. Please try again.")
    } finally {
      setIsSending(false)
    }
  }

  const handleRefresh = () => {
    window.location.reload()
  }

  if (!user) {
    router.push("/auth/login")
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-green-100 flex items-center justify-center">
            <Mail className="h-6 w-6 text-green-600" />
          </div>
          <CardTitle className="text-2xl font-bold text-green-800">Verify Your Email</CardTitle>
          <CardDescription>
            We've sent a verification link to <strong>{user.email}</strong>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center text-sm text-gray-600">
            <p>Please check your email and click the verification link to continue.</p>
            <p className="mt-2">Don't forget to check your spam folder!</p>
          </div>

          {message && (
            <div className="p-3 rounded-lg bg-green-50 border border-green-200">
              <p className="text-sm text-green-700">{message}</p>
            </div>
          )}

          <div className="space-y-2">
            <Button
              onClick={handleResendVerification}
              disabled={isSending}
              className="w-full bg-green-600 hover:bg-green-700"
            >
              {isSending ? (
                <>
                  <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Mail className="mr-2 h-4 w-4" />
                  Resend Verification Email
                </>
              )}
            </Button>

            <Button onClick={handleRefresh} variant="outline" className="w-full bg-transparent">
              <CheckCircle className="mr-2 h-4 w-4" />
              I've Verified My Email
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
