"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  Home,
  Search,
  Briefcase,
  MessageSquare,
  User,
  Star,
  DollarSign,
  Calendar,
  TrendingUp,
  Clock,
} from "lucide-react"
import Link from "next/link"

const navigation = [
  { name: "Overview", href: "/dashboard/worker", icon: Home, current: true },
  { name: "Find Jobs", href: "/dashboard/worker/jobs", icon: Search },
  { name: "My Applications", href: "/dashboard/worker/applications", icon: Briefcase },
  { name: "Messages", href: "/dashboard/worker/messages", icon: MessageSquare },
  { name: "Profile", href: "/dashboard/worker/profile", icon: User },
]

export default function WorkerDashboard() {
  return (
    <DashboardLayout title="Worker Dashboard" navigation={navigation}>
      <div className="space-y-6">
        {/* Welcome Section */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Welcome back, Maria!</h1>
          <p className="text-muted-foreground">Find your next agricultural opportunity and grow your career.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Applications</CardTitle>
              <Briefcase className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5</div>
              <p className="text-xs text-muted-foreground">2 interviews scheduled</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Profile Views</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">28</div>
              <p className="text-xs text-muted-foreground">+12 this week</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Rating</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">4.8</div>
              <p className="text-xs text-muted-foreground">Based on 15 reviews</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Earnings (YTD)</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$42,500</div>
              <p className="text-xs text-muted-foreground">+18% from last year</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Job Opportunities */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Recommended Jobs</CardTitle>
                <CardDescription>Opportunities that match your skills</CardDescription>
              </div>
              <Link href="/dashboard/worker/jobs">
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h4 className="font-medium">Harvest Supervisor</h4>
                      <p className="text-sm text-muted-foreground">Organic Valley Farm • Salinas, CA</p>
                      <div className="flex items-center mt-1">
                        <Calendar className="h-3 w-3 mr-1 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">Seasonal • 3 months</span>
                      </div>
                    </div>
                    <Badge className="bg-primary/10 text-primary border-primary/20">95% Match</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Badge variant="secondary">Leadership</Badge>
                      <Badge variant="outline">Organic</Badge>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">$28/hour</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Lead harvest operations for organic vegetable farm. Experience with team management required.
                  </p>
                  <div className="flex space-x-2 mt-3">
                    <Button size="sm">Apply Now</Button>
                    <Button size="sm" variant="outline">
                      Learn More
                    </Button>
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h4 className="font-medium">Irrigation Specialist</h4>
                      <p className="text-sm text-muted-foreground">Sunset Orchard • Fresno, CA</p>
                      <div className="flex items-center mt-1">
                        <Calendar className="h-3 w-3 mr-1 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">Full-time • Permanent</span>
                      </div>
                    </div>
                    <Badge className="bg-primary/10 text-primary border-primary/20">88% Match</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Badge variant="secondary">Technical</Badge>
                      <Badge variant="outline">Benefits</Badge>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">$32/hour</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Manage and maintain modern irrigation systems for citrus orchard. Technical certification preferred.
                  </p>
                  <div className="flex space-x-2 mt-3">
                    <Button size="sm">Apply Now</Button>
                    <Button size="sm" variant="outline">
                      Learn More
                    </Button>
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h4 className="font-medium">Equipment Operator</h4>
                      <p className="text-sm text-muted-foreground">Mountain View Ranch • Bakersfield, CA</p>
                      <div className="flex items-center mt-1">
                        <Calendar className="h-3 w-3 mr-1 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">Contract • 6 months</span>
                      </div>
                    </div>
                    <Badge className="bg-primary/10 text-primary border-primary/20">82% Match</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Badge variant="secondary">Heavy Equipment</Badge>
                      <Badge variant="outline">CDL Required</Badge>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">$26/hour</p>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    Operate tractors and harvesting equipment. CDL license and 3+ years experience required.
                  </p>
                  <div className="flex space-x-2 mt-3">
                    <Button size="sm">Apply Now</Button>
                    <Button size="sm" variant="outline">
                      Learn More
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Application Status */}
          <Card>
            <CardHeader>
              <CardTitle>Application Status</CardTitle>
              <CardDescription>Track your recent applications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium">Farm Manager Position</h4>
                    <p className="text-sm text-muted-foreground">Green Valley Co-op</p>
                    <p className="text-xs text-muted-foreground mt-1">Applied 2 days ago</p>
                  </div>
                  <div className="flex flex-col items-end space-y-2">
                    <Badge>Interview Scheduled</Badge>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Clock className="h-3 w-3 mr-1" />
                      Tomorrow 2:00 PM
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium">Crop Specialist</h4>
                    <p className="text-sm text-muted-foreground">Riverside Farm</p>
                    <p className="text-xs text-muted-foreground mt-1">Applied 5 days ago</p>
                  </div>
                  <div className="flex flex-col items-end space-y-2">
                    <Badge variant="secondary">Under Review</Badge>
                    <span className="text-xs text-muted-foreground">Response expected soon</span>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium">Seasonal Worker</h4>
                    <p className="text-sm text-muted-foreground">Valley Orchard</p>
                    <p className="text-xs text-muted-foreground mt-1">Applied 1 week ago</p>
                  </div>
                  <div className="flex flex-col items-end space-y-2">
                    <Badge variant="destructive">Position Filled</Badge>
                    <span className="text-xs text-muted-foreground">Better luck next time</span>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium">Equipment Technician</h4>
                    <p className="text-sm text-muted-foreground">AgriTech Solutions</p>
                    <p className="text-xs text-muted-foreground mt-1">Applied 1 week ago</p>
                  </div>
                  <div className="flex flex-col items-end space-y-2">
                    <Badge className="bg-green-100 text-green-800 border-green-200">Offer Received</Badge>
                    <Button size="sm" variant="outline">
                      View Offer
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Profile Completion */}
        <Card>
          <CardHeader>
            <CardTitle>Profile Completion</CardTitle>
            <CardDescription>Complete your profile to get better job matches</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Profile Completeness</span>
                <span className="text-sm text-muted-foreground">75%</span>
              </div>
              <Progress value={75} className="h-2" />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm">Basic Information</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm">Work Experience</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <span className="text-sm">Skills & Certifications</span>
                </div>
              </div>

              <div className="flex space-x-2 mt-4">
                <Link href="/dashboard/worker/profile">
                  <Button size="sm">Complete Profile</Button>
                </Link>
                <Button size="sm" variant="outline">
                  Add Skills
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Reviews */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Reviews</CardTitle>
            <CardDescription>What employers are saying about your work</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="border rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-medium">Sarah Martinez</h4>
                      <Badge variant="outline">Verified Employer</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">Organic Valley Farm</p>
                  </div>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  "Maria was exceptional during our harvest season. Her attention to detail and leadership skills made a
                  huge difference in our operations. Highly recommended!"
                </p>
                <p className="text-xs text-muted-foreground mt-2">2 weeks ago</p>
              </div>

              <div className="border rounded-lg p-4">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-medium">John Davis</h4>
                      <Badge variant="outline">Verified Employer</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">Mountain View Ranch</p>
                  </div>
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${i < 4 ? "fill-primary text-primary" : "text-muted-foreground"}`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  "Reliable and skilled worker. Maria's experience with irrigation systems was exactly what we needed.
                  Would definitely hire again."
                </p>
                <p className="text-xs text-muted-foreground mt-2">1 month ago</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks and shortcuts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Link href="/dashboard/worker/jobs">
                <Button variant="outline" className="h-20 flex flex-col space-y-2 bg-transparent">
                  <Search className="h-6 w-6" />
                  <span className="text-sm">Find Jobs</span>
                </Button>
              </Link>

              <Link href="/dashboard/worker/applications">
                <Button variant="outline" className="h-20 flex flex-col space-y-2 bg-transparent">
                  <Briefcase className="h-6 w-6" />
                  <span className="text-sm">My Applications</span>
                </Button>
              </Link>

              <Link href="/dashboard/worker/profile">
                <Button variant="outline" className="h-20 flex flex-col space-y-2 bg-transparent">
                  <User className="h-6 w-6" />
                  <span className="text-sm">Update Profile</span>
                </Button>
              </Link>

              <Link href="/dashboard/worker/messages">
                <Button variant="outline" className="h-20 flex flex-col space-y-2 bg-transparent">
                  <MessageSquare className="h-6 w-6" />
                  <span className="text-sm">Messages</span>
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
