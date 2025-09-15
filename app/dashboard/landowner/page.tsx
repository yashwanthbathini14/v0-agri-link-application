"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Home, Plus, MapPin, Users, MessageSquare, BarChart3, IndianRupee, TrendingUp, Eye } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const navigation = [
  { name: "Overview", href: "/dashboard/landowner", icon: Home, current: true },
  { name: "My Properties", href: "/dashboard/landowner/properties", icon: MapPin },
  { name: "Applications", href: "/dashboard/landowner/applications", icon: Users },
  { name: "Messages", href: "/dashboard/landowner/messages", icon: MessageSquare },
  { name: "Analytics", href: "/dashboard/landowner/analytics", icon: BarChart3 },
]

export default function LandownerDashboard() {
  return (
    <DashboardLayout title="Landowner Dashboard" navigation={navigation}>
      <div className="space-y-6">
        {/* Welcome Section */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Welcome back!</h1>
          <p className="text-muted-foreground">Here's what's happening with your properties today.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Properties</CardTitle>
              <MapPin className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">+2 from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Leases</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">67% occupancy rate</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
              <IndianRupee className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹18,50,000</div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">New Applications</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">15</div>
              <p className="text-xs text-muted-foreground">+3 this week</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Properties */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Recent Properties</CardTitle>
                <CardDescription>Your latest property listings</CardDescription>
              </div>
              <Link href="/dashboard/landowner/properties/new">
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Property
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden">
                      <Image src="/fertile-agricultural-land-with-rice-fields-in-punj.jpg" alt="Rice fields" fill className="object-cover" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">Golden Rice Fields - 25 acres</h4>
                      <p className="text-sm text-muted-foreground">Ludhiana, Punjab • Posted 2 days ago</p>
                      <div className="flex items-center mt-2 space-x-2">
                        <Badge variant="secondary">Rice Cultivation</Badge>
                        <Badge variant="outline">Available</Badge>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">₹45,000/month</p>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Eye className="h-3 w-3 mr-1" />
                      24 views
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden">
                      <Image src="/mango-orchard-with-fruit-trees-in-maharashtra-indi.jpg" alt="Mango orchard" fill className="object-cover" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">Alphonso Mango Orchard - 15 acres</h4>
                      <p className="text-sm text-muted-foreground">Ratnagiri, Maharashtra • Posted 1 week ago</p>
                      <div className="flex items-center mt-2 space-x-2">
                        <Badge variant="secondary">Mango Trees</Badge>
                        <Badge variant="outline">3 Applications</Badge>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">₹35,000/month</p>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Eye className="h-3 w-3 mr-1" />
                      18 views
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <div className="relative w-16 h-16 rounded-lg overflow-hidden">
                      <Image src="/wheat-fields-with-golden-crops-in-haryana-india.jpg" alt="Wheat fields" fill className="object-cover" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium">Premium Wheat Farm - 50 acres</h4>
                      <p className="text-sm text-muted-foreground">Karnal, Haryana • Posted 3 days ago</p>
                      <div className="flex items-center mt-2 space-x-2">
                        <Badge variant="secondary">Wheat Cultivation</Badge>
                        <Badge variant="destructive">Leased</Badge>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">₹60,000/month</p>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Eye className="h-3 w-3 mr-1" />
                      31 views
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Applications */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Recent Applications</CardTitle>
                <CardDescription>Latest applications for your properties</CardDescription>
              </div>
              <Link href="/dashboard/landowner/applications">
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium">Rajesh Kumar</h4>
                    <p className="text-sm text-muted-foreground">Applied for Golden Rice Fields</p>
                    <p className="text-xs text-muted-foreground mt-1">Organic rice farming • 8 years experience</p>
                  </div>
                  <div className="flex flex-col space-y-2">
                    <Badge>New</Badge>
                    <Button size="sm" variant="outline">
                      Review
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium">Priya Sharma</h4>
                    <p className="text-sm text-muted-foreground">Applied for Alphonso Mango Orchard</p>
                    <p className="text-xs text-muted-foreground mt-1">Fruit cultivation • 12 years experience</p>
                  </div>
                  <div className="flex flex-col space-y-2">
                    <Badge variant="secondary">Under Review</Badge>
                    <Button size="sm" variant="outline">
                      Review
                    </Button>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium">Haryana Farmers Co-op</h4>
                    <p className="text-sm text-muted-foreground">Applied for Premium Wheat Farm</p>
                    <p className="text-xs text-muted-foreground mt-1">Wheat cultivation • Established 2010</p>
                  </div>
                  <div className="flex flex-col space-y-2">
                    <Badge variant="destructive">Approved</Badge>
                    <Button size="sm" variant="outline">
                      View
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Performance Overview */}
        <Card>
          <CardHeader>
            <CardTitle>Property Performance</CardTitle>
            <CardDescription>Overview of your property portfolio performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Occupancy Rate</span>
                  <span className="text-sm text-muted-foreground">67%</span>
                </div>
                <Progress value={67} className="h-2" />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Average Response Time</span>
                  <span className="text-sm text-muted-foreground">2.3 days</span>
                </div>
                <Progress value={85} className="h-2" />
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Tenant Satisfaction</span>
                  <span className="text-sm text-muted-foreground">4.6/5</span>
                </div>
                <Progress value={92} className="h-2" />
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
              <Link href="/dashboard/landowner/properties/new">
                <Button variant="outline" className="h-20 flex flex-col space-y-2 bg-transparent">
                  <Plus className="h-6 w-6" />
                  <span className="text-sm">Add Property</span>
                </Button>
              </Link>

              <Link href="/dashboard/landowner/applications">
                <Button variant="outline" className="h-20 flex flex-col space-y-2 bg-transparent">
                  <Users className="h-6 w-6" />
                  <span className="text-sm">Review Applications</span>
                </Button>
              </Link>

              <Link href="/dashboard/landowner/messages">
                <Button variant="outline" className="h-20 flex flex-col space-y-2 bg-transparent">
                  <MessageSquare className="h-6 w-6" />
                  <span className="text-sm">Messages</span>
                </Button>
              </Link>

              <Link href="/dashboard/landowner/analytics">
                <Button variant="outline" className="h-20 flex flex-col space-y-2 bg-transparent">
                  <BarChart3 className="h-6 w-6" />
                  <span className="text-sm">View Analytics</span>
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
