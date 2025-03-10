import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { MapPin, Calendar, Weight, DollarSign, Info } from "lucide-react";
import { useTripStore } from "../../store/tripStore";
import { useAuthStore } from "../../store/authStore";
import { Button } from "../../components/ui/Button";
import { Input } from "../../components/ui/Input";
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from "../../components/ui/Card";

interface CreateTripFormData {
  departureLocation: string;
  destination: string;
  departureDate: string;
  arrivalDate: string;
  availableSpace: number;
  pricePerKg: number;
  currency: string;
  description: string;
}

const CreateTrip: React.FC = () => {
  const { createTrip, isLoading } = useTripStore();
  const { user, isAuthenticated } = useAuthStore();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CreateTripFormData>({
    defaultValues: {
      currency: "USD",
      availableSpace: 5,
      pricePerKg: 10,
    },
  });

  const departureDate = watch("departureDate");

  const onSubmit = async (data: CreateTripFormData) => {
    if (!user) return;

    try {
      setError(null);

      await createTrip({
        travellerId: user.id,
        departureLocation: data.departureLocation,
        destination: data.destination,
        departureDate: new Date(data.departureDate),
        arrivalDate: new Date(data.arrivalDate),
        availableSpace: data.availableSpace,
        pricePerKg: data.pricePerKg,
        currency: data.currency,
        description: data.description,
      });

      navigate("/traveller/trips");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An error occurred while creating the trip");
      }
    }
  };

  if (!isAuthenticated || user?.role !== "traveller") {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Card>
          <CardContent className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Access Denied
            </h2>
            <p className="text-gray-600 mb-6">
              You need to be logged in as a traveller to create a trip.
            </p>
            <Button onClick={() => navigate("/login")}>Log In</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">
        Create a New Trip
      </h1>

      <Card>
        <CardHeader>
          <h2 className="text-xl font-medium text-gray-900">Trip Details</h2>
          <p className="text-gray-600 text-sm mt-1">
            Provide information about your upcoming trip
          </p>
        </CardHeader>

        <CardContent>
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
              <div className="flex">
                <div className="flex-shrink-0">
                  <svg
                    className="h-5 w-5 text-red-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                    />
                  </svg>
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">Error</h3>
                  <div className="mt-2 text-sm text-red-700">
                    <p>{error}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Departure Location
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MapPin className="h-5 w-5 text-gray-400" />
                  </div>
                  <Input
                    {...register("departureLocation", {
                      required: "Departure location is required",
                    })}
                    placeholder="City, Country"
                    className="pl-10"
                    fullWidth
                    error={errors.departureLocation?.message}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Destination
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MapPin className="h-5 w-5 text-gray-400" />
                  </div>
                  <Input
                    {...register("destination", {
                      required: "Destination is required",
                    })}
                    placeholder="City, Country"
                    className="pl-10"
                    fullWidth
                    error={errors.destination?.message}
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Departure Date
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Calendar className="h-5 w-5 text-gray-400" />
                  </div>
                  <Input
                    type="date"
                    {...register("departureDate", {
                      required: "Departure date is required",
                      validate: (value) => {
                        const today = new Date();
                        today.setHours(0, 0, 0, 0);
                        return (
                          new Date(value) >= today ||
                          "Departure date must be in the future"
                        );
                      },
                    })}
                    className="pl-10"
                    fullWidth
                    error={errors.departureDate?.message}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Arrival Date
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Calendar className="h-5 w-5 text-gray-400" />
                  </div>
                  <Input
                    type="date"
                    {...register("arrivalDate", {
                      required: "Arrival date is required",
                      validate: (value) => {
                        if (!departureDate) return true;
                        return (
                          new Date(value) >= new Date(departureDate) ||
                          "Arrival date must be after departure date"
                        );
                      },
                    })}
                    className="pl-10"
                    fullWidth
                    error={errors.arrivalDate?.message}
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Available Space (kg)
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Weight className="h-5 w-5 text-gray-400" />
                  </div>
                  <Input
                    type="number"
                    {...register("availableSpace", {
                      required: "Available space is required",
                      min: {
                        value: 0.1,
                        message: "Must be greater than 0",
                      },
                      max: {
                        value: 30,
                        message: "Maximum 30kg allowed",
                      },
                    })}
                    className="pl-10"
                    fullWidth
                    error={errors.availableSpace?.message}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price per kg
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <DollarSign className="h-5 w-5 text-gray-400" />
                  </div>
                  <Input
                    type="number"
                    {...register("pricePerKg", {
                      required: "Price is required",
                      min: {
                        value: 1,
                        message: "Minimum price is 1",
                      },
                    })}
                    className="pl-10"
                    fullWidth
                    error={errors.pricePerKg?.message}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Currency
                </label>
                <select
                  {...register("currency", {
                    required: "Currency is required",
                  })}
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="USD">USD</option>
                  <option value="EUR">EUR</option>
                  <option value="GBP">GBP</option>
                  <option value="CAD">CAD</option>
                  <option value="AUD">AUD</option>
                </select>
                {errors.currency && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.currency.message}
                  </p>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Trip Description (Optional)
              </label>
              <textarea
                {...register("description")}
                rows={4}
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                placeholder="Provide additional details about your trip, luggage restrictions, etc."
              />
            </div>

            <div className="bg-blue-50 p-4 rounded-md">
              <div className="flex">
                <div className="flex-shrink-0">
                  <Info className="h-5 w-5 text-blue-400" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-blue-800">
                    Important Information
                  </h3>
                  <div className="mt-2 text-sm text-blue-700">
                    <p>
                      • You'll be responsible for carrying the sender's items in
                      your luggage.
                    </p>
                    <p>
                      • Ensure you're aware of airline regulations and customs
                      requirements.
                    </p>
                    <p>
                      • The platform charges a 10% service fee on your earnings.
                    </p>
                    <p>
                      • Payment will be released to you after successful
                      delivery confirmation.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                required
              />
              <label
                htmlFor="terms"
                className="ml-2 block text-sm text-gray-900"
              >
                I confirm that I have read and agree to the{" "}
                <a
                  href="#"
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  Traveller Guidelines
                </a>{" "}
                and{" "}
                <a
                  href="#"
                  className="font-medium text-blue-600 hover:text-blue-500"
                >
                  Terms of Service
                </a>
              </label>
            </div>

            <Button type="submit" fullWidth isLoading={isLoading}>
              Create Trip
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default CreateTrip;
