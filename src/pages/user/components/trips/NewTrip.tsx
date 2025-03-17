import { Button } from "@/components/ui/button";
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
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import {
  CalendarIcon,
  MapPin,
  Plane,
  Package,
  DollarSign,
  Info,
  ArrowLeft,
} from "lucide-react";
import { useState } from "react";
import { useForm, Controller, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

// Define the form schema with Zod
const tripSchema = z.object({
  tripType: z.enum(["one-way", "round-trip"]),
  origin: z.string().min(2, { message: "Origin is required" }),
  destination: z.string().min(2, { message: "Destination is required" }),
  departureDate: z.date({ required_error: "Departure date is required" }),
  returnDate: z.date().optional(),
  transportType: z.string().min(1, { message: "Transport type is required" }),
  maxWeight: z.coerce
    .number()
    .min(0.1, { message: "Maximum weight must be greater than 0" }),
  maxSize: z.string().min(1, { message: "Maximum size is required" }),
  pricePerKg: z.coerce
    .number()
    .min(0.1, { message: "Price per kg must be greater than 0" }),
  deliveryTime: z.string().min(1, { message: "Delivery time is required" }),
  notes: z.string().optional(),
});

type TripFormValues = z.infer<typeof tripSchema>;

export default function NewTripPage() {
  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold tracking-tight">Add New Trip</h2>
          <p className="text-muted-foreground">
            Create a new trip to let senders know about your travel plans.
          </p>
        </div>
        <Link to={"/user/trips"}>
          <Button variant="outline" size="sm" className="gap-1">
            <ArrowLeft className="h-4 w-4" />
            Back to Trips
          </Button>
        </Link>
      </div>

      <NewTripForm />
    </>
  );
}

function NewTripForm() {
  const [, setTripType] = useState<"one-way" | "round-trip">("one-way");
  const navigate = useNavigate();

  // Initialize react-hook-form
  const form = useForm<TripFormValues>({
    resolver: zodResolver(tripSchema),
    defaultValues: {
      tripType: "one-way",
      origin: "",
      destination: "",
      transportType: "",
      maxWeight: 5,
      maxSize: "",
      pricePerKg: 10,
      deliveryTime: "",
      notes: "",
    },
  });

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = form;

  // Watch the departure date to validate return date
  const departureDate = watch("departureDate");

  const onSubmit: SubmitHandler<TripFormValues> = async (data) => {
    try {
      // Simulate API call with a delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log("Form submitted:", data);

      // Show success toast
      toast({
        title: "Trip created successfully",
        description: `Your trip from ${data.origin} to ${data.destination} has been created.`,
      });

      // Redirect to trips page
      navigate("/user/trips");
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Error creating trip",
        description: "There was an error creating your trip. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="max-w-4xl mx-auto">
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardHeader>
          <CardTitle>Trip Details</CardTitle>
          <CardDescription>
            Fill in the details about your upcoming trip.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Controller
            name="tripType"
            control={control}
            render={({ field }) => (
              <Tabs
                defaultValue={field.value}
                className="w-full"
                onValueChange={(value) => {
                  field.onChange(value);
                  setTripType(value as "one-way" | "round-trip");
                }}
              >
                <TabsList className="grid w-full max-w-md grid-cols-2">
                  <TabsTrigger value="one-way">One-way Trip</TabsTrigger>
                  <TabsTrigger value="round-trip">Round Trip</TabsTrigger>
                </TabsList>
                <TabsContent value="one-way" className="space-y-6 mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label
                        htmlFor="origin"
                        className={errors.origin ? "text-destructive" : ""}
                      >
                        Origin
                      </Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Controller
                          name="origin"
                          control={control}
                          render={({ field }) => (
                            <Input
                              id="origin"
                              placeholder="City, Country"
                              className={cn(
                                "pl-10",
                                errors.origin && "border-destructive"
                              )}
                              {...field}
                            />
                          )}
                        />
                      </div>
                      {errors.origin && (
                        <p className="text-xs text-destructive mt-1">
                          {errors.origin.message}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="destination"
                        className={errors.destination ? "text-destructive" : ""}
                      >
                        Destination
                      </Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Controller
                          name="destination"
                          control={control}
                          render={({ field }) => (
                            <Input
                              id="destination"
                              placeholder="City, Country"
                              className={cn(
                                "pl-10",
                                errors.destination && "border-destructive"
                              )}
                              {...field}
                            />
                          )}
                        />
                      </div>
                      {errors.destination && (
                        <p className="text-xs text-destructive mt-1">
                          {errors.destination.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label
                        htmlFor="departure-date"
                        className={
                          errors.departureDate ? "text-destructive" : ""
                        }
                      >
                        Departure Date
                      </Label>
                      <Controller
                        name="departureDate"
                        control={control}
                        render={({ field }) => (
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                className={cn(
                                  "w-full justify-start text-left font-normal",
                                  !field.value && "text-muted-foreground",
                                  errors.departureDate && "border-destructive"
                                )}
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {field.value
                                  ? format(field.value, "PPP")
                                  : "Select date"}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                initialFocus
                                disabled={(date) => date < new Date()}
                              />
                            </PopoverContent>
                          </Popover>
                        )}
                      />
                      {errors.departureDate && (
                        <p className="text-xs text-destructive mt-1">
                          {errors.departureDate.message}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="transport-type"
                        className={
                          errors.transportType ? "text-destructive" : ""
                        }
                      >
                        Transport Type
                      </Label>
                      <Controller
                        name="transportType"
                        control={control}
                        render={({ field }) => (
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <SelectTrigger
                              className={
                                errors.transportType ? "border-destructive" : ""
                              }
                            >
                              <SelectValue placeholder="Select transport type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="flight">Flight</SelectItem>
                              <SelectItem value="train">Train</SelectItem>
                              <SelectItem value="bus">Bus</SelectItem>
                              <SelectItem value="car">Car</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        )}
                      />
                      {errors.transportType && (
                        <p className="text-xs text-destructive mt-1">
                          {errors.transportType.message}
                        </p>
                      )}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="round-trip" className="space-y-6 mt-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label
                        htmlFor="origin-round"
                        className={errors.origin ? "text-destructive" : ""}
                      >
                        Origin
                      </Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Controller
                          name="origin"
                          control={control}
                          render={({ field }) => (
                            <Input
                              id="origin-round"
                              placeholder="City, Country"
                              className={cn(
                                "pl-10",
                                errors.origin && "border-destructive"
                              )}
                              {...field}
                            />
                          )}
                        />
                      </div>
                      {errors.origin && (
                        <p className="text-xs text-destructive mt-1">
                          {errors.origin.message}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="destination-round"
                        className={errors.destination ? "text-destructive" : ""}
                      >
                        Destination
                      </Label>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Controller
                          name="destination"
                          control={control}
                          render={({ field }) => (
                            <Input
                              id="destination-round"
                              placeholder="City, Country"
                              className={cn(
                                "pl-10",
                                errors.destination && "border-destructive"
                              )}
                              {...field}
                            />
                          )}
                        />
                      </div>
                      {errors.destination && (
                        <p className="text-xs text-destructive mt-1">
                          {errors.destination.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label
                        htmlFor="departure-date-round"
                        className={
                          errors.departureDate ? "text-destructive" : ""
                        }
                      >
                        Departure Date
                      </Label>
                      <Controller
                        name="departureDate"
                        control={control}
                        render={({ field }) => (
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                className={cn(
                                  "w-full justify-start text-left font-normal",
                                  !field.value && "text-muted-foreground",
                                  errors.departureDate && "border-destructive"
                                )}
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {field.value
                                  ? format(field.value, "PPP")
                                  : "Select date"}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                initialFocus
                                disabled={(date) => date < new Date()}
                              />
                            </PopoverContent>
                          </Popover>
                        )}
                      />
                      {errors.departureDate && (
                        <p className="text-xs text-destructive mt-1">
                          {errors.departureDate.message}
                        </p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label
                        htmlFor="return-date"
                        className={errors.returnDate ? "text-destructive" : ""}
                      >
                        Return Date
                      </Label>
                      <Controller
                        name="returnDate"
                        control={control}
                        render={({ field }) => (
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                className={cn(
                                  "w-full justify-start text-left font-normal",
                                  !field.value && "text-muted-foreground",
                                  errors.returnDate && "border-destructive"
                                )}
                              >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {field.value
                                  ? format(field.value, "PPP")
                                  : "Select date"}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                              <Calendar
                                mode="single"
                                selected={field.value}
                                onSelect={field.onChange}
                                initialFocus
                                disabled={(date) => {
                                  const today = new Date();
                                  today.setHours(0, 0, 0, 0);

                                  return (
                                    date < today ||
                                    (departureDate && date < departureDate)
                                  );
                                }}
                              />
                            </PopoverContent>
                          </Popover>
                        )}
                      />
                      {errors.returnDate && (
                        <p className="text-xs text-destructive mt-1">
                          {errors.returnDate.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label
                        htmlFor="transport-type-round"
                        className={
                          errors.transportType ? "text-destructive" : ""
                        }
                      >
                        Transport Type
                      </Label>
                      <Controller
                        name="transportType"
                        control={control}
                        render={({ field }) => (
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <SelectTrigger
                              className={
                                errors.transportType ? "border-destructive" : ""
                              }
                            >
                              <SelectValue placeholder="Select transport type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="flight">Flight</SelectItem>
                              <SelectItem value="train">Train</SelectItem>
                              <SelectItem value="bus">Bus</SelectItem>
                              <SelectItem value="car">Car</SelectItem>
                              <SelectItem value="other">Other</SelectItem>
                            </SelectContent>
                          </Select>
                        )}
                      />
                      {errors.transportType && (
                        <p className="text-xs text-destructive mt-1">
                          {errors.transportType.message}
                        </p>
                      )}
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            )}
          />

          <div className="border-t pt-6">
            <h3 className="text-lg font-medium mb-4">
              Package Delivery Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label
                  htmlFor="max-weight"
                  className={errors.maxWeight ? "text-destructive" : ""}
                >
                  Maximum Weight (kg)
                </Label>
                <div className="relative">
                  <Package className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Controller
                    name="maxWeight"
                    control={control}
                    render={({ field }) => (
                      <Input
                        id="max-weight"
                        type="number"
                        min="0"
                        step="0.1"
                        placeholder="5"
                        className={cn(
                          "pl-10",
                          errors.maxWeight && "border-destructive"
                        )}
                        {...field}
                      />
                    )}
                  />
                </div>
                {errors.maxWeight && (
                  <p className="text-xs text-destructive mt-1">
                    {errors.maxWeight.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="max-size"
                  className={errors.maxSize ? "text-destructive" : ""}
                >
                  Maximum Size
                </Label>
                <Controller
                  name="maxSize"
                  control={control}
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger
                        className={errors.maxSize ? "border-destructive" : ""}
                      >
                        <SelectValue placeholder="Select maximum size" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="small">
                          Small (fits in a backpack)
                        </SelectItem>
                        <SelectItem value="medium">
                          Medium (fits in a carry-on)
                        </SelectItem>
                        <SelectItem value="large">
                          Large (fits in a suitcase)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.maxSize && (
                  <p className="text-xs text-destructive mt-1">
                    {errors.maxSize.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div className="space-y-2">
                <Label
                  htmlFor="price-per-kg"
                  className={errors.pricePerKg ? "text-destructive" : ""}
                >
                  Price per kg ($)
                </Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Controller
                    name="pricePerKg"
                    control={control}
                    render={({ field }) => (
                      <Input
                        id="price-per-kg"
                        type="number"
                        min="0"
                        step="0.01"
                        placeholder="10.00"
                        className={cn(
                          "pl-10",
                          errors.pricePerKg && "border-destructive"
                        )}
                        {...field}
                      />
                    )}
                  />
                </div>
                {errors.pricePerKg && (
                  <p className="text-xs text-destructive mt-1">
                    {errors.pricePerKg.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="delivery-time"
                  className={errors.deliveryTime ? "text-destructive" : ""}
                >
                  Estimated Delivery Time
                </Label>
                <Controller
                  name="deliveryTime"
                  control={control}
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger
                        className={
                          errors.deliveryTime ? "border-destructive" : ""
                        }
                      >
                        <SelectValue placeholder="Select delivery time" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="same-day">
                          Same day as arrival
                        </SelectItem>
                        <SelectItem value="next-day">
                          Next day after arrival
                        </SelectItem>
                        <SelectItem value="2-3-days">
                          2-3 days after arrival
                        </SelectItem>
                        <SelectItem value="flexible">
                          Flexible (to be discussed)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
                {errors.deliveryTime && (
                  <p className="text-xs text-destructive mt-1">
                    {errors.deliveryTime.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="notes">Additional Notes</Label>
            <div className="relative">
              <Info className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Controller
                name="notes"
                control={control}
                render={({ field }) => (
                  <Textarea
                    id="notes"
                    placeholder="Any specific requirements or information about your trip..."
                    className="min-h-[100px] pl-10"
                    {...field}
                  />
                )}
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Link to={"/user/trips"}>
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </Link>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <span className="flex items-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Creating...
              </span>
            ) : (
              <>
                <Plane className="mr-2 h-4 w-4" />
                Create Trip
              </>
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
