"use client"

import type React from "react"

import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Leaf, LogOut, Settings, User, WifiOff, Menu } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { NotificationCenter } from "@/components/notification-center"
import { FlowerLoader } from "@/components/flower-loader"

interface DashboardLayoutProps {
  children: React.ReactNode
  title: string
  navigation: Array<{
    name: string
    href: string
    icon: React.ComponentType<{ className?: string }>
    current?: boolean
  }>
}

export function DashboardLayout({ children, title, navigation }: DashboardLayoutProps) {
  const { userProfile, logout, loading } = useAuth()
  const router = useRouter()
  const [isOnline, setIsOnline] = useState(true)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)
    setIsOnline(navigator.onLine)

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [])

  const handleLogout = async () => {
    try {
      await logout()
      router.push("/")
    } catch (error) {
      console.error("[v0] Error during logout:", error)
      router.push("/")
    }
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  const NavigationItems = ({ onItemClick }: { onItemClick?: () => void }) => (
    <ul className="space-y-2">
      {navigation.map((item) => {
        const Icon = item.icon
        return (
          <li key={item.name}>
            <Link
              href={item.href}
              onClick={onItemClick}
              className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                item.current
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted"
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{item.name}</span>
            </Link>
          </li>
        )
      })}
    </ul>
  )

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <FlowerLoader size="lg" text="Loading AgriLink..." />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card sticky top-0 z-40">
        <div className="flex h-16 items-center px-4">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-64 p-0">
              <div className="p-4">
                <div className="flex items-center space-x-2 mb-6">
                  <Leaf className="h-6 w-6 text-primary" />
                  <span className="text-xl font-bold">AgriLink</span>
                </div>
                <h2 className="text-lg font-semibold mb-4">{title}</h2>
                <NavigationItems onItemClick={() => setIsMobileMenuOpen(false)} />
              </div>
            </SheetContent>
          </Sheet>

          <Link href="/" className="flex items-center space-x-2 ml-2 md:ml-0">
            <Leaf className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold hidden sm:block">AgriLink</span>
          </Link>

          {!isOnline && (
            <div className="ml-4 flex items-center space-x-2 text-amber-600">
              <WifiOff className="h-4 w-4" />
              <span className="text-sm hidden sm:block">Offline Mode</span>
            </div>
          )}

          <div className="ml-auto flex items-center space-x-2">
            <NotificationCenter />

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {userProfile ? getInitials(userProfile.name) : "U"}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{userProfile?.name || "User"}</p>
                    <p className="text-xs leading-none text-muted-foreground">{userProfile?.email || "No email"}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <div className="flex">
        <nav className="hidden md:block w-64 border-r bg-card">
          <div className="p-4">
            <h2 className="text-lg font-semibold mb-4">{title}</h2>
            <NavigationItems />
          </div>
        </nav>

        <main className="flex-1 p-4 md:p-6">{children}</main>
      </div>
    </div>
  )
}
