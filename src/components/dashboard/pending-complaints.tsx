'use client';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { MessageSquareWarning, ArrowRight } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { useComplaints } from "@/hooks/use-complaints";

export default function PendingComplaints() {
    const { complaints, isLoading } = useComplaints();

    if (isLoading) {
        return <Card>Loading complaints...</Card>
    }
    
    const pendingComplaints = complaints
        .filter(c => c.status === 'Pending')
        .slice(0, 3);
    
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <MessageSquareWarning className="h-5 w-5" />
                    Pending Complaints
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {pendingComplaints.length > 0 ? pendingComplaints.map(complaint => (
                        <div key={complaint.id} className="flex items-center gap-4">
                            <Avatar>
                                <AvatarImage src={complaint.avatarUrl} alt={complaint.studentName} />
                                <AvatarFallback>{complaint.studentName.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                                <p className="font-semibold">{complaint.studentName}</p>
                                <p className="text-sm text-muted-foreground truncate">{complaint.reason}</p>
                            </div>
                            <p className="text-xs text-muted-foreground whitespace-nowrap">
                                {formatDistanceToNow(new Date(complaint.date), { addSuffix: true })}
                            </p>
                        </div>
                    )) : (
                        <p className="text-sm text-muted-foreground text-center py-4">No pending complaints. Great job!</p>
                    )}
                </div>
            </CardContent>
             <CardFooter>
                <Button variant="outline" className="w-full" asChild>
                    <Link href="/dashboard/complaints">
                        View All Complaints <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                </Button>
            </CardFooter>
        </Card>
    );
}
