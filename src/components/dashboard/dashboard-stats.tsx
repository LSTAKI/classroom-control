'use client';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { BookCopy, MessageSquareWarning, BarChart3, Users } from "lucide-react";
import { useClass } from "@/hooks/use-class";
import { useHomework } from "@/hooks/use-homework";
import { useComplaints } from "@/hooks/use-complaints";

export default function DashboardStats() {
    const { classData, isLoading: classLoading } = useClass('class-101');
    const { homework, isLoading: homeworkLoading } = useHomework();
    const { complaints, isLoading: complaintsLoading } = useComplaints();

    if (classLoading || homeworkLoading || complaintsLoading) {
        return <div>Loading stats...</div>
    }

    const activeHomework = homework.filter(h => h.status === 'Assigned').length;
    const pendingComplaints = complaints.filter(c => c.status === 'Pending').length;
    const { avgMarks, avgAttendance } = classData || { avgMarks: 0, avgAttendance: 0 };

    const stats = [
        { title: "Active Homework", value: activeHomework, icon: BookCopy, change: "+2 this week" },
        { title: "Pending Complaints", value: pendingComplaints, icon: MessageSquareWarning, change: "-1 from yesterday" },
        { title: "Average Class Score", value: `${avgMarks.toFixed(1)}%`, icon: BarChart3, change: "+5% last month" },
        { title: "Class Attendance", value: `${avgAttendance.toFixed(1)}%`, icon: Users, change: "Steady" },
    ];

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
                <Card key={index}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                        <stat.icon className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stat.value}</div>
                        <p className="text-xs text-muted-foreground">{stat.change}</p>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
