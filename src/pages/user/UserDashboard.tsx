import { Suspense } from "react";

import { DashboardSkeleton } from "./components/Dashboard-skeleton";
import { Overview } from "./components/Overview";
import { RecentActivity } from "./components/Recent-activity";
import { DashboardShell } from "./components/Dashboard-shell";
import { DashboardHeader } from "./components/Dashboard-header";

export default function UserDashboard() {
  return (
    <>
      <div>
        <DashboardShell>
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
        </DashboardShell>
      </div>
    </>
  );
}
