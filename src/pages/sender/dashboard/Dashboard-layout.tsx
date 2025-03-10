import type React from "react";

import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Package, PlusCircle, List, User, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import { useIsMobile } from "@/hooks/use-mobile";

const navigation = [
  { name: "Dashboard", href: "/sender/dashboard", icon: Package },
  { name: "New Request", href: "/sender/new-request", icon: PlusCircle },
  { name: "My Requests", href: "/sender/requests", icon: List },
  { name: "Profile", href: "/sender/profile", icon: User },
];

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function SenderDashboardLayout({
  children,
}: DashboardLayoutProps) {
  const location = useLocation();
  const isMobile = useIsMobile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar for desktop */}
      <aside className="hidden w-64 flex-col border-r bg-card md:flex">
        <div className="flex h-14 items-center border-b px-4">
          <Package className="h-6 w-6 text-primary" />
          <span className="ml-2 text-lg font-bold">SendSecure</span>
        </div>
        <nav className="flex-1 space-y-1 p-2">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={`flex items-center rounded-md px-3 py-2 text-sm font-medium ${
                location.pathname === item.href
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              }`}
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.name}
            </Link>
          ))}
        </nav>
        <div className="border-t p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Avatar>
                <AvatarImage
                  src="/placeholder.svg?height=32&width=32"
                  alt="User"
                />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div className="ml-3">
                <p className="text-sm font-medium">Jane Doe</p>
                <p className="text-xs text-muted-foreground">Sender</p>
              </div>
            </div>
            {/* <ModeToggle /> */}
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex flex-1 flex-col">
        {/* Mobile header */}
        {isMobile && (
          <div className="flex items-center justify-between border-b p-4 md:hidden">
            <div className="flex items-center">
              <Package className="h-6 w-6 text-primary" />
              <span className="ml-2 text-lg font-bold">SendSecure</span>
            </div>
            <div className="flex items-center gap-2">
              {/* <ModeToggle /> */}
              <Button
                // variant="ghost"
                // size="icon"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? (
                  <X className="h-5 w-5 text-black" />
                ) : (
                  <Menu className="h-5 w-5 text-black" />
                )}
              </Button>
            </div>
          </div>
        )}

        {/* Mobile menu */}
        {isMobile && mobileMenuOpen && (
          <div className="border-b p-4 md:hidden">
            <nav className="flex flex-col space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center rounded-md px-3 py-2 text-sm font-medium ${
                    location.pathname === item.href
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <item.icon className="mr-3 h-5 w-5" />
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        )}

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
