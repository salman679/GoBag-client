import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Plus } from "lucide-react";

export default function TripsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Trips</h1>
          <p className="text-muted-foreground">
            Manage your upcoming and past trips
          </p>
        </div>
        <Button className="w-full md:w-auto">
          <Plus className="mr-2 h-4 w-4" />
          Add New Trip
        </Button>
      </div>

      <Tabs defaultValue="upcoming" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="past">Past</TabsTrigger>
          <TabsTrigger value="draft">Drafts</TabsTrigger>
        </TabsList>
        <TabsContent value="upcoming" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {upcomingTrips.map((trip) => (
              <TripCard key={trip.id} trip={trip} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="past" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {pastTrips.map((trip) => (
              <TripCard key={trip.id} trip={trip} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="draft" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {draftTrips.map((trip) => (
              <TripCard key={trip.id} trip={trip} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

interface Trip {
  id: string;
  from: string;
  to: string;
  date: string;
  status: "upcoming" | "past" | "draft";
  space: string;
  packages: number;
  earnings?: string;
}

function TripCard({ trip }: { trip: Trip }) {
  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between">
          <CardTitle className="text-lg">
            {trip.from} to {trip.to}
          </CardTitle>
          {trip.status === "upcoming" && <Badge>Upcoming</Badge>}
          {trip.status === "past" && <Badge variant="outline">Completed</Badge>}
          {trip.status === "draft" && <Badge variant="secondary">Draft</Badge>}
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
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Packages:</span>
            <span className="text-sm font-medium">
              {trip.packages} {trip.packages === 1 ? "package" : "packages"}
            </span>
          </div>
          {trip.earnings && (
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Earned:</span>
              <span className="text-sm font-medium">{trip.earnings}</span>
            </div>
          )}
          <div className="pt-2">
            {trip.status === "upcoming" && (
              <Button className="w-full">Manage Trip</Button>
            )}
            {trip.status === "past" && (
              <Button variant="outline" className="w-full">
                View Details
              </Button>
            )}
            {trip.status === "draft" && (
              <Button variant="secondary" className="w-full">
                Complete Setup
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

const upcomingTrips: Trip[] = [
  {
    id: "1",
    from: "New York",
    to: "London",
    date: "Mar 15, 2025",
    status: "upcoming",
    space: "2 medium suitcases",
    packages: 2,
  },
  {
    id: "2",
    from: "London",
    to: "Paris",
    date: "Mar 22, 2025",
    status: "upcoming",
    space: "1 large suitcase",
    packages: 1,
  },
  {
    id: "3",
    from: "Paris",
    to: "New York",
    date: "Mar 30, 2025",
    status: "upcoming",
    space: "1 small suitcase",
    packages: 0,
  },
];

const pastTrips: Trip[] = [
  {
    id: "4",
    from: "New York",
    to: "Tokyo",
    date: "Feb 10, 2025",
    status: "past",
    space: "2 medium suitcases",
    packages: 3,
    earnings: "$350.00",
  },
  {
    id: "5",
    from: "Tokyo",
    to: "Singapore",
    date: "Feb 18, 2025",
    status: "past",
    space: "1 large suitcase",
    packages: 2,
    earnings: "$220.00",
  },
  {
    id: "6",
    from: "Singapore",
    to: "New York",
    date: "Feb 25, 2025",
    status: "past",
    space: "1 small suitcase",
    packages: 1,
    earnings: "$280.00",
  },
];

const draftTrips: Trip[] = [
  {
    id: "7",
    from: "New York",
    to: "Berlin",
    date: "Apr 10, 2025",
    status: "draft",
    space: "Not specified",
    packages: 0,
  },
  {
    id: "8",
    from: "Berlin",
    to: "Rome",
    date: "Apr 18, 2025",
    status: "draft",
    space: "Not specified",
    packages: 0,
  },
];
