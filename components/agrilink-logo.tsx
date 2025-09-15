import { Leaf } from "lucide-react"

interface AgriLinkLogoProps {
  size?: "sm" | "md" | "lg"
  showText?: boolean
  className?: string
}

export function AgriLinkLogo({ size = "md", showText = true, className = "" }: AgriLinkLogoProps) {
  const sizeClasses = {
    sm: "h-6 w-6",
    md: "h-8 w-8",
    lg: "h-12 w-12",
  }

  const textSizeClasses = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-4xl",
  }

  return (
    <div className={`flex items-center space-x-2 ${className}`}>
      <div className="relative">
        <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-green-600 rounded-full p-1">
          <div className="bg-white rounded-full p-1 h-full w-full flex items-center justify-center">
            <Leaf className={`${sizeClasses[size]} text-green-600 fill-green-100`} />
          </div>
        </div>
        <div className={`${sizeClasses[size]} relative z-10`}>
          <Leaf className={`${sizeClasses[size]} text-green-600 fill-green-100`} />
        </div>
      </div>
      {showText && (
        <span
          className={`${textSizeClasses[size]} font-bold bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent`}
        >
          AgriLink
        </span>
      )}
    </div>
  )
}
