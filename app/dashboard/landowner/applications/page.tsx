"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Home,
  MapPin,
  Users,
  MessageSquare,
  BarChart3,
  Mail,
  Phone,
  Calendar,
  CheckCircle,
  XCircle,
  Clock,
  FileText,
} from "lucide-react"
import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import Link from "next/link"

const navigation = [
  { name: "Overview", href: "/dashboard/landowner", icon: Home },
  { name: "My Properties", href: "/dashboard/landowner/properties", icon: MapPin },
  { name: "Applications", href: "/dashboard/landowner/applications", icon: Users, current: true },
  { name: "Messages", href: "/dashboard/landowner/messages", icon: MessageSquare },
  { name: "Analytics", href: "/dashboard/landowner/analytics", icon: BarChart3 },
]

const mockApplications = [
  {
    id: "1",
    applicantName: "Rajesh Kumar",
    applicantEmail: "rajesh.kumar@email.com",
    applicantPhone: "+91 98765 43210",
    propertyTitle: "Golden Rice Fields - 25 acres",
    propertyLocation: "Ludhiana, Punjab",
    experience: "8 years",
    specialty: "Organic rice farming",
    appliedDate: "2024-01-15",
    status: "pending",
    message:
      "I have extensive experience in organic rice cultivation and would love to lease your property. I have successfully managed similar sized farms in Punjab.",
  },
  {
    id: "2",
    applicantName: "Priya Sharma",
    applicantEmail: "priya.sharma@email.com",
    applicantPhone: "+91 98765 43211",
    propertyTitle: "Alphonso Mango Orchard - 15 acres",
    propertyLocation: "Ratnagiri, Maharashtra",
    experience: "12 years",
    specialty: "Fruit cultivation",
    appliedDate: "2024-01-14",
    status: "under_review",
    message:
      "I specialize in mango cultivation and have been managing orchards for over a decade. I'm interested in sustainable farming practices.",
  },
  {
    id: "3",
    applicantName: "Haryana Farmers Co-op",
    applicantEmail: "contact@haryanafarmerscoop.com",
    applicantPhone: "+91 98765 43212",
    propertyTitle: "Premium Wheat Farm - 50 acres",
    propertyLocation: "Karnal, Haryana",
    experience: "Established 2010",
    specialty: "Wheat cultivation",
    appliedDate: "2024-01-10",
    status: "approved",
    message:
      "Our cooperative has been successfully managing large wheat farms across Haryana. We have modern equipment and experienced farmers.",
  },
  {
    id: "4",
    applicantName: "Amit Patel",
    applicantEmail: "amit.patel@email.com",
    applicantPhone: "+91 98765 43213",
    propertyTitle: "Cotton Fields - 40 acres",
    propertyLocation: "Ahmedabad, Gujarat",
    experience: "15 years",
    specialty: "Cotton farming",
    appliedDate: "2024-01-12",
    status: "rejected",
    message: "I have been growing cotton for 15 years and have experience with modern irrigation techniques.",
  },
  {
    id: "5",
    applicantName: "Sunita Reddy",
    applicantEmail: "sunita.reddy@email.com",
    applicantPhone: "+91 98765 43214",
    propertyTitle: "Tea Garden Estate - 60 acres",
    propertyLocation: "Darjeeling, West Bengal",
    experience: "10 years",
    specialty: "Tea cultivation",
    appliedDate: "2024-01-13",
    status: "pending",
    message:
      "I have managed tea estates in Darjeeling and understand the unique requirements of high-altitude tea cultivation.",
  },
]

export default function LandownerApplicationsPage() {
  const [selectedApplication, setSelectedApplication] = useState<(typeof mockApplications)[0] | null>(null)
  const [showDialog, setShowDialog] = useState(false)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "pending":
        return <Badge variant="outline">Pending</Badge>
      case "under_review":
        return <Badge variant="secondary">Under Review</Badge>
      case "approved":
        return <Badge className="bg-green-500">Approved</Badge>
      case "rejected":
        return <Badge variant="destructive">Rejected</Badge>
      default:
        return null
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4" />
      case "under_review":
        return <Clock className="h-4 w-4" />
      case "approved":
        return <CheckCircle className="h-4 w-4" />
      case "rejected":
        return <XCircle className="h-4 w-4" />
      default:
        return null
    }
  }

  const filterByStatus = (status: string) => {
    if (status === "all") return mockApplications
    return mockApplications.filter((app) => app.status === status)
  }

  const handleViewDetails = (application: (typeof mockApplications)[0]) => {
    setSelectedApplication(application)
    setShowDialog(true)
  }

  const ApplicationCard = ({ application }: { application: (typeof mockApplications)[0] }) => (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start space-x-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${application.applicantName}`} />
              <AvatarFallback>
                {application.applicantName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-lg">{application.applicantName}</h3>
              <p className="text-sm text-muted-foreground">{application.specialty}</p>
              <p className="text-xs text-muted-foreground mt-1">{application.experience} experience</p>
            </div>
          </div>
          {getStatusBadge(application.status)}
        </div>
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm">
            <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
            <span className="font-medium">{application.propertyTitle}</span>
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="h-4 w-4 mr-2" />
            Applied on {new Date(application.appliedDate).toLocaleDateString("en-IN")}
          </div>
        </div>
        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{application.message}</p>
        <div className="flex space-x-2">
          <Button size="sm" onClick={() => handleViewDetails(application)}>
            View Details
          </Button>
          {application.status === "pending" && (
            <>
              <Button size="sm" variant="outline" className="text-green-600 bg-transparent">
                <CheckCircle className="h-4 w-4 mr-1" />
                Approve
              </Button>
              <Button size="sm" variant="outline" className="text-red-600 bg-transparent">
                <XCircle className="h-4 w-4 mr-1" />
                Reject
              </Button>
            </>
          )}
          <Button size="sm" variant="outline">
            <MessageSquare className="h-4 w-4 mr-1" />
            Message
          </Button>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <DashboardLayout title="Applications" navigation={navigation}>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Applications</h1>
          <p className="text-muted-foreground">Review and manage applications for your properties</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockApplications.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Pending</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockApplications.filter((a) => a.status === "pending").length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Under Review</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {mockApplications.filter((a) => a.status === "under_review").length}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Approved</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockApplications.filter((a) => a.status === "approved").length}</div>
            </CardContent>
          </Card>
        </div>

        {/* Applications Tabs */}
        <Tabs defaultValue="all" className="space-y-4">
          <TabsList>
            <TabsTrigger value="all">All Applications</TabsTrigger>
            <TabsTrigger value="pending">Pending</TabsTrigger>
            <TabsTrigger value="under_review">Under Review</TabsTrigger>
            <TabsTrigger value="approved">Approved</TabsTrigger>
            <TabsTrigger value="rejected">Rejected</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {filterByStatus("all").length === 0 ? (
              <Card>
                <CardContent className="py-16 text-center">
                  <FileText className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-xl font-semibold mb-2">No applications yet</h3>
                  <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                    You haven't received any applications for your properties yet. Make sure your properties are listed
                    and visible to farmers.
                  </p>
                  <Link href="/dashboard/landowner/properties">
                    <Button>
                      <MapPin className="h-4 w-4 mr-2" />
                      View My Properties
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ) : (
              filterByStatus("all").map((application) => (
                <ApplicationCard key={application.id} application={application} />
              ))
            )}
          </TabsContent>

          <TabsContent value="pending" className="space-y-4">
            {filterByStatus("pending").length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <Clock className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No pending applications</h3>
                  <p className="text-muted-foreground">All applications have been reviewed.</p>
                </CardContent>
              </Card>
            ) : (
              filterByStatus("pending").map((application) => (
                <ApplicationCard key={application.id} application={application} />
              ))
            )}
          </TabsContent>

          <TabsContent value="under_review" className="space-y-4">
            {filterByStatus("under_review").length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <Clock className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No applications under review</h3>
                  <p className="text-muted-foreground">Check the pending tab for new applications to review.</p>
                </CardContent>
              </Card>
            ) : (
              filterByStatus("under_review").map((application) => (
                <ApplicationCard key={application.id} application={application} />
              ))
            )}
          </TabsContent>

          <TabsContent value="approved" className="space-y-4">
            {filterByStatus("approved").length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <CheckCircle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No approved applications</h3>
                  <p className="text-muted-foreground">Applications you approve will appear here.</p>
                </CardContent>
              </Card>
            ) : (
              filterByStatus("approved").map((application) => (
                <ApplicationCard key={application.id} application={application} />
              ))
            )}
          </TabsContent>

          <TabsContent value="rejected" className="space-y-4">
            {filterByStatus("rejected").length === 0 ? (
              <Card>
                <CardContent className="py-12 text-center">
                  <XCircle className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No rejected applications</h3>
                  <p className="text-muted-foreground">Applications you reject will appear here.</p>
                </CardContent>
              </Card>
            ) : (
              filterByStatus("rejected").map((application) => (
                <ApplicationCard key={application.id} application={application} />
              ))
            )}
          </TabsContent>
        </Tabs>

        {/* Application Details Dialog */}
        <Dialog open={showDialog} onOpenChange={setShowDialog}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Application Details</DialogTitle>
              <DialogDescription>Review the complete application information</DialogDescription>
            </DialogHeader>
            {selectedApplication && (
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage
                      src={`https://api.dicebear.com/7.x/initials/svg?seed=${selectedApplication.applicantName}`}
                    />
                    <AvatarFallback>
                      {selectedApplication.applicantName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold">{selectedApplication.applicantName}</h3>
                    <p className="text-muted-foreground">{selectedApplication.specialty}</p>
                    {getStatusBadge(selectedApplication.status)}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium mb-1">Email</p>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Mail className="h-4 w-4 mr-2" />
                      {selectedApplication.applicantEmail}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-1">Phone</p>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Phone className="h-4 w-4 mr-2" />
                      {selectedApplication.applicantPhone}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-1">Experience</p>
                    <p className="text-sm text-muted-foreground">{selectedApplication.experience}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium mb-1">Applied Date</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(selectedApplication.appliedDate).toLocaleDateString("en-IN")}
                    </p>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium mb-2">Property</p>
                  <div className="p-4 border rounded-lg">
                    <p className="font-medium">{selectedApplication.propertyTitle}</p>
                    <p className="text-sm text-muted-foreground">{selectedApplication.propertyLocation}</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm font-medium mb-2">Application Message</p>
                  <p className="text-sm text-muted-foreground p-4 border rounded-lg">{selectedApplication.message}</p>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowDialog(false)}>
                Close
              </Button>
              {selectedApplication?.status === "pending" && (
                <>
                  <Button variant="outline" className="text-red-600 bg-transparent">
                    <XCircle className="h-4 w-4 mr-2" />
                    Reject
                  </Button>
                  <Button className="bg-green-600 hover:bg-green-700">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Approve
                  </Button>
                </>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  )
}
