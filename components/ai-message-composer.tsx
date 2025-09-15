"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Sparkles, Loader2, Copy, Send } from "lucide-react"
import { generateMessageDraft } from "@/lib/ai-services"

interface AIMessageComposerProps {
  recipientType: "landowner" | "farmer" | "worker"
  context?: {
    propertyName?: string
    jobTitle?: string
    senderName: string
    experience?: string
    specificInterest?: string
  }
  onSend?: (message: { subject: string; content: string }) => void
}

export function AIMessageComposer({ recipientType, context, onSend }: AIMessageComposerProps) {
  const [purpose, setPurpose] = useState<"application" | "inquiry" | "follow-up">("application")
  const [subject, setSubject] = useState("")
  const [content, setContent] = useState("")
  const [generating, setGenerating] = useState(false)
  const [error, setError] = useState("")

  const handleGenerateDraft = async () => {
    if (!context?.senderName) {
      setError("Sender name is required")
      return
    }

    setGenerating(true)
    setError("")

    try {
      const draft = await generateMessageDraft(recipientType, purpose, context)
      setSubject(draft.subject)
      setContent(draft.content)
    } catch (error: any) {
      setError(error.message || "Failed to generate message draft")
    } finally {
      setGenerating(false)
    }
  }

  const handleCopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(`Subject: ${subject}\n\n${content}`)
      // You could add a toast notification here
    } catch (error) {
      console.error("Failed to copy to clipboard:", error)
    }
  }

  const handleSend = () => {
    if (onSend && subject && content) {
      onSend({ subject, content })
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Sparkles className="h-5 w-5 text-primary mr-2" />
          AI Message Composer
        </CardTitle>
        <CardDescription>Generate professional messages with AI assistance</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Message Purpose</Label>
            <Select value={purpose} onValueChange={(value: any) => setPurpose(value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="application">Application</SelectItem>
                <SelectItem value="inquiry">General Inquiry</SelectItem>
                <SelectItem value="follow-up">Follow-up</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Recipient Type</Label>
            <Input value={recipientType} disabled className="capitalize" />
          </div>
        </div>

        <Button onClick={handleGenerateDraft} disabled={generating} className="w-full">
          {generating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Sparkles className="mr-2 h-4 w-4" />}
          {generating ? "Generating..." : "Generate AI Draft"}
        </Button>

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="subject">Subject</Label>
            <Input
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Message subject..."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Message Content</Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Your message content will appear here..."
              rows={12}
            />
          </div>
        </div>

        <div className="flex space-x-2">
          {onSend && (
            <Button onClick={handleSend} disabled={!subject || !content}>
              <Send className="mr-2 h-4 w-4" />
              Send Message
            </Button>
          )}
          <Button variant="outline" onClick={handleCopyToClipboard} disabled={!content}>
            <Copy className="mr-2 h-4 w-4" />
            Copy to Clipboard
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
