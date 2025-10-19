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

function PlantingAnimation({ isPlaying }: { isPlaying: boolean }) {
  return (
    <div className="planting-container" aria-hidden="true">
      <div className={`scene ${isPlaying ? "play" : ""}`}>
        {/* Pot */}
        <div className="pot">
          <div className="pot-rim" />
          <div className="pot-body" />
          <div className="pot-shadow" />
        </div>

        {/* Soil */}
        <div className="soil" />

        {/* Seed drops into pot */}
        <div className="seed" />

        {/* Sprout grows */}
        <div className="sprout">
          <div className="stem" />
          <div className="leaf leaf-left" />
          <div className="leaf leaf-right" />
        </div>
      </div>

      <style jsx>{`
        .planting-container {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 12px 0;
        }

        .scene {
          position: relative;
          width: 180px;
          height: 140px;
        }

        /* Pot */
        .pot {
          position: absolute;
          bottom: 10px;
          left: 50%;
          transform: translateX(-50%);
          width: 120px;
          height: 70px;
        }
        .pot-rim {
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 120px;
          height: 20px;
          background: #b7791f; /* terracotta rim */
          border-radius: 10px;
          box-shadow: inset 0 2px 0 rgba(255, 255, 255, 0.2);
        }
        .pot-body {
          position: absolute;
          top: 14px;
          left: 50%;
          transform: translateX(-50%);
          width: 110px;
          height: 58px;
          background: #9a5a0d; /* deeper terracotta */
          border-bottom-left-radius: 14px;
          border-bottom-right-radius: 14px;
          border-top-left-radius: 6px;
          border-top-right-radius: 6px;
          box-shadow: inset 0 -4px 0 rgba(0, 0, 0, 0.08);
        }
        .pot-shadow {
          position: absolute;
          bottom: -6px;
          left: 50%;
          transform: translateX(-50%);
          width: 90px;
          height: 8px;
          background: rgba(0, 0, 0, 0.07);
          filter: blur(2px);
          border-radius: 50%;
        }

        /* Soil */
        .soil {
          position: absolute;
          bottom: 58px;
          left: 50%;
          transform: translateX(-50%);
          width: 92px;
          height: 18px;
          background: #3f3f3f; /* dark soil */
          border-radius: 50%;
          opacity: 0;
        }

        /* Seed */
        .seed {
          position: absolute;
          top: -10px;
          left: 50%;
          transform: translateX(-50%) translateY(0);
          width: 10px;
          height: 14px;
          background: #f7e6b2;
          border-radius: 6px 6px 6px 6px / 8px 8px 6px 6px;
          box-shadow: inset 0 -1px 0 rgba(0,0,0,0.15);
          opacity: 0;
        }

        /* Sprout */
        .sprout {
          position: absolute;
          bottom: 64px;
          left: 50%;
          transform: translateX(-50%);
          width: 0;
          height: 0;
        }
        .stem {
          position: absolute;
          bottom: 0;
          left: -1px;
          width: 2px;
          height: 0;
          background: #15803d; /* green-700 */
          border-radius: 2px;
          transform-origin: bottom;
        }
        .leaf {
          position: absolute;
          bottom: 10px;
          width: 0;
          height: 0;
          background: #16a34a; /* green-600 */
          border-radius: 9999px;
          transform-origin: left center;
          opacity: 0;
        }
        .leaf-left {
          left: -2px;
          transform: rotate(-20deg) scale(0);
        }
        .leaf-right {
          left: 0;
          transform: rotate(20deg) scale(0);
        }

        /* Animations */
        .scene.play .seed {
          animation: drop-seed 900ms ease-out forwards;
          animation-delay: 150ms;
        }
        .scene.play .soil {
          animation: soil-appear 700ms ease-out forwards;
          animation-delay: 650ms;
        }
        .scene.play .stem {
          animation: stem-grow 1.2s ease-out forwards;
          animation-delay: 900ms;
        }
        .scene.play .leaf-left {
          animation: leaf-pop-left 900ms ease-out forwards;
          animation-delay: 1200ms;
        }
        .scene.play .leaf-right {
          animation: leaf-pop-right 900ms ease-out forwards;
          animation-delay: 1250ms;
        }
        .scene.play .pot {
          animation: pot-bounce 700ms ease-out 1 both;
          animation-delay: 300ms;
        }

        @keyframes drop-seed {
          0%   { transform: translateX(-50%) translateY(-10px); opacity: 0; }
          60%  { transform: translateX(-50%) translateY(70px); opacity: 1; }
          100% { transform: translateX(-50%) translateY(70px); opacity: 1; }
        }
        @keyframes soil-appear {
          0%   { opacity: 0; transform: translateX(-50%) scale(0.8); }
          100% { opacity: 1; transform: translateX(-50%) scale(1); }
        }
        @keyframes stem-grow {
          0%   { height: 0; }
          100% { height: 28px; }
        }
        @keyframes leaf-pop-left {
          0%   { opacity: 0; transform: rotate(-20deg) scale(0); width: 0; height: 0; }
          60%  { opacity: 1; transform: rotate(-12deg) scale(1.05); width: 18px; height: 10px; }
          100% { opacity: 1; transform: rotate(-15deg) scale(1); width: 16px; height: 9px; }
        }
        @keyframes leaf-pop-right {
          0%   { opacity: 0; transform: rotate(20deg) scale(0); width: 0; height: 0; left: 0; }
          60%  { opacity: 1; transform: rotate(12deg) scale(1.05); width: 18px; height: 10px; left: 2px; }
          100% { opacity: 1; transform: rotate(15deg) scale(1); width: 16px; height: 9px; left: 2px; }
        }
        @keyframes pot-bounce {
          0%   { transform: translateX(-50%) translateY(0); }
          40%  { transform: translateX(-50%) translateY(-4px); }
          100% { transform: translateX(-50%) translateY(0); }
        }
      `}</style>
    </div>
  )
}

export function RegistrationSuccessModal({ isOpen, onClose, userName, userRole }: RegistrationSuccessModalProps) {
  const [showConfetti, setShowConfetti] = useState(false)
  const router = useRouter()

  useEffect(() => {
    if (isOpen) {
      setShowConfetti(true)
      const timer1 = setTimeout(() => setShowConfetti(false), 3000)
      return () => {
        clearTimeout(timer1)
      }
    }
  }, [isOpen])

  const handleContinue = () => {
    onClose()
    setTimeout(() => {
      router.push("/dashboard")
    }, 500)
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

          {/* Planting Animation */}
          <PlantingAnimation isPlaying={isOpen} />

          <DialogHeader className="text-center space-y-4">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>

            <DialogTitle className="text-2xl font-bold text-green-800">Welcome to AgriLink! 🌱</DialogTitle>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Success Message */}
            <div className="text-center space-y-3">
              <p className="text-lg font-semibold text-green-700">Registration successful! 🌱</p>
              <p className="text-green-600">
                Thanks for registering, {userName}! You have successfully joined as a{" "}
                <span className="font-semibold">{getRoleDisplayName(userRole)}</span>.
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
