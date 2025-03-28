import type React from "react";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/Button";
import { Badge } from "@/components/ui/badge";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { format, addDays } from "date-fns";
import {
  Search,
  Package,
  MapPin,
  CalendarIcon,
  DollarSign,
  Filter,
  Eye,
  ThumbsUp,
  MessageSquare,
  AlertCircle,
  X,
  Check,
  Luggage,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

// Mock data for package requests
const packageRequests = [
  {
    id: 1,
    origin: "New York, USA",
    destination: "London, UK",
    date: addDays(new Date(), 7),
    size: "Medium",
    weight: "3.5 kg",
    category: "Electronics",
    description:
      "A new laptop that needs to be delivered to my brother who is studying abroad.",
    budget: 120,
    urgency: "Standard",
    sender: {
      name: "Alice Smith",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "AS",
      rating: 4.8,
      reviews: 12,
    },
    status: "Open",
  },
  {
    id: 2,
    origin: "Paris, France",
    destination: "Berlin, Germany",
    date: addDays(new Date(), 5),
    size: "Small",
    weight: "1.2 kg",
    category: "Documents",
    description:
      "Important business documents that need to be delivered to our Berlin office.",
    budget: 80,
    urgency: "Urgent",
    sender: {
      name: "Robert Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "RJ",
      rating: 4.5,
      reviews: 8,
    },
    status: "Open",
  },
  {
    id: 3,
    origin: "Tokyo, Japan",
    destination: "Seoul, South Korea",
    date: addDays(new Date(), 10),
    size: "Small",
    weight: "0.8 kg",
    category: "Gifts",
    description:
      "A birthday gift for my friend in Seoul. It's a small collectible item.",
    budget: 60,
    urgency: "Standard",
    sender: {
      name: "Yuki Tanaka",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "YT",
      rating: 5.0,
      reviews: 15,
    },
    status: "Open",
  },
  {
    id: 4,
    origin: "Sydney, Australia",
    destination: "Auckland, New Zealand",
    date: addDays(new Date(), 14),
    size: "Medium",
    weight: "2.5 kg",
    category: "Clothing",
    description: "Winter clothes for my daughter who is studying in Auckland.",
    budget: 90,
    urgency: "Flexible",
    sender: {
      name: "Emma Wilson",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "EW",
      rating: 4.7,
      reviews: 9,
    },
    status: "Open",
  },
  {
    id: 5,
    origin: "Dubai, UAE",
    destination: "Mumbai, India",
    date: addDays(new Date(), 3),
    size: "Large",
    weight: "8 kg",
    category: "Gifts",
    description:
      "Wedding gifts for my cousin who is getting married next month.",
    budget: 150,
    urgency: "Urgent",
    sender: {
      name: "Raj Patel",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "RP",
      rating: 4.6,
      reviews: 11,
    },
    status: "Open",
  },
  {
    id: 6,
    origin: "San Francisco, USA",
    destination: "Toronto, Canada",
    date: addDays(new Date(), 8),
    size: "Small",
    weight: "1.5 kg",
    category: "Electronics",
    description: "A smartphone that needs to be delivered to my sister.",
    budget: 100,
    urgency: "Standard",
    sender: {
      name: "David Chen",
      avatar: "/placeholder.svg?height=40&width=40",
      initials: "DC",
      rating: 4.9,
      reviews: 20,
    },
    status: "Open",
  },
];

export default function BookPackagePage() {
  const [searchParams, setSearchParams] = useState({
    origin: "",
    destination: "",
    dateFrom: undefined as Date | undefined,
    dateTo: undefined as Date | undefined,
    minBudget: 0,
    maxBudget: 200,
    packageSizes: {
      small: true,
      medium: true,
      large: true,
    },
    urgency: "all",
  });

  const [sortBy, setSortBy] = useState("date");
  const [viewMode, setViewMode] = useState("list");
  const [selectedPackage, setSelectedPackage] = useState<number | null>(null);
  const [showBookingDialog, setShowBookingDialog] = useState(false);
  const [bookingMessage, setBookingMessage] = useState("");
  const [filtersVisible, setFiltersVisible] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  // Find the selected package details
  const packageDetail = packageRequests.find(
    (pkg) => pkg.id === selectedPackage
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching with params:", searchParams);
    toast({
      title: "Search applied",
      description: "Showing packages matching your criteria",
    });
  };

  const handleReset = () => {
    setSearchParams({
      origin: "",
      destination: "",
      dateFrom: undefined,
      dateTo: undefined,
      minBudget: 0,
      maxBudget: 200,
      packageSizes: {
        small: true,
        medium: true,
        large: true,
      },
      urgency: "all",
    });

    toast({
      title: "Filters reset",
      description: "Showing all available packages",
    });
  };

  const handleBookPackage = () => {
    console.log("Booking package:", selectedPackage);
    console.log("Message:", bookingMessage);

    setShowBookingDialog(false);
    setBookingConfirmed(true);
  };

  const toggleFilters = () => {
    setFiltersVisible(!filtersVisible);
  };

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold tracking-tight">
            Book Package Delivery
          </h2>
          <p className="text-muted-foreground">
            Find packages to deliver on your upcoming trips
          </p>
        </div>
        <Button onClick={toggleFilters} variant="outline" className="md:hidden">
          <Filter className="h-4 w-4 mr-2" />
          Filters
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Search and Filters - Desktop */}
        <Card className={cn("md:block", filtersVisible ? "block" : "hidden")}>
          <CardHeader>
            <CardTitle className="text-lg flex items-center justify-between">
              <span>Search & Filters</span>
              <Button onClick={toggleFilters} className="md:hidden">
                <X className="h-4 w-4" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSearch} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="origin">Origin</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="origin"
                    placeholder="City, Country"
                    className="pl-10"
                    value={searchParams.origin}
                    onChange={(e) =>
                      setSearchParams({
                        ...searchParams,
                        origin: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="destination">Destination</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="destination"
                    placeholder="City, Country"
                    className="pl-10"
                    value={searchParams.destination}
                    onChange={(e) =>
                      setSearchParams({
                        ...searchParams,
                        destination: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Delivery Date Range</Label>
                <div className="grid grid-cols-2 gap-2">
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "justify-start text-left font-normal",
                          !searchParams.dateFrom && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {searchParams.dateFrom
                          ? format(searchParams.dateFrom, "PP")
                          : "From"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={searchParams.dateFrom}
                        onSelect={(date) =>
                          setSearchParams({ ...searchParams, dateFrom: date })
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>

                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "justify-start text-left font-normal",
                          !searchParams.dateTo && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {searchParams.dateTo
                          ? format(searchParams.dateTo, "PP")
                          : "To"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={searchParams.dateTo}
                        onSelect={(date) =>
                          setSearchParams({ ...searchParams, dateTo: date })
                        }
                        initialFocus
                        disabled={(date) =>
                          searchParams.dateFrom
                            ? date < searchParams.dateFrom
                            : false
                        }
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label>Budget Range (USD)</Label>
                  <span className="text-sm text-muted-foreground">
                    ${searchParams.minBudget} - ${searchParams.maxBudget}
                  </span>
                </div>
                <Slider
                  defaultValue={[
                    searchParams.minBudget,
                    searchParams.maxBudget,
                  ]}
                  max={200}
                  step={10}
                  onValueChange={(value) =>
                    setSearchParams({
                      ...searchParams,
                      minBudget: value[0],
                      maxBudget: value[1],
                    })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>Package Size</Label>
                <div className="flex flex-col space-y-2 mt-1">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="small"
                      checked={searchParams.packageSizes.small}
                      onCheckedChange={(checked) =>
                        setSearchParams({
                          ...searchParams,
                          packageSizes: {
                            ...searchParams.packageSizes,
                            small: checked as boolean,
                          },
                        })
                      }
                    />
                    <Label htmlFor="small" className="text-sm cursor-pointer">
                      Small (fits in a backpack)
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="medium"
                      checked={searchParams.packageSizes.medium}
                      onCheckedChange={(checked) =>
                        setSearchParams({
                          ...searchParams,
                          packageSizes: {
                            ...searchParams.packageSizes,
                            medium: checked as boolean,
                          },
                        })
                      }
                    />
                    <Label htmlFor="medium" className="text-sm cursor-pointer">
                      Medium (fits in a carry-on)
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="large"
                      checked={searchParams.packageSizes.large}
                      onCheckedChange={(checked) =>
                        setSearchParams({
                          ...searchParams,
                          packageSizes: {
                            ...searchParams.packageSizes,
                            large: checked as boolean,
                          },
                        })
                      }
                    />
                    <Label htmlFor="large" className="text-sm cursor-pointer">
                      Large (fits in a suitcase)
                    </Label>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="urgency">Urgency</Label>
                <Select
                  value={searchParams.urgency}
                  onValueChange={(value) =>
                    setSearchParams({ ...searchParams, urgency: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select urgency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="urgent">Urgent only</SelectItem>
                    <SelectItem value="standard">Standard only</SelectItem>
                    <SelectItem value="flexible">Flexible only</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col space-y-2 pt-2">
                <Button type="submit">
                  <Search className="h-4 w-4 mr-2" />
                  Search Packages
                </Button>
                <Button type="button" variant="outline" onClick={handleReset}>
                  Reset Filters
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Package Listings */}
        <div className="md:col-span-3 space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle>Available Packages</CardTitle>
                <div className="flex items-center space-x-2">
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="date">Delivery Date</SelectItem>
                      <SelectItem value="budget-high">
                        Budget: High to Low
                      </SelectItem>
                      <SelectItem value="budget-low">
                        Budget: Low to High
                      </SelectItem>
                      <SelectItem value="urgency">Urgency</SelectItem>
                    </SelectContent>
                  </Select>

                  <Tabs
                    value={viewMode}
                    onValueChange={setViewMode}
                    className="hidden md:block"
                  >
                    <TabsList>
                      <TabsTrigger value="list">List</TabsTrigger>
                      <TabsTrigger value="grid">Grid</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
              </div>
              <CardDescription>
                {packageRequests.length} packages available for delivery
              </CardDescription>
            </CardHeader>

            <CardContent>
              {viewMode === "list" ? (
                <div className="space-y-4">
                  {packageRequests.map((pkg) => (
                    <Card key={pkg.id} className="overflow-hidden">
                      <div className="flex flex-col md:flex-row">
                        <div className="flex-1 p-4">
                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="font-medium text-lg flex items-center">
                                {pkg.origin} to {pkg.destination}
                                {pkg.urgency === "Urgent" && (
                                  <Badge variant="destructive" className="ml-2">
                                    Urgent
                                  </Badge>
                                )}
                              </h3>
                              <p className="text-sm text-muted-foreground flex items-center mt-1">
                                <CalendarIcon className="h-3 w-3 mr-1" />
                                Delivery by {format(pkg.date, "PPP")}
                              </p>
                            </div>
                            <div className="text-right">
                              <div className="text-lg font-bold text-primary flex items-center">
                                <DollarSign className="h-4 w-4" />
                                {pkg.budget}
                              </div>
                              <Badge variant="outline" className="mt-1">
                                {pkg.status}
                              </Badge>
                            </div>
                          </div>

                          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                            <div>
                              <p className="text-xs text-muted-foreground">
                                Size
                              </p>
                              <p className="text-sm">{pkg.size}</p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">
                                Weight
                              </p>
                              <p className="text-sm">{pkg.weight}</p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground">
                                Category
                              </p>
                              <p className="text-sm">{pkg.category}</p>
                            </div>
                          </div>

                          <div className="mt-4">
                            <p className="text-xs text-muted-foreground">
                              Description
                            </p>
                            <p className="text-sm line-clamp-2">
                              {pkg.description}
                            </p>
                          </div>

                          <div className="flex items-center mt-4 pt-4 border-t">
                            <Avatar className="h-8 w-8">
                              <AvatarImage
                                src={pkg.sender.avatar}
                                alt={pkg.sender.name}
                              />
                              <AvatarFallback>
                                {pkg.sender.initials}
                              </AvatarFallback>
                            </Avatar>
                            <div className="ml-2">
                              <p className="text-sm font-medium">
                                {pkg.sender.name}
                              </p>
                              <div className="flex items-center">
                                <span className="text-xs text-yellow-500">
                                  ★
                                </span>
                                <span className="text-xs ml-1">
                                  {pkg.sender.rating} ({pkg.sender.reviews}{" "}
                                  reviews)
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex md:flex-col justify-around p-4 bg-muted/30 border-t md:border-t-0 md:border-l">
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1 md:w-[120px]"
                            onClick={() => setSelectedPackage(pkg.id)}
                          >
                            <Eye className="h-4 w-4 mr-2" />
                            Details
                          </Button>
                          <Button
                            size="sm"
                            className="flex-1 md:w-[120px] md:mt-2"
                            onClick={() => {
                              setSelectedPackage(pkg.id);
                              setShowBookingDialog(true);
                            }}
                          >
                            <ThumbsUp className="h-4 w-4 mr-2" />
                            Book Delivery
                          </Button>
                          <Button
                            size="sm"
                            className="flex-1 md:w-[120px] md:mt-2"
                            // asChild
                          >
                            <Link
                              to={`/messages?user=${pkg.sender.name
                                .replace(" ", "-")
                                .toLowerCase()}`}
                            >
                              <MessageSquare className="h-4 w-4 mr-2" />
                              Message
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {packageRequests.map((pkg) => (
                    <Card key={pkg.id}>
                      <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-base">
                            {pkg.origin} to {pkg.destination}
                          </CardTitle>
                          <Badge
                            variant={
                              pkg.urgency === "Urgent"
                                ? "destructive"
                                : "outline"
                            }
                          >
                            {pkg.urgency}
                          </Badge>
                        </div>
                        <CardDescription className="flex items-center mt-1">
                          <CalendarIcon className="h-3 w-3 mr-1" />
                          {format(pkg.date, "PP")}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex justify-between items-center mb-3">
                          <div className="flex items-center">
                            <Package className="h-4 w-4 text-muted-foreground mr-1" />
                            <span className="text-sm">
                              {pkg.size}, {pkg.weight}
                            </span>
                          </div>
                          <div className="text-lg font-bold text-primary flex items-center">
                            <DollarSign className="h-4 w-4" />
                            {pkg.budget}
                          </div>
                        </div>

                        <p className="text-sm line-clamp-2 mb-3">
                          {pkg.description}
                        </p>

                        <div className="flex items-center mb-3">
                          <Avatar className="h-6 w-6">
                            <AvatarImage
                              src={pkg.sender.avatar}
                              alt={pkg.sender.name}
                            />
                            <AvatarFallback>
                              {pkg.sender.initials}
                            </AvatarFallback>
                          </Avatar>
                          <div className="ml-2">
                            <p className="text-xs font-medium">
                              {pkg.sender.name}
                            </p>
                            <div className="flex items-center">
                              <span className="text-xs text-yellow-500">★</span>
                              <span className="text-xs ml-1">
                                {pkg.sender.rating}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1"
                            onClick={() => setSelectedPackage(pkg.id)}
                          >
                            <Eye className="h-3 w-3 mr-1" />
                            Details
                          </Button>
                          <Button
                            size="sm"
                            className="flex-1"
                            onClick={() => {
                              setSelectedPackage(pkg.id);
                              setShowBookingDialog(true);
                            }}
                          >
                            <ThumbsUp className="h-3 w-3 mr-1" />
                            Book
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}

              {packageRequests.length === 0 && (
                <div className="text-center py-12">
                  <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium">No packages found</h3>
                  <p className="text-muted-foreground mt-1">
                    Try adjusting your search filters
                  </p>
                </div>
              )}
            </CardContent>

            <CardFooter className="flex justify-between">
              <div className="text-sm text-muted-foreground">
                Showing {packageRequests.length} of {packageRequests.length}{" "}
                packages
              </div>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" disabled>
                  Previous
                </Button>
                <Button variant="outline" size="sm" disabled>
                  Next
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>

      {/* Package Detail Dialog */}
      {selectedPackage && packageDetail && (
        <Dialog
          open={
            selectedPackage !== null && !showBookingDialog && !bookingConfirmed
          }
          onOpenChange={(open) => !open && setSelectedPackage(null)}
        >
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>Package Details</DialogTitle>
              <DialogDescription>
                Review all information about this package request
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <div className="flex flex-col md:flex-row gap-4 md:gap-8">
                <div className="flex-1">
                  <h3 className="text-lg font-medium flex items-center">
                    {packageDetail.origin} to {packageDetail.destination}
                    {packageDetail.urgency === "Urgent" && (
                      <Badge variant="destructive" className="ml-2">
                        Urgent
                      </Badge>
                    )}
                  </h3>

                  <div className="mt-4 grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium">Delivery Date</p>
                      <p className="text-sm text-muted-foreground">
                        {format(packageDetail.date, "PPP")}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Compensation</p>
                      <p className="text-sm text-primary font-bold">
                        ${packageDetail.budget}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Package Size</p>
                      <p className="text-sm text-muted-foreground">
                        {packageDetail.size}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Weight</p>
                      <p className="text-sm text-muted-foreground">
                        {packageDetail.weight}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Category</p>
                      <p className="text-sm text-muted-foreground">
                        {packageDetail.category}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Status</p>
                      <Badge variant="outline">{packageDetail.status}</Badge>
                    </div>
                  </div>

                  <div className="mt-4">
                    <p className="text-sm font-medium">Description</p>
                    <p className="text-sm text-muted-foreground">
                      {packageDetail.description}
                    </p>
                  </div>

                  <div className="mt-4 bg-amber-50 dark:bg-amber-950/20 p-3 rounded-md flex items-start space-x-2">
                    <AlertCircle className="h-4 w-4 text-amber-500 mt-0.5" />
                    <div className="text-xs">
                      <p className="font-medium text-amber-800 dark:text-amber-300">
                        Important Information
                      </p>
                      <p className="text-amber-700 dark:text-amber-400">
                        By accepting to deliver this package, you agree to our
                        delivery terms and confirm that you will handle the
                        package with care.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="md:w-64 space-y-4">
                  <div className="border rounded-md p-4">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage
                          src={packageDetail.sender.avatar}
                          alt={packageDetail.sender.name}
                        />
                        <AvatarFallback>
                          {packageDetail.sender.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">
                          {packageDetail.sender.name}
                        </p>
                        <div className="flex items-center">
                          <span className="text-xs text-yellow-500">★</span>
                          <span className="text-xs ml-1">
                            {packageDetail.sender.rating} (
                            {packageDetail.sender.reviews} reviews)
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4">
                      <Button
                        className="w-full"
                        onClick={() => {
                          setShowBookingDialog(true);
                        }}
                      >
                        <ThumbsUp className="h-4 w-4 mr-2" />
                        Book This Delivery
                      </Button>

                      <Button variant="outline" className="w-full mt-2">
                        <Link
                          to={`/messages?user=${packageDetail.sender.name
                            .replace(" ", "-")
                            .toLowerCase()}`}
                        >
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Message Sender
                        </Link>
                      </Button>
                    </div>
                  </div>

                  <div className="border rounded-md p-4">
                    <h4 className="text-sm font-medium mb-2">
                      Delivery Timeline
                    </h4>
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <div className="flex flex-col items-center mr-2">
                          <div className="rounded-full w-6 h-6 bg-primary text-primary-foreground flex items-center justify-center text-xs">
                            1
                          </div>
                          <div className="w-0.5 h-8 bg-border mt-1"></div>
                        </div>
                        <div>
                          <p className="text-xs font-medium">Book Delivery</p>
                          <p className="text-xs text-muted-foreground">
                            Confirm you can deliver this package
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="flex flex-col items-center mr-2">
                          <div className="rounded-full w-6 h-6 bg-muted text-muted-foreground flex items-center justify-center text-xs">
                            2
                          </div>
                          <div className="w-0.5 h-8 bg-border mt-1"></div>
                        </div>
                        <div>
                          <p className="text-xs font-medium">
                            Coordinate Pickup
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Arrange pickup details with sender
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start">
                        <div className="flex flex-col items-center mr-2">
                          <div className="rounded-full w-6 h-6 bg-muted text-muted-foreground flex items-center justify-center text-xs">
                            3
                          </div>
                        </div>
                        <div>
                          <p className="text-xs font-medium">
                            Deliver & Get Paid
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Complete delivery and receive payment
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setSelectedPackage(null)}
              >
                Close
              </Button>
              <Button onClick={() => setShowBookingDialog(true)}>
                <ThumbsUp className="h-4 w-4 mr-2" />
                Book This Delivery
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Booking Dialog */}
      <Dialog open={showBookingDialog} onOpenChange={setShowBookingDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Book Package Delivery</DialogTitle>
            <DialogDescription>
              Confirm that you want to deliver this package
            </DialogDescription>
          </DialogHeader>

          {packageDetail && (
            <div className="py-4">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm font-medium">
                    {packageDetail.origin} to {packageDetail.destination}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Delivery by {format(packageDetail.date, "PPP")}
                  </p>
                </div>
                <div className="text-lg font-bold text-primary flex items-center">
                  <DollarSign className="h-4 w-4" />
                  {packageDetail.budget}
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="message">Message to Sender</Label>
                  <Textarea
                    id="message"
                    placeholder="Introduce yourself and explain why you're a good fit for delivering this package..."
                    value={bookingMessage}
                    onChange={(e) => setBookingMessage(e.target.value)}
                    rows={5}
                  />
                </div>

                <div className="bg-muted p-3 rounded-md">
                  <p className="text-sm font-medium flex items-center">
                    <Check className="h-4 w-4 mr-2 text-primary" />
                    What happens next?
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    The sender will review your profile and message. If they
                    approve, you'll be able to coordinate pickup and delivery
                    details.
                  </p>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                setShowBookingDialog(false);
                setBookingMessage("");
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={handleBookPackage}
              disabled={bookingMessage.length < 10}
            >
              <ThumbsUp className="h-4 w-4 mr-2" />
              Confirm Booking
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Booking Confirmation Dialog */}
      <Dialog open={bookingConfirmed} onOpenChange={setBookingConfirmed}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center text-primary">
              <Check className="h-5 w-5 mr-2" />
              Booking Confirmed!
            </DialogTitle>
            <DialogDescription>
              Your package delivery booking has been confirmed
            </DialogDescription>
          </DialogHeader>

          {packageDetail && (
            <div className="py-4">
              <div className="bg-green-50 dark:bg-green-950/20 p-4 rounded-md mb-4">
                <h3 className="font-medium text-green-800 dark:text-green-300 mb-2">
                  Booking Details
                </h3>
                <div className="space-y-2 text-green-700 dark:text-green-400">
                  <p className="text-sm">
                    <span className="font-medium">Route:</span>{" "}
                    {packageDetail.origin} to {packageDetail.destination}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Delivery by:</span>{" "}
                    {format(packageDetail.date, "PPP")}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Package:</span>{" "}
                    {packageDetail.size}, {packageDetail.weight}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Earnings:</span> $
                    {packageDetail.budget}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">Next Steps</h3>
                  <ol className="space-y-3">
                    <li className="flex items-start">
                      <div className="rounded-full w-6 h-6 bg-primary text-primary-foreground flex items-center justify-center text-xs mr-2">
                        1
                      </div>
                      <div>
                        <p className="font-medium">Contact the Sender</p>
                        <p className="text-sm text-muted-foreground">
                          Coordinate with {packageDetail.sender.name} to arrange
                          package pickup details
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="rounded-full w-6 h-6 bg-primary text-primary-foreground flex items-center justify-center text-xs mr-2">
                        2
                      </div>
                      <div>
                        <p className="font-medium">Pick Up the Package</p>
                        <p className="text-sm text-muted-foreground">
                          Meet the sender at the agreed location to collect the
                          package
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="rounded-full w-6 h-6 bg-primary text-primary-foreground flex items-center justify-center text-xs mr-2">
                        3
                      </div>
                      <div>
                        <p className="font-medium">Deliver the Package</p>
                        <p className="text-sm text-muted-foreground">
                          Deliver the package to the recipient at the
                          destination
                        </p>
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="rounded-full w-6 h-6 bg-primary text-primary-foreground flex items-center justify-center text-xs mr-2">
                        4
                      </div>
                      <div>
                        <p className="font-medium">Get Paid</p>
                        <p className="text-sm text-muted-foreground">
                          Once delivery is confirmed, you'll receive your
                          payment
                        </p>
                      </div>
                    </li>
                  </ol>
                </div>
              </div>
            </div>
          )}

          <DialogFooter className="flex flex-col sm:flex-row gap-2">
            <Button variant="outline" className="sm:flex-1">
              <Link to="/my-deliveries">
                <Luggage className="h-4 w-4 mr-2" />
                View My Deliveries
              </Link>
            </Button>
            <Button className="sm:flex-1">
              <Link
                to={`/messages?user=${packageDetail?.sender.name
                  .replace(" ", "-")
                  .toLowerCase()}`}
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                Message Sender
              </Link>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
