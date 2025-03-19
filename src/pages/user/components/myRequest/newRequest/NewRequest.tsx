"use client";

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
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
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
  ArrowLeft,
} from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "@/hooks/use-toast";

export default function NewRequest() {
  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold tracking-tight">
            Create Package Request
          </h2>
          <p className="text-muted-foreground">
            Find a traveler to carry your package to its destination
          </p>
        </div>
        <Link to="/packages">
          <Button variant="outline" size="sm" className="gap-1">
            <ArrowLeft className="h-4 w-4" />
            Back to Packages
          </Button>
        </Link>
      </div>

      <NewRequestForm />
    </>
  );
}

function NewRequestForm() {
  const [date, setDate] = useState<Date>();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    originCity: "",
    originCountry: "",
    destinationCity: "",
    destinationCountry: "",
    packageSize: "",
    weight: "",
    category: "",
    description: "",
    budget: "",
    urgency: "standard",
    pickupAddress: "",
    deliveryAddress: "",
    recipientName: "",
    recipientPhone: "",
    specialInstructions: "",
    termsAccepted: false,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleCheckboxChange = (name: string, checked: boolean) => {
    setFormData((prevData) => ({ ...prevData, [name]: checked }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Simulate API call with a delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log("Form submitted:", { ...formData, date });

      // Show success toast
      toast({
        title: "Package request created successfully",
        description: `Your request from ${formData.originCity} to ${formData.destinationCity} has been created.`,
      });

      // Redirect to packages page
      navigate("/user/packages");
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

  return (
    <Card className="border-primary/20 max-w-4xl">
      <form onSubmit={handleSubmit}>
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
                <Label htmlFor="originCity">Origin City</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="originCity"
                    name="originCity"
                    value={formData.originCity}
                    onChange={handleChange}
                    placeholder="City"
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="originCountry">Origin Country</Label>
                <Input
                  id="originCountry"
                  name="originCountry"
                  value={formData.originCountry}
                  onChange={handleChange}
                  placeholder="Country"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="destinationCity">Destination City</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="destinationCity"
                    name="destinationCity"
                    value={formData.destinationCity}
                    onChange={handleChange}
                    placeholder="City"
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="destinationCountry">Destination Country</Label>
                <Input
                  id="destinationCountry"
                  name="destinationCountry"
                  value={formData.destinationCountry}
                  onChange={handleChange}
                  placeholder="Country"
                  required
                />
              </div>
            </div>

            <div className="mt-4 space-y-2">
              <Label htmlFor="date">Preferred Delivery Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                    disabled={(date) => date < new Date()}
                  />
                </PopoverContent>
              </Popover>
              <p className="text-xs text-muted-foreground">
                Select the date by which you need your package delivered
              </p>
            </div>
          </div>

          {/* Package Information */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-medium mb-4">Package Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="packageSize">Package Size</Label>
                <Select
                  name="packageSize"
                  onValueChange={(value) =>
                    handleSelectChange("packageSize", value)
                  }
                  required
                >
                  <SelectTrigger>
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
                <p className="text-xs text-muted-foreground">
                  Choose the size that best describes your package
                </p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="weight">Weight (kg)</Label>
                <div className="relative">
                  <Input
                    id="weight"
                    name="weight"
                    type="number"
                    value={formData.weight}
                    onChange={handleChange}
                    placeholder="0.0"
                    min="0.1"
                    step="0.1"
                    required
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  Maximum weight allowed is 20kg
                </p>
              </div>
            </div>

            <div className="space-y-2 mt-4">
              <Label htmlFor="category">Package Category</Label>
              <Select
                name="category"
                onValueChange={(value) => handleSelectChange("category", value)}
                required
              >
                <SelectTrigger>
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
              <p className="text-xs text-muted-foreground">
                Select the category that best describes your package contents
              </p>
            </div>

            <div className="space-y-2 mt-4">
              <Label htmlFor="description">Package Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe your package contents and any special handling instructions"
                rows={3}
                required
              />
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
          <div className="border-t pt-6">
            <h3 className="text-lg font-medium mb-4">Delivery Details</h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="budget">Budget (USD)</Label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="budget"
                    name="budget"
                    type="number"
                    value={formData.budget}
                    onChange={handleChange}
                    placeholder="0.00"
                    className="pl-10"
                    min="1"
                    required
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  How much are you willing to pay the traveler?
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="urgency">Delivery Urgency</Label>
                <RadioGroup
                  defaultValue="standard"
                  onValueChange={(value) =>
                    handleSelectChange("urgency", value)
                  }
                  className="flex space-x-2"
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
                <p className="text-xs text-muted-foreground">
                  Urgent deliveries may require higher compensation
                </p>
              </div>
            </div>

            <div className="space-y-2 mt-4">
              <Label htmlFor="pickupAddress">Pickup Address</Label>
              <Textarea
                id="pickupAddress"
                name="pickupAddress"
                value={formData.pickupAddress}
                onChange={handleChange}
                placeholder="Full address for package pickup"
                rows={2}
                required
              />
            </div>

            <div className="space-y-2 mt-4">
              <Label htmlFor="deliveryAddress">Delivery Address</Label>
              <Textarea
                id="deliveryAddress"
                name="deliveryAddress"
                value={formData.deliveryAddress}
                onChange={handleChange}
                placeholder="Full address for package delivery"
                rows={2}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="recipientName">Recipient Name</Label>
                <Input
                  id="recipientName"
                  name="recipientName"
                  value={formData.recipientName}
                  onChange={handleChange}
                  placeholder="Full name"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="recipientPhone">Recipient Phone</Label>
                <Input
                  id="recipientPhone"
                  name="recipientPhone"
                  value={formData.recipientPhone}
                  onChange={handleChange}
                  placeholder="Include country code"
                  required
                />
              </div>
            </div>

            <div className="space-y-2 mt-4">
              <Label htmlFor="specialInstructions">Special Instructions</Label>
              <Textarea
                id="specialInstructions"
                name="specialInstructions"
                value={formData.specialInstructions}
                onChange={handleChange}
                placeholder="Any additional instructions for the traveler"
                rows={2}
              />
            </div>
          </div>

          {/* Terms and Conditions */}
          <div className="border-t pt-6">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="termsAccepted"
                checked={formData.termsAccepted}
                onCheckedChange={(checked) =>
                  handleCheckboxChange("termsAccepted", checked as boolean)
                }
                required
              />
              <Label htmlFor="termsAccepted" className="text-sm">
                I agree to the{" "}
                <Link to="/terms" className="text-primary hover:underline">
                  Terms of Service
                </Link>{" "}
                and confirm that my package does not contain any prohibited
                items
              </Label>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex justify-between">
          <Button variant="outline" type="button" asChild>
            <Link to="/packages">Cancel</Link>
          </Button>
          <Button type="submit" disabled={!formData.termsAccepted}>
            <Package className="mr-2 h-4 w-4" />
            Create Package Request
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
