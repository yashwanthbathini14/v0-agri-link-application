"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Home,
  Search,
  Heart,
  MessageSquare,
  User,
  MapPin,
  IndianRupee,
  Sparkles,
  Eye,
  Phone,
  Mail,
  Tractor,
  Droplets,
  Leaf,
} from "lucide-react"
import Image from "next/image"
import { CropSuggestions } from "@/components/crop-suggestions"

const navigation = [
  { name: "Overview", href: "/dashboard/farmer", icon: Home },
  { name: "Browse Land", href: "/dashboard/farmer/browse", icon: Search },
  { name: "My Applications", href: "/dashboard/farmer/applications", icon: User },
  { name: "Saved Properties", href: "/dashboard/farmer/saved", icon: Heart },
  { name: "Messages", href: "/dashboard/farmer/messages", icon: MessageSquare },
]

const propertyDetails = {
  id: 1,
  title: "Organic Spice Farm - 30 acres",
  location: "Kochi, Kerala",
  state: "Kerala",
  price: 55000,
  acreage: 30,
  type: "Cropland",
  features: ["Organic Certified", "Spice Cultivation", "Water Access", "Processing Unit"],
  description:
    "Premium organic spice farm with cardamom, pepper, and cinnamon cultivation. Excellent monsoon irrigation and established processing facility for value addition.",
  match: 98,
  views: 45,
  saved: false,
  organicCertified: true,
  equipmentIncluded: true,
  images: [
    "/placeholder.svg?height=400&width=600&text=Spice+Farm+Main+View",
    "/placeholder.svg?height=400&width=600&text=Cardamom+Plants",
    "/placeholder.svg?height=400&width=600&text=Processing+Unit",
    "/placeholder.svg?height=400&width=600&text=Irrigation+System",
  ],
  landowner: {
    name: "Rajesh Kumar",
    experience: "15 years in spice cultivation",
    phone: "+91 98765 43210",
    email: "rajesh.kumar@email.com",
    rating: 4.8,
    properties: 3,
  },
  specifications: {
    soilType: "Red laterite soil",
    waterSource: "Monsoon + Bore well",
    electricity: "3-phase connection available",
    roadAccess: "Paved road access",
    nearestTown: "5 km from Kochi",
    elevation: "150m above sea level",
  },
  currentCrops: ["Cardamom", "Black Pepper", "Cinnamon", "Nutmeg"],
  facilities: ["Processing shed", "Storage warehouse", "Worker quarters", "Equipment shed"],
}

export default function PropertyDetailsPage({ params }: { params: { id: string } }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [applicationMessage, setApplicationMessage] = useState("")
  const [applicantName, setApplicantName] = useState("")
  const [applicantExperience, setApplicantExperience] = useState("")
  const [showApplication, setShowApplication] = useState(false)

  const handleApply = () => {
    if (!applicantName || !applicationMessage) {
      alert("Please fill in all required fields")
      return
    }

    console.log("[v0] Submitting application:", {
      propertyId: params.id,
      applicantName,
      experience: applicantExperience,
      message: applicationMessage,
    })

    alert("Application submitted successfully! The landowner will be notified and will contact you soon.")
    setShowApplication(false)
  }

  const handleSave = () => {
    console.log("[v0] Saving property:", params.id)
    alert("Property saved to your favorites!")
  }

  const handleContact = () => {
    console.log("[v0] Contacting landowner")
    window.location.href = `tel:${propertyDetails.landowner.phone}`
  }

  return (
    <DashboardLayout title="Property Details" navigation={navigation}>
      <div className="space-y-6">
        {/* Property Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">{propertyDetails.title}</h1>
            <div className="flex items-center text-muted-foreground mt-2">
              <MapPin className="h-4 w-4 mr-1" />
              {propertyDetails.location}
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Badge className="bg-primary/10 text-primary border-primary/20">
              <Sparkles className="h-3 w-3 mr-1" />
              {propertyDetails.match}% Match
            </Badge>
            <div className="flex items-center text-sm text-muted-foreground">
              <Eye className="h-3 w-3 mr-1" />
              {propertyDetails.views} views
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Image Gallery */}
            <Card>
              <CardContent className="p-0">
                <div className="relative h-96 rounded-t-lg overflow-hidden">
                  <Image
                    src={propertyDetails.images[currentImageIndex] || "/placeholder.svg"}
                    alt={propertyDetails.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4">
                  <div className="flex space-x-2 overflow-x-auto">
                    {propertyDetails.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 ${
                          currentImageIndex === index ? "ring-2 ring-primary" : ""
                        }`}
                      >
                        <Image
                          src={image || "/placeholder.svg"}
                          alt={`View ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Property Details */}
            <Card>
              <CardHeader>
                <CardTitle>Property Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-4 border rounded-lg">
                    <div className="flex items-center justify-center mb-2">
                      <IndianRupee className="h-5 w-5 text-primary" />
                    </div>
                    <div className="font-medium">₹{propertyDetails.price.toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground">per month</div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="flex items-center justify-center mb-2">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div className="font-medium">{propertyDetails.acreage} acres</div>
                    <div className="text-sm text-muted-foreground">total area</div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="flex items-center justify-center mb-2">
                      <Leaf className="h-5 w-5 text-primary" />
                    </div>
                    <div className="font-medium">{propertyDetails.type}</div>
                    <div className="text-sm text-muted-foreground">property type</div>
                  </div>
                  <div className="text-center p-4 border rounded-lg">
                    <div className="flex items-center justify-center mb-2">
                      <Droplets className="h-5 w-5 text-primary" />
                    </div>
                    <div className="font-medium">Available</div>
                    <div className="text-sm text-muted-foreground">water access</div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3">Description</h4>
                  <p className="text-muted-foreground">{propertyDetails.description}</p>
                </div>

                <div>
                  <h4 className="font-medium mb-3">Features & Amenities</h4>
                  <div className="flex flex-wrap gap-2">
                    {propertyDetails.features.map((feature) => (
                      <Badge key={feature} variant="secondary">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-3">Current Crops</h4>
                    <div className="space-y-2">
                      {propertyDetails.currentCrops.map((crop) => (
                        <div key={crop} className="flex items-center space-x-2">
                          <Leaf className="h-4 w-4 text-green-600" />
                          <span className="text-sm">{crop}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium mb-3">Facilities</h4>
                    <div className="space-y-2">
                      {propertyDetails.facilities.map((facility) => (
                        <div key={facility} className="flex items-center space-x-2">
                          <Tractor className="h-4 w-4 text-blue-600" />
                          <span className="text-sm">{facility}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3">Specifications</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {Object.entries(propertyDetails.specifications).map(([key, value]) => (
                      <div key={key} className="flex justify-between">
                        <span className="text-sm text-muted-foreground capitalize">
                          {key.replace(/([A-Z])/g, " $1").trim()}:
                        </span>
                        <span className="text-sm font-medium">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* AI Crop Suggestions */}
            <CropSuggestions
              location={propertyDetails.location}
              soilType={propertyDetails.specifications.soilType}
              acreage={propertyDetails.acreage}
              experience="intermediate"
            />
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Action Buttons */}
            <Card>
              <CardContent className="p-6">
                <div className="space-y-3">
                  <Button className="w-full" size="lg" onClick={() => setShowApplication(true)}>
                    Apply for This Property
                  </Button>
                  <Button variant="outline" className="w-full bg-transparent" onClick={handleSave}>
                    <Heart className="h-4 w-4 mr-2" />
                    Save Property
                  </Button>
                  <Button variant="outline" className="w-full bg-transparent" onClick={handleContact}>
                    <Phone className="h-4 w-4 mr-2" />
                    Contact Owner
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Landowner Info */}
            <Card>
              <CardHeader>
                <CardTitle>Property Owner</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <User className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <div className="font-medium">{propertyDetails.landowner.name}</div>
                      <div className="text-sm text-muted-foreground">
                        ⭐ {propertyDetails.landowner.rating} • {propertyDetails.landowner.properties} properties
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{propertyDetails.landowner.experience}</p>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{propertyDetails.landowner.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{propertyDetails.landowner.email}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Application Modal */}
        {showApplication && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-md">
              <CardHeader>
                <CardTitle>Apply for Property</CardTitle>
                <CardDescription>Submit your application to the landowner</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="name">Your Name *</Label>
                  <Input
                    id="name"
                    value={applicantName}
                    onChange={(e) => setApplicantName(e.target.value)}
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <Label htmlFor="experience">Farming Experience</Label>
                  <Input
                    id="experience"
                    value={applicantExperience}
                    onChange={(e) => setApplicantExperience(e.target.value)}
                    placeholder="e.g., 5 years in organic farming"
                  />
                </div>
                <div>
                  <Label htmlFor="message">Application Message *</Label>
                  <Textarea
                    id="message"
                    value={applicationMessage}
                    onChange={(e) => setApplicationMessage(e.target.value)}
                    placeholder="Tell the landowner about your farming plans and why you're interested in this property..."
                    rows={4}
                  />
                </div>
                <div className="flex space-x-2">
                  <Button onClick={handleApply} className="flex-1">
                    Submit Application
                  </Button>
                  <Button variant="outline" onClick={() => setShowApplication(false)}>
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
