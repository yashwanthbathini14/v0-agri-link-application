"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Home, Search, Heart, MessageSquare, User, MapPin, Sparkles, Filter, IndianRupee } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"

const navigation = [
  { name: "Overview", href: "/dashboard/farmer", icon: Home, current: true },
  { name: "Browse Land", href: "/dashboard/farmer/browse", icon: Search },
  { name: "My Applications", href: "/dashboard/farmer/applications", icon: User },
  { name: "Saved Properties", href: "/dashboard/farmer/saved", icon: Heart },
  { name: "Messages", href: "/dashboard/farmer/messages", icon: MessageSquare },
]

const indianStates = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
]

export default function FarmerDashboard() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedState, setSelectedState] = useState("")

  const handleSearch = () => {
    console.log("[v0] Searching for:", searchQuery, "in state:", selectedState)
    // Navigate to browse page with search parameters
    window.location.href = `/dashboard/farmer/browse?search=${encodeURIComponent(searchQuery)}&state=${encodeURIComponent(selectedState)}`
  }

  return (
    <DashboardLayout title="Farmer Dashboard" navigation={navigation}>
      <div className="space-y-6">
        {/* Welcome Section */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Find Your Perfect Land</h1>
          <p className="text-muted-foreground">
            Discover agricultural opportunities across India that match your farming goals.
          </p>
        </div>

        {/* Quick Search */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Land Search</CardTitle>
            <CardDescription>Find properties that match your needs across India</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Search by location, crop type, or keywords..."
                  className="w-full"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="w-full md:w-48">
                <Select value={selectedState} onValueChange={setSelectedState}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select State" />
                  </SelectTrigger>
                  <SelectContent>
                    {indianStates.map((state) => (
                      <SelectItem key={state} value={state}>
                        {state}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-2">
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
                <Button onClick={handleSearch}>
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Applications</CardTitle>
              <User className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">2 pending review</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Saved Properties</CardTitle>
              <Heart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">+3 this week</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">New Matches</CardTitle>
              <Sparkles className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">AI-recommended</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Messages</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5</div>
              <p className="text-xs text-muted-foreground">2 unread</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* AI Recommendations */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="flex items-center">
                  <Sparkles className="h-5 w-5 text-primary mr-2" />
                  AI Recommendations
                </CardTitle>
                <CardDescription>Properties matched to your farming preferences</CardDescription>
              </div>
              <Link href="/dashboard/farmer/browse">
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <div className="flex items-start space-x-4 mb-3">
                    <div className="relative w-20 h-20 rounded-lg overflow-hidden">
                      <Image src="/organic-vegetable-farm-with-green-crops-in-kerala-.jpg" alt="Organic farm" fill className="object-cover" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-medium">Organic Spice Farm - 30 acres</h4>
                          <div className="flex items-center text-sm text-muted-foreground mt-1">
                            <MapPin className="h-3 w-3 mr-1" />
                            Kochi, Kerala
                          </div>
                        </div>
                        <Badge className="bg-primary/10 text-primary border-primary/20">98% Match</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Badge variant="secondary">Organic Certified</Badge>
                          <Badge variant="outline">Spices</Badge>
                        </div>
                        <div className="text-right">
                          <p className="font-medium flex items-center">
                            <IndianRupee className="h-3 w-3 mr-1" />
                            55,000/month
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Perfect for organic spice cultivation with excellent soil quality and monsoon irrigation.
                  </p>
                  <div className="flex space-x-2">
                    <Button size="sm">Apply Now</Button>
                    <Button size="sm" variant="outline">
                      <Heart className="h-3 w-3 mr-1" />
                      Save
                    </Button>
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <div className="flex items-start space-x-4 mb-3">
                    <div className="relative w-20 h-20 rounded-lg overflow-hidden">
                      <Image src="/cotton-fields-with-white-cotton-plants-in-gujarat-.jpg" alt="Cotton farm" fill className="object-cover" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <h4 className="font-medium">Premium Cotton Farm - 40 acres</h4>
                          <div className="flex items-center text-sm text-muted-foreground mt-1">
                            <MapPin className="h-3 w-3 mr-1" />
                            Ahmedabad, Gujarat
                          </div>
                        </div>
                        <Badge className="bg-primary/10 text-primary border-primary/20">92% Match</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Badge variant="secondary">Cotton</Badge>
                          <Badge variant="outline">Equipment Included</Badge>
                        </div>
                        <div className="text-right">
                          <p className="font-medium flex items-center">
                            <IndianRupee className="h-3 w-3 mr-1" />
                            48,000/month
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    Established cotton farm with modern irrigation system and processing equipment.
                  </p>
                  <div className="flex space-x-2">
                    <Button size="sm">Apply Now</Button>
                    <Button size="sm" variant="outline">
                      <Heart className="h-3 w-3 mr-1" />
                      Save
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your latest applications and interactions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-4 p-3 border rounded-lg">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Application submitted</p>
                    <p className="text-xs text-muted-foreground">Golden Rice Fields - 25 acres</p>
                  </div>
                  <div className="text-xs text-muted-foreground">2 hours ago</div>
                </div>

                <div className="flex items-center space-x-4 p-3 border rounded-lg">
                  <div className="w-2 h-2 bg-secondary rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">New message received</p>
                    <p className="text-xs text-muted-foreground">From Rajesh Kumar (Landowner)</p>
                  </div>
                  <div className="text-xs text-muted-foreground">5 hours ago</div>
                </div>

                <div className="flex items-center space-x-4 p-3 border rounded-lg">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Property saved</p>
                    <p className="text-xs text-muted-foreground">Himalayan Tea Garden - 60 acres</p>
                  </div>
                  <div className="text-xs text-muted-foreground">1 day ago</div>
                </div>

                <div className="flex items-center space-x-4 p-3 border rounded-lg">
                  <div className="w-2 h-2 bg-muted-foreground rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Application approved</p>
                    <p className="text-xs text-muted-foreground">Alphonso Mango Orchard - 15 acres</p>
                  </div>
                  <div className="text-xs text-muted-foreground">3 days ago</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* AI Crop Suggestions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Sparkles className="h-5 w-5 text-primary mr-2" />
              AI Crop Suggestions for India
            </CardTitle>
            <CardDescription>
              Personalized crop recommendations based on Indian market trends and climate
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">Basmati Rice</h4>
                  <Badge variant="secondary">High Export Demand</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Premium variety with excellent export potential. Current market price: ₹45/kg
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-primary">ROI: 165%</span>
                  <Button size="sm" variant="outline">
                    Learn More
                  </Button>
                </div>
              </div>

              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">Turmeric</h4>
                  <Badge variant="secondary">Medicinal Demand</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  Growing demand for organic turmeric. Excellent for Indian climate conditions.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-primary">ROI: 190%</span>
                  <Button size="sm" variant="outline">
                    Learn More
                  </Button>
                </div>
              </div>

              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium">Quinoa</h4>
                  <Badge variant="secondary">Superfood Trend</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-3">
                  High-value crop with growing health-conscious market. Drought-resistant variety.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-primary">ROI: 240%</span>
                  <Button size="sm" variant="outline">
                    Learn More
                  </Button>
                </div>
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
              <Link href="/dashboard/farmer/browse">
                <Button variant="outline" className="h-20 flex flex-col space-y-2 bg-transparent">
                  <Search className="h-6 w-6" />
                  <span className="text-sm">Browse Land</span>
                </Button>
              </Link>

              <Link href="/dashboard/farmer/applications">
                <Button variant="outline" className="h-20 flex flex-col space-y-2 bg-transparent">
                  <User className="h-6 w-6" />
                  <span className="text-sm">My Applications</span>
                </Button>
              </Link>

              <Link href="/dashboard/farmer/saved">
                <Button variant="outline" className="h-20 flex flex-col space-y-2 bg-transparent">
                  <Heart className="h-6 w-6" />
                  <span className="text-sm">Saved Properties</span>
                </Button>
              </Link>

              <Link href="/dashboard/farmer/messages">
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
