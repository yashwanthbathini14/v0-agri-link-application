"use client"

import Link from "next/link"

import { useEffect, useState } from "react"
import { useAuth } from "@/lib/auth-context"
import { collection, onSnapshot, query, where, orderBy, deleteDoc, doc } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Home, Search, Briefcase, MessageSquare, User, MapPin, IndianRupee, Calendar, Phone } from "lucide-react"

type JobApplication = {
  id: string
  jobId: string
  jobTitle: string
  company: string
  location: string
  salary: number
  appliedDate: string
  status: "pending" | "approved" | "rejected" | "under_review" | "interview_scheduled"
  employerName?: string
  employerPhone?: string
  message?: string
  interviewDate?: string
}

const navigation = [
  { name: "Overview", href: "/dashboard/worker", icon: Home },
  { name: "Find Jobs", href: "/dashboard/worker/jobs", icon: Search },
  { name: "My Applications", href: "/dashboard/worker/applications", icon: Briefcase, current: true },
  { name: "Messages", href: "/dashboard/worker/messages", icon: MessageSquare },
  { name: "Profile", href: "/dashboard/worker/profile", icon: User },
]

const getStatusColor = (status: string) => {
  switch (status) {
    case "approved":
      return "bg-green-100 text-green-800 border-green-200"
    case "rejected":
      return "bg-red-100 text-red-800 border-red-200"
    case "under_review":
      return "bg-yellow-100 text-yellow-800 border-yellow-200"
    case "interview_scheduled":
      return "bg-blue-100 text-blue-800 border-blue-200"
    default:
      return "bg-gray-100 text-gray-800 border-gray-200"
  }
}

const getStatusText = (status: string) => {
  switch (status) {
    case "approved":
      return "Offer Received"
    case "rejected":
      return "Position Filled"
    case "under_review":
      return "Under Review"
    case "interview_scheduled":
      return "Interview Scheduled"
    default:
      return "Pending"
  }
}

export default function WorkerApplicationsPage() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState("all")
  const [applications, setApplications] = useState<JobApplication[]>([])

  useEffect(() => {
    if (!user) {
      setApplications([])
      return
    }

    const q = query(
      collection(db, "job_applications"),
      where("applicantId", "==", user.uid),
      orderBy("createdAt", "desc"),
    )

    const unsub = onSnapshot(q, (snap) => {
      const rows: JobApplication[] = snap.docs.map((d) => {
        const data = d.data() as any
        return {
          id: d.id,
          jobId: data.jobId || "",
          jobTitle: data.jobTitle || "Job Position",
          company: data.company || "Company",
          location: data.location || "Location",
          salary: data.salary || 0,
          appliedDate: data.createdAt?.toDate ? data.createdAt.toDate().toISOString() : new Date().toISOString(),
          status: data.status || "pending",
          employerName: data.employerName,
          employerPhone: data.employerPhone,
          message: data.message || "",
          interviewDate: data.interviewDate,
        }
      })
      setApplications(rows)
    })

    return () => unsub()
  }, [user])

  const filteredApplications = applications.filter((app) => {
    if (activeTab === "all") return true
    return app.status === activeTab
  })

  const handleWithdraw = async (id: string) => {
    if (!confirm("Are you sure you want to withdraw this application?")) return
    try {
      await deleteDoc(doc(db, "job_applications", id))
    } catch (e) {
      console.error("[v0] Failed to withdraw:", e)
      alert("Failed to withdraw. Please try again.")
    }
  }

  const handleContact = (phone: string | undefined) => {
    if (!phone) return
    window.location.href = `tel:${phone}`
  }

  return (
    <DashboardLayout title="My Applications" navigation={navigation}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">My Applications</h1>
          <p className="text-muted-foreground">Track the status of your job applications</p>
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
              <div className="text-2xl font-bold text-gray-600">
                {applications.filter((a) => a.status === "pending").length}
              </div>
              <p className="text-sm text-muted-foreground">Pending</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-blue-600">
                {applications.filter((a) => a.status === "interview_scheduled").length}
              </div>
              <p className="text-sm text-muted-foreground">Interviews</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-green-600">
                {applications.filter((a) => a.status === "approved").length}
              </div>
              <p className="text-sm text-muted-foreground">Offers</p>
            </CardContent>
          </Card>
        </div>

        {/* Applications List */}
        <Card>
          <CardHeader>
            <CardTitle>Application Status</CardTitle>
            <CardDescription>View and manage your job applications</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-6">
                <TabsTrigger value="all">All</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="under_review">Review</TabsTrigger>
                <TabsTrigger value="interview_scheduled">Interview</TabsTrigger>
                <TabsTrigger value="approved">Offers</TabsTrigger>
                <TabsTrigger value="rejected">Rejected</TabsTrigger>
              </TabsList>

              <TabsContent value={activeTab} className="mt-6">
                <div className="space-y-4">
                  {filteredApplications.map((application) => (
                    <Card key={application.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="space-y-3">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <h3 className="font-medium text-lg">{application.jobTitle}</h3>
                              <p className="text-sm text-muted-foreground">{application.company}</p>
                              <div className="flex items-center text-muted-foreground mt-1">
                                <MapPin className="h-4 w-4 mr-1" />
                                {application.location}
                              </div>
                              <div className="flex items-center mt-1">
                                <IndianRupee className="h-4 w-4 mr-1 text-muted-foreground" />
                                <span className="font-medium">₹{application.salary.toLocaleString()}/month</span>
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
                              {application.interviewDate && (
                                <div className="flex items-center text-sm text-blue-600 mt-1 font-medium">
                                  <Calendar className="h-3 w-3 mr-1" />
                                  Interview: {new Date(application.interviewDate).toLocaleDateString()}
                                </div>
                              )}
                            </div>
                          </div>

                          {application.message && (
                            <div className="bg-muted/50 p-3 rounded-lg">
                              <p className="text-sm text-muted-foreground">
                                <strong>Your Message:</strong> {application.message}
                              </p>
                            </div>
                          )}

                          <div className="flex items-center justify-between pt-2">
                            {application.employerName && (
                              <div className="text-sm text-muted-foreground">
                                <strong>Contact:</strong> {application.employerName}
                              </div>
                            )}
                            <div className="flex space-x-2 ml-auto">
                              {application.status === "approved" && (
                                <Button size="sm" onClick={() => handleContact(application.employerPhone)}>
                                  <Phone className="h-3 w-3 mr-1" />
                                  Contact Employer
                                </Button>
                              )}
                              {application.status === "pending" && (
                                <Button size="sm" variant="destructive" onClick={() => handleWithdraw(application.id)}>
                                  Withdraw
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {filteredApplications.length === 0 && (
                  <div className="text-center py-12">
                    <Briefcase className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                    <p className="text-muted-foreground">No applications found for this status.</p>
                    <Link href="/dashboard/worker/jobs">
                      <Button className="mt-4">Browse Jobs</Button>
                    </Link>
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
