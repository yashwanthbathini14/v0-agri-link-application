"use client"

import { useEffect, useState } from "react"
import { useAuth } from "@/lib/auth-context"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Home, Search, Heart, MessageSquare, User, MapPin, Eye, IndianRupee } from "lucide-react"
import Image from "next/image"
import { collection, onSnapshot, query, where } from "firebase/firestore"
import { db } from "@/lib/firebase"
import Link from "next/link"

const navigation = [
  { name: "Overview", href: "/dashboard/farmer", icon: Home },
  { name: "Browse Land", href: "/dashboard/farmer/browse", icon: Search },
  { name: "My Applications", href: "/dashboard/farmer/applications", icon: User },
  { name: "Saved Properties", href: "/dashboard/farmer/saved", icon: Heart, current: true },
  { name: "Messages", href: "/dashboard/farmer/messages", icon: MessageSquare },
]

type SavedItem = {
  id: string
  propertyId: number | string
}

export default function SavedPropertiesPage() {
  const { user } = useAuth()
  const [items, setItems] = useState<SavedItem[]>([])

  useEffect(() => {
    if (!user) {
      setItems([])
      return
    }
    const q = query(collection(db, "saved"), where("userId", "==", user.uid))
    const unsub = onSnapshot(q, (snap) => {
      const rows: SavedItem[] = snap.docs.map((d) => {
        const data = d.data() as any
        return { id: d.id, propertyId: data.propertyId }
      })
      setItems(rows)
    })
    return () => unsub()
  }, [user])

  const handleView = (propertyId: number | string) => {
    window.location.href = `/dashboard/farmer/property/${propertyId}`
  }

  return (
    <DashboardLayout title="Saved Properties" navigation={navigation}>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Saved Properties</h1>
          <p className="text-muted-foreground">Quick access to properties you’ve favorited</p>
        </div>

        {items.length === 0 ? (
          <Card>
            <CardContent className="py-16 text-center">
              <Heart className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-xl font-semibold mb-2">No saved properties yet</h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                Start saving properties you're interested in to easily access them later. Click the heart icon on any
                property to save it.
              </p>
              <Link href="/dashboard/farmer/browse">
                <Button>
                  <Search className="h-4 w-4 mr-2" />
                  Browse Properties
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {items.map((it) => (
              <Card key={it.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div className="relative w-20 h-20 rounded-lg overflow-hidden">
                        <Image
                          src={"/placeholder.svg?height=200&width=300&query=agri+property"}
                          alt={`Property ${it.propertyId}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-lg">Property #{String(it.propertyId)}</CardTitle>
                        <div className="flex items-center text-muted-foreground mt-1">
                          <MapPin className="h-4 w-4 mr-1" />
                          Location available in details
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Eye className="h-3 w-3 mr-1" />
                      Live
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <IndianRupee className="h-4 w-4 text-muted-foreground mr-1" />
                        <span className="font-medium">—</span>
                      </div>
                      <div className="text-muted-foreground">Tap to view details</div>
                    </div>
                    <Button variant="outline" onClick={() => handleView(it.propertyId)}>
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  )
}
