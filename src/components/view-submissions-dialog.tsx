'use client';
import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from './ui/dialog';
import { Button } from './ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Badge } from './ui/badge';
import type { Homework, Submission } from '@/lib/types';
import { useSubmissions } from '@/hooks/use-submissions';
import { useFirestore, updateDocumentNonBlocking } from '@/firebase';
import { doc } from 'firebase/firestore';
import { Check, X } from 'lucide-react';
import { useStudents } from '@/hooks/use-students';

interface ViewSubmissionsDialogProps {
  homework: Homework;
  children: React.ReactNode;
}

export default function ViewSubmissionsDialog({ homework, children }: ViewSubmissionsDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { submissions, isLoading } = useSubmissions(homework.id);
  const { students, isLoading: studentsLoading } = useStudents();
  const firestore = useFirestore();

  const getStatusBadgeVariant = (status: Submission['status']) => {
    switch (status) {
      case 'Submitted': return 'default';
      case 'Pending': return 'outline';
      case 'Checked': return 'success';
      case 'Incomplete': return 'destructive';
      default: return 'secondary';
    }
  };

  const handleUpdateStatus = (submissionId: string, status: Submission['status']) => {
    if (!firestore) return;
    const submissionRef = doc(firestore, `homeworks/${homework.id}/submissions`, submissionId);
    updateDocumentNonBlocking(submissionRef, { status });
  };
  
  const getStudentById = (studentId: string) => {
    return students.find(s => s.id === studentId);
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild onClick={() => setIsOpen(true)}>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>Submissions for "{homework.title}"</DialogTitle>
          <DialogDescription>
            View and manage student submissions for this assignment.
          </DialogDescription>
        </DialogHeader>
        <div className="max-h-[60vh] overflow-y-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Student</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Submitted At</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading || studentsLoading ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center">Loading submissions...</TableCell>
                </TableRow>
              ) : submissions.map(submission => {
                const student = getStudentById(submission.studentId);
                return (
                <TableRow key={submission.id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={student?.avatarUrl} alt={student?.name} />
                        <AvatarFallback>{student?.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{student?.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusBadgeVariant(submission.status)}>{submission.status}</Badge>
                  </TableCell>
                   <TableCell>{submission.submittedAt ? new Date(submission.submittedAt).toLocaleDateString() : 'N/A'}</TableCell>
                  <TableCell className="text-right space-x-2">
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => handleUpdateStatus(submission.id, 'Checked')}
                      disabled={submission.status === 'Checked'}
                    >
                      <Check className="mr-2 h-4 w-4" />
                      Mark as Checked
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      onClick={() => handleUpdateStatus(submission.id, 'Incomplete')}
                      disabled={submission.status === 'Incomplete'}
                    >
                       <X className="mr-2 h-4 w-4" />
                      Mark as Incomplete
                    </Button>
                  </TableCell>
                </TableRow>
              )})}
            </TableBody>
          </Table>
        </div>
        <DialogFooter>
          