import React from 'react';
import { Link } from 'react-router-dom';
import { Luggage, Facebook, Twitter, Instagram, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="mb-8 md:mb-0">
            <Link to="/" className="flex items-center">
              <Luggage className="h-8 w-8 text-blue-400" />
              <span className="ml-2 text-xl font-bold">LuggageShare</span>
            </Link>
            <p className="mt-4 text-gray-300 text-sm">
              Connect with travelers and send your luggage worldwide. Save money and help others make the most of their journey.
            </p>
            <div className="mt-6 flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="mailto:info@luggageshare.com" className="text-gray-400 hover:text-white">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-200 tracking-wider uppercase">For Senders</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link to="/how-it-works" className="text-gray-300 hover:text-white text-sm">
                  How It Works
                </Link>
              </li>
              <li>
                <Link to="/trips" className="text-gray-300 hover:text-white text-sm">
                  Find Travelers
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-gray-300 hover:text-white text-sm">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-300 hover:text-white text-sm">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-200 tracking-wider uppercase">For Travelers</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link to="/become-traveler" className="text-gray-300 hover:text-white text-sm">
                  Become a Traveler
                </Link>
              </li>
              <li>
                <Link to="/traveller/trips/create" className="text-gray-300 hover:text-white text-sm">
                  Create a Trip
                </Link>
              </li>
              <li>
                <Link to="/traveller/earnings" className="text-gray-300 hover:text-white text-sm">
                  Earnings
                </Link>
              </li>
              <li>
                <Link to="/safety" className="text-gray-300 hover:text-white text-sm">
                  Safety Guidelines
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold text-gray-200 tracking-wider uppercase">Company</h3>
            <ul className="mt-4 space-y-4">
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white text-sm">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white text-sm">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-300 hover:text-white text-sm">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-300 hover:text-white text-sm">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 border-t border-gray-700 pt-8">
          <p className="text-gray-400 text-sm text-center">
            &copy; {new Date().getFullYear()} LuggageShare. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;