import type React from "react";

import { useEffect, useState } from "react";
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
  AlertCircle,
  X,
  ArrowRight,
  Globe,
  Shield,
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
import { Link } from "react-router-dom";
import { usePackageStore } from "@/store/packageStore";

// Mock data for package requests
// const packages = [
//   {
//     id: 1,
//     origin: "New York, USA",
//     destination: "London, UK",
//     date: addDays(new Date(), 7),
//     size: "Medium",
//     weight: "3.5 kg",
//     category: "Electronics",
//     description:
//       "A new laptop that needs to be delivered to my brother who is studying abroad.",
//     budget: 120,
//     urgency: "Standard",
//     sender: {
//       name: "Alice Smith",
//       avatar: "/placeholder.svg?height=40&width=40",
//       initials: "AS",
//       rating: 4.8,
//       reviews: 12,
//     },
//     status: "Open",
//   },
//   {
//     id: 2,
//     origin: "Paris, France",
//     destination: "Berlin, Germany",
//     date: addDays(new Date(), 5),
//     size: "Small",
//     weight: "1.2 kg",
//     category: "Documents",
//     description:
//       "Important business documents that need to be delivered to our Berlin office.",
//     budget: 80,
//     urgency: "Urgent",
//     sender: {
//       name: "Robert Johnson",
//       avatar: "/placeholder.svg?height=40&width=40",
//       initials: "RJ",
//       rating: 4.5,
//       reviews: 8,
//     },
//     status: "Open",
//   },
//   {
//     id: 3,
//     origin: "Tokyo, Japan",
//     destination: "Seoul, South Korea",
//     date: addDays(new Date(), 10),
//     size: "Small",
//     weight: "0.8 kg",
//     category: "Gifts",
//     description:
//       "A birthday gift for my friend in Seoul. It's a small collectible item.",
//     budget: 60,
//     urgency: "Standard",
//     sender: {
//       name: "Yuki Tanaka",
//       avatar: "/placeholder.svg?height=40&width=40",
//       initials: "YT",
//       rating: 5.0,
//       reviews: 15,
//     },
//     status: "Open",
//   },
//   {
//     id: 4,
//     origin: "Sydney, Australia",
//     destination: "Auckland, New Zealand",
//     date: addDays(new Date(), 14),
//     size: "Medium",
//     weight: "2.5 kg",
//     category: "Clothing",
//     description: "Winter clothes for my daughter who is studying in Auckland.",
//     budget: 90,
//     urgency: "Flexible",
//     sender: {
//       name: "Emma Wilson",
//       avatar: "/placeholder.svg?height=40&width=40",
//       initials: "EW",
//       rating: 4.7,
//       reviews: 9,
//     },
//     status: "Open",
//   },
//   {
//     id: 5,
//     origin: "Dubai, UAE",
//     destination: "Mumbai, India",
//     date: addDays(new Date(), 3),
//     size: "Large",
//     weight: "8 kg",
//     category: "Gifts",
//     description:
//       "Wedding gifts for my cousin who is getting married next month.",
//     budget: 150,
//     urgency: "Urgent",
//     sender: {
//       name: "Raj Patel",
//       avatar: "/placeholder.svg?height=40&width=40",
//       initials: "RP",
//       rating: 4.6,
//       reviews: 11,
//     },
//     status: "Open",
//   },
//   {
//     id: 6,
//     origin: "San Francisco, USA",
//     destination: "Toronto, Canada",
//     date: addDays(new Date(), 8),
//     size: "Small",
//     weight: "1.5 kg",
//     category: "Electronics",
//     description: "A smartphone that needs to be delivered to my sister.",
//     budget: 100,
//     urgency: "Standard",
//     sender: {
//       name: "David Chen",
//       avatar: "/placeholder.svg?height=40&width=40",
//       initials: "DC",
//       rating: 4.9,
//       reviews: 20,
//     },
//     status: "Open",
//   },
// ];

export default function BrowsePackages() {
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
  const [viewMode, setViewMode] = useState("grid");
  const [selectedPackage, setSelectedPackage] = useState<number | null>(null);
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [filtersVisible, setFiltersVisible] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { packages, fetchPackages } = usePackageStore();

  useEffect(() => {
    fetchPackages();
  }, [fetchPackages]);

  // Find the selected package details
  const packageDetail = packages.find((pkg) => pkg._id === selectedPackage);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Searching with params:", searchParams);
    // In a real app, this would filter the packages
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
  };

  const handleExpressInterest = () => {
    // Show login dialog since this is for non-logged in users
    setShowLoginDialog(true);
  };

  // Improve the mobile responsiveness of the filters toggle
  const toggleFilters = () => {
    setFiltersVisible(!filtersVisible);
    // Close mobile menu when opening filters on mobile
    if (mobileMenuOpen) {
      setMobileMenuOpen(false);
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header/Navigation */}

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-8 md:py-12 bg-gradient-to-b from-background to-blue-50 dark:to-blue-950/20">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-6 md:mb-8 max-w-3xl mx-auto">
              <h1 className="text-2xl md:text-4xl font-bold tracking-tight mb-3 md:mb-4">
                Find Packages to Deliver on Your Next Trip
              </h1>
              <p className="text-base md:text-lg text-muted-foreground">
                Browse package requests from senders worldwide and earn money by
                delivering packages along your travel route.
              </p>
            </div>

            <div className="max-w-3xl mx-auto bg-background rounded-lg border shadow-sm p-3 md:p-4">
              <form
                onSubmit={handleSearch}
                className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4"
              >
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="From (Origin)"
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
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="To (Destination)"
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
                <Button type="submit" className="w-full">
                  <Search className="h-4 w-4 mr-2" />
                  Search Packages
                </Button>
              </form>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-12">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* Search and Filters - Desktop */}
              <Card
                className={cn(
                  "md:block",
                  filtersVisible
                    ? "block fixed inset-0 z-50 overflow-auto md:static md:z-auto md:overflow-visible"
                    : "hidden"
                )}
              >
                <CardHeader>
                  <CardTitle className="text-lg flex items-center justify-between">
                    <span>Filters</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={toggleFilters}
                      className="md:hidden"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pb-20 md:pb-4">
                  {" "}
                  {/* Add padding at bottom for mobile */}
                  <form onSubmit={handleSearch} className="space-y-4">
                    <div className="space-y-2">
                      <Label>Delivery Date Range</Label>
                      <div className="grid grid-cols-2 gap-2">
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className={cn(
                                "justify-start text-left font-normal",
                                !searchParams.dateFrom &&
                                  "text-muted-foreground"
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
                                setSearchParams({
                                  ...searchParams,
                                  dateFrom: date,
                                })
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
                                setSearchParams({
                                  ...searchParams,
                                  dateTo: date,
                                })
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
                          <Label
                            htmlFor="small"
                            className="text-sm cursor-pointer"
                          >
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
                          <Label
                            htmlFor="medium"
                            className="text-sm cursor-pointer"
                          >
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
                          <Label
                            htmlFor="large"
                            className="text-sm cursor-pointer"
                          >
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
                          <SelectItem value="standard">
                            Standard only
                          </SelectItem>
                          <SelectItem value="flexible">
                            Flexible only
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="fixed bottom-0 left-0 right-0 p-4 bg-background border-t md:hidden">
                      <div className="flex gap-2">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={handleReset}
                          className="flex-1"
                        >
                          Reset
                        </Button>
                        <Button
                          type="submit"
                          className="flex-1"
                          onClick={(e) => {
                            handleSearch(e);
                            toggleFilters(); // Close filters after applying on mobile
                          }}
                        >
                          Apply Filters
                        </Button>
                      </div>
                    </div>
                  </form>
                </CardContent>
              </Card>

              {/* Package Listings */}
              <div className="md:col-span-3 space-y-4">
                <Card>
                  <CardHeader className="pb-3">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                      <div>
                        <CardTitle>Available Packages</CardTitle>
                        <CardDescription>
                          {packages.length} packages available for delivery
                        </CardDescription>
                      </div>
                      <div className="flex items-center gap-2 justify-between sm:justify-end">
                        <Button
                          onClick={toggleFilters}
                          variant="outline"
                          className="md:hidden"
                        >
                          <Filter className="h-4 w-4 mr-2" />
                          Filters
                        </Button>

                        <Select value={sortBy} onValueChange={setSortBy}>
                          <SelectTrigger className="w-[140px] sm:w-[180px]">
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
                  </CardHeader>

                  <CardContent>
                    {viewMode === "list" ? (
                      <div className="space-y-4">
                        {packages.map((pkg) => (
                          <Card key={pkg.id} className="overflow-hidden">
                            <div className="flex flex-col md:flex-row">
                              <div className="flex-1 p-3 md:p-4">
                                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                                  <div>
                                    <h3 className="font-medium text-base md:text-lg flex flex-wrap items-center gap-2">
                                      {pkg.departureCountry} to{" "}
                                      {pkg.destinationCountry}
                                      {pkg.urgency === "urgent" && (
                                        <Badge variant="destructive">
                                          Urgent
                                        </Badge>
                                      )}
                                    </h3>
                                    <p className="text-sm text-muted-foreground flex items-center mt-1">
                                      <CalendarIcon className="h-3 w-3 mr-1" />
                                      Delivery by{" "}
                                      {format(pkg.deliveryDate, "PP")}
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

                                <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 mt-3 md:mt-4">
                                  <div>
                                    <p className="text-xs text-muted-foreground">
                                      Size
                                    </p>
                                    <p className="text-sm">{pkg.packageSize}</p>
                                  </div>
                                  <div>
                                    <p className="text-xs text-muted-foreground">
                                      Weight
                                    </p>
                                    <p className="text-sm">{pkg.weight}</p>
                                  </div>
                                  {/* <div>
                                    <p className="text-xs text-muted-foreground">
                                      Category
                                    </p>
                                    <p className="text-sm">{pkg.category}</p>
                                  </div> */}
                                </div>

                                <div className="mt-3 md:mt-4">
                                  <p className="text-xs text-muted-foreground">
                                    Description
                                  </p>
                                  <p className="text-sm line-clamp-2">
                                    {pkg.description}
                                  </p>
                                </div>

                                <div className="flex items-center mt-3 md:mt-4 pt-3 md:pt-4 border-t">
                                  <Avatar className="h-8 w-8">
                                    <AvatarImage
                                      src={pkg.senderProfilePic}
                                      alt={pkg.senderName}
                                    />
                                    <AvatarFallback>
                                      {pkg.senderName.charAt(0)}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div className="ml-2">
                                    <p className="text-sm font-medium">
                                      {pkg.senderName}
                                    </p>
                                    {/* <div className="flex items-center">
                                      <span className="text-xs text-yellow-500">
                                        ★
                                      </span>
                                      <span className="text-xs ml-1">
                                        {pkg.sender.rating} (
                                        {pkg.sender.reviews} reviews)
                                      </span>
                                    </div> */}
                                  </div>
                                </div>
                              </div>

                              <div className="flex md:flex-col justify-around p-3 md:p-4 bg-muted/30 border-t md:border-t-0 md:border-l">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="flex-1 md:w-[120px]"
                                  onClick={() => setSelectedPackage(pkg._id)}
                                >
                                  <Eye className="h-4 w-4 mr-2" />
                                  Details
                                </Button>
                                <Button
                                  size="sm"
                                  className="flex-1 md:w-[120px] md:mt-2 ml-2 md:ml-0"
                                  onClick={handleExpressInterest}
                                >
                                  <ThumbsUp className="h-4 w-4 mr-2" />
                                  I'll Deliver
                                </Button>
                              </div>
                            </div>
                          </Card>
                        ))}
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {packages.map((pkg) => (
                          <Card key={pkg._id}>
                            <CardHeader className="pb-2 px-3 py-3 md:p-6 md:pb-2">
                              <div className="flex justify-between items-start">
                                <CardTitle className="text-sm sm:text-base">
                                  {pkg.departureCountry} to{" "}
                                  {pkg.destinationCountry}
                                </CardTitle>
                                <Badge
                                  variant={
                                    pkg.urgency === "urgent"
                                      ? "destructive"
                                      : "outline"
                                  }
                                  className="ml-1 text-xs"
                                >
                                  {pkg.urgency}
                                </Badge>
                              </div>
                              <CardDescription className="flex items-center mt-1 text-xs sm:text-sm">
                                <CalendarIcon className="h-3 w-3 mr-1" />
                                {format(pkg.deliveryDate, "PP")}
                              </CardDescription>
                            </CardHeader>
                            <CardContent className="px-3 pb-3 md:p-6">
                              <div className="flex justify-between items-center mb-3">
                                <div className="flex items-center">
                                  <Package className="h-4 w-4 text-muted-foreground mr-1" />
                                  <span className="text-xs sm:text-sm">
                                    {pkg.packageSize}, {pkg.weight}
                                  </span>
                                </div>
                                <div className="text-base sm:text-lg font-bold text-primary flex items-center">
                                  <DollarSign className="h-4 w-4" />
                                  {pkg.budget}
                                </div>
                              </div>

                              <p className="text-xs sm:text-sm line-clamp-2 mb-3">
                                {pkg.description}
                              </p>

                              <div className="flex items-center mb-3">
                                <Avatar className="h-6 w-6">
                                  <AvatarImage
                                    src={pkg.senderProfilePic}
                                    alt={pkg.senderName}
                                  />
                                  <AvatarFallback>
                                    {pkg.senderName.charAt(0)}
                                  </AvatarFallback>
                                </Avatar>
                                <div className="ml-2">
                                  <p className="text-xs font-medium">
                                    {pkg.senderName}
                                  </p>
                                  {/* <div className="flex items-center">
                                    <span className="text-xs text-yellow-500">
                                      ★
                                    </span>
                                    <span className="text-xs ml-1">
                                      {pkg.sender.rating}
                                    </span>
                                  </div> */}
                                </div>
                              </div>

                              <div className="flex space-x-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="flex-1 text-xs sm:text-sm py-1 h-8"
                                  onClick={() => setSelectedPackage(pkg._id)}
                                >
                                  <Eye className="h-3 w-3 mr-1" />
                                  Details
                                </Button>
                                <Button
                                  size="sm"
                                  className="flex-1 text-xs sm:text-sm py-1 h-8"
                                  onClick={handleExpressInterest}
                                >
                                  <ThumbsUp className="h-3 w-3 mr-1" />
                                  I'll Deliver
                                </Button>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    )}

                    {packages.length === 0 && (
                      <div className="text-center py-12">
                        <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                        <h3 className="text-lg font-medium">
                          No packages found
                        </h3>
                        <p className="text-muted-foreground mt-1">
                          Try adjusting your search filters
                        </p>
                      </div>
                    )}
                  </CardContent>

                  <CardFooter className="flex justify-between">
                    <div className="text-sm text-muted-foreground">
                      Showing {packages.length} of {packages.length} packages
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
          </div>
        </section>

        {/* Benefits Section */}
        <section className="py-8 md:py-12 bg-blue-50 dark:bg-blue-950/10">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-8 md:mb-10">
              <h2 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4">
                Why Deliver with GoBag?
              </h2>
              <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
                Earn money, meet new people, and help others while traveling -
                all with minimal effort
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
              <Card className="bg-background border-primary/10 hover:border-primary/30 transition-colors">
                <CardContent className="pt-6 px-4 md:px-6">
                  <div className="flex flex-col items-center text-center space-y-3 md:space-y-4">
                    <div className="rounded-full bg-primary/10 p-3 md:p-4">
                      <DollarSign className="h-6 w-6 md:h-8 md:w-8 text-primary" />
                    </div>
                    <h3 className="text-lg md:text-xl font-medium">
                      Earn Extra Money
                    </h3>
                    <p className="text-sm md:text-base text-muted-foreground">
                      Make $60-$150 per delivery using your existing luggage
                      space while traveling
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-background border-primary/10 hover:border-primary/30 transition-colors">
                <CardContent className="pt-6 px-4 md:px-6">
                  <div className="flex flex-col items-center text-center space-y-3 md:space-y-4">
                    <div className="rounded-full bg-primary/10 p-3 md:p-4">
                      <Globe className="h-6 w-6 md:h-8 md:w-8 text-primary" />
                    </div>
                    <h3 className="text-lg md:text-xl font-medium">
                      Travel Flexibility
                    </h3>
                    <p className="text-sm md:text-base text-muted-foreground">
                      Choose packages that match your existing travel plans with
                      no detours required
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-background border-primary/10 hover:border-primary/30 transition-colors">
                <CardContent className="pt-6 px-4 md:px-6">
                  <div className="flex flex-col items-center text-center space-y-3 md:space-y-4">
                    <div className="rounded-full bg-primary/10 p-3 md:p-4">
                      <Shield className="h-6 w-6 md:h-8 md:w-8 text-primary" />
                    </div>
                    <h3 className="text-lg md:text-xl font-medium">
                      Safe & Secure
                    </h3>
                    <p className="text-sm md:text-base text-muted-foreground">
                      All packages are verified, insured, and our platform
                      handles all payments securely
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-10 md:py-16 bg-primary text-primary-foreground">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4 md:space-y-6 max-w-3xl mx-auto">
              <h2 className="text-2xl md:text-4xl font-bold">
                Ready to Start Delivering?
              </h2>
              <p className="text-base md:text-xl opacity-90">
                Join thousands of travelers who are earning money by delivering
                packages on their trips. Sign up today to get started!
              </p>
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mt-2 md:mt-4 w-full sm:w-auto">
                <Link to="/register?as=traveler" className="w-full sm:w-auto">
                  <Button size="lg" variant="secondary" className="w-full">
                    Sign Up as Traveler
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/how-it-works" className="w-full sm:w-auto">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full bg-primary-foreground/10 hover:bg-primary-foreground/20 border-primary-foreground/20"
                  >
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Package Detail Dialog */}
      {selectedPackage && packageDetail && (
        <Dialog
          open={selectedPackage !== null}
          onOpenChange={(open) => !open && setSelectedPackage(null)}
        >
          <DialogContent className="max-w-3xl max-h-[90vh] overflow-auto">
            <DialogHeader>
              <DialogTitle>Package Details</DialogTitle>
              <DialogDescription>
                Review all information about this package request
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4 py-4">
              <div className="flex flex-col md:flex-row gap-4 md:gap-8">
                <div className="flex-1">
                  <h3 className="text-base md:text-lg font-medium flex flex-wrap items-center gap-2">
                    {packageDetail.departureCountry} to{" "}
                    {packageDetail.destinationCountry}
                    {packageDetail.urgency === "urgent" && (
                      <Badge variant="destructive">Urgent</Badge>
                    )}
                  </h3>

                  <div className="mt-4 grid grid-cols-2 gap-3 md:gap-4">
                    <div>
                      <p className="text-sm font-medium">Delivery Date</p>
                      <p className="text-sm text-muted-foreground">
                        {format(packageDetail.deliveryDate, "PP")}
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
                        {packageDetail.packageSize}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Weight</p>
                      <p className="text-sm text-muted-foreground">
                        {packageDetail.weight}
                      </p>
                    </div>
                    {/* <div>
                      <p className="text-sm font-medium">Category</p>
                      <p className="text-sm text-muted-foreground">
                        {packageDetail.category}
                      </p>
                    </div> */}
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
                          src={packageDetail.senderProfilePic}
                          alt={packageDetail.senderName}
                        />
                        <AvatarFallback>
                          {packageDetail.senderName.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">
                          {packageDetail.senderName}
                        </p>
                        {/* <div className="flex items-center">
                          <span className="text-xs text-yellow-500">★</span>
                          <span className="text-xs ml-1">
                            {packageDetail.sender.rating} (
                            {packageDetail.sender.reviews} reviews)
                          </span>
                        </div> */}
                      </div>
                    </div>

                    <div className="mt-4">
                      <Button
                        className="w-full"
                        onClick={handleExpressInterest}
                      >
                        <ThumbsUp className="h-4 w-4 mr-2" />
                        I'll Deliver This
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
                          <p className="text-xs font-medium">
                            Express Interest
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Let the sender know you can deliver
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
                          <p className="text-xs font-medium">Confirm Details</p>
                          <p className="text-xs text-muted-foreground">
                            Agree on pickup and delivery
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

            <DialogFooter className="flex-col sm:flex-row gap-2">
              <Button
                variant="outline"
                onClick={() => setSelectedPackage(null)}
                className="sm:order-1"
              >
                Close
              </Button>
              <Button onClick={handleExpressInterest} className="sm:order-2">
                <ThumbsUp className="h-4 w-4 mr-2" />
                I'll Deliver This
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Login Dialog */}
      <Dialog open={showLoginDialog} onOpenChange={setShowLoginDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Sign Up to Continue</DialogTitle>
            <DialogDescription>
              Create an account or log in to express interest in delivering this
              package
            </DialogDescription>
          </DialogHeader>

          <div className="py-6 space-y-4">
            <div className="bg-muted p-4 rounded-md">
              <p className="text-sm">
                Join thousands of travelers who are earning money by delivering
                packages on their trips. Sign up takes less than 2 minutes!
              </p>
            </div>

            <div className="flex flex-col space-y-3">
              <Link to="/register?as=traveler">
                <Button className="w-full">
                  Sign Up as Traveler
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>

              <Link to="/login">
                <Button variant="outline" className="w-full">
                  Log In to Existing Account
                </Button>
              </Link>
            </div>
          </div>

          <DialogFooter>
            <Button variant="ghost" onClick={() => setShowLoginDialog(false)}>
              Maybe Later
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
