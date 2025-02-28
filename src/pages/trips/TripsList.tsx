import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Search, Filter, MapPin, Calendar } from 'lucide-react';
import { useTripStore } from '../../store/tripStore';
import TripCard from '../../components/trips/TripCard';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';

const TripsList: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialQuery = queryParams.get('q') || '';
  
  const { trips, fetchTrips, isLoading } = useTripStore();
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [filteredTrips, setFilteredTrips] = useState(trips);
  const [showFilters, setShowFilters] = useState(false);
  
  // Filter states
  const [departureLocation, setDepartureLocation] = useState('');
  const [destination, setDestination] = useState('');
  const [minSpace, setMinSpace] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  
  useEffect(() => {
    fetchTrips();
  }, [fetchTrips]);
  
  useEffect(() => {
    if (trips.length > 0) {
      applyFilters();
    }
  }, [trips, searchQuery, departureLocation, destination, minSpace, maxPrice]);
  
  const applyFilters = () => {
    let filtered = [...trips];
    
    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        trip => 
          trip.departureLocation.toLowerCase().includes(query) ||
          trip.destination.toLowerCase().includes(query) ||
          trip.description?.toLowerCase().includes(query)
      );
    }
    
    // Apply departure filter
    if (departureLocation) {
      const departure = departureLocation.toLowerCase();
      filtered = filtered.filter(
        trip => trip.departureLocation.toLowerCase().includes(departure)
      );
    }
    
    // Apply destination filter
    if (destination) {
      const dest = destination.toLowerCase();
      filtered = filtered.filter(
        trip => trip.destination.toLowerCase().includes(dest)
      );
    }
    
    // Apply min space filter
    if (minSpace) {
      const minSpaceValue = parseFloat(minSpace);
      filtered = filtered.filter(
        trip => trip.availableSpace >= minSpaceValue
      );
    }
    
    // Apply max price filter
    if (maxPrice) {
      const maxPriceValue = parseFloat(maxPrice);
      filtered = filtered.filter(
        trip => trip.pricePerKg <= maxPriceValue
      );
    }
    
    // Only show active trips
    filtered = filtered.filter(trip => trip.status === 'active');
    
    setFilteredTrips(filtered);
  };
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    applyFilters();
  };
  
  const resetFilters = () => {
    setDepartureLocation('');
    setDestination('');
    setMinSpace('');
    setMaxPrice('');
    setSearchQuery('');
  };
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Find Available Trips</h1>
        <p className="mt-2 text-lg text-gray-600">
          Browse trips from travelers with available luggage space
        </p>
      </div>
      
      {/* Search and Filters */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <form onSubmit={handleSearch} className="mb-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-grow">
              <Input
                type="text"
                placeholder="Search by destination or departure location"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                fullWidth
                className="h-12"
              />
            </div>
            <Button type="submit" className="h-12 px-8">
              <Search className="h-5 w-5 mr-2" />
              Search
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              className="h-12"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter className="h-5 w-5 mr-2" />
              Filters
            </Button>
          </div>
        </form>
        
        {showFilters && (
          <div className="border-t border-gray-200 pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Departure Location
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <MapPin className="h-5 w-5 text-gray-400" />
                  </div>
                  <Input
                    type="text"
                    placeholder="From"
                    value={departureLocation}
                    onChange={(e) => setDepartureLocation(e.target.value)}
                    className="pl-10"
                    fullWidth
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
                    type="text"
                    placeholder="To"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    className="pl-10"
                    fullWidth
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Minimum Space (kg)
                </label>
                <Input
                  type="number"
                  placeholder="Min space"
                  value={minSpace}
                  onChange={(e) => setMinSpace(e.target.value)}
                  min="0"
                  fullWidth
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Maximum Price per kg
                </label>
                <Input
                  type="number"
                  placeholder="Max price"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  min="0"
                  fullWidth
                />
              </div>
            </div>
            
            <div className="mt-4 flex justify-end">
              <Button 
                type="button" 
                variant="outline" 
                className="mr-2"
                onClick={resetFilters}
              >
                Reset
              </Button>
              <Button 
                type="button"
                onClick={applyFilters}
              >
                Apply Filters
              </Button>
            </div>
          </div>
        )}
      </div>
      
      {/* Trip Results */}
      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : filteredTrips.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTrips.map((trip) => (
            <TripCard key={trip.id} trip={trip} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-lg shadow-md">
          <div className="mx-auto h-24 w-24 text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <h3 className="mt-2 text-xl font-medium text-gray-900">No trips found</h3>
          <p className="mt-1 text-gray-500">
            Try adjusting your search or filters to find available trips.
          </p>
        </div>
      )}
    </div>
  );
};

export default TripsList;