import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/Button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Calendar,
  DollarSign,
  Package,
  Eye,
  MessageSquare,
  User,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DashboardHeader } from "../Dashboard-header";

export default function MyRequest() {
  const activePackages = [
    {
      id: 1,
      from: "New York",
      to: "London",
      date: "June 15, 2025",
      status: "In Transit",
      size: "Medium",
      cost: "$60",
      traveler: {
        name: "Emma Davis",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "ED",
      },
    },
    {
      id: 2,
      from: "Paris",
      to: "Berlin",
      date: "June 22, 2025",
      status: "Pending",
      size: "Small",
      cost: "$40",
      traveler: null,
    },
    {
      id: 3,
      from: "Madrid",
      to: "Rome",
      date: "July 5, 2025",
      status: "Accepted",
      size: "Large",
      cost: "$80",
      traveler: {
        name: "Frank Miller",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "FM",
      },
    },
  ];

  const deliveredPackages = [
    {
      id: 4,
      from: "London",
      to: "Paris",
      date: "May 10, 2025",
      status: "Delivered",
      size: "Medium",
      cost: "$55",
      traveler: {
        name: "Grace Wilson",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "GW",
      },
    },
    {
      id: 5,
      from: "Berlin",
      to: "Prague",
      date: "April 22, 2025",
      status: "Delivered",
      size: "Small",
      cost: "$45",
      traveler: {
        name: "Henry Taylor",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "HT",
      },
    },
  ];

  return (
    <>
      <DashboardHeader
        heading="My Packages"
        text="Manage your active and delivered packages."
      />
      <Tabs defaultValue="active" className="mt-6">
        <TabsList className="grid w-full max-w-[400px] grid-cols-2">
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="delivered">Delivered</TabsTrigger>
        </TabsList>
        <TabsContent value="active" className="mt-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {activePackages.map((pkg) => (
              <Card key={pkg.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-xl">
                      {pkg.from} to {pkg.to}
                    </CardTitle>
                    <Badge
                      variant={
                        pkg.status === "In Transit"
                          ? "default"
                          : pkg.status === "Pending"
                          ? "secondary"
                          : pkg.status === "Accepted"
                          ? "outline"
                          : "default"
                      }
                    >
                      {pkg.status}
                    </Badge>
                  </div>
                  <CardDescription className="flex items-center mt-1">
                    <Calendar className="h-4 w-4 mr-1" />
                    {pkg.date}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex items-center">
                        <Package className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="text-sm">{pkg.size}</span>
                      </div>
                      <div className="flex items-center">
                        <DollarSign className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="text-sm">{pkg.cost}</span>
                      </div>
                    </div>
                    {pkg.traveler ? (
                      <div className="flex items-center space-x-2 p-2 rounded-md bg-muted">
                        <Avatar className="h-8 w-8">
                          <AvatarImage
                            src={pkg.traveler.avatar}
                            alt={pkg.traveler.name}
                          />
                          <AvatarFallback>
                            {pkg.traveler.initials}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">
                            {pkg.traveler.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Traveler
                          </p>
                        </div>
                        <Button className="h-8 w-8">
                          <MessageSquare className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center p-2 rounded-md bg-muted">
                        <User className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="text-sm">Waiting for traveler</span>
                      </div>
                    )}
                    <Button variant="outline" size="sm" className="w-full">
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        <TabsContent value="delivered" className="mt-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {deliveredPackages.map((pkg) => (
              <Card key={pkg.id}>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-xl">
                      {pkg.from} to {pkg.to}
                    </CardTitle>
                    <Badge variant="outline">{pkg.status}</Badge>
                  </div>
                  <CardDescription className="flex items-center mt-1">
                    <Calendar className="h-4 w-4 mr-1" />
                    {pkg.date}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="flex items-center">
                        <Package className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="text-sm">{pkg.size}</span>
                      </div>
                      <div className="flex items-center">
                        <DollarSign className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span className="text-sm">{pkg.cost}</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 p-2 rounded-md bg-muted">
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src={
                            pkg.traveler?.avatar ||
                            "/placeholder.svg?height=32&width=32"
                          }
                          alt={pkg.traveler?.name || "User"}
                        />
                        <AvatarFallback>
                          {pkg.traveler?.initials || "U"}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">
                          {pkg.traveler?.name || "Unknown User"}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Delivered by
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="w-full">
                      <Eye className="h-4 w-4 mr-2" />
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </>
  );
}
