"use client"

import { useState, useEffect } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Label } from "@/components/ui/label"
import { Home, Search, Heart, MessageSquare, User, MapPin, IndianRupee, Sparkles, Eye } from "lucide-react"
import Image from "next/image"
import { LocationAutocomplete } from "@/components/location-autocomplete"
import { AdvancedFilters } from "@/components/advanced-filters"
import { useAuth } from "@/lib/auth-context"
import { addDoc, collection, deleteDoc, doc, onSnapshot, query, where, serverTimestamp } from "firebase/firestore"
import { db } from "@/lib/firebase"

const navigation = [
  { name: "Overview", href: "/dashboard/farmer", icon: Home },
  { name: "Browse Land", href: "/dashboard/farmer/browse", icon: Search, current: true },
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

// Enhanced property data with additional fields for advanced filtering
const allProperties = [
  {
    id: 1,
    title: "Organic Spice Farm - 30 acres",
    location: "Kochi, Kerala",
    state: "Kerala",
    price: 55000,
    acreage: 30,
    type: "Cropland",
    features: ["Organic Certified", "Spice Cultivation", "Water Access"],
    description:
      "Premium organic spice farm with cardamom, pepper, and cinnamon cultivation. Excellent monsoon irrigation.",
    match: 98,
    views: 45,
    saved: false,
    organicCertified: true,
    equipmentIncluded: false,
    soilType: ["Red Soil", "Laterite"],
    irrigationType: ["Rain Fed", "Drip Irrigation"],
    cropHistory: ["Spices", "Coffee"],
    waterSource: ["River", "Rain Water Harvesting"],
    elevation: 150,
    roadAccess: "paved",
    electricityAvailable: true,
    storageAvailable: false,
    processingFacility: true,
    contractFarming: false,
    image: "/placeholder.svg?height=200&width=300&text=Spice+Farm+Kerala",
  },
  {
    id: 2,
    title: "Premium Cotton Farm - 40 acres",
    location: "Ahmedabad, Gujarat",
    state: "Gujarat",
    price: 48000,
    acreage: 40,
    type: "Cropland",
    features: ["Cotton", "Equipment Included", "Drip Irrigation"],
    description: "Established cotton farm with modern irrigation system and processing equipment.",
    match: 92,
    views: 32,
    saved: true,
    organicCertified: false,
    equipmentIncluded: true,
    soilType: ["Black Cotton"],
    irrigationType: ["Drip Irrigation", "Tube Well"],
    cropHistory: ["Cotton", "Wheat"],
    waterSource: ["Tube Well", "Canal"],
    elevation: 50,
    roadAccess: "highway",
    electricityAvailable: true,
    storageAvailable: true,
    processingFacility: false,
    contractFarming: true,
    image: "/placeholder.svg?height=200&width=300&text=Cotton+Farm+Gujarat",
  },
  {
    id: 3,
    title: "Basmati Rice Fields - 25 acres",
    location: "Ludhiana, Punjab",
    state: "Punjab",
    price: 45000,
    acreage: 25,
    type: "Cropland",
    features: ["Basmati Rice", "Export Quality", "Canal Irrigation"],
    description: "Premium basmati rice cultivation land with excellent export potential and canal irrigation.",
    match: 87,
    views: 28,
    saved: false,
    organicCertified: false,
    equipmentIncluded: false,
    soilType: ["Alluvial"],
    irrigationType: ["Canal Irrigation"],
    cropHistory: ["Rice"],
    waterSource: ["Canal"],
    elevation: 200,
    roadAccess: "paved",
    electricityAvailable: true,
    storageAvailable: true,
    processingFacility: true,
    contractFarming: true,
    image: "/placeholder.svg?height=200&width=300&text=Rice+Fields+Punjab",
  },
  {
    id: 4,
    title: "Alphonso Mango Orchard - 15 acres",
    location: "Ratnagiri, Maharashtra",
    state: "Maharashtra",
    price: 35000,
    acreage: 15,
    type: "Orchard",
    features: ["Alphonso Mango", "Premium Location", "Processing Unit"],
    description: "World-famous Alphonso mango orchard with established trees and processing facility.",
    match: 78,
    views: 67,
    saved: false,
    organicCertified: false,
    equipmentIncluded: true,
    soilType: ["Red Soil"],
    irrigationType: ["Rain Fed"],
    cropHistory: ["Mango"],
    waterSource: ["River"],
    elevation: 100,
    roadAccess: "paved",
    electricityAvailable: true,
    storageAvailable: false,
    processingFacility: true,
    contractFarming: false,
    image: "/placeholder.svg?height=200&width=300&text=Mango+Orchard+Maharashtra",
  },
  {
    id: 5,
    title: "Tea Garden Estate - 60 acres",
    location: "Darjeeling, West Bengal",
    state: "West Bengal",
    price: 75000,
    acreage: 60,
    type: "Plantation",
    features: ["Tea Cultivation", "High Altitude", "Organic Certified"],
    description: "Premium tea garden at high altitude with organic certification and established processing.",
    match: 85,
    views: 41,
    saved: false,
    organicCertified: true,
    equipmentIncluded: true,
    soilType: ["Laterite"],
    irrigationType: ["Rain Fed"],
    cropHistory: ["Tea"],
    waterSource: ["River"],
    elevation: 2000,
    roadAccess: "highway",
    electricityAvailable: true,
    storageAvailable: true,
    processingFacility: true,
    contractFarming: true,
    image: "/placeholder.svg?height=200&width=300&text=Tea+Garden+Darjeeling",
  },
  {
    id: 6,
    title: "Wheat Farm - 50 acres",
    location: "Karnal, Haryana",
    state: "Haryana",
    price: 60000,
    acreage: 50,
    type: "Cropland",
    features: ["Wheat Cultivation", "Tube Well", "Storage Facility"],
    description: "Premium wheat cultivation land with tube well irrigation and on-site storage facility.",
    match: 90,
    views: 35,
    saved: false,
    organicCertified: false,
    equipmentIncluded: true,
    soilType: ["Black Soil"],
    irrigationType: ["Tube Well"],
    cropHistory: ["Wheat"],
    waterSource: ["Tube Well"],
    elevation: 100,
    roadAccess: "paved",
    electricityAvailable: true,
    storageAvailable: true,
    processingFacility: false,
    contractFarming: true,
    image: "/placeholder.svg?height=200&width=300&text=Wheat+Farm+Haryana",
  },
  {
    id: 7,
    title: "Sugarcane Farm - 35 acres",
    location: "Pune, Maharashtra",
    state: "Maharashtra",
    price: 52000,
    acreage: 35,
    type: "Cropland",
    features: ["Sugarcane", "Drip Irrigation", "Mill Contract"],
    description: "Established sugarcane farm with drip irrigation and guaranteed mill contract.",
    match: 82,
    views: 29,
    saved: false,
    organicCertified: false,
    equipmentIncluded: false,
    soilType: ["Black Soil"],
    irrigationType: ["Drip Irrigation"],
    cropHistory: ["Sugarcane"],
    waterSource: ["Tube Well"],
    elevation: 50,
    roadAccess: "paved",
    electricityAvailable: true,
    storageAvailable: false,
    processingFacility: false,
    contractFarming: false,
    image: "/placeholder.svg?height=200&width=300&text=Sugarcane+Farm+Maharashtra",
  },
  {
    id: 8,
    title: "Coconut Plantation - 20 acres",
    location: "Coimbatore, Tamil Nadu",
    state: "Tamil Nadu",
    price: 38000,
    acreage: 20,
    type: "Plantation",
    features: ["Coconut Trees", "Intercropping", "Water Source"],
    description: "Mature coconut plantation with intercropping potential and reliable water source.",
    match: 88,
    views: 33,
    saved: true,
    organicCertified: false,
    equipmentIncluded: false,
    soilType: ["Laterite"],
    irrigationType: ["Rain Fed"],
    cropHistory: ["Coconut"],
    waterSource: ["River"],
    elevation: 500,
    roadAccess: "highway",
    electricityAvailable: true,
    storageAvailable: false,
    processingFacility: false,
    contractFarming: false,
    image: "/placeholder.svg?height=200&width=300&text=Coconut+Plantation+Tamil+Nadu",
  },
]

export default function BrowseLandPage() {
  const { user, isEmailVerified } = useAuth()
  const [savedIds, setSavedIds] = useState<Set<number>>(new Set())
  const [searchQuery, setSearchQuery] = useState("")
  const [locationQuery, setLocationQuery] = useState("")
  const [priceRange, setPriceRange] = useState([0, 100000])
  const [acreageRange, setAcreageRange] = useState([0, 100])
  const [propertyType, setPropertyType] = useState("any")
  const [selectedState, setSelectedState] = useState("any")
  const [filteredProperties, setFilteredProperties] = useState(allProperties)
  const [sortBy, setSortBy] = useState("match")
  const [advancedFilters, setAdvancedFilters] = useState({
    soilType: [],
    irrigationType: [],
    cropHistory: [],
    organicCertified: false,
    equipmentIncluded: false,
    waterSource: [],
    elevation: [0, 3000],
    roadAccess: "any",
    electricityAvailable: false,
    storageAvailable: false,
    processingFacility: false,
    contractFarming: false,
  })

  useEffect(() => {
    if (!user) {
      setSavedIds(new Set())
      return
    }
    const q = query(collection(db, "saved"), where("userId", "==", user.uid))
    const unsub = onSnapshot(q, (snap) => {
      const ids = new Set<number>()
      snap.forEach((d) => {
        const pid = d.data()?.propertyId
        if (typeof pid === "number") ids.add(pid)
        else if (typeof pid === "string" && !Number.isNaN(Number(pid))) ids.add(Number(pid))
      })
      setSavedIds(ids)
    })
    return () => unsub()
  }, [user])

  useEffect(() => {
    let filtered = allProperties.filter((property) => {
      const matchesSearch =
        searchQuery === "" ||
        property.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        property.features.some((feature) => feature.toLowerCase().includes(searchQuery.toLowerCase()))

      const matchesLocation =
        locationQuery === "" || property.location.toLowerCase().includes(locationQuery.toLowerCase())

      const matchesPrice = property.price >= priceRange[0] && property.price <= priceRange[1]
      const matchesAcreage = property.acreage >= acreageRange[0] && property.acreage <= acreageRange[1]
      const matchesType = propertyType === "any" || property.type.toLowerCase() === propertyType.toLowerCase()
      const matchesState = selectedState === "any" || property.state === selectedState

      const matchesSoilType =
        advancedFilters.soilType.length === 0 ||
        advancedFilters.soilType.some((soil) => property.soilType?.includes(soil))

      const matchesIrrigation =
        advancedFilters.irrigationType.length === 0 ||
        advancedFilters.irrigationType.some((irrigation) => property.irrigationType?.includes(irrigation))

      const matchesCropHistory =
        advancedFilters.cropHistory.length === 0 ||
        advancedFilters.cropHistory.some((crop) => property.cropHistory?.includes(crop))

      const matchesWaterSource =
        advancedFilters.waterSource.length === 0 ||
        advancedFilters.waterSource.some((source) => property.waterSource?.includes(source))

      const matchesElevation =
        property.elevation >= advancedFilters.elevation[0] && property.elevation <= advancedFilters.elevation[1]

      const matchesRoadAccess =
        advancedFilters.roadAccess === "any" || property.roadAccess === advancedFilters.roadAccess

      const matchesOrganic = !advancedFilters.organicCertified || property.organicCertified
      const matchesEquipment = !advancedFilters.equipmentIncluded || property.equipmentIncluded
      const matchesElectricity = !advancedFilters.electricityAvailable || property.electricityAvailable
      const matchesStorage = !advancedFilters.storageAvailable || property.storageAvailable
      const matchesProcessing = !advancedFilters.processingFacility || property.processingFacility
      const matchesContract = !advancedFilters.contractFarming || property.contractFarming

      return (
        matchesSearch &&
        matchesLocation &&
        matchesPrice &&
        matchesAcreage &&
        matchesType &&
        matchesState &&
        matchesSoilType &&
        matchesIrrigation &&
        matchesCropHistory &&
        matchesWaterSource &&
        matchesElevation &&
        matchesRoadAccess &&
        matchesOrganic &&
        matchesEquipment &&
        matchesElectricity &&
        matchesStorage &&
        matchesProcessing &&
        matchesContract
      )
    })

    if (sortBy === "match") {
      filtered = filtered.sort((a, b) => b.match - a.match)
    } else if (sortBy === "price-low") {
      filtered = filtered.sort((a, b) => a.price - b.price)
    } else if (sortBy === "price-high") {
      filtered = filtered.sort((a, b) => b.price - a.price)
    } else if (sortBy === "acreage") {
      filtered = filtered.sort((a, b) => b.acreage - a.acreage)
    }

    setFilteredProperties(filtered)
  }, [searchQuery, locationQuery, priceRange, acreageRange, propertyType, selectedState, sortBy, advancedFilters])

  const clearAdvancedFilters = () => {
    setAdvancedFilters({
      soilType: [],
      irrigationType: [],
      cropHistory: [],
      organicCertified: false,
      equipmentIncluded: false,
      waterSource: [],
      elevation: [0, 3000],
      roadAccess: "any",
      electricityAvailable: false,
      storageAvailable: false,
      processingFacility: false,
      contractFarming: false,
    })
  }

  const handleApply = async (propertyId: number) => {
    if (!user) {
      alert("Please sign in to apply.")
      return
    }
    if (!isEmailVerified) {
      alert("Please verify your email before applying.")
      return
    }
    try {
      await addDoc(collection(db, "applications"), {
        propertyId,
        applicantId: user.uid,
        status: "pending",
        message: "",
        createdAt: serverTimestamp(),
      })
      alert("Application submitted successfully! The landowner will be notified.")
    } catch (e) {
      console.error("[v0] Failed to submit application:", e)
      alert("Failed to submit application. Please try again.")
    }
  }

  const handleSave = async (propertyId: number) => {
    if (!user) {
      alert("Please sign in to save properties.")
      return
    }
    if (!isEmailVerified) {
      alert("Please verify your email before saving properties.")
      return
    }
    const alreadySaved = savedIds.has(propertyId)
    try {
      if (alreadySaved) {
        // delete any saved doc with this propertyId and userId
        const q = query(collection(db, "saved"), where("userId", "==", user.uid), where("propertyId", "==", propertyId))
        const unsub = onSnapshot(q, async (snap) => {
          // one-shot delete; immediately unsubscribe
          unsub()
          const batchDeletes = snap.docs.map((d) => deleteDoc(doc(db, "saved", d.id)))
          await Promise.all(batchDeletes)
        })
      } else {
        await addDoc(collection(db, "saved"), {
          userId: user.uid,
          propertyId,
          createdAt: serverTimestamp(),
        })
      }
    } catch (e) {
      console.error("[v0] Failed to toggle save:", e)
      alert("Failed to update saved property. Please try again.")
    }
  }

  const handleViewDetails = (propertyId: number) => {
    console.log("[v0] Viewing property details:", propertyId)
    window.location.href = `/dashboard/farmer/property/${propertyId}`
  }

  return (
    <DashboardLayout title="Farmer Dashboard" navigation={navigation}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Browse Agricultural Land in India</h1>
          <p className="text-muted-foreground">Find the perfect property for your farming operation across India.</p>
        </div>

        {/* Basic Search and Filters */}
        <Card>
          <CardHeader>
            <CardTitle>Search & Basic Filters</CardTitle>
            <CardDescription>Start with basic search criteria</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Search by crop type, features, or keywords..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex-1">
                <LocationAutocomplete
                  value={locationQuery}
                  onChange={setLocationQuery}
                  placeholder="Search by city or location..."
                />
              </div>
              <Button>
                <Search className="h-4 w-4 mr-2" />
                Search ({filteredProperties.length} results)
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="space-y-2">
                <Label>State</Label>
                <Select value={selectedState} onValueChange={setSelectedState}>
                  <SelectTrigger>
                    <SelectValue placeholder="Any state" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any state</SelectItem>
                    {indianStates.map((state) => (
                      <SelectItem key={state} value={state}>
                        {state}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Property Type</Label>
                <Select value={propertyType} onValueChange={setPropertyType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Any type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any type</SelectItem>
                    <SelectItem value="cropland">Cropland</SelectItem>
                    <SelectItem value="orchard">Orchard</SelectItem>
                    <SelectItem value="plantation">Plantation</SelectItem>
                    <SelectItem value="pasture">Pasture</SelectItem>
                    <SelectItem value="mixed">Mixed Use</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>
                  Price Range: ₹{priceRange[0].toLocaleString()} - ₹{priceRange[1].toLocaleString()}/month
                </Label>
                <Slider value={priceRange} onValueChange={setPriceRange} max={100000} step={5000} className="w-full" />
              </div>

              <div className="space-y-2">
                <Label>
                  Acreage: {acreageRange[0]} - {acreageRange[1]} acres
                </Label>
                <Slider value={acreageRange} onValueChange={setAcreageRange} max={100} step={5} className="w-full" />
              </div>
            </div>
          </CardContent>
        </Card>

        <AdvancedFilters
          filters={advancedFilters}
          onFiltersChange={setAdvancedFilters}
          onClearFilters={clearAdvancedFilters}
        />

        {/* Results */}
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Available Properties ({filteredProperties.length})</h2>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">Sort by:</span>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="match">Best Match</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="acreage">Acreage</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {filteredProperties.length === 0 ? (
          <Card>
            <CardContent className="py-16 text-center">
              <Search className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">No properties found</h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                Sorry, we couldn't find any properties matching your search criteria. Try adjusting your filters or
                search terms.
              </p>
              <div className="flex justify-center space-x-3">
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery("")
                    setLocationQuery("")
                    setPropertyType("any")
                    setSelectedState("any")
                    setPriceRange([0, 100000])
                    setAcreageRange([0, 100])
                    clearAdvancedFilters()
                  }}
                >
                  Clear All Filters
                </Button>
                <Button onClick={() => setSearchQuery("")}>Browse All Properties</Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredProperties.map((property) => {
                const isSaved = savedIds.has(property.id)
                return (
                  <Card key={property.id} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4">
                          <div className="relative w-20 h-20 rounded-lg overflow-hidden">
                            <Image
                              src={property.image || "/placeholder.svg"}
                              alt={property.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <CardTitle className="text-lg">{property.title}</CardTitle>
                            <div className="flex items-center text-muted-foreground mt-1">
                              <MapPin className="h-4 w-4 mr-1" />
                              {property.location}
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-col items-end space-y-2">
                          <Badge className="bg-primary/10 text-primary border-primary/20">
                            <Sparkles className="h-3 w-3 mr-1" />
                            {property.match}% Match
                          </Badge>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Eye className="h-3 w-3 mr-1" />
                            {property.views} views
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center">
                              <IndianRupee className="h-4 w-4 text-muted-foreground mr-1" />
                              <span className="font-medium">₹{property.price.toLocaleString()}/month</span>
                            </div>
                            <div className="text-muted-foreground">
                              {property.acreage} acres • {property.type}
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2">
                          {property.features.map((feature) => (
                            <Badge key={feature} variant="secondary">
                              {feature}
                            </Badge>
                          ))}
                        </div>

                        <p className="text-sm text-muted-foreground">{property.description}</p>

                        <div className="flex space-x-2">
                          <Button className="flex-1" onClick={() => handleApply(property.id)}>
                            Apply Now
                          </Button>
                          <Button variant="outline" size="icon" onClick={() => handleSave(property.id)}>
                            <Heart className={`h-4 w-4 ${isSaved ? "fill-current text-red-500" : ""}`} />
                          </Button>
                          <Button variant="outline" onClick={() => handleViewDetails(property.id)}>
                            View Details
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            {/* Load More */}
            <div className="text-center">
              <Button variant="outline">Load More Properties</Button>
            </div>
          </>
        )}
      </div>
    </DashboardLayout>
  )
}
