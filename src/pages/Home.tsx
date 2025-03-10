import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Search, Luggage, Plane, CreditCard, Star, Shield } from "lucide-react";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";

const Home: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="text-white bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="px-4 py-20 mx-auto max-w-7xl sm:px-6 lg:px-8 md:py-28">
          <div className="grid items-center grid-cols-1 gap-12 md:grid-cols-2">
            <div>
              <h1 className="text-4xl font-bold leading-tight md:text-5xl">
                Send Your Luggage Worldwide with Trusted Travelers
              </h1>
              <p className="mt-6 text-lg text-blue-100">
                Connect with travelers who have extra luggage space and send
                your items for a fraction of traditional shipping costs.
              </p>
              <div className="flex flex-col gap-4 mt-8 sm:flex-row">
                <Link to="/trips">
                  <Button size="lg" className="w-full sm:w-auto">
                    Find Travelers
                  </Button>
                </Link>
                <Link to="/register">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full text-white border-white sm:w-auto hover:bg-white hover:text-blue-700"
                  >
                    Become a Traveler
                  </Button>
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              <img
                src="https://images.unsplash.com/photo-1581553673739-c4906b5d0de8"
                alt="Luggage and travel"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-8 bg-white">
        <div className="max-w-5xl px-4 mx-auto sm:px-6 lg:px-8">
          <div className="relative z-10 p-6 -mt-16 bg-white rounded-lg shadow-lg">
            <h2 className="mb-4 text-2xl font-bold text-gray-800">
              Find Available Luggage Space
            </h2>
            <div className="flex flex-col gap-4 md:flex-row">
              <div className="flex-grow">
                <Input
                  type="text"
                  placeholder="Enter destination city or country"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  fullWidth
                  className="h-12"
                />
              </div>
              <Link to={`/trips?q=${searchQuery}`}>
                <Button className="h-12 px-8">
                  <Search className="w-5 h-5 mr-2" />
                  Search
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gray-50">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold text-gray-900">How It Works</h2>
            <p className="mt-4 text-xl text-gray-600">
              Simple steps to send or carry luggage
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {/* For Senders */}
            <div className="p-8 bg-white rounded-lg shadow-md">
              <div className="flex items-center justify-center w-16 h-16 mb-6 text-blue-600 bg-blue-100 rounded-full">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="mb-4 text-xl font-bold text-gray-900">
                For Senders
              </h3>
              <ol className="space-y-4 text-gray-600">
                <li className="flex">
                  <span className="flex items-center justify-center flex-shrink-0 w-6 h-6 mr-3 text-sm font-medium text-white bg-blue-600 rounded-full">
                    1
                  </span>
                  <span>Search for travelers going to your destination</span>
                </li>
                <li className="flex">
                  <span className="flex items-center justify-center flex-shrink-0 w-6 h-6 mr-3 text-sm font-medium text-white bg-blue-600 rounded-full">
                    2
                  </span>
                  <span>Book available luggage space</span>
                </li>
                <li className="flex">
                  <span className="flex items-center justify-center flex-shrink-0 w-6 h-6 mr-3 text-sm font-medium text-white bg-blue-600 rounded-full">
                    3
                  </span>
                  <span>Make secure payment through our platform</span>
                </li>
                <li className="flex">
                  <span className="flex items-center justify-center flex-shrink-0 w-6 h-6 mr-3 text-sm font-medium text-white bg-blue-600 rounded-full">
                    4
                  </span>
                  <span>Arrange pickup and delivery details</span>
                </li>
              </ol>
              <div className="mt-8">
                <Link to="/trips">
                  <Button variant="outline" fullWidth>
                    Find Travelers
                  </Button>
                </Link>
              </div>
            </div>

            {/* For Travelers */}
            <div className="p-8 bg-white rounded-lg shadow-md">
              <div className="flex items-center justify-center w-16 h-16 mb-6 text-blue-600 bg-blue-100 rounded-full">
                <Plane className="w-8 h-8" />
              </div>
              <h3 className="mb-4 text-xl font-bold text-gray-900">
                For Travelers
              </h3>
              <ol className="space-y-4 text-gray-600">
                <li className="flex">
                  <span className="flex items-center justify-center flex-shrink-0 w-6 h-6 mr-3 text-sm font-medium text-white bg-blue-600 rounded-full">
                    1
                  </span>
                  <span>Create a trip with your travel details</span>
                </li>
                <li className="flex">
                  <span className="flex items-center justify-center flex-shrink-0 w-6 h-6 mr-3 text-sm font-medium text-white bg-blue-600 rounded-full">
                    2
                  </span>
                  <span>Specify available luggage space and pricing</span>
                </li>
                <li className="flex">
                  <span className="flex items-center justify-center flex-shrink-0 w-6 h-6 mr-3 text-sm font-medium text-white bg-blue-600 rounded-full">
                    3
                  </span>
                  <span>Review and accept booking requests</span>
                </li>
                <li className="flex">
                  <span className="flex items-center justify-center flex-shrink-0 w-6 h-6 mr-3 text-sm font-medium text-white bg-blue-600 rounded-full">
                    4
                  </span>
                  <span>Deliver items and receive payment</span>
                </li>
              </ol>
              <div className="mt-8">
                <Link to="/register?role=traveller">
                  <Button variant="outline" fullWidth>
                    Become a Traveler
                  </Button>
                </Link>
              </div>
            </div>

            {/* Platform Benefits */}
            <div className="p-8 bg-white rounded-lg shadow-md">
              <div className="flex items-center justify-center w-16 h-16 mb-6 text-blue-600 bg-blue-100 rounded-full">
                <Shield className="w-8 h-8" />
              </div>
              <h3 className="mb-4 text-xl font-bold text-gray-900">
                Platform Benefits
              </h3>
              <ul className="space-y-4 text-gray-600">
                <li className="flex">
                  <span className="flex-shrink-0 mr-3 text-blue-600">✓</span>
                  <span>Secure payment processing</span>
                </li>
                <li className="flex">
                  <span className="flex-shrink-0 mr-3 text-blue-600">✓</span>
                  <span>Verified user profiles with reviews</span>
                </li>
                <li className="flex">
                  <span className="flex-shrink-0 mr-3 text-blue-600">✓</span>
                  <span>24/7 customer support</span>
                </li>
                <li className="flex">
                  <span className="flex-shrink-0 mr-3 text-blue-600">✓</span>
                  <span>Luggage protection up to $500</span>
                </li>
                <li className="flex">
                  <span className="flex-shrink-0 mr-3 text-blue-600">✓</span>
                  <span>Transparent pricing with no hidden fees</span>
                </li>
                <li className="flex">
                  <span className="flex-shrink-0 mr-3 text-blue-600">✓</span>
                  <span>Easy communication between parties</span>
                </li>
              </ul>
              <div className="mt-8">
                <Link to="/about">
                  <Button variant="outline" fullWidth>
                    Learn More
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-white">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold text-gray-900">
              Why Choose LuggageShare?
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              Benefits for both senders and travelers
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 text-blue-600 bg-blue-100 rounded-full">
                <CreditCard className="w-8 h-8" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-gray-900">
                Save Money
              </h3>
              <p className="text-gray-600">
                Up to 80% cheaper than traditional shipping methods
              </p>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 text-blue-600 bg-blue-100 rounded-full">
                <Shield className="w-8 h-8" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-gray-900">
                Secure & Safe
              </h3>
              <p className="text-gray-600">
                Verified users, secure payments, and item protection
              </p>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 text-blue-600 bg-blue-100 rounded-full">
                <Plane className="w-8 h-8" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-gray-900">
                Global Network
              </h3>
              <p className="text-gray-600">
                Connect with travelers going to 150+ countries worldwide
              </p>
            </div>

            <div className="text-center">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 text-blue-600 bg-blue-100 rounded-full">
                <Star className="w-8 h-8" />
              </div>
              <h3 className="mb-2 text-lg font-semibold text-gray-900">
                Trusted Community
              </h3>
              <p className="text-gray-600">
                Over 10,000 successful deliveries with 4.8/5 rating
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="text-3xl font-bold text-gray-900">
              What Our Users Say
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              Hear from our community of senders and travelers
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="p-8 bg-white rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="flex-shrink-0">
                  <img
                    className="w-12 h-12 rounded-full"
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330"
                    alt="User"
                  />
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-semibold text-gray-900">
                    Sarah Johnson
                  </h4>
                  <p className="text-gray-600">Sender</p>
                </div>
              </div>
              <div className="flex mb-4 text-yellow-400">
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
              </div>
              <p className="text-gray-600">
                "I needed to send a package to my daughter studying abroad.
                Traditional shipping was going to cost me over $200, but I found
                a traveler on LuggageShare and paid just $45! The process was
                smooth and secure."
              </p>
            </div>

            <div className="p-8 bg-white rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="flex-shrink-0">
                  <img
                    className="w-12 h-12 rounded-full"
                    src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e"
                    alt="User"
                  />
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-semibold text-gray-900">
                    Michael Chen
                  </h4>
                  <p className="text-gray-600">Traveler</p>
                </div>
              </div>
              <div className="flex mb-4 text-yellow-400">
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
              </div>
              <p className="text-gray-600">
                "As a frequent traveler, I always have extra space in my
                luggage. LuggageShare helps me offset my travel costs by earning
                money for space I wasn't using anyway. I've made over $1,200 in
                the past year!"
              </p>
            </div>

            <div className="p-8 bg-white rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="flex-shrink-0">
                  <img
                    className="w-12 h-12 rounded-full"
                    src="https://images.unsplash.com/photo-1580489944761-15a19d654956"
                    alt="User"
                  />
                </div>
                <div className="ml-4">
                  <h4 className="text-lg font-semibold text-gray-900">
                    Elena Rodriguez
                  </h4>
                  <p className="text-gray-600">Sender</p>
                </div>
              </div>
              <div className="flex mb-4 text-yellow-400">
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
                <Star className="w-5 h-5 fill-current" />
              </div>
              <p className="text-gray-600">
                "I run a small online business and shipping internationally was
                eating into my profits. With LuggageShare, I can send products
                to my international customers at a fraction of the cost. Game
                changer!"
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 text-white bg-blue-600">
        <div className="px-4 mx-auto text-center max-w-7xl sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold">Ready to Get Started?</h2>
          <p className="max-w-3xl mx-auto mt-4 text-xl text-blue-100">
            Join thousands of users who are already saving money and making
            extra income through luggage sharing.
          </p>
          <div className="flex flex-col justify-center gap-4 mt-8 sm:flex-row">
            <Link to="/register">
              <Button
                size="lg"
                className="w-full text-blue-500 bg-white hover:bg-blue-50 sm:w-auto"
              >
                Sign Up Now
              </Button>
            </Link>
            <Link to="/how-it-works">
              <Button
                size="lg"
                variant="outline"
                className="w-full text-white border-white hover:bg-blue-700 sm:w-auto"
              >
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
