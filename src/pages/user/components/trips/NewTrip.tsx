import { Button } from "@/components/Button";
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
  // DollarSign,
  Info,
  ArrowLeft,
} from "lucide-react";
import { useForm, Controller, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { useTripStore } from "@/store/tripStore";

// Define the form schema with Zod
const tripSchema = z.object({
  departureLocation: z
    .string()
    .min(2, { message: "departureLocation is required" }),
  destination: z.string().min(2, { message: "Destination is required" }),
  departureDate: z.date({ required_error: "Departure date is required" }),
  arrivalDate: z.date({ required_error: "Arrival Date is required" }),
  availableSpace: z.coerce
    .number()
    .min(0.1, { message: "Maximum Available Space must be greater than 0" }),
  maxSize: z.string().min(1, { message: "Maximum size is required" }),
  pricePerKg: z.coerce
    .number()
    .min(0.1, { message: "Price per kg must be greater than 0" }),
  currency: z.string().min(1, { message: "Currency is required" }),
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
  const { createTrip } = useTripStore();
  const navigate = useNavigate();

  // Initialize react-hook-form
  const form = useForm<TripFormValues>({
    resolver: zodResolver(tripSchema),
    defaultValues: {
      departureLocation: "",
      destination: "",
      availableSpace: 5,
      maxSize: "",
      pricePerKg: 10,
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
      // Validate return date
      // if (data.departureDate >= data.arrivalDate) {
      //   throw new Error("Return date must be after departure date");
      // }

      await createTrip(data);

      console.log("Form submitted:", data);

      // Show success toast
      toast({
        title: "Trip created successfully",
        description: `Your trip from ${data.departureLocation} to ${data.destination} has been created.`,
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
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label
                  htmlFor="departureLocation"
                  className={errors.departureLocation ? "text-destructive" : ""}
                >
                  Departure Location
                </Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Controller
                    name="departureLocation"
                    control={control}
                    render={({ field }) => (
                      <Input
                        id="departureLocation"
                        placeholder="City, Country"
                        className={cn(
                          "pl-10",
                          errors.departureLocation && "border-destructive"
                        )}
                        {...field}
                      />
                    )}
                  />
                </div>
                {errors.departureLocation && (
                  <p className="text-xs text-destructive mt-1">
                    {errors.departureLocation.message}
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
                  className={errors.departureDate ? "text-destructive" : ""}
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
                  htmlFor="arrival-date"
                  className={errors.arrivalDate ? "text-destructive" : ""}
                >
                  Arrival Date
                </Label>
                <Controller
                  name="arrivalDate"
                  control={control}
                  render={({ field }) => (
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !field.value && "text-muted-foreground",
                            errors.arrivalDate && "border-destructive"
                          )}
                          disabled={!departureDate} // Disable if no departure date is selected
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
                          disabled={(date) =>
                            !departureDate || date < departureDate
                          } // Ensure arrival is after departure
                        />
                      </PopoverContent>
                    </Popover>
                  )}
                />
                {errors.arrivalDate && (
                  <p className="text-xs text-destructive mt-1">
                    {errors.arrivalDate.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label
                htmlFor="max-weight"
                className={errors.availableSpace ? "text-destructive" : ""}
              >
                Maximum Available Space (in kg)
              </Label>
              <div className="relative">
                <Package className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Controller
                  name="availableSpace"
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
                        errors.availableSpace && "border-destructive"
                      )}
                      {...field}
                    />
                  )}
                />
              </div>
              {errors.availableSpace && (
                <p className="text-xs text-destructive mt-1">
                  {errors.availableSpace.message}
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
            <div className="space-y-2">
              <Label
                htmlFor="price-per-kg"
                className={errors.pricePerKg ? "text-destructive" : ""}
              >
                Price per KG
              </Label>
              <div className="flex items-center gap-2">
                <Controller
                  name="pricePerKg"
                  control={control}
                  render={({ field }) => (
                    <Input
                      id="price-per-kg"
                      type="number"
                      placeholder="Enter price"
                      min={1} // Prevent negative values
                      step="0.01" // Allow decimals
                      {...field}
                      className={cn(errors.pricePerKg && "border-destructive")}
                    />
                  )}
                />
                <Controller
                  name="currency"
                  control={control}
                  defaultValue="BDT"
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                    >
                      <SelectTrigger
                        className={cn(errors.currency && "border-destructive")}
                      >
                        <SelectValue placeholder="Select currency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="USD">USD</SelectItem>
                        <SelectItem value="BDT">BDT</SelectItem>
                        <SelectItem value="EUR">EUR</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </div>
              {errors.pricePerKg && (
                <p className="text-xs text-destructive mt-1">
                  {errors.pricePerKg.message}
                </p>
              )}
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
