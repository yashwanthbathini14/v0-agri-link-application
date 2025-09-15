"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { CheckCircle, Leaf, ArrowRight, Sparkles } from "lucide-react"
import { useRouter } from "next/navigation"

interface RegistrationSuccessModalProps {
  isOpen: boolean
  onClose: () => void
  userName: string
  userRole: string
}

export function RegistrationSuccessModal({ isOpen, onClose, userName, userRole }: RegistrationSuccessModalProps) {
  const [showConfetti, setShowConfetti] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (isOpen) {
      setShowConfetti(true)
      const timer = setTimeout(() => setShowConfetti(false), 3000)
      return () => clearTimeout(timer)
    }
  }, [isOpen])

  const handleContinue = () => {
    onClose()
    router.push("/dashboard")
  }

  const getRoleDisplayName = (role: string) => {
    switch (role) {
      case "landowner":
        return "Landowner"
      case "farmer":
        return "Farmer/Land Seeker"
      case "worker":
        return "Agricultural Worker"
      default:
        return role
    }
  }

  const getRoleDescription = (role: string) => {
    switch (role) {
      case "landowner":
        return "You can now list your properties and connect with farmers looking for land to cultivate."
      case "farmer":
        return "You can now browse available lands and connect with landowners for farming opportunities."
      case "worker":
        return "You can now find agricultural work opportunities and connect with farmers and landowners."
      default:
        return "Welcome to the AgriLink community!"
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
        <div className="relative overflow-hidden">
          {/* Confetti Animation */}
          {showConfetti && (
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(20)].map((_, i) => (
                <Sparkles
                  key={i}
                  className={`absolute text-green-400 animate-bounce`}
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 2}s`,
                    animationDuration: `${1 + Math.random()}s`,
                  }}
                  size={12 + Math.random() * 8}
                />
              ))}
            </div>
          )}

          <DialogHeader className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>

            <DialogTitle className="text-2xl font-bold text-green-800">Welcome to AgriLink! 🌱</DialogTitle>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Success Message */}
            <div className="text-center space-y-3">
              <p className="text-lg font-semibold text-green-700">Thanks for registering, {userName}!</p>
              <p className="text-green-600">
                You have successfully registered as a{" "}
                <span className="font-semibold">{getRoleDisplayName(userRole)}</span>
              </p>
            </div>

            {/* Role-specific Information */}
            <div className="bg-white/70 rounded-lg p-4 border border-green-200">
              <div className="flex items-start space-x-3">
                <Leaf className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-green-800 mb-1">What's Next?</h4>
                  <p className="text-sm text-green-700">{getRoleDescription(userRole)}</p>
                </div>
              </div>
            </div>

            {/* Features Highlight */}
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-white/50 rounded-lg p-3 text-center border border-green-100">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-green-600 font-bold text-sm">AI</span>
                </div>
                <p className="text-xs text-green-700 font-medium">Smart Crop Suggestions</p>
              </div>
              <div className="bg-white/50 rounded-lg p-3 text-center border border-green-100">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <span className="text-green-600 text-lg">🤝</span>
                </div>
                <p className="text-xs text-green-700 font-medium">Connect & Collaborate</p>
              </div>
            </div>

            {/* Action Button */}
            <Button
              onClick={handleContinue}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition-all duration-200 transform hover:scale-105"
            >
              Continue to Dashboard
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>

            {/* Footer Message */}
            <p className="text-center text-xs text-green-600">
              Your profile has been created successfully. Start exploring AgriLink now!
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
