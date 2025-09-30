"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Home, Search, Briefcase, MessageSquare, User, Send, Paperclip, MoreVertical } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"

const navigation = [
  { name: "Overview", href: "/dashboard/worker", icon: Home },
  { name: "Find Jobs", href: "/dashboard/worker/jobs", icon: Search },
  { name: "My Applications", href: "/dashboard/worker/applications", icon: Briefcase },
  { name: "Messages", href: "/dashboard/worker/messages", icon: MessageSquare, current: true },
  { name: "Profile", href: "/dashboard/worker/profile", icon: User },
]

type Message = {
  id: string
  sender: "me" | "other"
  content: string
  timestamp: string
}

type Conversation = {
  id: string
  name: string
  company: string
  avatar: string
  lastMessage: string
  timestamp: string
  unread: number
  online: boolean
}

const conversations: Conversation[] = [
  {
    id: "1",
    name: "Sarah Martinez",
    company: "Organic Valley Farm",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "Great! Looking forward to the interview tomorrow.",
    timestamp: "2 hours ago",
    unread: 2,
    online: true,
  },
  {
    id: "2",
    name: "John Davis",
    company: "Mountain View Ranch",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "Can you send me your certifications?",
    timestamp: "5 hours ago",
    unread: 0,
    online: false,
  },
  {
    id: "3",
    name: "Emily Chen",
    company: "Sunset Orchard",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "Thank you for your application!",
    timestamp: "1 day ago",
    unread: 0,
    online: true,
  },
  {
    id: "4",
    name: "Michael Brown",
    company: "Green Valley Co-op",
    avatar: "/placeholder.svg?height=40&width=40",
    lastMessage: "We'd like to schedule a call with you.",
    timestamp: "2 days ago",
    unread: 1,
    online: false,
  },
]

const initialMessages: Message[] = [
  {
    id: "1",
    sender: "other",
    content: "Hi Maria! Thank you for applying to the Harvest Supervisor position.",
    timestamp: "10:30 AM",
  },
  {
    id: "2",
    sender: "me",
    content: "Thank you for considering my application! I'm very excited about this opportunity.",
    timestamp: "10:35 AM",
  },
  {
    id: "3",
    sender: "other",
    content: "We were impressed with your experience. Would you be available for an interview tomorrow at 2 PM?",
    timestamp: "11:00 AM",
  },
  {
    id: "4",
    sender: "me",
    content: "Yes, that works perfectly for me. Should I prepare anything specific?",
    timestamp: "11:15 AM",
  },
  {
    id: "5",
    sender: "other",
    content: "Great! Looking forward to the interview tomorrow.",
    timestamp: "2 hours ago",
  },
]

export default function WorkerMessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState<Conversation>(conversations[0])
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [newMessage, setNewMessage] = useState("")

  const handleSendMessage = () => {
    if (!newMessage.trim()) return

    const message: Message = {
      id: Date.now().toString(),
      sender: "me",
      content: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }

    setMessages([...messages, message])
    setNewMessage("")
  }

  return (
    <DashboardLayout title="Messages" navigation={navigation}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Messages</h1>
          <p className="text-muted-foreground">Communicate with employers and manage your conversations</p>
        </div>

        <Card className="h-[calc(100vh-250px)]">
          <div className="grid grid-cols-1 md:grid-cols-3 h-full">
            {/* Conversations List */}
            <div className="border-r">
              <CardHeader className="border-b">
                <CardTitle className="text-lg">Conversations</CardTitle>
                <Input placeholder="Search messages..." className="mt-2" />
              </CardHeader>
              <ScrollArea className="h-[calc(100%-120px)]">
                <div className="p-2">
                  {conversations.map((conversation) => (
                    <button
                      key={conversation.id}
                      onClick={() => setSelectedConversation(conversation)}
                      className={`w-full p-3 rounded-lg mb-2 text-left transition-colors ${
                        selectedConversation.id === conversation.id
                          ? "bg-primary/10 border border-primary/20"
                          : "hover:bg-muted"
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className="relative">
                          <Avatar>
                            <AvatarImage src={conversation.avatar || "/placeholder.svg"} />
                            <AvatarFallback>{conversation.name[0]}</AvatarFallback>
                          </Avatar>
                          {conversation.online && (
                            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-medium text-sm truncate">{conversation.name}</h4>
                            {conversation.unread > 0 && (
                              <Badge className="ml-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                                {conversation.unread}
                              </Badge>
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground mb-1">{conversation.company}</p>
                          <p className="text-xs text-muted-foreground truncate">{conversation.lastMessage}</p>
                          <p className="text-xs text-muted-foreground mt-1">{conversation.timestamp}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </ScrollArea>
            </div>

            {/* Chat Area */}
            <div className="col-span-2 flex flex-col">
              {/* Chat Header */}
              <div className="border-b p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <Avatar>
                        <AvatarImage src={selectedConversation.avatar || "/placeholder.svg"} />
                        <AvatarFallback>{selectedConversation.name[0]}</AvatarFallback>
                      </Avatar>
                      {selectedConversation.online && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                      )}
                    </div>
                    <div>
                      <h3 className="font-medium">{selectedConversation.name}</h3>
                      <p className="text-sm text-muted-foreground">{selectedConversation.company}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-5 w-5" />
                  </Button>
                </div>
              </div>

              {/* Messages */}
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === "me" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[70%] rounded-lg p-3 ${
                          message.sender === "me" ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                        <p
                          className={`text-xs mt-1 ${
                            message.sender === "me" ? "text-primary-foreground/70" : "text-muted-foreground"
                          }`}
                        >
                          {message.timestamp}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>

              {/* Message Input */}
              <div className="border-t p-4">
                <div className="flex items-end space-x-2">
                  <Button variant="ghost" size="icon">
                    <Paperclip className="h-5 w-5" />
                  </Button>
                  <Textarea
                    placeholder="Type your message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault()
                        handleSendMessage()
                      }
                    }}
                    className="min-h-[60px] max-h-[120px]"
                  />
                  <Button onClick={handleSendMessage} size="icon">
                    <Send className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  )
}
