"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Home, MapPin, Users, MessageSquare, BarChart3, Send, Search, MoreVertical } from "lucide-react"
import { useState } from "react"

const navigation = [
  { name: "Overview", href: "/dashboard/landowner", icon: Home },
  { name: "My Properties", href: "/dashboard/landowner/properties", icon: MapPin },
  { name: "Applications", href: "/dashboard/landowner/applications", icon: Users },
  { name: "Messages", href: "/dashboard/landowner/messages", icon: MessageSquare, current: true },
  { name: "Analytics", href: "/dashboard/landowner/analytics", icon: BarChart3 },
]

const mockConversations = [
  {
    id: "1",
    name: "Rajesh Kumar",
    lastMessage: "Thank you for considering my application. I look forward to hearing from you.",
    timestamp: "2 hours ago",
    unread: 2,
    online: true,
    property: "Golden Rice Fields",
  },
  {
    id: "2",
    name: "Priya Sharma",
    lastMessage: "I have some questions about the irrigation system on the property.",
    timestamp: "5 hours ago",
    unread: 0,
    online: false,
    property: "Alphonso Mango Orchard",
  },
  {
    id: "3",
    name: "Haryana Farmers Co-op",
    lastMessage: "We would like to schedule a site visit next week.",
    timestamp: "1 day ago",
    unread: 1,
    online: true,
    property: "Premium Wheat Farm",
  },
  {
    id: "4",
    name: "Amit Patel",
    lastMessage: "Could you provide more details about the soil quality?",
    timestamp: "2 days ago",
    unread: 0,
    online: false,
    property: "Cotton Fields",
  },
]

const mockMessages = [
  {
    id: "1",
    sender: "Rajesh Kumar",
    content: "Hello! I'm very interested in leasing your Golden Rice Fields property.",
    timestamp: "10:30 AM",
    isOwn: false,
  },
  {
    id: "2",
    sender: "You",
    content: "Thank you for your interest! I'd be happy to discuss the details with you.",
    timestamp: "10:35 AM",
    isOwn: true,
  },
  {
    id: "3",
    sender: "Rajesh Kumar",
    content: "Great! Could you tell me more about the water availability and irrigation facilities?",
    timestamp: "10:40 AM",
    isOwn: false,
  },
  {
    id: "4",
    sender: "You",
    content:
      "The property has excellent water access with both canal irrigation and borewells. The irrigation system was upgraded last year.",
    timestamp: "10:45 AM",
    isOwn: true,
  },
  {
    id: "5",
    sender: "Rajesh Kumar",
    content: "That sounds perfect for my needs. When would be a good time to visit the property?",
    timestamp: "11:00 AM",
    isOwn: false,
  },
  {
    id: "6",
    sender: "You",
    content: "I'm available this weekend. Would Saturday morning work for you?",
    timestamp: "11:05 AM",
    isOwn: true,
  },
  {
    id: "7",
    sender: "Rajesh Kumar",
    content: "Saturday morning works great! What time should I plan to arrive?",
    timestamp: "2:15 PM",
    isOwn: false,
  },
  {
    id: "8",
    sender: "Rajesh Kumar",
    content: "Thank you for considering my application. I look forward to hearing from you.",
    timestamp: "2:20 PM",
    isOwn: false,
  },
]

export default function LandownerMessagesPage() {
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
