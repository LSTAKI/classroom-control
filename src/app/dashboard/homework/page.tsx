import PageHeader from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { MOCK_HOMEWORK } from "@/lib/mock-data";
import { PlusCircle, MoreHorizontal } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { format } from 'date-fns';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export default function HomeworkPage() {

    const getStatusBadgeVariant = (status: Homework['status']) => {
        switch(status) {
            case 'Checked': return 'default';
            case 'Assigned': return 'secondary';
            case 'Pending': return 'outline';
            case 'Submitted': return 'default';
            default: return 'secondary';
        }
    }

    return (
        <div>
            <div className="flex justify-between items-center">
                <PageHeader title="Homework" description="Manage and assign homework for your class." />
                <Button>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Assign Homework
                </Button>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Assigned Homework</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Title</TableHead>
                                <TableHead>Subject</TableHead>
                                <TableHead>Due Date</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {MOCK_HOMEWORK.map(hw => (
                                <TableRow key={hw.id}>
                                    <TableCell className="font-medium">{hw.title}</TableCell>
                                    <TableCell>{hw.subject}</TableCell>
                                    <TableCell>{format(new Date(hw.dueDate), 'PPP')}</TableCell>
                                    <TableCell>
                                        <Badge variant={getStatusBadgeVariant(hw.status)}>{hw.status}</Badge>
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
                                                <DropdownMenuItem>View Submissions</DropdownMenuItem>
                                                <DropdownMenuItem>Edit</DropdownMenuItem>
                                                <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
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
