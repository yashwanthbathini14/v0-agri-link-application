"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Home, Search, Heart, MessageSquare, User, MapPin, IndianRupee, Calendar, Eye, Phone } from "lucide-react"
import Image from "next/image"

const navigation = [
  { name: "Overview", href: "/dashboard/farmer", icon: Home },
  { name: "Browse Land", href: "/dashboard/farmer/browse", icon: Search },
  { name: "My Applications", href: "/dashboard/farmer/applications", icon: User, current: true },
  { name: "Saved Properties", href: "/dashboard/farmer/saved", icon: Heart },
  { name: "Messages", href: "/dashboard/farmer/messages", icon: MessageSquare },
]

const applications = [
  {
    id: 1,
    propertyTitle: "Organic Spice Farm - 30 acres",
    location: "Kochi, Kerala",
    price: 55000,
    appliedDate: "2024-01-15",
    status: "pending",
    landowner: "Rajesh Kumar",
    landownerPhone: "+91 98765 43210",
    message:
      "I am very interested in your organic spice farm. I have 8 years of experience in organic farming and would love to continue the sustainable practices you've established.",
    image: "/placeholder.svg?height=100&width=150&text=Spice+Farm",
  },
  {
    id: 2,
    propertyTitle: "Basmati Rice Fields - 25 acres",
    location: "Ludhiana, Punjab",
    price: 45000,
    appliedDate: "2024-01-12",
    status: "approved",
    landowner: "Harpreet Singh",
    landownerPhone: "+91 98765 43211",
    message:
      "I have extensive experience in basmati rice cultivation and would like to lease your premium fields for export-quality production.",
    image: "/placeholder.svg?height=100&width=150&text=Rice+Fields",
  },
  {
    id: 3,
    propertyTitle: "Cotton Farm - 40 acres",
    location: "Ahmedabad, Gujarat",
    price: 48000,
    appliedDate: "2024-01-10",
    status: "rejected",
    landowner: "Amit Patel",
    landownerPhone: "+91 98765 43212",
    message: "I am interested in cotton cultivation using modern BT varieties and drip irrigation techniques.",
    image: "/placeholder.svg?height=100&width=150&text=Cotton+Farm",
  },
  {
    id: 4,
    propertyTitle: "Tea Garden Estate - 60 acres",
    location: "Darjeeling, West Bengal",
    price: 75000,
    appliedDate: "2024-01-08",
    status: "under_review",
    landowner: "Subhash Ghosh",
    landownerPhone: "+91 98765 43213",
    message:
      "I have experience in high-altitude tea cultivation and would like to maintain the premium quality of your Darjeeling tea garden.",
    image: "/placeholder.svg?height=100&width=150&text=Tea+Garden",
  },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "approved":
      return "bg-green-100 text-green-800 border-green-200"
    case "rejected":
      return "bg-red-100 text-red-800 border-red-200"
    case "under_review":
      return "bg-yellow-100 text-yellow-800 border-yellow-200"
    default:
      return "bg-blue-100 text-blue-800 border-blue-200"
  }
}

const getStatusText = (status: string) => {
  switch (status) {
    case "approved":
      return "Approved"
    case "rejected":
      return "Rejected"
    case "under_review":
      return "Under Review"
    default:
      return "Pending"
  }
}

export default function ApplicationsPage() {
  const [activeTab, setActiveTab] = useState("all")

  const filteredApplications = applications.filter((app) => {
    if (activeTab === "all") return true
    return app.status === activeTab
  })

  const handleContact = (phone: string) => {
    console.log("[v0] Contacting landowner:", phone)
    window.location.href = `tel:${phone}`
  }

  const handleViewProperty = (id: number) => {
    console.log("[v0] Viewing property:", id)
    window.location.href = `/dashboard/farmer/property/${id}`
  }

  const handleWithdraw = (id: number) => {
    console.log("[v0] Withdrawing application:", id)
    if (confirm("Are you sure you want to withdraw this application?")) {
      alert("Application withdrawn successfully.")
    }
  }

  return (
    <DashboardLayout title="My Applications" navigation={navigation}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">My Applications</h1>
          <p className="text-muted-foreground">Track the status of your property applications</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold">{applications.length}</div>
              <p className="text-sm text-muted-foreground">Total Applications</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-blue-600">
                {applications.filter((a) => a.status === "pending").length}
              </div>
              <p className="text-sm text-muted-foreground">Pending</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-green-600">
                {applications.filter((a) => a.status === "approved").length}
              </div>
              <p className="text-sm text-muted-foreground">Approved</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-yellow-600">
                {applications.filter((a) => a.status === "under_review").length}
              </div>
              <p className="text-sm text-muted-foreground">Under Review</p>
            </CardContent>
          </Card>
        </div>

        {/* Applications List */}
        <Card>
          <CardHeader>
            <CardTitle>Application Status</CardTitle>
            <CardDescription>View and manage your property applications</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-5">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="under_review">Under Review</TabsTrigger>
                <TabsTrigger value="approved">Approved</TabsTrigger>
                <TabsTrigger value="rejected">Rejected</TabsTrigger>
              </TabsList>

              <TabsContent value={activeTab} className="mt-6">
                <div className="space-y-4">
                  {filteredApplications.map((application) => (
                    <Card key={application.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <div className="relative w-24 h-16 rounded-lg overflow-hidden flex-shrink-0">
                            <Image
                              src={application.image || "/placeholder.svg"}
                              alt={application.propertyTitle}
                              fill
                              className="object-cover"
                            />
                          </div>

                          <div className="flex-1 space-y-3">
                            <div className="flex items-start justify-between">
                              <div>
                                <h3 className="font-medium text-lg">{application.propertyTitle}</h3>
                                <div className="flex items-center text-muted-foreground mt-1">
                                  <MapPin className="h-4 w-4 mr-1" />
                                  {application.location}
                                </div>
                                <div className="flex items-center mt-1">
                                  <IndianRupee className="h-4 w-4 mr-1 text-muted-foreground" />
                                  <span className="font-medium">₹{application.price.toLocaleString()}/month</span>
                                </div>
                              </div>
                              <div className="text-right">
                                <Badge className={getStatusColor(application.status)}>
                                  {getStatusText(application.status)}
                                </Badge>
                                <div className="flex items-center text-sm text-muted-foreground mt-2">
                                  <Calendar className="h-3 w-3 mr-1" />
                                  Applied {new Date(application.appliedDate).toLocaleDateString()}
                                </div>
                              </div>
                            </div>

                            <div className="bg-muted/50 p-3 rounded-lg">
                              <p className="text-sm text-muted-foreground">
                                <strong>Your Message:</strong> {application.message}
                              </p>
                            </div>

                            <div className="flex items-center justify-between">
                              <div className="text-sm text-muted-foreground">
                                <strong>Landowner:</strong> {application.landowner}
                              </div>
                              <div className="flex space-x-2">
                                <Button size="sm" variant="outline" onClick={() => handleViewProperty(application.id)}>
                                  <Eye className="h-3 w-3 mr-1" />
                                  View Property
                                </Button>
                                {application.status === "approved" && (
                                  <Button size="sm" onClick={() => handleContact(application.landownerPhone)}>
                                    <Phone className="h-3 w-3 mr-1" />
                                    Contact Owner
                                  </Button>
                                )}
                                {application.status === "pending" && (
                                  <Button
                                    size="sm"
                                    variant="destructive"
                                    onClick={() => handleWithdraw(application.id)}
                                  >
                                    Withdraw
                                  </Button>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {filteredApplications.length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">No applications found for this status.</p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
