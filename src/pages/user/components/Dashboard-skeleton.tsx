import { Skeleton } from "@/components/ui/skeleton";

export function DashboardSkeleton() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
      <div className="col-span-4">
        <Skeleton className="h-[600px] w-full" />
      </div>
      <div className="col-span-3">
        <Skeleton className="h-[600px] w-full" />
      </div>
    </div>
  );
}
