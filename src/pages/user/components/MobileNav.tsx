import { cn } from "@/lib/utils";
import { Home, Plane, Luggage, User } from "lucide-react";
import { useLocation } from "react-router-dom";

interface MobileNavProps {
  className?: string;
}

export function MobileNav({ className }: MobileNavProps) {
  const { pathname } = useLocation();

  const navItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "Trips", href: "/trips", icon: Plane },
    { name: "Packages", href: "/packages", icon: Luggage },
    { name: "Account", href: "/settings", icon: User },
  ];

  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 right-0 border-t bg-background z-50",
        className
      )}
    >
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => (
          <a
            key={item.name}
            href={item.href}
            className={cn(
              "flex flex-col items-center justify-center w-full h-full px-2 text-xs",
              pathname === item.href
                ? "text-primary font-medium"
                : "text-muted-foreground"
            )}
          >
            <item.icon className="h-5 w-5 mb-1" />
            <span>{item.name}</span>
          </a>
        ))}
      </div>
    </div>
  );
}
