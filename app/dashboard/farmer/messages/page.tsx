"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Home, Search, Heart, MessageSquare, User, Send, MoreVertical } from "lucide-react"
import { useState } from "react"

const navigation = [
  { name: "Overview", href: "/dashboard/farmer", icon: Home },
  { name: "Browse Land", href: "/dashboard/farmer/browse", icon: Search },
  { name: "My Applications", href: "/dashboard/farmer/applications", icon: User },
  { name: "Saved Properties", href: "/dashboard/farmer/saved", icon: Heart },
  { name: "Messages", href: "/dashboard/farmer/messages", icon: MessageSquare, current: true },
]

const mockConversations = [
  {
    id: "1",
    name: "Ramesh Patel (Landowner)",
    lastMessage: "The property is available for viewing this weekend. Let me know what time works for you.",
    timestamp: "1 hour ago",
    unread: 1,
    online: true,
    property: "Golden Rice Fields - 25 acres",
  },
  {
    id: "2",
    name: "Sunita Reddy (Landowner)",
    lastMessage: "I've reviewed your application and would like to discuss the terms.",
    timestamp: "3 hours ago",
    unread: 0,
    online: false,
    property: "Organic Spice Farm - 30 acres",
  },
  {
    id: "3",
    name: "Kumar Singh (Landowner)",
    lastMessage: "Thank you for your interest. The irrigation system was upgraded last year.",
    timestamp: "1 day ago",
    unread: 2,
    online: true,
    property: "Premium Wheat Farm - 50 acres",
  },
  {
    id: "4",
    name: "Priya Sharma (Landowner)",
    lastMessage: "The property has excellent soil quality for cotton cultivation.",
    timestamp: "2 days ago",
    unread: 0,
    online: false,
    property: "Cotton Fields - 40 acres",
  },
]

const mockMessages = [
  {
    id: "1",
    sender: "You",
    content: "Hello! I'm very interested in your Golden Rice Fields property. Could you tell me more about it?",
    timestamp: "9:00 AM",
    isOwn: true,
  },
  {
    id: "2",
    sender: "Ramesh Patel",
    content: "Thank you for your interest! The property is 25 acres with excellent water access and modern irrigation.",
    timestamp: "9:15 AM",
    isOwn: false,
  },
  {
    id: "3",
    sender: "You",
    content: "That sounds great! What about the soil quality? Is it suitable for organic rice cultivation?",
    timestamp: "9:20 AM",
    isOwn: true,
  },
  {
    id: "4",
    sender: "Ramesh Patel",
    content:
      "Yes, the soil is perfect for organic farming. We've had successful rice cultivation for the past 10 years.",
    timestamp: "9:25 AM",
    isOwn: false,
  },
  {
    id: "5",
    sender: "You",
    content: "Excellent! I'd love to visit the property. When would be a good time?",
    timestamp: "9:30 AM",
    isOwn: true,
  },
  {
    id: "6",
    sender: "Ramesh Patel",
    content: "The property is available for viewing this weekend. Let me know what time works for you.",
    timestamp: "10:00 AM",
    isOwn: false,
  },
]

export default function FarmerMessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState(mockConversations[0])
  const [messageInput, setMessageInput] = useState("")
  const [searchQuery, setSearchQuery] = useState("")

  const handleSendMessage = () => {
    if (messageInput.trim()) {
      console.log("[v0] Sending message:", messageInput)
      setMessageInput("")
    }
  }

  const filteredConversations = mockConversations.filter((conv) =>
    conv.name.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <DashboardLayout title="Messages" navigation={navigation}>
      <Card className="h-[calc(100vh-12rem)]">
        <CardContent className="p-0 h-full">
          <div className="grid grid-cols-12 h-full">
            {/* Conversations List */}
            <div className="col-span-4 border-r flex flex-col h-full">
              <div className="p-4 border-b">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search conversations..."
                    className="pl-9"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex-1 overflow-y-auto">
                {filteredConversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    className={`p-4 border-b cursor-pointer hover:bg-accent transition-colors ${
                      selectedConversation.id === conversation.id ? "bg-accent" : ""
                    }`}
                    onClick={() => setSelectedConversation(conversation)}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="relative">
                        <Avatar>
                          <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${conversation.name}`} />
                          <AvatarFallback>
                            {conversation.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        {conversation.online && (
                          <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background"></div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <p className="font-medium truncate">{conversation.name}</p>
                          {conversation.unread > 0 && (
                            <Badge variant="default" className="ml-2">
                              {conversation.unread}
                            </Badge>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground mb-1">{conversation.property}</p>
                        <p className="text-sm text-muted-foreground truncate">{conversation.lastMessage}</p>
                        <p className="text-xs text-muted-foreground mt-1">{conversation.timestamp}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Chat Area */}
            <div className="col-span-8 flex flex-col h-full">
              {/* Chat Header */}
              <div className="p-4 border-b flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <Avatar>
                      <AvatarImage
                        src={`https://api.dicebear.com/7.x/initials/svg?seed=${selectedConversation.name}`}
                      />
                      <AvatarFallback>
                        {selectedConversation.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    {selectedConversation.online && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background"></div>
                    )}
                  </div>
                  <div>
                    <p className="font-medium">{selectedConversation.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {selectedConversation.online ? "Online" : "Offline"}
                    </p>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>

              {/* Property Context */}
              <div className="px-4 py-2 bg-accent/50 border-b">
                <p className="text-sm">
                  <span className="text-muted-foreground">Regarding:</span>{" "}
                  <span className="font-medium">{selectedConversation.property}</span>
                </p>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {mockMessages.map((message) => (
                  <div key={message.id} className={`flex ${message.isOwn ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[70%] ${message.isOwn ? "order-2" : "order-1"}`}>
                      <div
                        className={`rounded-lg p-3 ${
                          message.isOwn ? "bg-primary text-primary-foreground" : "bg-accent"
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1 px-1">{message.timestamp}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="p-4 border-t">
                <div className="flex space-x-2">
                  <Input
                    placeholder="Type your message..."
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    className="flex-1"
                  />
                  <Button onClick={handleSendMessage}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </DashboardLayout>
  )
}
