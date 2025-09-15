"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { MapPin, X } from "lucide-react"
import { cn } from "@/lib/utils"

// Comprehensive list of Indian cities and towns
const indianCities = [
  // Major Cities
  "Mumbai, Maharashtra",
  "Delhi, Delhi",
  "Bangalore, Karnataka",
  "Hyderabad, Telangana",
  "Ahmedabad, Gujarat",
  "Chennai, Tamil Nadu",
  "Kolkata, West Bengal",
  "Surat, Gujarat",
  "Pune, Maharashtra",
  "Jaipur, Rajasthan",
  "Lucknow, Uttar Pradesh",
  "Kanpur, Uttar Pradesh",
  "Nagpur, Maharashtra",
  "Indore, Madhya Pradesh",
  "Thane, Maharashtra",
  "Bhopal, Madhya Pradesh",
  "Visakhapatnam, Andhra Pradesh",
  "Pimpri-Chinchwad, Maharashtra",
  "Patna, Bihar",
  "Vadodara, Gujarat",

  // Agricultural Centers
  "Ludhiana, Punjab",
  "Amritsar, Punjab",
  "Jalandhar, Punjab",
  "Bathinda, Punjab",
  "Karnal, Haryana",
  "Panipat, Haryana",
  "Rohtak, Haryana",
  "Hisar, Haryana",
  "Nashik, Maharashtra",
  "Aurangabad, Maharashtra",
  "Solapur, Maharashtra",
  "Sangli, Maharashtra",
  "Kochi, Kerala",
  "Kozhikode, Kerala",
  "Thrissur, Kerala",
  "Alappuzha, Kerala",
  "Coimbatore, Tamil Nadu",
  "Madurai, Tamil Nadu",
  "Salem, Tamil Nadu",
  "Tirupur, Tamil Nadu",
  "Rajkot, Gujarat",
  "Bhavnagar, Gujarat",
  "Junagadh, Gujarat",
  "Anand, Gujarat",
  "Mysore, Karnataka",
  "Hubli, Karnataka",
  "Belgaum, Karnataka",
  "Mangalore, Karnataka",

  // Tea & Spice Regions
  "Darjeeling, West Bengal",
  "Siliguri, West Bengal",
  "Jalpaiguri, West Bengal",
  "Munnar, Kerala",
  "Wayanad, Kerala",
  "Idukki, Kerala",
  "Ooty, Tamil Nadu",
  "Coonoor, Tamil Nadu",
  "Kodaikanal, Tamil Nadu",
  "Shimla, Himachal Pradesh",
  "Dharamshala, Himachal Pradesh",
  "Manali, Himachal Pradesh",

  // Cotton Belt
  "Nagpur, Maharashtra",
  "Akola, Maharashtra",
  "Amravati, Maharashtra",
  "Yavatmal, Maharashtra",
  "Guntur, Andhra Pradesh",
  "Kurnool, Andhra Pradesh",
  "Anantapur, Andhra Pradesh",
  "Raichur, Karnataka",
  "Gulbarga, Karnataka",
  "Bijapur, Karnataka",

  // Rice Regions
  "Thanjavur, Tamil Nadu",
  "Tiruvarur, Tamil Nadu",
  "Nagapattinam, Tamil Nadu",
  "Cuttack, Odisha",
  "Bhubaneswar, Odisha",
  "Sambalpur, Odisha",
  "Raipur, Chhattisgarh",
  "Bilaspur, Chhattisgarh",
  "Durg, Chhattisgarh",

  // Wheat Belt
  "Meerut, Uttar Pradesh",
  "Moradabad, Uttar Pradesh",
  "Saharanpur, Uttar Pradesh",
  "Muzaffarnagar, Uttar Pradesh",
  "Bareilly, Uttar Pradesh",
  "Aligarh, Uttar Pradesh",
  "Mathura, Uttar Pradesh",
  "Firozabad, Uttar Pradesh",
  "Agra, Uttar Pradesh",

  // Sugarcane Regions
  "Muzaffarnagar, Uttar Pradesh",
  "Meerut, Uttar Pradesh",
  "Bulandshahr, Uttar Pradesh",
  "Kolhapur, Maharashtra",
  "Satara, Maharashtra",
  "Ahmednagar, Maharashtra",

  // Fruit Belts
  "Ratnagiri, Maharashtra",
  "Sindhudurg, Maharashtra",
  "Thane, Maharashtra",
  "Shimoga, Karnataka",
  "Hassan, Karnataka",
  "Chikmagalur, Karnataka",
  "Himachal Pradesh, Himachal Pradesh",
  "Jammu, Jammu and Kashmir",
  "Srinagar, Jammu and Kashmir",

  // Other Important Agricultural Centers
  "Jodhpur, Rajasthan",
  "Udaipur, Rajasthan",
  "Kota, Rajasthan",
  "Ajmer, Rajasthan",
  "Gwalior, Madhya Pradesh",
  "Jabalpur, Madhya Pradesh",
  "Ujjain, Madhya Pradesh",
  "Ranchi, Jharkhand",
  "Jamshedpur, Jharkhand",
  "Dhanbad, Jharkhand",
  "Guwahati, Assam",
  "Dibrugarh, Assam",
  "Jorhat, Assam",
  "Silchar, Assam",
  "Imphal, Manipur",
  "Aizawl, Mizoram",
  "Shillong, Meghalaya",
  "Kohima, Nagaland",
  "Itanagar, Arunachal Pradesh",
  "Gangtok, Sikkim",
  "Agartala, Tripura",
]

interface LocationAutocompleteProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  className?: string
}

export function LocationAutocomplete({
  value,
  onChange,
  placeholder = "Search Indian cities...",
  className,
}: LocationAutocompleteProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [filteredCities, setFilteredCities] = useState<string[]>([])
  const [highlightedIndex, setHighlightedIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLUListElement>(null)

  useEffect(() => {
    if (value.length > 0) {
      const filtered = indianCities.filter((city) => city.toLowerCase().includes(value.toLowerCase())).slice(0, 10) // Limit to 10 results
      setFilteredCities(filtered)
      setIsOpen(filtered.length > 0)
    } else {
      setFilteredCities([])
      setIsOpen(false)
    }
    setHighlightedIndex(-1)
  }, [value])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value)
  }

  const handleCitySelect = (city: string) => {
    onChange(city)
    setIsOpen(false)
    setHighlightedIndex(-1)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) return

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault()
        setHighlightedIndex((prev) => (prev < filteredCities.length - 1 ? prev + 1 : prev))
        break
      case "ArrowUp":
        e.preventDefault()
        setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : prev))
        break
      case "Enter":
        e.preventDefault()
        if (highlightedIndex >= 0 && highlightedIndex < filteredCities.length) {
          handleCitySelect(filteredCities[highlightedIndex])
        }
        break
      case "Escape":
        setIsOpen(false)
        setHighlightedIndex(-1)
        break
    }
  }

  const clearInput = () => {
    onChange("")
    inputRef.current?.focus()
  }

  return (
    <div className="relative">
      <div className="relative">
        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          ref={inputRef}
          type="text"
          value={value}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => value.length > 0 && setIsOpen(true)}
          onBlur={() => setTimeout(() => setIsOpen(false), 200)}
          placeholder={placeholder}
          className={cn("pl-10 pr-10", className)}
        />
        {value && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
            onClick={clearInput}
          >
            <X className="h-3 w-3" />
          </Button>
        )}
      </div>

      {isOpen && filteredCities.length > 0 && (
        <ul
          ref={listRef}
          className="absolute z-50 w-full mt-1 bg-background border border-border rounded-md shadow-lg max-h-60 overflow-auto"
        >
          {filteredCities.map((city, index) => (
            <li
              key={city}
              className={cn(
                "px-3 py-2 cursor-pointer text-sm hover:bg-accent hover:text-accent-foreground",
                index === highlightedIndex && "bg-accent text-accent-foreground",
              )}
              onClick={() => handleCitySelect(city)}
            >
              <div className="flex items-center">
                <MapPin className="h-3 w-3 mr-2 text-muted-foreground" />
                {city}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
