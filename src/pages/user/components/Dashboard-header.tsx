import type React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Plus } from "lucide-react";

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
  return (
    <div className={cn("flex items-center justify-between px-2", className)}>
      <div className="grid gap-1">
        <h1 className="text-2xl font-bold tracking-tight md:text-3xl">
          {heading}
        </h1>
        {text && <p className="text-muted-foreground">{text}</p>}
      </div>
      <div className="flex items-center gap-2">
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Trip
        </Button>
        <Button variant="outline">
          <Plus className="mr-2 h-4 w-4" />
          New Package
        </Button>
      </div>
    </div>
  );
}
