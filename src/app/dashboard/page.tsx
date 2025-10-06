'use client';
import PageHeader from "@/components/page-header";
import DashboardStats from "@/components/dashboard/dashboard-stats";
import UpcomingEvents from "@/components/dashboard/upcoming-events";
import PendingComplaints from "@/components/dashboard/pending-complaints";
import { useTeacher } from "@/hooks/use-teacher";
import { useUser } from "@/firebase";

export default function DashboardPage() {
  const { user } = useUser();
  const { teacher, isLoading: teacherLoading } = useTeacher(user?.uid);

  if (teacherLoading) {
    return <div>Loading...</div>
  }

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
