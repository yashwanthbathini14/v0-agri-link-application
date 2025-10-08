"use client"

import { cn } from "@/lib/utils"

interface FlowerLoaderProps {
  size?: "sm" | "md" | "lg"
  className?: string
  text?: string
}

export function FlowerLoader({ size = "md", className, text }: FlowerLoaderProps) {
  // Main container sizes
  const sizeClasses = {
    sm: "w-12 h-12",
    md: "w-20 h-20",
    lg: "w-32 h-32",
  }

  // FIXED: Petal sizes are now responsive
  const petalSizes = {
    sm: "w-4 h-4",
    md: "w-7 h-7",
    lg: "w-11 h-11",
  }
  
  // FIXED: Center circle sizes are now responsive
  const centerSizes = {
    sm: "w-3 h-3",
    md: "w-5 h-5",
    lg: "w-8 h-8",
  }

  const textSizes = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  }

  return (
    <div className={cn("flex flex-col items-center justify-center gap-4", className)}>
      <div className={cn("relative", sizeClasses[size])}>
        {/* Rotating petals container */}
        <div className="absolute inset-0 animate-spin" style={{ animationDuration: "3s" }}>
          {/* 5 petals arranged in a circle */}
          {[...Array(5)].map((_, i) => (
            // IMPROVED: Simplified positioning. A wrapper div handles the rotation.
            <div
              key={i}
              className="absolute inset-0"
              style={{
                transform: `rotate(${i * 72}deg)`, // 360deg / 5 petals = 72deg per petal
              }}
            >
              {/* This div places the petal at the '12 o'clock' position before being rotated */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2">
                <div
                  className={cn(
                    "bg-gradient-to-br from-emerald-400 to-green-500 rounded-full opacity-90",
                    petalSizes[size]
                  )}
                  style={{
                    clipPath: "ellipse(45% 60% at 50% 40%)", // Creates the petal shape
                    animation: "petalPulse 1.5s ease-in-out infinite",
                    animationDelay: `${i * 0.3}s`, // Staggered pulse effect
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Yellow center - stays fixed */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className={cn(
              "bg-gradient-to-br from-yellow-300 via-yellow-400 to-amber-500 rounded-full shadow-lg animate-pulse",
              centerSizes[size]
            )}
          />
        </div>
      </div>

      {text && <p className={cn("text-muted-foreground font-medium animate-pulse", textSizes[size])}>{text}</p>}

      {/* Using <style jsx> is fine, but for better reusability in Tailwind,
          you could move this to your tailwind.config.js file. */}
      <style jsx>{`
        @keyframes petalPulse {
          0%,
          100% {
            transform: scale(1);
            opacity: 0.9;
          }
          50% {
            transform: scale(1.1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  )
}
