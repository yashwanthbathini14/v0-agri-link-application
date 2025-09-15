import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  MapPin,
  Users,
  Leaf,
  Star,
  ArrowRight,
  CheckCircle,
  Tractor,
  Sprout,
  Globe,
  Shield,
  TrendingUp,
  MessageSquare,
} from "lucide-react"
import { AgriLinkLogo } from "@/components/agrilink-logo"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <AgriLinkLogo size="md" />
            <nav className="hidden md:flex items-center space-x-6">
              <Link href="#features" className="text-muted-foreground hover:text-primary transition-colors">
                Features
              </Link>
              <Link href="#how-it-works" className="text-muted-foreground hover:text-primary transition-colors">
                How It Works
              </Link>
              <Link href="#testimonials" className="text-muted-foreground hover:text-primary transition-colors">
                Testimonials
              </Link>
            </nav>
            <div className="flex items-center space-x-4">
              <Link href="/auth/login">
                <Button variant="outline" className="border-green-300 text-green-800 hover:bg-green-100 bg-transparent">
                  Sign In
                </Button>
              </Link>
              <Link href="/auth/register">
                <Button className="bg-green-700 hover:bg-green-800">Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="relative w-full h-full">
            <div
              className="slideshow-image absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: "url('/lush-green-farmland-with-crops-growing-in-rows-und.jpg')" }}
            />
            <div
              className="slideshow-image absolute inset-0 bg-cover bg-center bg-no-repeat opacity-0"
              style={{ backgroundImage: "url('/farmer-working-in-vegetable-garden-with-green-plan.jpg')" }}
            />
            <div
              className="slideshow-image absolute inset-0 bg-cover bg-center bg-no-repeat opacity-0"
              style={{ backgroundImage: "url('/agricultural-workers-harvesting-crops-in-green-fie.jpg')" }}
            />
            <div
              className="slideshow-image absolute inset-0 bg-cover bg-center bg-no-repeat opacity-0"
              style={{ backgroundImage: "url('/modern-greenhouse-with-green-plants-and-agricultur.jpg')" }}
            />
            <div
              className="slideshow-image absolute inset-0 bg-cover bg-center bg-no-repeat opacity-0"
              style={{ backgroundImage: "url('/aerial-view-of-green-agricultural-land-with-farmin.jpg')" }}
            />
          </div>
          <div className="absolute inset-0 bg-green-900/40" />
        </div>

        <div className="container mx-auto text-center relative z-10">
          <Badge className="mb-4 bg-green-200 text-green-900 border-green-300" variant="secondary">
            Connecting Agricultural Communities
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance text-white drop-shadow-lg">
            Connect. Collaborate. <span className="text-green-300">Cultivate.</span>
          </h1>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto text-pretty drop-shadow-md">
            AgriLink brings together landowners, farmers, and agricultural workers in one powerful platform. Find land,
            connect with skilled workers, and grow your agricultural business.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/auth/register">
              <Button size="lg" className="w-full sm:w-auto bg-green-600 hover:bg-green-700">
                Start Your Journey
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href="#how-it-works">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto border-green-300 text-white hover:bg-green-100 hover:text-green-900 bg-transparent"
              >
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-green-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-green-900">Everything You Need in One Platform</h2>
            <p className="text-xl text-green-700 max-w-2xl mx-auto">
              Streamline your agricultural operations with our comprehensive suite of tools
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center bg-white border-green-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MapPin className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle className="text-green-900">Land Management</CardTitle>
                <CardDescription className="text-green-700">
                  List and discover agricultural land with detailed specifications, location data, and AI-powered
                  matching
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-green-600 space-y-2">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Interactive maps and location data
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Soil quality and crop suitability
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    AI-generated property descriptions
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="text-center bg-white border-green-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle className="text-green-900">Worker Network</CardTitle>
                <CardDescription className="text-green-700">
                  Connect with skilled agricultural workers and build your professional network
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-green-600 space-y-2">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Skill-based worker matching
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Reviews and ratings system
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Direct messaging and coordination
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="text-center bg-white border-green-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Leaf className="h-8 w-8 text-green-600" />
                </div>
                <CardTitle className="text-green-900">Smart Agriculture</CardTitle>
                <CardDescription className="text-green-700">
                  AI-powered crop suggestions and agricultural insights to maximize your yield
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-green-600 space-y-2">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    AI crop recommendations
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Weather and market insights
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />
                    Automated message drafting
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-20 px-4 bg-green-100">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-green-900">Why Choose AgriLink?</h2>
            <p className="text-xl text-green-700 max-w-2xl mx-auto">
              Discover the advantages that make us the leading agricultural platform
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-green-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <Tractor className="h-10 w-10 text-green-700" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-green-900">Modern Equipment</h3>
              <p className="text-green-700">
                Access to latest agricultural technology and equipment through our network
              </p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-green-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <Sprout className="h-10 w-10 text-green-700" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-green-900">Sustainable Farming</h3>
              <p className="text-green-700">Promote eco-friendly practices and sustainable agricultural methods</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-green-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="h-10 w-10 text-green-700" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-green-900">Global Network</h3>
              <p className="text-green-700">Connect with agricultural professionals worldwide</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-green-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-10 w-10 text-green-700" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-green-900">Secure Platform</h3>
              <p className="text-green-700">Your data and transactions are protected with enterprise-grade security</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-green-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-10 w-10 text-green-700" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-green-900">Growth Analytics</h3>
              <p className="text-green-700">Track your progress with detailed analytics and performance insights</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-green-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="h-10 w-10 text-green-700" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-green-900">24/7 Support</h3>
              <p className="text-green-700">Get help whenever you need it with our dedicated support team</p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 px-4 bg-green-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-green-900">How AgriLink Works</h2>
            <p className="text-xl text-green-700 max-w-2xl mx-auto">Get started in three simple steps</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold mb-2 text-green-900">Choose Your Role</h3>
              <p className="text-green-700">
                Sign up as a landowner, farmer, or agricultural worker to access role-specific features
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold mb-2 text-green-900">Create Your Profile</h3>
              <p className="text-green-700">
                Set up your profile with relevant information, skills, or property details
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-green-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold mb-2 text-green-900">Start Connecting</h3>
              <p className="text-green-700">
                Use our AI-powered matching to find the perfect land, workers, or opportunities
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-4 bg-green-100">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-green-900">
              Trusted by Agricultural Professionals
            </h2>
            <p className="text-xl text-green-700 max-w-2xl mx-auto">See what our community members have to say</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-white border-green-200">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-green-500 text-green-500" />
                  ))}
                </div>
                <p className="text-green-700 mb-4">
                  "AgriLink helped me find the perfect farmland for my organic vegetable operation. The AI
                  recommendations were spot-on!"
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-green-700 font-semibold">SM</span>
                  </div>
                  <div>
                    <p className="font-semibold text-green-900">Sarah Martinez</p>
                    <p className="text-sm text-green-600">Organic Farmer</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-green-200">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-green-500 text-green-500" />
                  ))}
                </div>
                <p className="text-green-700 mb-4">
                  "As a landowner, I've been able to connect with reliable farmers and workers. The platform makes
                  property management so much easier."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-green-700 font-semibold">JD</span>
                  </div>
                  <div>
                    <p className="font-semibold text-green-900">John Davis</p>
                    <p className="text-sm text-green-600">Landowner</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-white border-green-200">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-green-500 text-green-500" />
                  ))}
                </div>
                <p className="text-green-700 mb-4">
                  "The worker network feature has been incredible for finding seasonal help. The rating system ensures
                  quality connections."
                </p>
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-green-700 font-semibold">MR</span>
                  </div>
                  <div>
                    <p className="font-semibold text-green-900">Maria Rodriguez</p>
                    <p className="text-sm text-green-600">Farm Manager</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-green-50">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-green-900">
            Ready to Transform Your Agricultural Business?
          </h2>
          <p className="text-xl text-green-700 mb-8 max-w-2xl mx-auto">
            Join thousands of agricultural professionals who are already using AgriLink to grow their operations
          </p>
          <Link href="/auth/register">
            <Button size="lg" className="bg-green-600 hover:bg-green-700">
              Get Started Today
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-green-100 py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <AgriLinkLogo size="sm" className="mb-4" />
              <p className="text-green-700">Connecting agricultural communities for a sustainable future.</p>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-green-900">Platform</h4>
              <ul className="space-y-2 text-green-700">
                <li>
                  <Link href="/features" className="hover:text-green-900">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="hover:text-green-900">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-green-900">
                    About
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-green-900">Support</h4>
              <ul className="space-y-2 text-green-700">
                <li>
                  <Link href="/help" className="hover:text-green-900">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-green-900">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/community" className="hover:text-green-900">
                    Community
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4 text-green-900">Legal</h4>
              <ul className="space-y-2 text-green-700">
                <li>
                  <Link href="/privacy" className="hover:text-green-900">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-green-900">
                    Terms
                  </Link>
                </li>
                <li>
                  <Link href="/cookies" className="hover:text-green-900">
                    Cookies
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-green-200 mt-8 pt-8 text-center text-green-600">
            <p>&copy; 2024 AgriLink. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
