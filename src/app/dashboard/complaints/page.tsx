'use client';
import PageHeader from "@/components/page-header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MoreHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { format } from 'date-fns';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { Complaint } from "@/lib/types";
import { useComplaints } from "@/hooks/use-complaints";
import { doc } from 'firebase/firestore';
import { useFirestore, updateDocumentNonBlocking } from '@/firebase';
import { Button } from "@/components/ui/button";
import AddComplaintDialog from "@/components/add-complaint-dialog";

export default function ComplaintsPage() {
    const { complaints, isLoading } = useComplaints();
    const firestore = useFirestore();

    const getStatusBadgeVariant = (status: Complaint['status']) => {
        switch(status) {
            case 'Resolved': return 'default';
            case 'Pending': return 'destructive';
            case 'Withdrawn': return 'outline';
            default: return 'secondary';
        }
    }

    const handleUpdateStatus = (complaintId: string, status: Complaint['status']) => {
        if (!firestore) return;
        const complaintRef = doc(firestore, 'complaints', complaintId);
        updateDocumentNonBlocking(complaintRef, { status });
    };

    if (isLoading) {
        return <div>Loading...</div>
    }

    return (
        <div>
            <div className="flex justify-between items-center">
                <PageHeader title="Complaints" description="Track and manage student complaints." />
                <AddComplaintDialog />
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Complaint Log</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Student</TableHead>
                                <TableHead>Reason</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {complaints.map(complaint => (
                                <TableRow key={complaint.id}>
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <Avatar className="h-8 w-8">
                                                <AvatarImage src={complaint.avatarUrl} alt={complaint.studentName} />
                                                <AvatarFallback>{complaint.studentName.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                            <span className="font-medium">{complaint.studentName}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>{complaint.reason}</TableCell>
                                    <TableCell>{format(new Date(complaint.date), 'PPP')}</TableCell>
                                    <TableCell>
                                        <Badge variant={getStatusBadgeVariant(complaint.status)}>{complaint.status}</Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" className="h-8 w-8 p-0">
                                                    <span className="sr-only">Open menu</span>
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem onClick={() => handleUpdateStatus(complaint.id, 'Resolved')}>Mark as Resolved</DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => handleUpdateStatus(complaint.id, 'Withdrawn')}>Withdraw</DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
