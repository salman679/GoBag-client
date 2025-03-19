import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
} from "lucide-react";
import { Link } from "react-router-dom";

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 space-y-8 md:py-16">
      {/* Hero Section */}
      <div className="flex flex-col items-center text-center mb-12 space-y-4">
        <Badge className="mb-2">About Us</Badge>
        <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
          Connecting Travelers and Senders with{" "}
          <span className="text-primary">GoBag</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl">
          A community-driven platform revolutionizing the way packages travel
          around the world.
        </p>
      </div>

      {/* Mission Section */}
      <Card className="mb-12">
        <CardHeader>
          <CardTitle className="text-2xl">Our Mission</CardTitle>
          <CardDescription>What drives us every day</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>
            At GoBag, we're on a mission to create a more connected and
            efficient world by leveraging the power of shared travel. We believe
            that the millions of journeys people take every day represent an
            untapped resource for package delivery.
          </p>
          <p>
            By connecting travelers with extra luggage space to people who need
            to send packages, we're building a community that saves money,
            reduces carbon emissions, and creates meaningful connections across
            the globe.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="flex flex-col items-center text-center space-y-2">
              <div className="rounded-full bg-primary/10 p-3">
                <Globe className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-medium">Global Community</h3>
              <p className="text-sm text-muted-foreground">
                Connecting people across 150+ countries with a shared purpose.
              </p>
            </div>
            <div className="flex flex-col items-center text-center space-y-2">
              <div className="rounded-full bg-primary/10 p-3">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-medium">Trust & Safety</h3>
              <p className="text-sm text-muted-foreground">
                Built on verification, insurance, and transparent communication.
              </p>
            </div>
            <div className="flex flex-col items-center text-center space-y-2">
              <div className="rounded-full bg-primary/10 p-3">
                <Award className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-medium">Sustainability</h3>
              <p className="text-sm text-muted-foreground">
                Reducing carbon footprint by utilizing existing travel routes.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* How It Works Section */}
      <div className="mb-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold">How GoBag Works</h2>
          <p className="text-muted-foreground mt-2">
            Simple, secure, and beneficial for everyone
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="rounded-full bg-primary/10 p-2">
                  <Plane className="h-5 w-5 text-primary" />
                </div>
                <CardTitle>For Travelers</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <ol className="space-y-4 mt-2">
                <li className="flex items-start">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border bg-background text-sm font-medium mr-3">
                    1
                  </span>
                  <div>
                    <h4 className="font-medium">Post Your Trip</h4>
                    <p className="text-sm text-muted-foreground">
                      Share your travel plans, including dates, route, and
                      available luggage space.
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border bg-background text-sm font-medium mr-3">
                    2
                  </span>
                  <div>
                    <h4 className="font-medium">Receive Package Requests</h4>
                    <p className="text-sm text-muted-foreground">
                      Review and accept package delivery requests from senders
                      along your route.
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border bg-background text-sm font-medium mr-3">
                    3
                  </span>
                  <div>
                    <h4 className="font-medium">Collect & Deliver</h4>
                    <p className="text-sm text-muted-foreground">
                      Pick up the package, carry it during your trip, and
                      deliver it to the recipient.
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border bg-background text-sm font-medium mr-3">
                    4
                  </span>
                  <div>
                    <h4 className="font-medium">Get Paid</h4>
                    <p className="text-sm text-muted-foreground">
                      Earn money for utilizing your unused luggage space.
                      Payments are secure and guaranteed.
                    </p>
                  </div>
                </li>
              </ol>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center space-x-3">
                <div className="rounded-full bg-primary/10 p-2">
                  <Package className="h-5 w-5 text-primary" />
                </div>
                <CardTitle>For Senders</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <ol className="space-y-4 mt-2">
                <li className="flex items-start">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border bg-background text-sm font-medium mr-3">
                    1
                  </span>
                  <div>
                    <h4 className="font-medium">Create a Package Request</h4>
                    <p className="text-sm text-muted-foreground">
                      Specify your package details, including size, weight,
                      pickup and delivery locations.
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border bg-background text-sm font-medium mr-3">
                    2
                  </span>
                  <div>
                    <h4 className="font-medium">Find a Traveler</h4>
                    <p className="text-sm text-muted-foreground">
                      Browse available travelers or wait for a match based on
                      your route requirements.
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border bg-background text-sm font-medium mr-3">
                    3
                  </span>
                  <div>
                    <h4 className="font-medium">Secure Payment</h4>
                    <p className="text-sm text-muted-foreground">
                      Pay through our secure platform. Funds are only released
                      when delivery is confirmed.
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border bg-background text-sm font-medium mr-3">
                    4
                  </span>
                  <div>
                    <h4 className="font-medium">Receive Your Package</h4>
                    <p className="text-sm text-muted-foreground">
                      Get your package delivered faster and at a lower cost than
                      traditional shipping methods.
                    </p>
                  </div>
                </li>
              </ol>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="mb-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold">Why Choose GoBag</h2>
          <p className="text-muted-foreground mt-2">
            Benefits that make a difference
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center space-y-3">
                <div className="rounded-full bg-primary/10 p-3">
                  <DollarSign className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-medium">Cost-Effective</h3>
                <p className="text-sm text-muted-foreground">
                  Save up to 70% compared to traditional international shipping
                  services.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center space-y-3">
                <div className="rounded-full bg-primary/10 p-3">
                  <Clock className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-medium">Faster Delivery</h3>
                <p className="text-sm text-muted-foreground">
                  Direct routes mean your packages arrive days or even weeks
                  faster.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center space-y-3">
                <div className="rounded-full bg-primary/10 p-3">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-medium">Secure & Insured</h3>
                <p className="text-sm text-muted-foreground">
                  Every package is insured up to $1,000 with our comprehensive
                  protection plan.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center space-y-3">
                <div className="rounded-full bg-primary/10 p-3">
                  <Globe className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-medium">Global Reach</h3>
                <p className="text-sm text-muted-foreground">
                  Access to over 10,000 routes worldwide, including remote and
                  hard-to-reach locations.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center space-y-3">
                <div className="rounded-full bg-primary/10 p-3">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-medium">Community-Driven</h3>
                <p className="text-sm text-muted-foreground">
                  Join a trusted network of verified travelers and senders with
                  98% positive ratings.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center space-y-3">
                <div className="rounded-full bg-primary/10 p-3">
                  <Award className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-medium">Eco-Friendly</h3>
                <p className="text-sm text-muted-foreground">
                  Reduce carbon emissions by utilizing existing travel routes
                  instead of dedicated shipping.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Stats Section */}
      <Card className="mb-12">
        <CardContent className="py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="space-y-2">
              <p className="text-4xl font-bold text-primary">150+</p>
              <p className="text-sm text-muted-foreground">Countries Covered</p>
            </div>
            <div className="space-y-2">
              <p className="text-4xl font-bold text-primary">50K+</p>
              <p className="text-sm text-muted-foreground">Active Travelers</p>
            </div>
            <div className="space-y-2">
              <p className="text-4xl font-bold text-primary">200K+</p>
              <p className="text-sm text-muted-foreground">
                Packages Delivered
              </p>
            </div>
            <div className="space-y-2">
              <p className="text-4xl font-bold text-primary">98%</p>
              <p className="text-sm text-muted-foreground">Satisfaction Rate</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Team Section */}
      <div className="mb-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold">Meet Our Team</h2>
          <p className="text-muted-foreground mt-2">The people behind GoBag</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              name: "Sarah Johnson",
              role: "Founder & CEO",
              bio: "Former logistics executive with a passion for travel and innovation.",
              avatar: "/placeholder.svg?height=100&width=100",
              initials: "SJ",
            },
            {
              name: "Michael Chen",
              role: "CTO",
              bio: "Tech entrepreneur with expertise in building secure marketplace platforms.",
              avatar: "/placeholder.svg?height=100&width=100",
              initials: "MC",
            },
            {
              name: "Elena Rodriguez",
              role: "Head of Operations",
              bio: "International shipping expert focused on creating seamless delivery experiences.",
              avatar: "/placeholder.svg?height=100&width=100",
              initials: "ER",
            },
            {
              name: "David Kim",
              role: "Head of Community",
              bio: "Community builder dedicated to fostering trust among global users.",
              avatar: "/placeholder.svg?height=100&width=100",
              initials: "DK",
            },
          ].map((member, index) => (
            <Card key={index}>
              <CardContent className="pt-6 flex flex-col items-center text-center">
                <Avatar className="h-20 w-20 mb-4">
                  <AvatarImage src={member.avatar} alt={member.name} />
                  <AvatarFallback>{member.initials}</AvatarFallback>
                </Avatar>
                <h3 className="font-medium text-lg">{member.name}</h3>
                <p className="text-sm text-primary mb-2">{member.role}</p>
                <p className="text-sm text-muted-foreground">{member.bio}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div className="mb-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold">What Our Users Say</h2>
          <p className="text-muted-foreground mt-2">
            Real experiences from our community
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
            <Card key={index}>
              <CardContent className="pt-6">
                <div className="flex flex-col space-y-4">
                  <p className="text-sm italic">"{testimonial.quote}"</p>
                  <div className="flex items-center space-x-3 mt-4">
                    <Avatar className="h-10 w-10">
                      <AvatarImage
                        src={testimonial.avatar}
                        alt={testimonial.author}
                      />
                      <AvatarFallback>{testimonial.initials}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium">
                        {testimonial.author}
                      </p>
                      <p className="text-xs text-muted-foreground">
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

      {/* CTA Section */}
      <Card className="bg-primary text-primary-foreground">
        <CardContent className="py-8">
          <div className="flex flex-col items-center text-center space-y-4">
            <h2 className="text-3xl font-bold">
              Ready to Join the GoBag Community?
            </h2>
            <p className="max-w-2xl">
              Whether you're traveling or need to send a package, GoBag connects
              you with a global community of trusted users. Start your journey
              today!
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
        </CardContent>
      </Card>
    </div>
  );
}
