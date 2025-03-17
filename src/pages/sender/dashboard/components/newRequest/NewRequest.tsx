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
import { Button } from "@/components/Button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function NewRequest() {
  const [formData, setFormData] = useState({
    from: "",
    to: "",
    date: "",
    packageSize: "",
    weight: "",
    description: "",
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Here you would typically send the data to your backend
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          New Shipping Request
        </h1>
        <p className="text-muted-foreground">
          Create a new request for a traveler to carry your package
        </p>
      </div>

      <Card>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Shipping Details</CardTitle>
            <CardDescription>
              Provide information about your shipment
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="from">From</Label>
                <Input
                  id="from"
                  name="from"
                  value={formData.from}
                  onChange={handleChange}
                  placeholder="City, Country"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="to">To</Label>
                <Input
                  id="to"
                  name="to"
                  value={formData.to}
                  onChange={handleChange}
                  placeholder="City, Country"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="date">Preferred Date</Label>
              <Input
                id="date"
                name="date"
                type="date"
                value={formData.date}
                onChange={handleChange}
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="packageSize">Package Size</Label>
                <Select
                  name="packageSize"
                  onValueChange={(value) =>
                    handleSelectChange("packageSize", value)
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="small">Small</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="large">Large</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="weight">Weight (kg)</Label>
                <Input
                  id="weight"
                  name="weight"
                  type="number"
                  value={formData.weight}
                  onChange={handleChange}
                  placeholder="0.0"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Package Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe your package and any special handling instructions"
                required
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit">Create Request</Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
