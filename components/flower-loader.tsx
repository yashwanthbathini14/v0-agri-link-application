"use client"

import { cn } from "@/lib/utils"

interface FlowerLoaderProps {
  size?: "sm" | "md" | "lg"
  className?: string
  text?: string
}

export function FlowerLoader({ size = "md", className, text }: FlowerLoaderProps) {
  const sizeClasses = {
    sm: "w-12 h-12",
    md: "w-20 h-20",
    lg: "w-32 h-32",
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
            <div
              key={i}
              className="absolute top-1/2 left-1/2 origin-bottom-left"
              style={{
                transform: `rotate(${i * 72}deg) translateX(-50%)`,
              }}
            >
              <div
                className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-green-500 rounded-full opacity-90"
                style={{
                  clipPath: "ellipse(45% 60% at 50% 40%)",
                  animation: "petalPulse 1.5s ease-in-out infinite",
                  animationDelay: `${i * 0.3}s`,
                }}
              />
            </div>
          ))}
        </div>

        {/* Yellow center - stays fixed */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-6 h-6 bg-gradient-to-br from-yellow-300 via-yellow-400 to-amber-500 rounded-full shadow-lg animate-pulse" />
        </div>
      </div>

      {text && <p className={cn("text-muted-foreground font-medium animate-pulse", textSizes[size])}>{text}</p>}

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
