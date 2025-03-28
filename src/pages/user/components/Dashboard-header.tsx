import type React from "react";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/Button";

interface DashboardHeaderProps {
  heading: string;
  text?: string;
  children?: React.ReactNode;
  className?: string;
}

export function DashboardHeader({
  heading,
  text,
  className,
}: DashboardHeaderProps) {
  const location = useLocation();
  const pathName = location.pathname;

  return (
    <div className={cn("flex items-center justify-between px-2", className)}>
      <div className="grid gap-1">
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
          {heading}
        </h1>
        {text && <p className="text-muted-foreground mb-2">{text}</p>}
      </div>
      <div className="flex items-center gap-2">
        {pathName === "/user/trips" ||
          (pathName === "/user/dashboard" && (
            <Link to={"/user/trips/new"}>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                New Trip
              </Button>
            </Link>
          ))}
        <Link to={"/user/requests/new"}>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Package
          </Button>
        </Link>
      </div>
    </div>
  );
}
