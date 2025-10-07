'use client';
import PageHeader from "@/components/page-header";
import DashboardStats from "@/components/dashboard/dashboard-stats";
import UpcomingEvents from "@/components/dashboard/upcoming-events";
import PendingComplaints from "@/components/dashboard/pending-complaints";

export default function DashboardPage() {
  return (
    <div>
      <PageHeader title="Dashboard" description="Here's a snapshot of your classroom's current status." />
      <div className="space-y-8">
        <DashboardStats />
        <div className="grid gap-8 lg:grid-cols-2">
            <UpcomingEvents />
            <PendingComplaints />
        </div>
      </div>
    </div>
  );
}
