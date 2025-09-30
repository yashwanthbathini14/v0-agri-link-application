"use client"

import { useState } from "react"
import { useAuth } from "@/lib/auth-context"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Home,
  Search,
  Briefcase,
  MessageSquare,
  User,
  Star,
  Award,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Edit,
  Plus,
  X,
} from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const navigation = [
  { name: "Overview", href: "/dashboard/worker", icon: Home },
  { name: "Find Jobs", href: "/dashboard/worker/jobs", icon: Search },
  { name: "My Applications", href: "/dashboard/worker/applications", icon: Briefcase },
  { name: "Messages", href: "/dashboard/worker/messages", icon: MessageSquare },
  { name: "Profile", href: "/dashboard/worker/profile", icon: User, current: true },
]

export default function WorkerProfilePage() {
  const { user } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [profile, setProfile] = useState({
    name: "Maria Rodriguez",
    email: user?.email || "maria.rodriguez@example.com",
    phone: "+91 98765 43210",
    location: "Punjab, India",
    bio: "Experienced agricultural worker with 8+ years in organic farming, irrigation systems, and harvest management. Passionate about sustainable farming practices and team leadership.",
    skills: ["Organic Farming", "Irrigation Systems", "Harvest Management", "Team Leadership", "Equipment Operation"],
    experience: [
      {
        title: "Harvest Supervisor",
        company: "Organic Valley Farm",
        location: "Punjab",
        duration: "2020 - Present",
        description: "Leading harvest operations for 50+ acre organic vegetable farm",
      },
      {
        title: "Irrigation Specialist",
        company: "Green Fields Co-op",
        location: "Haryana",
        duration: "2017 - 2020",
        description: "Managed modern irrigation systems for multiple crop types",
      },
    ],
    certifications: [
      { name: "Organic Farming Certification", issuer: "Agricultural Board of India", year: "2019" },
      { name: "Irrigation Systems Management", issuer: "Technical Institute", year: "2018" },
    ],
  })

  const [newSkill, setNewSkill] = useState("")

  const handleAddSkill = () => {
    if (newSkill.trim() && !profile.skills.includes(newSkill.trim())) {
      setProfile({ ...profile, skills: [...profile.skills, newSkill.trim()] })
      setNewSkill("")
    }
  }

  const handleRemoveSkill = (skill: string) => {
    setProfile({ ...profile, skills: profile.skills.filter((s) => s !== skill) })
  }

  return (
    <DashboardLayout title="Profile" navigation={navigation}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">My Profile</h1>
            <p className="text-muted-foreground">Manage your profile and showcase your skills</p>
          </div>
          <Button onClick={() => setIsEditing(!isEditing)} variant={isEditing ? "outline" : "default"}>
            {isEditing ? (
              "Cancel"
            ) : (
              <>
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </>
            )}
          </Button>
        </div>

        {/* Profile Header */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-start space-x-6">
              <Avatar className="h-24 w-24">
                <AvatarImage src="/placeholder.svg?height=96&width=96" />
                <AvatarFallback className="text-2xl">MR</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-2xl font-bold">{profile.name}</h2>
                    <div className="flex items-center space-x-4 mt-2 text-muted-foreground">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {profile.location}
                      </div>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 mr-1 fill-primary text-primary" />
                        4.8 Rating
                      </div>
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-800 border-green-200">
                    <Award className="h-3 w-3 mr-1" />
                    Verified Worker
                  </Badge>
                </div>
                <p className="text-muted-foreground mt-4">{profile.bio}</p>
                <div className="flex items-center space-x-4 mt-4">
                  <div className="flex items-center text-sm">
                    <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                    {profile.email}
                  </div>
                  <div className="flex items-center text-sm">
                    <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                    {profile.phone}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="experience">Experience</TabsTrigger>
            <TabsTrigger value="skills">Skills & Certifications</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="text-2xl font-bold">5</div>
                  <p className="text-sm text-muted-foreground">Active Applications</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="text-2xl font-bold">28</div>
                  <p className="text-sm text-muted-foreground">Profile Views</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="text-2xl font-bold">15</div>
                  <p className="text-sm text-muted-foreground">Total Reviews</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="text-2xl font-bold">8+</div>
                  <p className="text-sm text-muted-foreground">Years Experience</p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Your latest actions and updates</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3 pb-4 border-b">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Applied to Harvest Supervisor position</p>
                      <p className="text-xs text-muted-foreground">Organic Valley Farm • 2 days ago</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3 pb-4 border-b">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Received a new review</p>
                      <p className="text-xs text-muted-foreground">5 stars from Mountain View Ranch • 1 week ago</p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Updated profile skills</p>
                      <p className="text-xs text-muted-foreground">Added 2 new certifications • 2 weeks ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="experience" className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Work Experience</CardTitle>
                  <CardDescription>Your professional work history</CardDescription>
                </div>
                {isEditing && (
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Experience
                  </Button>
                )}
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {profile.experience.map((exp, index) => (
                    <div key={index} className="border-l-2 border-primary pl-4 pb-6 last:pb-0">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-medium text-lg">{exp.title}</h3>
                          <p className="text-muted-foreground">{exp.company}</p>
                          <div className="flex items-center space-x-4 mt-1 text-sm text-muted-foreground">
                            <div className="flex items-center">
                              <Calendar className="h-3 w-3 mr-1" />
                              {exp.duration}
                            </div>
                            <div className="flex items-center">
                              <MapPin className="h-3 w-3 mr-1" />
                              {exp.location}
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground mt-2">{exp.description}</p>
                        </div>
                        {isEditing && (
                          <Button variant="ghost" size="icon">
                            <Edit className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Certifications</CardTitle>
                  <CardDescription>Your professional certifications and licenses</CardDescription>
                </div>
                {isEditing && (
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Certification
                  </Button>
                )}
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {profile.certifications.map((cert, index) => (
                    <div key={index} className="flex items-start justify-between p-4 border rounded-lg">
                      <div className="flex items-start space-x-3">
                        <Award className="h-5 w-5 text-primary mt-1" />
                        <div>
                          <h4 className="font-medium">{cert.name}</h4>
                          <p className="text-sm text-muted-foreground">{cert.issuer}</p>
                          <p className="text-xs text-muted-foreground mt-1">Issued {cert.year}</p>
                        </div>
                      </div>
                      {isEditing && (
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="skills" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Skills</CardTitle>
                <CardDescription>Your professional skills and expertise</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  {profile.skills.map((skill) => (
                    <Badge key={skill} variant="secondary" className="text-sm py-1 px-3">
                      {skill}
                      {isEditing && (
                        <button onClick={() => handleRemoveSkill(skill)} className="ml-2">
                          <X className="h-3 w-3" />
                        </button>
                      )}
                    </Badge>
                  ))}
                </div>
                {isEditing && (
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Add a new skill..."
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault()
                          handleAddSkill()
                        }
                      }}
                    />
                    <Button onClick={handleAddSkill}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Update your personal details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" value={profile.name} disabled={!isEditing} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" value={profile.email} disabled={!isEditing} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" value={profile.phone} disabled={!isEditing} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input id="location" value={profile.location} disabled={!isEditing} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea id="bio" value={profile.bio} disabled={!isEditing} rows={4} />
                </div>
                {isEditing && (
                  <div className="flex space-x-2">
                    <Button>Save Changes</Button>
                    <Button variant="outline" onClick={() => setIsEditing(false)}>
                      Cancel
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
