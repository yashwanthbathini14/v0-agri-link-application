"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { ChevronDown, ChevronUp, Filter, X } from "lucide-react"

interface AdvancedFiltersProps {
  filters: {
    soilType: string[]
    irrigationType: string[]
    cropHistory: string[]
    organicCertified: boolean
    equipmentIncluded: boolean
    waterSource: string[]
    elevation: number[]
    roadAccess: string
    electricityAvailable: boolean
    storageAvailable: boolean
    processingFacility: boolean
    contractFarming: boolean
  }
  onFiltersChange: (filters: any) => void
  onClearFilters: () => void
}

const soilTypes = ["Alluvial", "Black Cotton", "Red Soil", "Laterite", "Sandy", "Clay", "Loamy", "Saline"]

const irrigationTypes = [
  "Canal Irrigation",
  "Tube Well",
  "Drip Irrigation",
  "Sprinkler",
  "Rain Fed",
  "River Water",
  "Bore Well",
]

const cropHistoryOptions = [
  "Rice",
  "Wheat",
  "Cotton",
  "Sugarcane",
  "Tea",
  "Coffee",
  "Spices",
  "Fruits",
  "Vegetables",
  "Pulses",
  "Oilseeds",
  "Coconut",
  "Rubber",
  "Tobacco",
  "Jute",
  "Millets",
]

const waterSources = ["River", "Canal", "Tube Well", "Bore Well", "Pond", "Tank", "Rain Water Harvesting"]

const elevationRanges = [
  { label: "Sea Level (0-100m)", value: [0, 100] },
  { label: "Low Hills (100-500m)", value: [100, 500] },
  { label: "Medium Hills (500-1000m)", value: [500, 1000] },
  { label: "High Hills (1000m+)", value: [1000, 3000] },
]

export function AdvancedFilters({ filters, onFiltersChange, onClearFilters }: AdvancedFiltersProps) {
  const [isOpen, setIsOpen] = useState(false)

  const updateFilter = (key: string, value: any) => {
    onFiltersChange({ ...filters, [key]: value })
  }

  const toggleArrayFilter = (key: string, value: string) => {
    const currentArray = filters[key as keyof typeof filters] as string[]
    const newArray = currentArray.includes(value)
      ? currentArray.filter((item) => item !== value)
      : [...currentArray, value]
    updateFilter(key, newArray)
  }

  const getActiveFiltersCount = () => {
    let count = 0
    if (filters.soilType.length > 0) count++
    if (filters.irrigationType.length > 0) count++
    if (filters.cropHistory.length > 0) count++
    if (filters.waterSource.length > 0) count++
    if (filters.organicCertified) count++
    if (filters.equipmentIncluded) count++
    if (filters.electricityAvailable) count++
    if (filters.storageAvailable) count++
    if (filters.processingFacility) count++
    if (filters.contractFarming) count++
    if (filters.roadAccess !== "any") count++
    if (filters.elevation[0] !== 0 || filters.elevation[1] !== 3000) count++
    return count
  }

  const activeFiltersCount = getActiveFiltersCount()

  return (
    <Card>
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger asChild>
          <CardHeader className="cursor-pointer hover:bg-muted/50 transition-colors">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="h-5 w-5" />
                  Advanced Filters
                  {activeFiltersCount > 0 && (
                    <Badge variant="secondary" className="ml-2">
                      {activeFiltersCount} active
                    </Badge>
                  )}
                </CardTitle>
                <CardDescription>Refine your search with detailed agricultural criteria</CardDescription>
              </div>
              {isOpen ? <ChevronUp className="h-5 w-5" /> : <ChevronDown className="h-5 w-5" />}
            </div>
          </CardHeader>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <CardContent className="space-y-6">
            {/* Quick Actions */}
            <div className="flex justify-between items-center">
              <div className="flex flex-wrap gap-2">
                {activeFiltersCount > 0 && (
                  <>
                    {filters.soilType.map((soil) => (
                      <Badge key={soil} variant="outline" className="gap-1">
                        {soil}
                        <X className="h-3 w-3 cursor-pointer" onClick={() => toggleArrayFilter("soilType", soil)} />
                      </Badge>
                    ))}
                    {filters.irrigationType.map((irrigation) => (
                      <Badge key={irrigation} variant="outline" className="gap-1">
                        {irrigation}
                        <X
                          className="h-3 w-3 cursor-pointer"
                          onClick={() => toggleArrayFilter("irrigationType", irrigation)}
                        />
                      </Badge>
                    ))}
                  </>
                )}
              </div>
              {activeFiltersCount > 0 && (
                <Button variant="ghost" size="sm" onClick={onClearFilters}>
                  Clear All
                </Button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Soil Type */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">Soil Type</Label>
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {soilTypes.map((soil) => (
                    <div key={soil} className="flex items-center space-x-2">
                      <Checkbox
                        id={`soil-${soil}`}
                        checked={filters.soilType.includes(soil)}
                        onCheckedChange={() => toggleArrayFilter("soilType", soil)}
                      />
                      <Label htmlFor={`soil-${soil}`} className="text-sm">
                        {soil}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Irrigation Type */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">Irrigation System</Label>
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {irrigationTypes.map((irrigation) => (
                    <div key={irrigation} className="flex items-center space-x-2">
                      <Checkbox
                        id={`irrigation-${irrigation}`}
                        checked={filters.irrigationType.includes(irrigation)}
                        onCheckedChange={() => toggleArrayFilter("irrigationType", irrigation)}
                      />
                      <Label htmlFor={`irrigation-${irrigation}`} className="text-sm">
                        {irrigation}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Crop History */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">Previous Crops</Label>
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {cropHistoryOptions.map((crop) => (
                    <div key={crop} className="flex items-center space-x-2">
                      <Checkbox
                        id={`crop-${crop}`}
                        checked={filters.cropHistory.includes(crop)}
                        onCheckedChange={() => toggleArrayFilter("cropHistory", crop)}
                      />
                      <Label htmlFor={`crop-${crop}`} className="text-sm">
                        {crop}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Water Source */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">Water Source</Label>
                <div className="space-y-2">
                  {waterSources.map((source) => (
                    <div key={source} className="flex items-center space-x-2">
                      <Checkbox
                        id={`water-${source}`}
                        checked={filters.waterSource.includes(source)}
                        onCheckedChange={() => toggleArrayFilter("waterSource", source)}
                      />
                      <Label htmlFor={`water-${source}`} className="text-sm">
                        {source}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Elevation */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">
                  Elevation: {filters.elevation[0]}m - {filters.elevation[1]}m
                </Label>
                <Slider
                  value={filters.elevation}
                  onValueChange={(value) => updateFilter("elevation", value)}
                  max={3000}
                  step={50}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Sea Level</span>
                  <span>High Hills</span>
                </div>
              </div>

              {/* Road Access */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">Road Access</Label>
                <Select value={filters.roadAccess} onValueChange={(value) => updateFilter("roadAccess", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Any access" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any access</SelectItem>
                    <SelectItem value="paved">Paved Road</SelectItem>
                    <SelectItem value="gravel">Gravel Road</SelectItem>
                    <SelectItem value="dirt">Dirt Road</SelectItem>
                    <SelectItem value="highway">Highway Access</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Facility Features */}
            <div className="space-y-3">
              <Label className="text-sm font-medium">Facilities & Features</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="organic"
                    checked={filters.organicCertified}
                    onCheckedChange={(checked) => updateFilter("organicCertified", checked)}
                  />
                  <Label htmlFor="organic" className="text-sm">
                    Organic Certified
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="equipment"
                    checked={filters.equipmentIncluded}
                    onCheckedChange={(checked) => updateFilter("equipmentIncluded", checked)}
                  />
                  <Label htmlFor="equipment" className="text-sm">
                    Equipment Included
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="electricity"
                    checked={filters.electricityAvailable}
                    onCheckedChange={(checked) => updateFilter("electricityAvailable", checked)}
                  />
                  <Label htmlFor="electricity" className="text-sm">
                    Electricity Available
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="storage"
                    checked={filters.storageAvailable}
                    onCheckedChange={(checked) => updateFilter("storageAvailable", checked)}
                  />
                  <Label htmlFor="storage" className="text-sm">
                    Storage Facility
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="processing"
                    checked={filters.processingFacility}
                    onCheckedChange={(checked) => updateFilter("processingFacility", checked)}
                  />
                  <Label htmlFor="processing" className="text-sm">
                    Processing Unit
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="contract"
                    checked={filters.contractFarming}
                    onCheckedChange={(checked) => updateFilter("contractFarming", checked)}
                  />
                  <Label htmlFor="contract" className="text-sm">
                    Contract Farming
                  </Label>
                </div>
              </div>
            </div>
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  )
}
