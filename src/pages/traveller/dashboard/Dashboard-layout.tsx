import type React from "react";

import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Calendar,
  CreditCard,
  Home,
  MessageSquare,
  Package,
  Settings,
  Shield,
  Menu,
  X,
} from "lucide-react";
import { Button } from "@/components/Button";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { ModeToggle } from "./mode-toggle";
import { useIsMobile } from "@/hooks/use-mobile";

const navigation = [
  // { name: "Dashboard", href: "/", icon: Home },
  { name: "Trips", href: "/traveler/dashboard/trips", icon: Calendar },
  {
    name: "Shipping Requests",
    href: "/traveler/dashboard/requests",
    icon: Package,
  },
  { name: "Earnings", href: "/traveler/dashboard/earnings", icon: CreditCard },
  {
    name: "Messages",
    href: "/traveler/dashboard/messages",
    icon: MessageSquare,
  },
  { name: "Trust & Safety", href: "/traveler/dashboard/trust", icon: Shield },
  { name: "Settings", href: "/traveler/dashboard/settings", icon: Settings },
];

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const location = useLocation();
  const isMobile = useIsMobile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar for desktop */}
      <aside
        className={`static inset-y-0 z-50  bg-sidebar text-sidebar-foreground border-r transition-all duration-300 ${
          sidebarCollapsed ? "w-16" : "w-64"
        } hidden md:flex md:flex-col`}
      >
        {/* Sidebar header */}
        <div className="flex h-14 items-center justify-between border-b px-4">
          <div className="flex items-center gap-2">
            <Home className="h-6 w-6" />
            {!sidebarCollapsed && (
              <span className="text-lg font-bold">Dashboard</span>
            )}
          </div>
          {!sidebarCollapsed && (
            <button
              onClick={() => setSidebarCollapsed(true)}
              className="h-6 w-6"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Sidebar content */}
        <div className="flex-1 overflow-auto py-2">
          <nav className="flex flex-col gap-1 px-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium ${
                  location.pathname === item.href
                    ? "bg-sidebar-accent text-sidebar-accent-foreground"
                    : "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                } ${sidebarCollapsed ? "justify-center px-0" : ""}`}
              >
                <item.icon className="h-5 w-5" />
                {!sidebarCollapsed && <span>{item.name}</span>}
              </Link>
            ))}
          </nav>
        </div>

        {/* Sidebar footer */}
        {/* <div className="border-t p-4">
          <div
            className={`flex items-center ${
              sidebarCollapsed ? "justify-center" : "justify-between"
            }`}
          >
            {!sidebarCollapsed && (
              <div className="flex items-center gap-2">
                <Avatar>
                  <AvatarImage
                    src="/placeholder.svg?height=32&width=32"
                    alt="User"
                  />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">John Doe</p>
                  <p className="text-xs text-muted-foreground">
                    Verified Traveler
                  </p>
                </div>
              </div>
            )}
           
          </div>
        </div> */}
      </aside>

      {/* Main content */}
      <div
        className={`flex-1 ${!isMobile ? "" : ""} ${
          sidebarCollapsed && !isMobile ? "" : ""
        }`}
      >
        {/* Mobile header */}
        {isMobile && (
          <div className="flex items-center justify-between border-b p-4">
            <div className="flex items-center gap-2">
              <Home className="h-6 w-6" />
              <span className="text-lg font-bold">Dashboard</span>
            </div>
            <div className="flex items-center gap-2">
              {/* <ModeToggle /> */}
              <Button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                {mobileMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>
        )}

        {/* Mobile menu */}
        {isMobile && mobileMenuOpen && (
          <div className="border-b p-4">
            <nav className="flex flex-col space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center gap-2 rounded-md p-2 ${
                    location.pathname === item.href
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </Link>
              ))}
            </nav>
          </div>
        )}

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>

      {/* Sidebar toggle button for desktop (when collapsed) */}
      {sidebarCollapsed && !isMobile && (
        <Button
          className="fixed bottom-4 left-4 z-50 h-10 w-10 rounded-full bg-primary text-primary-foreground shadow-lg"
          onClick={() => setSidebarCollapsed(false)}
        >
          <Menu className="h-5 w-5" />
        </Button>
      )}
    </div>
  );
}
