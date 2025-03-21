"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/Card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/Button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, MapPin, Package, Star } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function RequestsPage() {
  const [selectedRequest, setSelectedRequest] =
    useState<ShippingRequest | null>(null);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Shipping Requests
          </h1>
          <p className="text-muted-foreground">
            Manage package shipping requests from senders
          </p>
        </div>
        <div className="relative w-full md:w-64">
          <Input placeholder="Search requests..." className="w-full" />
        </div>
      </div>

      <Tabs defaultValue="pending" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="accepted">Accepted</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
        </TabsList>
        <TabsContent value="pending" className="space-y-4">
          <div className="grid gap-4">
            {pendingRequests.map((request) => (
              <RequestCard
                key={request.id}
                request={request}
                status="pending"
                onViewDetails={() => setSelectedRequest(request)}
              />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="accepted" className="space-y-4">
          <div className="grid gap-4">
            {acceptedRequests.map((request) => (
              <RequestCard
                key={request.id}
                request={request}
                status="accepted"
                onViewDetails={() => setSelectedRequest(request)}
              />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="completed" className="space-y-4">
          <div className="grid gap-4">
            {completedRequests.map((request) => (
              <RequestCard
                key={request.id}
                request={request}
                status="completed"
                onViewDetails={() => setSelectedRequest(request)}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {selectedRequest && (
        <RequestDetailsDialog
          request={selectedRequest}
          open={!!selectedRequest}
          onClose={() => setSelectedRequest(null)}
        />
      )}
    </div>
  );
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
    category: string;
    value: string;
  };
  trip: {
    from: string;
    to: string;
    date: string;
  };
  offer: string;
  status?: "pending" | "accepted" | "completed";
  messages?: number;
}

function RequestCard({
  request,
  status,
  onViewDetails,
}: {
  request: ShippingRequest;
  status: "pending" | "accepted" | "completed";
  onViewDetails: () => void;
}) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col gap-4 md:flex-row md:items-center">
          <Avatar className="h-12 w-12">
            <AvatarImage src={request.sender.image} alt={request.sender.name} />
            <AvatarFallback>{request.sender.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-1.5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold">{request.sender.name}</h3>
                <div className="flex items-center text-sm text-muted-foreground">
                  <Star className="mr-1 h-3 w-3 fill-yellow-500 text-yellow-500" />
                  <span>{request.sender.rating}</span>
                </div>
              </div>
              {status === "pending" && <Badge>Pending</Badge>}
              {status === "accepted" && (
                <Badge variant="secondary">Accepted</Badge>
              )}
              {status === "completed" && (
                <Badge variant="outline">Completed</Badge>
              )}
            </div>
            <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
              <div className="flex items-center">
                <MapPin className="mr-1 h-3 w-3" />
                <span>
                  {request.trip.from} to {request.trip.to}
                </span>
              </div>
              <div className="flex items-center">
                <Calendar className="mr-1 h-3 w-3" />
                <span>{request.trip.date}</span>
              </div>
              <div className="flex items-center">
                <Package className="mr-1 h-3 w-3" />
                <span>
                  {request.package.size}, {request.package.weight}
                </span>
              </div>
            </div>
            <p className="text-sm">{request.package.description}</p>
            <div className="flex items-center justify-between pt-2">
              <p className="font-medium">Offer: {request.offer}</p>
              <div className="flex gap-2">
                {status === "pending" && (
                  <>
                    <Button size="sm">Accept</Button>
                    <Button size="sm" variant="outline">
                      Decline
                    </Button>
                  </>
                )}
                {status === "accepted" && (
                  <Button size="sm">Message Sender</Button>
                )}
                <Button size="sm" onClick={onViewDetails}>
                  Details
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function RequestDetailsDialog({
  request,
  open,
  onClose,
}: {
  request: ShippingRequest;
  open: boolean;
  onClose: () => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Request Details</DialogTitle>
          <DialogDescription>
            Complete information about this shipping request
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex items-center gap-4">
            <Avatar>
              <AvatarImage
                src={request.sender.image}
                alt={request.sender.name}
              />
              <AvatarFallback>{request.sender.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold">{request.sender.name}</h3>
              <div className="flex items-center text-sm text-muted-foreground">
                <Star className="mr-1 h-3 w-3 fill-yellow-500 text-yellow-500" />
                <span>{request.sender.rating}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label className="text-xs">From</Label>
              <p className="text-sm font-medium">{request.trip.from}</p>
            </div>
            <div>
              <Label className="text-xs">To</Label>
              <p className="text-sm font-medium">{request.trip.to}</p>
            </div>
            <div>
              <Label className="text-xs">Date</Label>
              <p className="text-sm font-medium">{request.trip.date}</p>
            </div>
            <div>
              <Label className="text-xs">Offer</Label>
              <p className="text-sm font-medium">{request.offer}</p>
            </div>
          </div>

          <div>
            <Label className="text-xs">Package Details</Label>
            <div className="mt-1 rounded-md border p-3">
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div>
                  <span className="text-muted-foreground">Size:</span>{" "}
                  <span className="font-medium">{request.package.size}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Weight:</span>{" "}
                  <span className="font-medium">{request.package.weight}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Category:</span>{" "}
                  <span className="font-medium">
                    {request.package.category}
                  </span>
                </div>
                <div>
                  <span className="text-muted-foreground">Value:</span>{" "}
                  <span className="font-medium">{request.package.value}</span>
                </div>
              </div>
              <div className="mt-2 text-sm">
                <span className="text-muted-foreground">Description:</span>{" "}
                <span>{request.package.description}</span>
              </div>
            </div>
          </div>
        </div>
        <DialogFooter className="flex flex-col-reverse sm:flex-row sm:justify-between sm:space-x-2">
          {request.status === "pending" && (
            <>
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <div className="flex gap-2">
                <Button>Decline</Button>
                <Button>Accept Request</Button>
              </div>
            </>
          )}
          {request.status === "accepted" && (
            <>
              <Button variant="outline" onClick={onClose}>
                Close
              </Button>
              <Button>Message Sender</Button>
            </>
          )}
          {request.status === "completed" && (
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

const pendingRequests: ShippingRequest[] = [
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
      category: "Gifts",
      value: "$150",
    },
    trip: {
      from: "New York",
      to: "London",
      date: "Mar 15, 2025",
    },
    offer: "$120.00",
    status: "pending",
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
      category: "Documents",
      value: "$200",
    },
    trip: {
      from: "New York",
      to: "London",
      date: "Mar 15, 2025",
    },
    offer: "$85.00",
    status: "pending",
  },
];

const acceptedRequests: ShippingRequest[] = [
  {
    id: "3",
    sender: {
      name: "Carol Williams",
      image: "/placeholder.svg?height=40&width=40",
      rating: 4.8,
    },
    package: {
      size: "Small",
      weight: "2.1 kg",
      description: "Birthday gift for my sister",
      category: "Gifts",
      value: "$120",
    },
    trip: {
      from: "London",
      to: "Paris",
      date: "Mar 22, 2025",
    },
    offer: "$95.00",
    status: "accepted",
    messages: 3,
  },
];

const completedRequests: ShippingRequest[] = [
  {
    id: "4",
    sender: {
      name: "David Brown",
      image: "/placeholder.svg?height=40&width=40",
      rating: 4.6,
    },
    package: {
      size: "Medium",
      weight: "4.0 kg",
      description: "Traditional Japanese tea set",
      category: "Fragile Items",
      value: "$250",
    },
    trip: {
      from: "Tokyo",
      to: "Singapore",
      date: "Feb 18, 2025",
    },
    offer: "$130.00",
    status: "completed",
  },
  {
    id: "5",
    sender: {
      name: "Emma Davis",
      image: "/placeholder.svg?height=40&width=40",
      rating: 5.0,
    },
    package: {
      size: "Small",
      weight: "1.5 kg",
      description: "Business documents and contracts",
      category: "Documents",
      value: "$100",
    },
    trip: {
      from: "Singapore",
      to: "New York",
      date: "Feb 25, 2025",
    },
    offer: "$90.00",
    status: "completed",
  },
];
