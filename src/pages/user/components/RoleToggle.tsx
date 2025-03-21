import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plane, Package } from "lucide-react";
import { cn } from "@/lib/utils";

interface RoleToggleProps {
  className?: string;
  compact?: boolean;
}

export function RoleToggle({ className, compact = false }: RoleToggleProps) {
  const [role, setRole] = useState<"traveler" | "sender">("traveler");

  return (
    <Tabs
      defaultValue={role}
      className={cn("w-full", className)}
      onValueChange={(value) => setRole(value as "traveler" | "sender")}
    >
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="traveler" className="flex items-center gap-2">
          <Plane className="h-4 w-4" />
          <span className={cn(compact ? "hidden" : "hidden sm:inline")}>
            Traveler
          </span>
        </TabsTrigger>
        <TabsTrigger value="sender" className="flex items-center gap-2">
          <Package className="h-4 w-4" />
          <span className={cn(compact ? "hidden" : "hidden sm:inline")}>
            Sender
          </span>
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
