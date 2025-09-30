"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Home, MapPin, Users, MessageSquare, BarChart3, Plus, Eye, Edit, Trash2, MoreVertical } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const navigation = [
  { name: "Overview", href: "/dashboard/landowner", icon: Home },
  { name: "My Properties", href: "/dashboard/landowner/properties", icon: MapPin, current: true },
  { name: "Applications", href: "/dashboard/landowner/applications", icon: Users },
  { name: "Messages", href: "/dashboard/landowner/messages", icon: MessageSquare },
  { name: "Analytics", href: "/dashboard/landowner/analytics", icon: BarChart3 },
]

const mockProperties = [
  {
    id: "1",
    title: "Golden Rice Fields",
    size: "25 acres",
    location: "Ludhiana, Punjab",
    price: 45000,
    status: "available",
    cropType: "Rice Cultivation",
    views: 24,
    applications: 0,
    image: "/fertile-agricultural-land-with-rice-fields-in-punj.jpg",
    postedDate: "2 days ago",
  },
  {
    id: "2",
    title: "Alphonso Mango Orchard",
    size: "15 acres",
    location: "Ratnagiri, Maharashtra",
    price: 35000,
    status: "applications",
    cropType: "Mango Trees",
    views: 18,
    applications: 3,
    image: "/mango-orchard-with-fruit-trees-in-maharashtra-indi.jpg",
    postedDate: "1 week ago",
  },
  {
    id: "3",
    title: "Premium Wheat Farm",
    size: "50 acres",
    location: "Karnal, Haryana",
    price: 60000,
    status: "leased",
    cropType: "Wheat Cultivation",
    views: 31,
    applications: 8,
    image: "/wheat-fields-with-golden-crops-in-haryana-india.jpg",
    postedDate: "3 days ago",
  },
  {
    id: "4",
    title: "Organic Vegetable Farm",
    size: "20 acres",
    location: "Nashik, Maharashtra",
    price: 38000,
    status: "available",
    cropType: "Mixed Vegetables",
    views: 15,
    applications: 0,
    image: "/organic-vegetable-farm-with-green-crops-in-kerala-.jpg",
    postedDate: "5 days ago",
  },
  {
    id: "5",
    title: "Tea Garden Estate",
    size: "60 acres",
    location: "Darjeeling, West Bengal",
    price: 85000,
    status: "applications",
    cropType: "Tea Cultivation",
    views: 42,
    applications: 5,
    image: "/tea-garden-with-green-tea-plants-in-darjeeling-ind.jpg",
    postedDate: "1 week ago",
  },
  {
    id: "6",
    title: "Cotton Fields",
    size: "40 acres",
    location: "Ahmedabad, Gujarat",
    price: 48000,
    status: "available",
    cropType: "Cotton",
    views: 28,
    applications: 2,
    image: "/cotton-fields-with-white-cotton-plants-in-gujarat-.jpg",
    postedDate: "4 days ago",
  },
]

export default function LandownerPropertiesPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredProperties = mockProperties.filter((property) => {
    const matchesSearch =
      property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      property.cropType.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || property.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "available":
        return <Badge variant="outline">Available</Badge>
      case "applications":
        return <Badge variant="secondary">Has Applications</Badge>
      case "leased":
        return <Badge variant="destructive">Leased</Badge>
      default:
        return null
    }
  }

  return (
    <DashboardLayout title="My Properties" navigation={navigation}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">My Properties</h1>
            <p className="text-muted-foreground">Manage your agricultural land listings</p>
          </div>
          <Link href="/dashboard/landowner/properties/new">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Property
            </Button>
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Properties</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockProperties.length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Available</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockProperties.filter((p) => p.status === "available").length}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Views</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockProperties.reduce((sum, p) => sum + p.views, 0)}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{mockProperties.reduce((sum, p) => sum + p.applications, 0)}</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Search properties..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Filter by status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Properties</SelectItem>
                  <SelectItem value="available">Available</SelectItem>
                  <SelectItem value="applications">Has Applications</SelectItem>
                  <SelectItem value="leased">Leased</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Properties List */}
        <div className="grid grid-cols-1 gap-4">
          {filteredProperties.map((property) => (
            <Card key={property.id}>
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="relative w-32 h-32 rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={property.image || "/placeholder.svg"}
                      alt={property.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-xl font-semibold">{property.title}</h3>
                        <div className="flex items-center text-muted-foreground mt-1">
                          <MapPin className="h-4 w-4 mr-1" />
                          <span className="text-sm">{property.location}</span>
                          <span className="mx-2">•</span>
                          <span className="text-sm">{property.size}</span>
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <div className="flex items-center space-x-2 mb-3">
                      <Badge variant="secondary">{property.cropType}</Badge>
                      {getStatusBadge(property.status)}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <Eye className="h-4 w-4 mr-1" />
                          {property.views} views
                        </div>
                        <div className="flex items-center">
                          <Users className="h-4 w-4 mr-1" />
                          {property.applications} applications
                        </div>
                        <span>Posted {property.postedDate}</span>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <p className="text-2xl font-bold">₹{property.price.toLocaleString()}</p>
                          <p className="text-sm text-muted-foreground">per month</p>
                        </div>
                        <Link href={`/dashboard/landowner/properties/${property.id}`}>
                          <Button>View Details</Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProperties.length === 0 && (
          <Card>
            <CardContent className="py-12 text-center">
              <MapPin className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No properties found</h3>
              <p className="text-muted-foreground mb-4">
                {searchQuery || statusFilter !== "all"
                  ? "Try adjusting your filters"
                  : "Get started by adding your first property"}
              </p>
              {!searchQuery && statusFilter === "all" && (
                <Link href="/dashboard/landowner/properties/new">
                  <Button>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Property
                  </Button>
                </Link>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  )
}
