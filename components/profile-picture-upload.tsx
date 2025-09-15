"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Camera, Upload, X } from "lucide-react"
import { Label } from "@/components/ui/label"

interface ProfilePictureUploadProps {
  onImageSelect: (file: File | null) => void
  currentImage?: string
  userName?: string
}

export function ProfilePictureUpload({ onImageSelect, currentImage, userName }: ProfilePictureUploadProps) {
  const [preview, setPreview] = useState<string | null>(currentImage || null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      if (!file.type.startsWith("image/")) {
        alert("Please select an image file")
        return
      }

      if (file.size > 5 * 1024 * 1024) {
        alert("Image size should be less than 5MB")
        return
      }

      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        setPreview(result)
        onImageSelect(file)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleRemoveImage = () => {
    setPreview(null)
    onImageSelect(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="space-y-2">
      <Label>Profile Picture (Optional)</Label>
      <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
        <div className="relative">
          <Avatar className="h-20 w-20">
            <AvatarImage src={preview || undefined} alt="Profile" />
            <AvatarFallback className="text-lg bg-green-100 text-green-700">
              {userName ? userName.charAt(0).toUpperCase() : <Camera className="h-8 w-8" />}
            </AvatarFallback>
          </Avatar>
          {preview && (
            <Button
              type="button"
              variant="destructive"
              size="sm"
              className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
              onClick={handleRemoveImage}
            >
              <X className="h-3 w-3" />
            </Button>
          )}
        </div>

        <div className="flex flex-col space-y-2 text-center sm:text-left">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={triggerFileInput}
            className="flex items-center space-x-2 bg-transparent"
          >
            <Upload className="h-4 w-4" />
            <span>{preview ? "Change Photo" : "Upload Photo"}</span>
          </Button>
          <p className="text-xs text-muted-foreground">JPG, PNG up to 5MB</p>
        </div>
      </div>

      <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileSelect} className="hidden" />
    </div>
  )
}
