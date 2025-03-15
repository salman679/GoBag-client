import type React from "react";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

import {
  Home,
  Luggage,
  Plane,
  MessageSquare,
  Bell,
  CreditCard,
  Settings,
  HelpCircle,
  Menu,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useLocation } from "react-router-dom";

interface DashboardShellProps {
  children: React.ReactNode;
  className?: string;
}

export function DashboardShell({ children, className }: DashboardShellProps) {
  const { pathname } = useLocation();
  const [isMobile, setIsMobile] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSheetOpen, setMobileSheetOpen] = useState(false);

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

  const menuItems = [
    { name: "Dashboard", href: "/", icon: Home },
    { name: "My Trips", href: "/trips", icon: Plane },
    { name: "My Packages", href: "/packages", icon: Luggage },
    { name: "Messages", href: "/messages", icon: MessageSquare },
    { name: "Notifications", href: "/notifications", icon: Bell },
    { name: "Payments", href: "/payments", icon: CreditCard },
    { name: "Settings", href: "/settings", icon: Settings },
    { name: "Help", href: "/help", icon: HelpCircle },
  ];

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex min-h-screen">
      {/* Desktop Sidebar */}
      <div
        className={cn(
          "hidden md:block border-r bg-sidebar h-screen transition-all duration-300 ease-in-out",
          sidebarOpen ? "w-64" : "w-20"
        )}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between px-4 py-4 border-b">
            {sidebarOpen ? (
              <h2 className="text-lg font-semibold tracking-tight">GoBag</h2>
            ) : (
              <span className="mx-auto text-lg font-semibold">GB</span>
            )}
            <Button onClick={toggleSidebar} className="ml-auto">
              {sidebarOpen ? (
                <ChevronLeft className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
            </Button>
          </div>

          <div className="px-2 py-2 flex-1 overflow-y-auto">
            <div className="space-y-1">
              <div className={cn("px-3 py-2", !sidebarOpen && "px-1")}>
                <nav className="space-y-1">
                  {menuItems.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className={cn(
                        "flex items-center rounded-md py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground",
                        pathname === item.href
                          ? "bg-accent text-accent-foreground"
                          : "transparent",
                        sidebarOpen ? "px-3 gap-3" : "px-2 justify-center"
                      )}
                      title={!sidebarOpen ? item.name : undefined}
                    >
                      <item.icon className="h-4 w-4" />
                      {sidebarOpen && <span>{item.name}</span>}
                    </a>
                  ))}
                </nav>
              </div>
            </div>
          </div>

          {/* <div className="mt-auto px-4 py-4 border-t">
            <div
              className={cn(
                "flex items-center",
                sidebarOpen ? "justify-between" : "justify-center"
              )}
            >
              {sidebarOpen && <UserNav />}
            </div>
          </div> */}
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="flex items-center gap-4 bg-background px-4">
          {isMobile ? (
            <Sheet open={mobileSheetOpen} onOpenChange={setMobileSheetOpen}>
              <SheetTrigger asChild>
                <Button variant="outline">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="pr-0 w-[280px]">
                <div className="flex items-center justify-between px-4 py-2 border-b">
                  <h2 className="text-lg font-semibold tracking-tight">
                    GoBag
                  </h2>
                </div>

                <div className="px-2 py-4">
                  <nav className="space-y-1">
                    {menuItems.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
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
                      </a>
                    ))}
                  </nav>
                </div>
              </SheetContent>
            </Sheet>
          ) : (
            ""
            // <Button variant="outline" onClick={toggleSidebar}>
            //   {/* <Menu className="h-5 w-5" /> */}
            //   <span className="sr-only">Toggle Sidebar</span>
            // </Button>
          )}
        </div>

        <main className={cn("flex-1 p-4 md:p-8", className)}>{children}</main>
      </div>
    </div>
  );
}
