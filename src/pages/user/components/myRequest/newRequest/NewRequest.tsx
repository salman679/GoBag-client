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
  Package,
  MapPin,
  DollarSign,
  AlertCircle,
} from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useForm, Controller, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";
import { usePackageStore } from "@/store/packageStore";
import { Button } from "@/components/Button";

// Define the form schema with Zod
const packageRequestSchema = z.object({
  departureCity: z.string().min(2, { message: "Departure city is required" }),
  departureCountry: z
    .string()
    .min(2, { message: "Departure country is required" }),
  destinationCity: z
    .string()
    .min(2, { message: "Destination city is required" }),
  destinationCountry: z
    .string()
    .min(2, { message: "Destination country is required" }),
  deliveryDate: z.date({ required_error: "Delivery date is required" }),
  packageSize: z.string().min(1, { message: "Package size is required" }),
  weight: z.coerce
    .number()
    .min(0.1, { message: "Weight must be at least 0.1 kg" })
    .max(20, { message: "Maximum weight allowed is 20kg" }),
  description: z.string().min(10, {
    message: "Please provide a detailed description (min 10 characters)",
  }),
  budget: z.coerce.number().min(1, { message: "Budget must be at least $1" }),
  currency: z.string().min(1, { message: "Currency is required" }),
  urgency: z.enum(["standard", "urgent", "flexible"]),
  recipientName: z.string().min(2, { message: "Recipient name is required" }),
  recipientPhone: z
    .string()
    .min(5, { message: "Valid recipient phone is required" }),
  specialInstructions: z.string().optional(),
  termsAccepted: z.literal(true, {
    errorMap: () => ({ message: "You must accept the terms and conditions" }),
  }),
});

type PackageRequestFormValues = z.infer<typeof packageRequestSchema>;

export default function NewRequestPage() {
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold tracking-tight">
            Create Package Request
          </h2>
          <p className="text-muted-foreground">
            Find a traveler to carry your package to its destination
          </p>
        </div>
        {/* <Link to="/packages">
          <Button
            variant="outline"
            size="sm"
            className="gap-1 w-full sm:w-auto"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Packages
          </Button>
        </Link> */}
      </div>

      <NewRequestForm />
    </div>
  );
}

function NewRequestForm() {
  const navigate = useNavigate();
  const { createPackage } = usePackageStore();

  // Initialize react-hook-form with zod resolver
  const form = useForm<PackageRequestFormValues>({
    resolver: zodResolver(packageRequestSchema),
    defaultValues: {
      departureCity: "",
      departureCountry: "",
      destinationCity: "",
      destinationCountry: "",
      packageSize: "",
      weight: 0,
      description: "",
      budget: 0,
      urgency: "standard",
      currency: "",
      recipientName: "",
      recipientPhone: "",
      specialInstructions: "",
      termsAccepted: true,
    },
  });

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = form;

  const onSubmit: SubmitHandler<PackageRequestFormValues> = async (data) => {
    try {
      await createPackage(data);

      console.log("Form submitted:", data);

      // Show success toast
      toast({
        title: "Package request created successfully",
        description: `Your request from ${data.departureCity} to ${data.destinationCity} has been created.`,
      });

      // Redirect to packages page
      navigate("/packages");
    } catch (error) {
      console.error("Error submitting form:", error);
      toast({
        title: "Error creating package request",
        description:
          "There was an error creating your package request. Please try again.",
        variant: "destructive",
      });
    }
  };

  console.log("Form errors:", errors);

  return (
    <Card className="border-primary/20 max-w-4xl mx-auto">
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardHeader>
          <div className="flex items-center space-x-3">
            <div className="rounded-full bg-primary/10 p-2">
              <Package className="h-5 w-5 text-primary" />
            </div>
            <CardTitle>Package Details</CardTitle>
          </div>
          <CardDescription>
            Provide information about your package and shipping requirements
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Route Information */}
          <div>
            <h3 className="text-lg font-medium mb-4">Route Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label
                  htmlFor="departureCity"
                  className={errors.departureCity ? "text-destructive" : ""}
                >
                  Origin City
                </Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Controller
                    name="departureCity"
                    control={control}
                    render={({ field }) => (
                      <Input
                        id="departureCity"
                        placeholder="City"
                        className={cn(
                          "pl-10",
                          errors.departureCity && "border-destructive"
                        )}
                        {...field}
                      />
                    )}
                  />
                </div>
                {errors.departureCity && (
                  <p className="text-xs text-destructive mt-1">
                    {errors.departureCity.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="departureCountry"
                  className={errors.departureCountry ? "text-destructive" : ""}
                >
                  Origin Country
                </Label>
                <Controller
                  name="departureCountry"
                  control={control}
                  render={({ field }) => (
                    <Input
                      id="departureCountry"
                      placeholder="Country"
                      className={cn(
                        errors.departureCountry && "border-destructive"
                      )}
                      {...field}
                    />
                  )}
                />
                {errors.departureCountry && (
                  <p className="text-xs text-destructive mt-1">
                    {errors.departureCountry.message}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="space-y-2">
                <Label
                  htmlFor="destinationCity"
                  className={errors.destinationCity ? "text-destructive" : ""}
                >
                  Destination City
                </Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Controller
                    name="destinationCity"
                    control={control}
                    render={({ field }) => (
                      <Input
                        id="destinationCity"
                        placeholder="City"
                        className={cn(
                          "pl-10",
                          errors.destinationCity && "border-destructive"
                        )}
                        {...field}
                      />
                    )}
                  />
                </div>
                {errors.destinationCity && (
                  <p className="text-xs text-destructive mt-1">
                    {errors.destinationCity.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="destinationCountry"
                  className={
                    errors.destinationCountry ? "text-destructive" : ""
                  }
                >
                  Destination Country
                </Label>
                <Controller
                  name="destinationCountry"
                  control={control}
                  render={({ field }) => (
                    <Input
                      id="destinationCountry"
                      placeholder="Country"
                      className={cn(
                        errors.destinationCountry && "border-destructive"
                      )}
                      {...field}
                    />
                  )}
                />
                {errors.destinationCountry && (
                  <p className="text-xs text-destructive mt-1">
                    {errors.destinationCountry.message}
                  </p>
                )}
              </div>
            </div>

            <div className="mt-4 space-y-2">
              <Label
                htmlFor="deliveryDate"
                className={errors.deliveryDate ? "text-destructive" : ""}
              >
                Preferred Delivery Date
              </Label>
              <Controller
                name="deliveryDate"
                control={control}
                render={({ field }) => (
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !field.value && "text-muted-foreground",
                          errors.deliveryDate && "border-destructive"
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
              {errors.deliveryDate && (
                <p className="text-xs text-destructive mt-1">
                  {errors.deliveryDate.message}
                </p>
              )}
              <p className="text-xs text-muted-foreground">
                Select the date by which you need your package delivered
              </p>
            </div>
          </div>

          {/* Package Information */}
          <div className="">
            {/* <h3 className="text-lg font-medium mb-4">Package Information</h3> */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label
                  htmlFor="packageSize"
                  className={errors.packageSize ? "text-destructive" : ""}
                >
                  Package Size
                </Label>
                <Controller
                  name="packageSize"
                  control={control}
                  render={({ field }) => (
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger
                        className={
                          errors.packageSize ? "border-destructive" : ""
                        }
                      >
                        <SelectValue placeholder="Select size" />
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
                {errors.packageSize && (
                  <p className="text-xs text-destructive mt-1">
                    {errors.packageSize.message}
                  </p>
                )}
                <p className="text-xs text-muted-foreground">
                  Choose the size that best describes your package
                </p>
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="weight"
                  className={errors.weight ? "text-destructive" : ""}
                >
                  Weight (kg)
                </Label>
                <Controller
                  name="weight"
                  control={control}
                  render={({ field }) => (
                    <Input
                      id="weight"
                      type="number"
                      placeholder="0.0"
                      min="0.1"
                      step="0.1"
                      className={errors.weight ? "border-destructive" : ""}
                      {...field}
                    />
                  )}
                />
                {errors.weight && (
                  <p className="text-xs text-destructive mt-1">
                    {errors.weight.message}
                  </p>
                )}
                <p className="text-xs text-muted-foreground">
                  Maximum weight allowed is 20kg
                </p>
              </div>
            </div>

            {/* <div className="space-y-2 mt-4">
              <Label
                htmlFor="category"
                className={errors.category ? "text-destructive" : ""}
              >
                Package Category
              </Label>
              <Controller
                name="category"
                control={control}
                render={({ field }) => (
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger
                      className={errors.category ? "border-destructive" : ""}
                    >
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="documents">Documents</SelectItem>
                      <SelectItem value="electronics">Electronics</SelectItem>
                      <SelectItem value="clothing">Clothing</SelectItem>
                      <SelectItem value="gifts">Gifts</SelectItem>
                      <SelectItem value="food">Non-perishable Food</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.category && (
                <p className="text-xs text-destructive mt-1">
                  {errors.category.message}
                </p>
              )}
              <p className="text-xs text-muted-foreground">
                Select the category that best describes your package contents
              </p>
            </div> */}

            <div className="space-y-2 mt-4">
              <Label
                htmlFor="description"
                className={errors.description ? "text-destructive" : ""}
              >
                Package Description
              </Label>
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <Textarea
                    id="description"
                    placeholder="Describe your package contents and any special handling instructions"
                    rows={3}
                    className={errors.description ? "border-destructive" : ""}
                    {...field}
                  />
                )}
              />
              {errors.description && (
                <p className="text-xs text-destructive mt-1">
                  {errors.description.message}
                </p>
              )}
            </div>

            <div className="bg-amber-50 dark:bg-amber-950/20 p-4 rounded-md mt-4 flex items-start space-x-2">
              <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-amber-800 dark:text-amber-300">
                  Prohibited Items
                </p>
                <p className="text-amber-700 dark:text-amber-400">
                  Illegal substances, dangerous goods, perishable items, and
                  valuables over $1,000 are not allowed.
                  <Link to="/prohibited-items" className="underline ml-1">
                    View full list
                  </Link>
                </p>
              </div>
            </div>
          </div>

          {/* Delivery Details */}
          <div className="">
            {/* <h3 className="text-lg font-medium mb-4">Delivery Details</h3> */}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label
                  htmlFor="budget"
                  className={errors.budget ? "text-destructive" : ""}
                >
                  Budget (USD)
                </Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Controller
                    name="budget"
                    control={control}
                    render={({ field }) => (
                      <Input
                        id="budget"
                        type="number"
                        placeholder="0.00"
                        min="1"
                        className={cn(
                          "pl-10",
                          errors.budget && "border-destructive"
                        )}
                        {...field}
                      />
                    )}
                  />
                </div>
                {errors.budget && (
                  <p className="text-xs text-destructive mt-1">
                    {errors.budget.message}
                  </p>
                )}
                <p className="text-xs text-muted-foreground">
                  How much are you willing to pay the traveler?
                </p>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="currency"
                  className={errors.currency ? "text-destructive" : ""}
                >
                  Currency
                </Label>
                <Controller
                  name="currency"
                  control={control}
                  render={({ field }) => (
                    <select
                      id="currency"
                      className={cn(
                        "w-full p-2 border rounded-md",
                        errors.currency && "border-destructive"
                      )}
                      {...field}
                    >
                      <option value="USD">USD</option>
                      <option value="EUR">EUR</option>
                      <option value="BDT">BDT</option>
                      <option value="GBP">GBP</option>
                    </select>
                  )}
                />
                {errors.currency && (
                  <p className="text-xs text-destructive mt-1">
                    {errors.currency.message}
                  </p>
                )}
                <p className="text-xs text-muted-foreground">
                  Select the currency for the budget.
                </p>
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="urgency"
                  className={errors.urgency ? "text-destructive" : ""}
                >
                  Delivery Urgency
                </Label>
                <Controller
                  name="urgency"
                  control={control}
                  render={({ field }) => (
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-wrap gap-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="standard" id="standard" />
                        <Label htmlFor="standard" className="cursor-pointer">
                          Standard
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="urgent" id="urgent" />
                        <Label htmlFor="urgent" className="cursor-pointer">
                          Urgent
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="flexible" id="flexible" />
                        <Label htmlFor="flexible" className="cursor-pointer">
                          Flexible
                        </Label>
                      </div>
                    </RadioGroup>
                  )}
                />
                {errors.urgency && (
                  <p className="text-xs text-destructive mt-1">
                    {errors.urgency.message}
                  </p>
                )}
                <p className="text-xs text-muted-foreground">
                  Urgent deliveries may require higher compensation
                </p>
              </div>
            </div>

            {/* <div className="space-y-2 mt-4">
              <Label
                htmlFor="pickupAddress"
                className={errors.pickupAddress ? "text-destructive" : ""}
              >
                Pickup Address
              </Label>
              <Controller
                name="pickupAddress"
                control={control}
                render={({ field }) => (
                  <Textarea
                    id="pickupAddress"
                    placeholder="Full address for package pickup"
                    rows={2}
                    className={errors.pickupAddress ? "border-destructive" : ""}
                    {...field}
                  />
                )}
              />
              {errors.pickupAddress && (
                <p className="text-xs text-destructive mt-1">
                  {errors.pickupAddress.message}
                </p>
              )}
            </div>

            <div className="space-y-2 mt-4">
              <Label
                htmlFor="deliveryAddress"
                className={errors.deliveryAddress ? "text-destructive" : ""}
              >
                Delivery Address
              </Label>
              <Controller
                name="deliveryAddress"
                control={control}
                render={({ field }) => (
                  <Textarea
                    id="deliveryAddress"
                    placeholder="Full address for package delivery"
                    rows={2}
                    className={
                      errors.deliveryAddress ? "border-destructive" : ""
                    }
                    {...field}
                  />
                )}
              />
              {errors.deliveryAddress && (
                <p className="text-xs text-destructive mt-1">
                  {errors.deliveryAddress.message}
                </p>
              )}
            </div> */}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="space-y-2">
                <Label
                  htmlFor="recipientName"
                  className={errors.recipientName ? "text-destructive" : ""}
                >
                  Recipient Name
                </Label>
                <Controller
                  name="recipientName"
                  control={control}
                  render={({ field }) => (
                    <Input
                      id="recipientName"
                      placeholder="Full name"
                      className={
                        errors.recipientName ? "border-destructive" : ""
                      }
                      {...field}
                    />
                  )}
                />
                {errors.recipientName && (
                  <p className="text-xs text-destructive mt-1">
                    {errors.recipientName.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="recipientPhone"
                  className={errors.recipientPhone ? "text-destructive" : ""}
                >
                  Recipient Phone
                </Label>
                <Controller
                  name="recipientPhone"
                  control={control}
                  render={({ field }) => (
                    <Input
                      id="recipientPhone"
                      placeholder="Include country code"
                      className={
                        errors.recipientPhone ? "border-destructive" : ""
                      }
                      {...field}
                    />
                  )}
                />
                {errors.recipientPhone && (
                  <p className="text-xs text-destructive mt-1">
                    {errors.recipientPhone.message}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2 mt-4">
              <Label htmlFor="specialInstructions">Special Instructions</Label>
              <Controller
                name="specialInstructions"
                control={control}
                render={({ field }) => (
                  <Textarea
                    id="specialInstructions"
                    placeholder="Any additional instructions for the traveler"
                    rows={2}
                    {...field}
                  />
                )}
              />
            </div>
          </div>

          {/* Terms and Conditions */}
          <div className="border-t pt-6">
            <div className="flex items-start space-x-2">
              <Controller
                name="termsAccepted"
                control={control}
                render={({ field }) => (
                  <Checkbox
                    id="termsAccepted"
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    className={errors.termsAccepted ? "border-destructive" : ""}
                  />
                )}
              />
              <div className="space-y-1">
                <Label
                  htmlFor="termsAccepted"
                  className={cn(
                    "text-sm",
                    errors.termsAccepted && "text-destructive"
                  )}
                >
                  I agree to the{" "}
                  <Link to="/terms" className="text-primary hover:underline">
                    Terms of Service
                  </Link>{" "}
                  and confirm that my package does not contain any prohibited
                  items
                </Label>
                {errors.termsAccepted && (
                  <p className="text-xs text-destructive">
                    {errors.termsAccepted.message}
                  </p>
                )}
              </div>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex flex-col sm:flex-row justify-between gap-3">
          <Button
            variant="outline"
            type="button"
            asChild
            className="w-full sm:w-auto"
          >
            <Link to="/packages">Cancel</Link>
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full sm:w-auto"
          >
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
                <Package className="mr-2 h-4 w-4" />
                Create Package Request
              </>
            )}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
