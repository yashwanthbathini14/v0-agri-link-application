"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Home, MapPin, Users, MessageSquare, BarChart3, TrendingUp, TrendingDown, Eye, IndianRupee } from "lucide-react"
import { Progress } from "@/components/ui/progress"

const navigation = [
  { name: "Overview", href: "/dashboard/landowner", icon: Home },
  { name: "My Properties", href: "/dashboard/landowner/properties", icon: MapPin },
  { name: "Applications", href: "/dashboard/landowner/applications", icon: Users },
  { name: "Messages", href: "/dashboard/landowner/messages", icon: MessageSquare },
  { name: "Analytics", href: "/dashboard/landowner/analytics", icon: BarChart3, current: true },
]

export default function LandownerAnalyticsPage() {
  return (
    <DashboardLayout title="Analytics" navigation={navigation}>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Analytics & Insights</h1>
          <p className="text-muted-foreground">Track your property performance and revenue</p>
        </div>

        {/* Revenue Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <IndianRupee className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹22,50,000</div>
              <div className="flex items-center text-xs text-green-600 mt-1">
                <TrendingUp className="h-3 w-3 mr-1" />
                +15.2% from last month
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg. Property Value</CardTitle>
              <IndianRupee className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">₹48,500</div>
              <div className="flex items-center text-xs text-green-600 mt-1">
                <TrendingUp className="h-3 w-3 mr-1" />
                +8.1% from last month
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Views</CardTitle>
              <Eye className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1,248</div>
              <div className="flex items-center text-xs text-green-600 mt-1">
                <TrendingUp className="h-3 w-3 mr-1" />
                +23.5% from last month
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12.4%</div>
              <div className="flex items-center text-xs text-red-600 mt-1">
                <TrendingDown className="h-3 w-3 mr-1" />
                -2.3% from last month
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Property Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Property Performance</CardTitle>
            <CardDescription>Individual property metrics and statistics</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="font-medium">Golden Rice Fields - 25 acres</p>
                    <p className="text-sm text-muted-foreground">Ludhiana, Punjab</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">₹45,000/month</p>
                    <p className="text-sm text-muted-foreground">24 views</p>
                  </div>
                </div>
                <Progress value={85} className="h-2" />
                <p className="text-xs text-muted-foreground mt-1">85% engagement rate</p>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="font-medium">Alphonso Mango Orchard - 15 acres</p>
                    <p className="text-sm text-muted-foreground">Ratnagiri, Maharashtra</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">₹35,000/month</p>
                    <p className="text-sm text-muted-foreground">18 views • 3 applications</p>
                  </div>
                </div>
                <Progress value={72} className="h-2" />
                <p className="text-xs text-muted-foreground mt-1">72% engagement rate</p>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="font-medium">Premium Wheat Farm - 50 acres</p>
                    <p className="text-sm text-muted-foreground">Karnal, Haryana</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">₹60,000/month</p>
                    <p className="text-sm text-muted-foreground">31 views • Leased</p>
                  </div>
                </div>
                <Progress value={100} className="h-2" />
                <p className="text-xs text-muted-foreground mt-1">Successfully leased</p>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="font-medium">Tea Garden Estate - 60 acres</p>
                    <p className="text-sm text-muted-foreground">Darjeeling, West Bengal</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">₹85,000/month</p>
                    <p className="text-sm text-muted-foreground">42 views • 5 applications</p>
                  </div>
                </div>
                <Progress value={90} className="h-2" />
                <p className="text-xs text-muted-foreground mt-1">90% engagement rate</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Monthly Trends */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Revenue Trend</CardTitle>
              <CardDescription>Monthly revenue over the last 6 months</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">January 2024</span>
                  <span className="font-medium">₹18,50,000</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">December 2023</span>
                  <span className="font-medium">₹16,20,000</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">November 2023</span>
                  <span className="font-medium">₹17,80,000</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">October 2023</span>
                  <span className="font-medium">₹15,90,000</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">September 2023</span>
                  <span className="font-medium">₹14,50,000</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">August 2023</span>
                  <span className="font-medium">₹13,80,000</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Application Trends</CardTitle>
              <CardDescription>Applications received over the last 6 months</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">January 2024</span>
                  <span className="font-medium">15 applications</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">December 2023</span>
                  <span className="font-medium">12 applications</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">November 2023</span>
                  <span className="font-medium">18 applications</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">October 2023</span>
                  <span className="font-medium">14 applications</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">September 2023</span>
                  <span className="font-medium">10 applications</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">August 2023</span>
                  <span className="font-medium">8 applications</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Performance Metrics */}
        <Card>
          <CardHeader>
            <CardTitle>Key Performance Indicators</CardTitle>
            <CardDescription>Overall portfolio performance metrics</CardDescription>
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
                  <span className="text-sm font-medium">Response Time</span>
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
      </div>
    </DashboardLayout>
  )
}
