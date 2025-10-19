"use client"

import type React from "react"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Home, MapPin, Users, MessageSquare, BarChart3, Sparkles } from "lucide-react"
import { useRouter } from "next/navigation"
import { FlowerLoader } from "@/components/flower-loader"
import { useAuth } from "@/lib/auth-context"
import { addDoc, collection, serverTimestamp } from "firebase/firestore"
import { db } from "@/lib/firebase"

const navigation = [
  { name: "Overview", href: "/dashboard/landowner", icon: Home },
  { name: "My Properties", href: "/dashboard/landowner/properties", icon: MapPin, current: true },
  { name: "Applications", href: "/dashboard/landowner/applications", icon: Users },
  { name: "Messages", href: "/dashboard/landowner/messages", icon: MessageSquare },
  { name: "Analytics", href: "/dashboard/landowner/analytics", icon: BarChart3 },
]

export default function NewPropertyPage() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    acreage: "",
    pricePerMonth: "",
    propertyType: "",
    soilType: "",
    waterAccess: false,
    organicCertified: false,
    equipmentIncluded: false,
    housingAvailable: false,
  })
  const [loading, setLoading] = useState(false)
  const [aiGenerating, setAiGenerating] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()
  const { user, isEmailVerified } = useAuth()

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const generateAIDescription = async () => {
    if (!formData.title || !formData.location || !formData.acreage) {
      setError("Please fill in title, location, and acreage before generating AI description")
      return
    }

    setAiGenerating(true)
    setError("")

    // Simulate AI generation (replace with actual AI integration)
    setTimeout(() => {
      const aiDescription = `Beautiful ${formData.acreage}-acre ${formData.propertyType || "agricultural"} property located in ${formData.location}. This well-maintained land offers excellent potential for ${formData.propertyType === "cropland" ? "crop cultivation" : formData.propertyType === "pasture" ? "livestock grazing" : "various agricultural activities"}. The property features ${formData.soilType ? `${formData.soilType} soil` : "fertile soil"} and ${formData.waterAccess ? "reliable water access" : "potential for water development"}. ${formData.organicCertified ? "Certified organic land perfect for sustainable farming practices." : ""} ${formData.equipmentIncluded ? "Farm equipment included to help you get started immediately." : ""} ${formData.housingAvailable ? "On-site housing available for convenience." : ""} Ideal for experienced farmers or those looking to start their agricultural journey.`

      setFormData((prev) => ({ ...prev, description: aiDescription }))
      setAiGenerating(false)
    }, 2000)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!user) {
      setError("Please sign in to create a property listing")
      return
    }
    if (!isEmailVerified) {
      setError("Please verify your email before creating property listings")
      return
    }
    if (!formData.title || !formData.location || !formData.acreage || !formData.pricePerMonth) {
      setError("Please fill in all required fields")
      return
    }

    setLoading(true)
    setError("")

    try {
      await addDoc(collection(db, "properties"), {
        ownerId: user.uid,
        title: formData.title,
        description: formData.description,
        location: formData.location,
        acreage: Number(formData.acreage),
        price: Number(formData.pricePerMonth),
        type: formData.propertyType,
        soilType: formData.soilType,
        waterAccess: formData.waterAccess,
        organicCertified: formData.organicCertified,
        equipmentIncluded: formData.equipmentIncluded,
        housingAvailable: formData.housingAvailable,
        createdAt: serverTimestamp(),
        status: "active",
        views: 0,
      })
      router.push("/dashboard/landowner/properties")
    } catch (error: any) {
      console.error("[v0] Failed to create property:", error)
      setError(error.message || "Failed to create property listing")
    } finally {
      setLoading(false)
    }
  }

  return (
    <DashboardLayout title="Landowner Dashboard" navigation={navigation}>
      <div className="max-w-2xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Add New Property</h1>
          <p className="text-muted-foreground">Create a new property listing to connect with farmers and workers.</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Property Details</CardTitle>
            <CardDescription>Provide information about your agricultural property</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="title">Property Title</Label>
                <Input
                  id="title"
                  placeholder="e.g., Riverside Farm - 50 acres"
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    placeholder="City, State"
                    value={formData.location}
                    onChange={(e) => handleInputChange("location", e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="acreage">Acreage</Label>
                  <Input
                    id="acreage"
                    type="number"
                    placeholder="50"
                    value={formData.acreage}
                    onChange={(e) => handleInputChange("acreage", e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="propertyType">Property Type</Label>
                  <Select
                    value={formData.propertyType}
                    onValueChange={(value) => handleInputChange("propertyType", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select property type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cropland">Cropland</SelectItem>
                      <SelectItem value="pasture">Pasture/Grazing Land</SelectItem>
                      <SelectItem value="orchard">Orchard</SelectItem>
                      <SelectItem value="vineyard">Vineyard</SelectItem>
                      <SelectItem value="mixed">Mixed Use</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="soilType">Soil Type</Label>
                  <Select value={formData.soilType} onValueChange={(value) => handleInputChange("soilType", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select soil type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="clay">Clay</SelectItem>
                      <SelectItem value="loam">Loam</SelectItem>
                      <SelectItem value="sandy">Sandy</SelectItem>
                      <SelectItem value="silt">Silt</SelectItem>
                      <SelectItem value="mixed">Mixed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="pricePerMonth">Monthly Lease Price ($)</Label>
                <Input
                  id="pricePerMonth"
                  type="number"
                  placeholder="2500"
                  value={formData.pricePerMonth}
                  onChange={(e) => handleInputChange("pricePerMonth", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-4">
                <Label>Property Features</Label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="waterAccess"
                      checked={formData.waterAccess}
                      onCheckedChange={(checked) => handleInputChange("waterAccess", checked as boolean)}
                    />
                    <Label htmlFor="waterAccess">Water Access</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="organicCertified"
                      checked={formData.organicCertified}
                      onCheckedChange={(checked) => handleInputChange("organicCertified", checked as boolean)}
                    />
                    <Label htmlFor="organicCertified">Organic Certified</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="equipmentIncluded"
                      checked={formData.equipmentIncluded}
                      onCheckedChange={(checked) => handleInputChange("equipmentIncluded", checked as boolean)}
                    />
                    <Label htmlFor="equipmentIncluded">Equipment Included</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="housingAvailable"
                      checked={formData.housingAvailable}
                      onCheckedChange={(checked) => handleInputChange("housingAvailable", checked as boolean)}
                    />
                    <Label htmlFor="housingAvailable">Housing Available</Label>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="description">Property Description</Label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={generateAIDescription}
                    disabled={aiGenerating}
                  >
                    {aiGenerating ? (
                      <div className="mr-2 inline-block">
                        <FlowerLoader size="sm" />
                      </div>
                    ) : (
                      <Sparkles className="mr-2 h-4 w-4" />
                    )}
                    {aiGenerating ? "Generating..." : "Generate with AI"}
                  </Button>
                </div>
                <Textarea
                  id="description"
                  placeholder="Describe your property, its features, and what makes it special..."
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  rows={6}
                  required
                />
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="flex space-x-4">
                <Button type="submit" disabled={loading}>
                  {loading && (
                    <div className="mr-2 inline-block">
                      <FlowerLoader size="sm" />
                    </div>
                  )}
                  Create Property Listing
                </Button>
                <Button type="button" variant="outline" onClick={() => router.back()}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
