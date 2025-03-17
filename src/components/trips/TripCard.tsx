import React from "react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { MapPin, Calendar, Weight, DollarSign, User } from "lucide-react";
import { Trip } from "../../types";
import { Card, CardContent, CardFooter } from "../ui/Card";
import { Button } from "../Button";

interface TripCardProps {
  trip: Trip;
}

const TripCard: React.FC<TripCardProps> = ({ trip }) => {
  return (
    <Card className="h-full flex flex-col">
      <CardContent className="flex-grow">
        <div className="flex items-start justify-between">
          <div className="flex items-center">
            {trip.travellerProfilePic ? (
              <img
                src={trip.travellerProfilePic}
                alt={trip.travellerName}
                className="h-10 w-10 rounded-full object-cover"
              />
            ) : (
              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                <User className="h-6 w-6 text-blue-600" />
              </div>
            )}
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-900">
                {trip.travellerName}
              </p>
              <p className="text-xs text-gray-500">Traveller</p>
            </div>
          </div>
          <div className="px-2 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-medium">
            {trip.status}
          </div>
        </div>

        <div className="mt-4 space-y-3">
          <div className="flex items-start">
            <MapPin className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
            <div className="ml-2">
              <p className="text-sm text-gray-500">From</p>
              <p className="text-sm font-medium text-gray-900">
                {trip.departureLocation}
              </p>
            </div>
          </div>

          <div className="flex items-start">
            <MapPin className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
            <div className="ml-2">
              <p className="text-sm text-gray-500">To</p>
              <p className="text-sm font-medium text-gray-900">
                {trip.destination}
              </p>
            </div>
          </div>

          <div className="flex items-start">
            <Calendar className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
            <div className="ml-2">
              <p className="text-sm text-gray-500">Departure Date</p>
              <p className="text-sm font-medium text-gray-900">
                {format(new Date(trip.departureDate), "MMM dd, yyyy")}
              </p>
            </div>
          </div>

          <div className="flex items-start">
            <Weight className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
            <div className="ml-2">
              <p className="text-sm text-gray-500">Available Space</p>
              <p className="text-sm font-medium text-gray-900">
                {trip.availableSpace} kg
              </p>
            </div>
          </div>

          <div className="flex items-start">
            <DollarSign className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" />
            <div className="ml-2">
              <p className="text-sm text-gray-500">Price per kg</p>
              <p className="text-sm font-medium text-gray-900">
                {trip.pricePerKg} {trip.currency}
              </p>
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="border-t border-gray-200 bg-gray-50">
        <Link to={`/trips/${trip.id}`} className="w-full">
          <Button fullWidth>View Details</Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default TripCard;
