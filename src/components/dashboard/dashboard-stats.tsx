'use client';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { BookCopy, MessageSquareWarning, BarChart3, Users } from "lucide-react";

const stats = [
    { title: "Active Homework", value: 2, icon: BookCopy, change: "+2 this week" },
    { title: "Pending Complaints", value: 1, icon: MessageSquareWarning, change: "-1 from yesterday" },
    { title: "Average Class Score", value: '88.5%', icon: BarChart3, change: "+5% last month" },
    { title: "Class Attendance", value: '91.7%', icon: Users, change: "Steady" },
];

export default function DashboardStats() {
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
