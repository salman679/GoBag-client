"use client";

import type React from "react";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import {
  SidebarProvider,
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarInset,
  SidebarSeparator,
} from "@/components/ui/sidebar";

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
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useLocation } from "react-router-dom";
import { RoleToggle } from "./RoleToggle";
import { UserNav } from "./UserNav";

interface DashboardShellProps {
  children: React.ReactNode;
  className?: string;
}

export function DashboardShell({ children, className }: DashboardShellProps) {
  const { pathname } = useLocation();
  const [isMobile, setIsMobile] = useState(false);

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

  const renderMenu = () => (
    <SidebarMenu>
      {menuItems.map((item) => (
        <SidebarMenuItem key={item.name}>
          <SidebarMenuButton
            asChild
            isActive={pathname === item.href}
            tooltip={item.name}
          >
            <a href={item.href}>
              <item.icon />
              <span>{item.name}</span>
            </a>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );

  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex min-h-screen flex-col">
        {isMobile ? (
          <div className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle Menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="pr-0">
                <div className="px-2 py-4">
                  <RoleToggle />
                </div>
                <SidebarContent>
                  <SidebarGroup>
                    <SidebarGroupContent>{renderMenu()}</SidebarGroupContent>
                  </SidebarGroup>
                </SidebarContent>
              </SheetContent>
            </Sheet>
            <div className="flex-1">
              <RoleToggle />
            </div>
            <div className="flex items-center gap-2">
              <UserNav />
            </div>
          </div>
        ) : (
          <Sidebar variant="inset" collapsible="icon">
            <SidebarHeader>
              <div className="flex items-center px-2 py-2">
                <h2 className="text-lg font-semibold tracking-tight">
                  LuggageShare
                </h2>
              </div>
              <div className="px-2 py-2">
                <RoleToggle />
              </div>
            </SidebarHeader>
            <SidebarSeparator />
            <SidebarContent>
              <SidebarGroup>
                <SidebarGroupLabel>Navigation</SidebarGroupLabel>
                <SidebarGroupContent>{renderMenu()}</SidebarGroupContent>
              </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
              <div className="flex items-center justify-between p-4">
                <UserNav />
              </div>
            </SidebarFooter>
          </Sidebar>
        )}
        <SidebarInset>
          <main className={cn("flex-1 p-4 md:p-8", className)}>{children}</main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
