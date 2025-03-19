import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Plane,
  Package,
  Globe,
  Users,
  Shield,
  Award,
  ArrowRight,
  Clock,
  DollarSign,
  // Menu,
  // X,
} from "lucide-react";
import GoBagImage from "../assets/gobag-preview-image.webp";
// import { useState } from "react";
import { Link } from "react-router-dom";

export default function HomePage() {
  // const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header/Navigation */}
      {/* <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link to="/" className="flex items-center gap-2">
              <Package className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">GoBag</span>
            </Link>
          </div> */}

      {/* Desktop Navigation */}
      {/* <nav className="hidden md:flex items-center gap-6">
            <Link
              to="/how-it-works"
              className="text-sm font-medium hover:text-primary"
            >
              How It Works
            </Link>
            <Link
              to="/pricing"
              className="text-sm font-medium hover:text-primary"
            >
              Pricing
            </Link>
            <Link
              to="/about"
              className="text-sm font-medium hover:text-primary"
            >
              About Us
            </Link>
            <Link
              to="/contact"
              className="text-sm font-medium hover:text-primary"
            >
              Contact
            </Link>
          </nav> */}

      {/* <div className="flex items-center gap-4"> */}
      {/* <div className="hidden md:flex gap-2">
              <Link to="/login">
                <Button variant="outline">Log In</Button>
              </Link>
              <Link to="/register">
                <Button>Sign Up</Button>
              </Link>
            </div> */}

      {/* Mobile Menu Button */}
      {/* <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button> */}
      {/* </div>
        </div> */}

      {/* Mobile Menu */}
      {/* {mobileMenuOpen && (
          <div className="md:hidden border-t">
            <div className="container py-4 space-y-4">
              <nav className="flex flex-col space-y-4">
                <Link
                  to="/how-it-works"
                  className="text-sm font-medium hover:text-primary"
                >
                  How It Works
                </Link>
                <Link
                  to="/pricing"
                  className="text-sm font-medium hover:text-primary"
                >
                  Pricing
                </Link>
                <Link
                  to="/about"
                  className="text-sm font-medium hover:text-primary"
                >
                  About Us
                </Link>
                <Link
                  to="/contact"
                  className="text-sm font-medium hover:text-primary"
                >
                  Contact
                </Link>
              </nav>
              <div className="flex gap-2 pt-2 border-t">
                <Link to="/login" className="flex-1">
                  <Button variant="outline" className="w-full">
                    Log In
                  </Button>
                </Link>
                <Link to="/register" className="flex-1">
                  <Button className="w-full">Sign Up</Button>
                </Link>
              </div>
            </div>
          </div>
        )} */}
      {/* </header> */}

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-8 md:py-16 bg-gradient-to-b from-background to-blue-50 dark:to-blue-950/20">
          <div className="container flex flex-col items-center text-center space-y-8">
            <Badge className="mb-2 bg-primary/10 text-primary hover:bg-primary/20 border-primary/20">
              Luggage Sharing Platform
            </Badge>
            <h1 className="text-4xl font-bold tracking-tight md:text-6xl max-w-3xl">
              Ship Your Packages with{" "}
              <span className="text-primary">Travelers</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              GoBag connects travelers with extra luggage space to people who
              need to send packages. Save money, ship faster, and help the
              environment.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <Link to="/register">
                <Button size="lg" className="w-full sm:w-auto">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link to="/how-it-works">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto"
                >
                  Learn More
                </Button>
              </Link>
            </div>

            <div className="mt-8 relative w-full max-w-5xl">
              <div className="aspect-video rounded-2xl overflow-hidden border shadow-xl">
                <img
                  src={GoBagImage}
                  alt="GoBag platform preview"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-20 bg-background">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">How GoBag Works</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Simple, secure, and beneficial for everyone involved
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <Card className="border-primary/20">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="rounded-full bg-primary/10 p-2">
                      <Plane className="h-5 w-5 text-primary" />
                    </div>
                    <CardTitle>For Travelers</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <ol className="space-y-6 mt-2">
                    <li className="flex items-start">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-medium mr-3">
                        1
                      </span>
                      <div>
                        <h4 className="font-medium text-lg">Post Your Trip</h4>
                        <p className="text-muted-foreground">
                          Share your travel plans, including dates, route, and
                          available luggage space.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-medium mr-3">
                        2
                      </span>
                      <div>
                        <h4 className="font-medium text-lg">
                          Receive Package Requests
                        </h4>
                        <p className="text-muted-foreground">
                          Review and accept package delivery requests from
                          senders along your route.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-medium mr-3">
                        3
                      </span>
                      <div>
                        <h4 className="font-medium text-lg">
                          Collect & Deliver
                        </h4>
                        <p className="text-muted-foreground">
                          Pick up the package, carry it during your trip, and
                          deliver it to the recipient.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-medium mr-3">
                        4
                      </span>
                      <div>
                        <h4 className="font-medium text-lg">Get Paid</h4>
                        <p className="text-muted-foreground">
                          Earn money for utilizing your unused luggage space.
                          Payments are secure and guaranteed.
                        </p>
                      </div>
                    </li>
                  </ol>
                  <div className="mt-8">
                    <Link to="/register?as=traveler">
                      <Button className="w-full">
                        Join as a Traveler
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-primary/20">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    <div className="rounded-full bg-primary/10 p-2">
                      <Package className="h-5 w-5 text-primary" />
                    </div>
                    <CardTitle>For Senders</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <ol className="space-y-6 mt-2">
                    <li className="flex items-start">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-medium mr-3">
                        1
                      </span>
                      <div>
                        <h4 className="font-medium text-lg">
                          Create a Package Request
                        </h4>
                        <p className="text-muted-foreground">
                          Specify your package details, including size, weight,
                          pickup and delivery locations.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-medium mr-3">
                        2
                      </span>
                      <div>
                        <h4 className="font-medium text-lg">Find a Traveler</h4>
                        <p className="text-muted-foreground">
                          Browse available travelers or wait for a match based
                          on your route requirements.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-medium mr-3">
                        3
                      </span>
                      <div>
                        <h4 className="font-medium text-lg">Secure Payment</h4>
                        <p className="text-muted-foreground">
                          Pay through our secure platform. Funds are only
                          released when delivery is confirmed.
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-medium mr-3">
                        4
                      </span>
                      <div>
                        <h4 className="font-medium text-lg">
                          Receive Your Package
                        </h4>
                        <p className="text-muted-foreground">
                          Get your package delivered faster and at a lower cost
                          than traditional shipping methods.
                        </p>
                      </div>
                    </li>
                  </ol>
                  <div className="mt-8">
                    <Link to="/register?as=sender">
                      <Button className="w-full">
                        Join as a Sender
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-20 bg-blue-50 dark:bg-blue-950/10">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">Why Choose GoBag</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Benefits that make a difference for both travelers and senders
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              <Card className="bg-background border-primary/10 hover:border-primary/30 transition-colors">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="rounded-full bg-primary/10 p-4">
                      <DollarSign className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-medium">Cost-Effective</h3>
                    <p className="text-muted-foreground">
                      Save up to 70% compared to traditional international
                      shipping services.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-background border-primary/10 hover:border-primary/30 transition-colors">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="rounded-full bg-primary/10 p-4">
                      <Clock className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-medium">Faster Delivery</h3>
                    <p className="text-muted-foreground">
                      Direct routes mean your packages arrive days or even weeks
                      faster.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-background border-primary/10 hover:border-primary/30 transition-colors">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="rounded-full bg-primary/10 p-4">
                      <Shield className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-medium">Secure & Insured</h3>
                    <p className="text-muted-foreground">
                      Every package is insured up to $1,000 with our
                      comprehensive protection plan.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-background border-primary/10 hover:border-primary/30 transition-colors">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="rounded-full bg-primary/10 p-4">
                      <Globe className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-medium">Global Reach</h3>
                    <p className="text-muted-foreground">
                      Access to over 10,000 routes worldwide, including remote
                      and hard-to-reach locations.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-background border-primary/10 hover:border-primary/30 transition-colors">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="rounded-full bg-primary/10 p-4">
                      <Users className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-medium">Community-Driven</h3>
                    <p className="text-muted-foreground">
                      Join a trusted network of verified travelers and senders
                      with 98% positive ratings.
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-background border-primary/10 hover:border-primary/30 transition-colors">
                <CardContent className="pt-6">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="rounded-full bg-primary/10 p-4">
                      <Award className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-xl font-medium">Eco-Friendly</h3>
                    <p className="text-muted-foreground">
                      Reduce carbon emissions by utilizing existing travel
                      routes instead of dedicated shipping.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 bg-background">
          <div className="container">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div className="space-y-2">
                <p className="text-5xl font-bold text-primary">150+</p>
                <p className="text-lg text-muted-foreground">
                  Countries Covered
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-5xl font-bold text-primary">50K+</p>
                <p className="text-lg text-muted-foreground">
                  Active Travelers
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-5xl font-bold text-primary">200K+</p>
                <p className="text-lg text-muted-foreground">
                  Packages Delivered
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-5xl font-bold text-primary">98%</p>
                <p className="text-lg text-muted-foreground">
                  Satisfaction Rate
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-20 bg-blue-50 dark:bg-blue-950/10">
          <div className="container">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4">What Our Users Say</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Real experiences from our global community
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  quote:
                    "GoBag helped me earn over $500 on my trip to Europe by delivering packages. It was easy and made my travel more meaningful.",
                  author: "James T.",
                  role: "Traveler from New York",
                  avatar: "/placeholder.svg?height=60&width=60",
                  initials: "JT",
                },
                {
                  quote:
                    "I needed to send a birthday gift to my sister in Paris urgently. GoBag found me a traveler who delivered it the next day at half the cost of express shipping!",
                  author: "Maria L.",
                  role: "Sender from Madrid",
                  avatar: "/placeholder.svg?height=60&width=60",
                  initials: "ML",
                },
                {
                  quote:
                    "As a frequent business traveler, GoBag has become a part of my routine. I've met amazing people and offset my travel costs significantly.",
                  author: "Robert K.",
                  role: "Traveler from Singapore",
                  avatar: "/placeholder.svg?height=60&width=60",
                  initials: "RK",
                },
              ].map((testimonial, index) => (
                <Card key={index} className="bg-background border-primary/10">
                  <CardContent className="pt-6">
                    <div className="flex flex-col space-y-4">
                      <p className="text-lg italic">"{testimonial.quote}"</p>
                      <div className="flex items-center space-x-3 mt-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage
                            src={testimonial.avatar}
                            alt={testimonial.author}
                          />
                          <AvatarFallback className="bg-primary/10 text-primary">
                            {testimonial.initials}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{testimonial.author}</p>
                          <p className="text-sm text-muted-foreground">
                            {testimonial.role}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary text-primary-foreground">
          <div className="container">
            <div className="flex flex-col items-center text-center space-y-6 max-w-3xl mx-auto">
              <h2 className="text-4xl font-bold">
                Ready to Join the GoBag Community?
              </h2>
              <p className="text-xl opacity-90">
                Whether you're traveling or need to send a package, GoBag
                connects you with a global community of trusted users. Start
                your journey today!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-4">
                <Link to="/register">
                  <Button
                    size="lg"
                    variant="secondary"
                    className="w-full sm:w-auto"
                  >
                    Sign Up Now
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/how-it-works">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full sm:w-auto bg-primary-foreground/10 hover:bg-primary-foreground/20 border-primary-foreground/20"
                  >
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
