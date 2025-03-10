"use client";

import type React from "react";

import { useState } from "react";
import {
  Briefcase,
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
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
} from "@/pages/traveller/dashboard/sidebar/sidebar";
import { ModeToggle } from "@/components/mode-toggle";
import { useIsMobile } from "@/hooks/use-mobile";

const navigation = [
  { name: "Dashboard", href: "/", icon: Home },
  { name: "Trips", href: "/trips", icon: Calendar },
  { name: "Shipping Requests", href: "/requests", icon: Package },
  { name: "Earnings", href: "/earnings", icon: CreditCard },
  { name: "Messages", href: "/messages", icon: MessageSquare },
  { name: "Trust & Safety", href: "/trust", icon: Shield },
  { name: "Settings", href: "/settings", icon: Settings },
];

export function SidebarLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isMobile = useIsMobile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <Sidebar variant="sidebar" collapsible="icon">
          <SidebarHeader className="flex items-center justify-between p-4">
            <div className="flex items-center gap-2">
              <Briefcase className="h-6 w-6" />
              <span className="text-lg font-bold">TravelShip</span>
            </div>
          </SidebarHeader>
          <SidebarContent>
            <SidebarMenu>
              {navigation.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.href}
                    tooltip={item.name}
                  >
                    <Link href={item.href}>
                      <item.icon className="h-5 w-5" />
                      <span>{item.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>
          <SidebarFooter className="p-4">
            <div className="flex items-center justify-between">
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
              <ModeToggle />
            </div>
          </SidebarFooter>
        </Sidebar>

        <div className="flex flex-1 flex-col">
          {isMobile && (
            <div className="flex items-center justify-between border-b p-4">
              <div className="flex items-center gap-2">
                <Briefcase className="h-6 w-6" />
                <span className="text-lg font-bold">TravelShip</span>
              </div>
              <div className="flex items-center gap-2">
                <ModeToggle />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                  {mobileMenuOpen ? (
                    <X className="h-5 w-5" />
                  ) : (
                    <Menu className="h-5 w-5" />
                  )}
                </Button>
              </div>
            </div>
          )}

          {isMobile && mobileMenuOpen && (
            <div className="border-b p-4">
              <nav className="flex flex-col space-y-2">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center gap-2 rounded-md p-2 ${
                      pathname === item.href
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

          <main className="flex-1 overflow-y-auto p-6">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
