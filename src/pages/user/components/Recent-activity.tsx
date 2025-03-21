import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface RecentActivityProps {
  className?: string;
}

export function RecentActivity({ className }: RecentActivityProps) {
  const travelerActivities = [
    {
      id: 1,
      type: "trip",
      title: "New York to London",
      date: "2 hours ago",
      status: "Pending",
      user: {
        name: "Alice Smith",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "AS",
      },
      details: "Package request from Alice for your trip on June 15",
    },
    {
      id: 2,
      type: "message",
      title: "Message from Bob",
      date: "5 hours ago",
      status: "Unread",
      user: {
        name: "Bob Johnson",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "BJ",
      },
      details: "Hi, I have a question about your trip to Paris next week...",
    },
    {
      id: 3,
      type: "payment",
      title: "Payment Received",
      date: "Yesterday",
      status: "Completed",
      user: {
        name: "Carol Williams",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "CW",
      },
      details: "You received $120 for delivering a package to Madrid",
    },
    {
      id: 4,
      type: "trip",
      title: "Paris to Berlin",
      date: "2 days ago",
      status: "Completed",
      user: {
        name: "David Brown",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "DB",
      },
      details: "You completed your trip and delivered 2 packages",
    },
  ];

  const senderActivities = [
    {
      id: 1,
      type: "package",
      title: "Package to Paris",
      date: "1 hour ago",
      status: "In Transit",
      user: {
        name: "Emma Davis",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "ED",
      },
      details: "Your package is on its way with Emma, arriving on June 18",
    },
    {
      id: 2,
      type: "message",
      title: "Message from Frank",
      date: "3 hours ago",
      status: "Unread",
      user: {
        name: "Frank Miller",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "FM",
      },
      details: "I've accepted your package request for delivery to Rome...",
    },
    {
      id: 3,
      type: "package",
      title: "Package to Tokyo",
      date: "Yesterday",
      status: "Pending",
      user: {
        name: "Grace Wilson",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "GW",
      },
      details: "Waiting for a traveler to accept your package request",
    },
    {
      id: 4,
      type: "payment",
      title: "Payment Sent",
      date: "3 days ago",
      status: "Completed",
      user: {
        name: "Henry Taylor",
        avatar: "/placeholder.svg?height=32&width=32",
        initials: "HT",
      },
      details: "You paid $85 for package delivery to Barcelona",
    },
  ];

  return (
    <Card className={cn("col-span-3", className)}>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Your latest interactions and updates.</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="traveler">
          <TabsList className="grid w-full grid-cols-2 mb-4">
            <TabsTrigger value="traveler">As Traveler</TabsTrigger>
            <TabsTrigger value="sender">As Sender</TabsTrigger>
          </TabsList>
          <TabsContent value="traveler">
            <div className="space-y-4">
              {travelerActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start space-x-4 rounded-md border p-4"
                >
                  <Avatar>
                    <AvatarImage
                      src={activity.user.avatar}
                      alt={activity.user.name}
                    />
                    <AvatarFallback>{activity.user.initials}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">{activity.title}</p>
                      <Badge
                        variant={
                          activity.status === "Completed"
                            ? "default"
                            : activity.status === "Pending"
                            ? "secondary"
                            : activity.status === "Unread"
                            ? "destructive"
                            : "outline"
                        }
                      >
                        {activity.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {activity.details}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {activity.date}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="sender">
            <div className="space-y-4">
              {senderActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start space-x-4 rounded-md border p-4"
                >
                  <Avatar>
                    <AvatarImage
                      src={activity.user.avatar}
                      alt={activity.user.name}
                    />
                    <AvatarFallback>{activity.user.initials}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">{activity.title}</p>
                      <Badge
                        variant={
                          activity.status === "Completed"
                            ? "default"
                            : activity.status === "Pending"
                            ? "secondary"
                            : activity.status === "In Transit"
                            ? "outline"
                            : activity.status === "Unread"
                            ? "destructive"
                            : "outline"
                        }
                      >
                        {activity.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {activity.details}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {activity.date}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
