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
        {/* Center circle */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-1/3 h-1/3 bg-amber-400 rounded-full animate-pulse" />
        </div>

        {/* Petals - 8 petals rotating */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute inset-0 animate-spin"
            style={{
              animation: `spin 3s linear infinite`,
              animationDelay: `${i * 0.15}s`,
            }}
          >
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 origin-bottom"
              style={{
                transform: `rotate(${i * 45}deg) translateY(-50%)`,
              }}
            >
              <div className="w-3 h-5 bg-gradient-to-t from-green-500 to-green-300 rounded-full opacity-80 animate-pulse" />
            </div>
          </div>
        ))}

        {/* Flower petals - outer layer */}
        {[...Array(6)].map((_, i) => (
          <div
            key={`outer-${i}`}
            className="absolute inset-0"
            style={{
              animation: `float 2s ease-in-out infinite`,
              animationDelay: `${i * 0.2}s`,
            }}
          >
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 origin-bottom"
              style={{
                transform: `rotate(${i * 60}deg) translateY(-40%)`,
              }}
            >
              <div className="relative">
                <div className="w-4 h-6 bg-gradient-to-br from-pink-400 via-pink-300 to-pink-200 rounded-full shadow-lg" />
                <div className="absolute inset-0 w-4 h-6 bg-gradient-to-tl from-rose-400/50 to-transparent rounded-full" />
              </div>
            </div>
          </div>
        ))}

        {/* Sparkles */}
        {[...Array(4)].map((_, i) => (
          <div
            key={`sparkle-${i}`}
            className="absolute"
            style={{
              top: `${20 + i * 20}%`,
              left: `${20 + i * 20}%`,
              animation: `sparkle 1.5s ease-in-out infinite`,
              animationDelay: `${i * 0.3}s`,
            }}
          >
            <div className="w-1 h-1 bg-yellow-300 rounded-full" />
          </div>
        ))}
      </div>

      {text && <p className={cn("text-muted-foreground font-medium animate-pulse", textSizes[size])}>{text}</p>}

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) scale(1);
          }
          50% {
            transform: translateY(-8px) scale(1.05);
          }
        }

        @keyframes sparkle {
          0%, 100% {
            opacity: 0;
            transform: scale(0);
          }
          50% {
            opacity: 1;
            transform: scale(1.5);
          }
        }
      `}</style>
    </div>
  )
}
