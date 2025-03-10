import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/Button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Calendar,
  DollarSign,
  MapPin,
  Package,
  Plane,
  Star,
} from "lucide-react";

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here's an overview of your traveler profile.
          </p>
        </div>
        <Button className="w-full md:w-auto">
          <Plane className="mr-2 h-4 w-4" />
          Add New Trip
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Earnings
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$4,550.32</div>
            <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Completed Trips
            </CardTitle>
            <Plane className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">+2 trips this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pending Requests
            </CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7</div>
            <p className="text-xs text-muted-foreground">
              +3 new since yesterday
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Rating</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.8/5</div>
            <p className="text-xs text-muted-foreground">Based on 42 reviews</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="upcoming" className="space-y-4">
        <TabsList>
          <TabsTrigger value="upcoming">Upcoming Trips</TabsTrigger>
          <TabsTrigger value="past">Past Trips</TabsTrigger>
        </TabsList>
        <TabsContent value="upcoming" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {upcomingTrips.map((trip) => (
              <TripCard key={trip.id} trip={trip} type="upcoming" />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="past" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {pastTrips.map((trip) => (
              <TripCard key={trip.id} trip={trip} type="past" />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>New Shipping Requests</CardTitle>
            <CardDescription>
              People who want to send packages with you
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {shippingRequests.map((request) => (
                <ShippingRequestCard key={request.id} request={request} />
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Trust & Safety</CardTitle>
            <CardDescription>
              Your verification status and security settings
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge
                    variant="outline"
                    className="bg-green-50 text-green-700 dark:bg-green-900 dark:text-green-300"
                  >
                    Verified
                  </Badge>
                  <span className="text-sm font-medium">
                    Identity Verification
                  </span>
                </div>
                <Button>View</Button>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge
                    variant="outline"
                    className="bg-green-50 text-green-700 dark:bg-green-900 dark:text-green-300"
                  >
                    Verified
                  </Badge>
                  <span className="text-sm font-medium">Phone Number</span>
                </div>
                <Button>Edit</Button>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge
                    variant="outline"
                    className="bg-yellow-50 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300"
                  >
                    Pending
                  </Badge>
                  <span className="text-sm font-medium">
                    Address Verification
                  </span>
                </div>
                <Button>Complete</Button>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge
                    variant="outline"
                    className="bg-green-50 text-green-700 dark:bg-green-900 dark:text-green-300"
                  >
                    Enabled
                  </Badge>
                  <span className="text-sm font-medium">
                    Two-Factor Authentication
                  </span>
                </div>
                <Button>Manage</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

interface Trip {
  id: string;
  from: string;
  to: string;
  date: string;
  space: string;
  earnings?: string;
}

interface ShippingRequest {
  id: string;
  sender: {
    name: string;
    image: string;
    rating: number;
  };
  package: {
    size: string;
    weight: string;
    description: string;
  };
  trip: {
    from: string;
    to: string;
    date: string;
  };
  offer: string;
}

function TripCard({ trip, type }: { trip: Trip; type: "upcoming" | "past" }) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between">
          <CardTitle className="text-lg">
            {trip.from} to {trip.to}
          </CardTitle>
          {type === "past" && <Badge className="ml-2">Completed</Badge>}
        </div>
        <CardDescription className="flex items-center">
          <Calendar className="mr-1 h-3 w-3" />
          {trip.date}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              Available Space:
            </span>
            <span className="text-sm font-medium">{trip.space}</span>
          </div>
          {type === "upcoming" ? (
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Packages:</span>
              <span className="text-sm font-medium">2 confirmed</span>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Earned:</span>
              <span className="text-sm font-medium">{trip.earnings}</span>
            </div>
          )}
          <div className="pt-2">
            {type === "upcoming" ? (
              <Button variant="outline" className="w-full">
                Manage Trip
              </Button>
            ) : (
              <Button variant="outline" className="w-full">
                View Details
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function ShippingRequestCard({ request }: { request: ShippingRequest }) {
  return (
    <div className="flex items-start space-x-4 rounded-lg border p-4">
      <Avatar>
        <AvatarImage src={request.sender.image} alt={request.sender.name} />
        <AvatarFallback>{request.sender.name.charAt(0)}</AvatarFallback>
      </Avatar>
      <div className="flex-1 space-y-1">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium">{request.sender.name}</p>
          <div className="flex items-center">
            <Star className="h-3 w-3 fill-current text-yellow-500" />
            <span className="ml-1 text-xs">{request.sender.rating}</span>
          </div>
        </div>
        <p className="text-xs text-muted-foreground">
          <MapPin className="mr-1 inline-block h-3 w-3" />
          {request.trip.from} to {request.trip.to} • {request.trip.date}
        </p>
        <p className="text-xs">
          <span className="font-medium">Package:</span> {request.package.size},{" "}
          {request.package.weight}
        </p>
        <p className="text-xs">{request.package.description}</p>
        <p className="text-sm font-medium">Offer: {request.offer}</p>
        <div className="flex space-x-2 pt-2">
          <Button size="sm" className="flex-1">
            Accept
          </Button>
          <Button size="sm" variant="outline" className="flex-1">
            Decline
          </Button>
        </div>
      </div>
    </div>
  );
}

const upcomingTrips: Trip[] = [
  {
    id: "1",
    from: "New York",
    to: "London",
    date: "Mar 15, 2025",
    space: "2 medium suitcases",
  },
  {
    id: "2",
    from: "London",
    to: "Paris",
    date: "Mar 22, 2025",
    space: "1 large suitcase",
  },
  {
    id: "3",
    from: "Paris",
    to: "New York",
    date: "Mar 30, 2025",
    space: "1 small suitcase",
  },
];

const pastTrips: Trip[] = [
  {
    id: "4",
    from: "New York",
    to: "Tokyo",
    date: "Feb 10, 2025",
    space: "2 medium suitcases",
    earnings: "$350.00",
  },
  {
    id: "5",
    from: "Tokyo",
    to: "Singapore",
    date: "Feb 18, 2025",
    space: "1 large suitcase",
    earnings: "$220.00",
  },
  {
    id: "6",
    from: "Singapore",
    to: "New York",
    date: "Feb 25, 2025",
    space: "1 small suitcase",
    earnings: "$280.00",
  },
];

const shippingRequests: ShippingRequest[] = [
  {
    id: "1",
    sender: {
      name: "Alice Smith",
      image: "/placeholder.svg?height=40&width=40",
      rating: 4.9,
    },
    package: {
      size: "Medium",
      weight: "3.5 kg",
      description: "Gift package with local souvenirs",
    },
    trip: {
      from: "New York",
      to: "London",
      date: "Mar 15, 2025",
    },
    offer: "$120.00",
  },
  {
    id: "2",
    sender: {
      name: "Bob Johnson",
      image: "/placeholder.svg?height=40&width=40",
      rating: 4.7,
    },
    package: {
      size: "Small",
      weight: "1.2 kg",
      description: "Documents and small electronics",
    },
    trip: {
      from: "New York",
      to: "London",
      date: "Mar 15, 2025",
    },
    offer: "$85.00",
  },
];
