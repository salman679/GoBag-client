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
import { format } from "date-fns";
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
  Check,
  Luggage,
  Mail,
  Phone,
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
import { useAuthStore } from "@/store/authStore";
import { usePackageStore } from "@/store/packageStore";
import { Link, useLocation } from "react-router-dom";
import { useBookingStore } from "@/store/bookingStore";

export default function BrowsePackagesPage() {
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
  const [selectedPackageId, setSelectedPackageId] = useState<string | null>(
    null
  );
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [filtersVisible, setFiltersVisible] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showBookingDialog, setShowBookingDialog] = useState(false);
  const [bookingMessage, setBookingMessage] = useState("");
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const location = useLocation();

  const { isAuthenticated } = useAuthStore();
  const { packages, fetchPackages } = usePackageStore();
  const { bookPackage } = useBookingStore();

  useEffect(() => {
    fetchPackages();
  }, [fetchPackages]);

  // Find the selected package details
  const packageDetail = packages.find((pkg) => pkg._id === selectedPackageId);

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
    if (isAuthenticated) {
      setShowBookingDialog(true);
    } else {
      setShowLoginDialog(true);
    }
  };

  const handleBookPackage = async () => {
    await bookPackage(selectedPackageId as string, bookingMessage);

    console.log("Booking package with message:", bookingMessage);
    setShowBookingDialog(false);
    setBookingConfirmed(true);
    setBookingMessage("");
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
                    <Button onClick={toggleFilters} className="md:hidden">
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
                          onClick={() => {
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
                          <Card key={pkg._id} className="overflow-hidden">
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
                                      {format(new Date(pkg.deliveryDate), "PP")}
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
                                  </div>
                                </div>
                              </div>

                              <div className="flex md:flex-col justify-around p-3 md:p-4 bg-muted/30 border-t md:border-t-0 md:border-l">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="flex-1 md:w-[120px]"
                                  onClick={() => setSelectedPackageId(pkg._id)}
                                >
                                  <Eye className="h-4 w-4 mr-2" />
                                  Details
                                </Button>
                                <Button
                                  size="sm"
                                  className="flex-1 md:w-[120px] md:mt-2 ml-2 md:ml-0"
                                  onClick={() => setSelectedPackageId(pkg._id)}
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
                                {format(new Date(pkg.deliveryDate), "PP")}
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
                                </div>
                              </div>

                              <div className="flex space-x-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="flex-1 text-xs sm:text-sm py-1 h-8"
                                  onClick={() => setSelectedPackageId(pkg._id)}
                                >
                                  <Eye className="h-3 w-3 mr-1" />
                                  Details
                                </Button>
                                <Button
                                  size="sm"
                                  className="flex-1 text-xs sm:text-sm py-1 h-8"
                                  onClick={() => setSelectedPackageId(pkg._id)}
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
                <Link to="/about-us" className="w-full sm:w-auto">
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
      {selectedPackageId && packageDetail && (
        <Dialog
          open={selectedPackageId !== null}
          onOpenChange={(open) => !open && setSelectedPackageId(null)}
        >
          <DialogContent className="max-w-3xl max-h-[90vh] max-w[80vw] overflow-auto rounded-lg">
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
                        {format(new Date(packageDetail.deliveryDate), "PP")}
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
                onClick={() => setSelectedPackageId(null)}
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
      <Dialog
        open={showLoginDialog && !isAuthenticated}
        onOpenChange={setShowLoginDialog}
      >
        <DialogContent className="max-w-sm max-h[80vh] overflow-auto rounded-lg">
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
              <Link to="/register?as=traveler" state={{ from: location }}>
                <Button className="w-full">
                  Sign Up as Traveler
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>

              <Link to="/login" state={{ from: location }}>
                <Button variant="outline" className="w-full">
                  Log In to Existing Account
                </Button>
              </Link>
            </div>
          </div>

          <DialogFooter>
            <Button onClick={() => setShowLoginDialog(false)}>
              Maybe Later
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Booking Dialog */}
      <Dialog open={showBookingDialog} onOpenChange={setShowBookingDialog}>
        <DialogContent className="sm:max-w-[425px] overflow-auto rounded-lg">
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
                    {packageDetail.departureCountry} to{" "}
                    {packageDetail.destinationCountry}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Delivery by{" "}
                    {format(new Date(packageDetail.deliveryDate), "PPP")}
                  </p>
                </div>
                <div className="text-lg font-bold text-primary flex items-center">
                  <DollarSign className="h-4 w-4" />
                  {packageDetail.budget}
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="message" className="mb-2 block">
                    Message to Sender
                  </Label>
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
        <DialogContent className="overflow-auto max-h-[90vh] rounded-lg">
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
                    {packageDetail.departureCountry} to{" "}
                    {packageDetail.destinationCountry}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Delivery by:</span>{" "}
                    {format(new Date(packageDetail.deliveryDate), "PPP")}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Package:</span>{" "}
                    {packageDetail.packageSize}, {packageDetail.weight}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Earnings:</span> $
                    {packageDetail.budget}
                  </p>
                </div>
              </div>

              <div className="border rounded-md p-4 mb-4">
                <h3 className="text-sm font-medium mb-2">
                  Sender Contact Information
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Avatar className="h-8 w-8 mr-2">
                      <AvatarImage
                        src={packageDetail.senderProfilePic}
                        alt={packageDetail.senderName}
                      />
                      <AvatarFallback>
                        {packageDetail.senderName.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <p className="font-medium">{packageDetail.senderName}</p>
                  </div>
                  <p className="text-sm flex items-center">
                    <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                    {packageDetail.senderEmail || "email@example.com"}
                  </p>
                  <p className="text-sm flex items-center">
                    <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                    {packageDetail.senderPhone || "+1 (555) 123-4567"}
                  </p>
                </div>
                <div className="mt-3 pt-3 border-t">
                  <p className="text-xs text-muted-foreground">
                    Please contact the sender directly to arrange pickup and
                    delivery details.
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
                          Reach out to {packageDetail.senderName} using the
                          contact information above
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
            <Button
              variant="outline"
              className="sm:flex-1"
              onClick={() => setBookingConfirmed(false)}
            >
              Close
            </Button>
            <Button className="sm:flex-1">
              <Link
                onClick={() => setBookingConfirmed(false)}
                to="/my-deliveries"
                className="flex items-center justify-center w-full"
              >
                <Luggage className="h-4 w-4 mr-2" />
                View My Deliveries
              </Link>
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
