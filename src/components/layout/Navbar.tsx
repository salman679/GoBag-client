import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import {
  Menu,
  Bell,
  User,
  LogOut,
  Home,
  Plane,
  // MessageSquare,
  // CreditCard,
  // Settings,
  // HelpCircle,
  Search,
  Package,
  Compass,
} from "lucide-react";
import logo from "../../assets/logo_blue-removebg-preview-removebg-preview.png";
import { Button } from "@/components/Button";
import { SheetContent, SheetTrigger, Sheet } from "../ui/sheet";
import { cn } from "@/lib/utils";

const Navbar: React.FC = () => {
  const { pathname } = useLocation();
  const { user, isAuthenticated, logout } = useAuthStore();
  const [isMobile, setIsMobile] = useState(false);
  const [mobileSheetOpen, setMobileSheetOpen] = useState(false);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // const menuItems = [
  //   { name: "Dashboard", href: "/user/dashboard", icon: Home },
  //   { name: "My Trips", href: "/user/trips", icon: Plane },
  //   { name: "Find Booking", href: "/packages", icon: Search },
  //   { name: "My Packages", href: "/user/requests", icon: Package },
  //   { name: "Find Trips", href: "/trips", icon: Compass },
  //   { name: "Messages", href: "/messages", icon: MessageSquare },
  //   { name: "Notifications", href: "/notifications", icon: Bell },
  //   { name: "Payments", href: "/payments", icon: CreditCard },
  //   { name: "Settings", href: "/settings", icon: Settings },
  //   { name: "Help", href: "/help", icon: HelpCircle },
  // ];

  const menuItems = isAuthenticated
    ? [
        { name: "Dashboard", href: "/user/dashboard", icon: Home },
        { name: "My Trips", href: "/user/trips", icon: Plane },
        { name: "Find Booking", href: "/packages", icon: Search },
        { name: "My Packages", href: "/user/requests", icon: Package },
        { name: "Find Trips", href: "/trips", icon: Compass },
      ]
    : [
        { name: "Home", href: "/", icon: Home },
        { name: "Find Trips", href: "/trips", icon: Compass },
        { name: "Find Booking", href: "/packages", icon: Search },
        { name: "Contact Us", href: "/contact-us", icon: User },
      ];

  return (
    <nav className=" shadow-sm sticky top-0 z-50 backdrop-blur">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="flex items-center">
                <div className="h-36 w-36 ">
                  <img src={logo} alt="logo" />
                </div>
              </Link>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
            <Link
              to="/"
              className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
            >
              Home
            </Link>
            <Link
              to="/trips"
              className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
            >
              Find Trips
            </Link>
            <Link
              to="/packages"
              className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
            >
              Find Packages
            </Link>
            {isAuthenticated && (
              <>
                <Link
                  to={"/user/my-trips"}
                  className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
                >
                  My Trips
                </Link>
                <Link
                  to="/user/bookings"
                  className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
                >
                  My Bookings
                </Link>
              </>
            )}
            {isAuthenticated && user?.role === "admin" && (
              <Link
                to="/admin/dashboard"
                className="inline-flex items-center px-1 pt-1 border-b-2 border-transparent text-sm font-medium text-gray-500 hover:text-gray-700 hover:border-gray-300"
              >
                Admin Dashboard
              </Link>
            )}
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            {isAuthenticated ? (
              <>
                <button className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                  <Bell className="h-6 w-6" />
                </button>
                <div className="ml-3 relative">
                  <div>
                    <button
                      onClick={() => setIsMenuOpen(!isMenuOpen)}
                      className="flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    >
                      {user?.profilePicture ? (
                        <img
                          className="h-8 w-8 rounded-full"
                          src={user.profilePicture}
                          alt={user.name}
                        />
                      ) : (
                        <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                          <User className="h-5 w-5 text-blue-600" />
                        </div>
                      )}
                    </button>
                  </div>
                  {isMenuOpen && (
                    <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                      <Link
                        to={`${
                          isAuthenticated && user?.role === "user"
                            ? "/user/dashboard"
                            : "/admin/dashboard"
                        }`}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Your Dashboard
                      </Link>
                      <button
                        onClick={() => {
                          handleLogout();
                          setIsMenuOpen(false);
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Sign out
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex space-x-4">
                <Link to="/login">
                  <Button variant="outline">Log in</Button>
                </Link>
                <Link to="/register">
                  <Button>Sign up</Button>
                </Link>
              </div>
            )}
          </div>
          <div className="flex items-center sm:hidden">
            {isMobile ? (
              <>
                <Link to={"/trips"}>
                  <button className="px-3 py-2 mr-4 text-[#308EFF] border border-[#308EFF] rounded-md focus:outline-none">
                    Find Trips
                  </button>
                </Link>
                <Sheet open={mobileSheetOpen} onOpenChange={setMobileSheetOpen}>
                  <SheetTrigger asChild>
                    <Button variant="outline">
                      <Menu className="h-5 w-5" />
                      {/* <span className="sr-only">Toggle Menu</span> */}
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="pr-0 w-[280px]">
                    <div className="flex items-center justify-between px-4 py-2 border-b">
                      <div className="h-24 w-24">
                        <img
                          src={logo}
                          alt="logo"
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </div>

                    <div className="px-2 py-4">
                      <nav className="space-y-1">
                        {menuItems.map((item) => (
                          <Link
                            key={item.name}
                            to={item.href}
                            className={cn(
                              "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                              pathname === item.href
                                ? "bg-accent text-accent-foreground"
                                : "transparent"
                            )}
                            onClick={() => setMobileSheetOpen(false)}
                          >
                            <item.icon className="h-4 w-4" />
                            <span>{item.name}</span>
                          </Link>
                        ))}
                      </nav>
                      {!isAuthenticated && (
                        <>
                          <Link
                            to="/login"
                            onClick={() => setMobileSheetOpen(false)}
                          >
                            <button className="block w-full my-2 text-white bg-[#308EFF] text-center px-4 py-2 text-sm rounded">
                              Login
                            </button>
                          </Link>
                          <Link
                            to="/register"
                            onClick={() => setMobileSheetOpen(false)}
                          >
                            <button className="block w-full bg-[#308EFF] text-center px-4 py-2 text-sm text-white rounded">
                              Sign up
                            </button>
                          </Link>
                        </>
                      )}
                    </div>
                  </SheetContent>
                </Sheet>
              </>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="sm:hidden origin-top-right absolute right-2 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
          {isAuthenticated && user?.role === "admin" && (
            <Link
              to="/admin/dashboard"
              className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
              onClick={() => setIsMenuOpen(false)}
            >
              Admin Dashboard
            </Link>
          )}
          {/* </div> */}
          {isAuthenticated ? (
            <div className="pt-4 pb-3 border-t border-gray-200">
              <div className="flex items-center px-4">
                {user?.profilePicture ? (
                  <img
                    className="h-10 w-10 rounded-full"
                    src={user.profilePicture}
                    alt={user.name}
                  />
                ) : (
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <User className="h-6 w-6 text-blue-600" />
                  </div>
                )}
                <div className="ml-3">
                  <div className="text-base font-medium text-gray-800">
                    {user?.name}
                  </div>
                </div>
              </div>

              <div className="">
                <Link
                  to={`${
                    isAuthenticated && user?.role === "user"
                      ? "/user/dashboard"
                      : "/admin/dashboard"
                  }`}
                  className="block px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                  onClick={() => setIsMenuOpen(false)}
                >
                  My Dashboard
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="w-full flex items-center text-left px-4 py-2 text-base font-medium text-gray-500 hover:text-gray-800 hover:bg-gray-100"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <p> Sign out</p>
                </button>
              </div>
            </div>
          ) : (
            <div className="pt-4 pb-3 border-t border-gray-200">
              <div className="flex flex-col space-y-3 px-4">
                <Link
                  to="/login"
                  className="block text-center w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Log in
                </Link>
                <Link
                  to="/register"
                  className="block text-center w-full px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign up
                </Link>
              </div>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
