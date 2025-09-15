"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Sparkles, Loader2, TrendingUp, DollarSign, Calendar } from "lucide-react"
import { generateCropSuggestions, type CropSuggestion } from "@/lib/ai-services"

interface CropSuggestionsProps {
  location: string
  soilType: string
  acreage: number
  experience: string
}

export function CropSuggestions({ location, soilType, acreage, experience }: CropSuggestionsProps) {
  const [suggestions, setSuggestions] = useState<CropSuggestion[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const loadSuggestions = async () => {
    setLoading(true)
    setError("")

    try {
      const results = await generateCropSuggestions(location, soilType, acreage, experience)
      setSuggestions(results)
    } catch (error: any) {
      setError(error.message || "Failed to generate crop suggestions")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (location && soilType) {
      loadSuggestions()
    }
  }, [location, soilType, acreage, experience])

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Sparkles className="h-5 w-5 text-primary mr-2" />
            AI Crop Suggestions
          </CardTitle>
          <CardDescription>Analyzing optimal crops for your conditions...</CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center py-8">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-4" />
            <p className="text-muted-foreground">Generating personalized recommendations...</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Sparkles className="h-5 w-5 text-primary mr-2" />
            AI Crop Suggestions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-destructive mb-4">{error}</p>
            <Button onClick={loadSuggestions}>Try Again</Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <Sparkles className="h-5 w-5 text-primary mr-2" />
          AI Crop Suggestions
        </CardTitle>
        <CardDescription>Personalized crop recommendations based on your location and conditions</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {suggestions.map((suggestion, index) => (
            <div key={index} className="border rounded-lg p-4">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h4 className="font-medium text-lg">{suggestion.name}</h4>
                  <div className="flex items-center space-x-4 mt-1">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="h-3 w-3 mr-1" />
                      {suggestion.season}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <DollarSign className="h-3 w-3 mr-1" />
                      {suggestion.marketPrice}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <Badge className="bg-primary/10 text-primary border-primary/20 mb-2">
                    {suggestion.suitability}% Match
                  </Badge>
                  <div className="flex items-center text-sm font-medium text-green-600">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    {suggestion.roi}% ROI
                  </div>
                </div>
              </div>

              <div className="mb-3">
                <div className="flex items-center justify-between text-sm mb-1">
                  <span>Suitability Score</span>
                  <span>{suggestion.suitability}%</span>
                </div>
                <Progress value={suggestion.suitability} className="h-2" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <h5 className="font-medium text-sm mb-2">Expected Yield</h5>
                  <p className="text-sm text-muted-foreground">{suggestion.expectedYield}</p>
                </div>
                <div>
                  <h5 className="font-medium text-sm mb-2">Market Price</h5>
                  <p className="text-sm text-muted-foreground">{suggestion.marketPrice}</p>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <h5 className="font-medium text-sm mb-2">Requirements</h5>
                  <div className="flex flex-wrap gap-1">
                    {suggestion.requirements.map((req, reqIndex) => (
                      <Badge key={reqIndex} variant="outline" className="text-xs">
                        {req}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h5 className="font-medium text-sm mb-2">Benefits</h5>
                  <div className="flex flex-wrap gap-1">
                    {suggestion.benefits.map((benefit, benefitIndex) => (
                      <Badge key={benefitIndex} variant="secondary" className="text-xs">
                        {benefit}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex space-x-2 mt-4">
                <Button size="sm">Learn More</Button>
                <Button size="sm" variant="outline">
                  Save Suggestion
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 text-center">
          <Button variant="outline" onClick={loadSuggestions}>
            <Sparkles className="mr-2 h-4 w-4" />
            Refresh Suggestions
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
