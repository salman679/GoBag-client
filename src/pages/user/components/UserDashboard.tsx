import { Suspense } from "react";
import { DashboardHeader } from "./Dashboard-header";
import { DashboardSkeleton } from "./Dashboard-skeleton";
import { Overview } from "./Overview";
import { RecentActivity } from "./Recent-activity";

export default function UserDashboard() {
  return (
    <>
      <DashboardHeader
        heading="Dashboard"
        text="Manage your trips and packages in one place."
      />
      <Suspense fallback={<DashboardSkeleton />}>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Overview className="col-span-4" />
          <RecentActivity className="col-span-3" />
        </div>
      </Suspense>
    </>
  );
}
