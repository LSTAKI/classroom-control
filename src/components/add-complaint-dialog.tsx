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
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { PlusCircle } from 'lucide-react';
import { useFirestore, addDocumentNonBlocking } from '@/firebase';
import { collection } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import { useStudents } from '@/hooks/use-students';
import type { Student } from '@/lib/types';

export default function AddComplaintDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const [reason, setReason] = useState('');
  const [studentId, setStudentId] = useState('');
  const firestore = useFirestore();
  const { toast } = useToast();
  const { students, isLoading: studentsLoading } = useStudents();

  const handleFileComplaint = async () => {
    if (!firestore || !reason || !studentId) {
      toast({
        variant: 'destructive',
        title: 'Missing fields',
        description: 'Please select a student and provide a reason.',
      });
      return;
    }

    const selectedStudent = students.find((s: Student) => s.id === studentId);
    if (!selectedStudent) return;

    const newComplaint = {
      studentId,
      studentName: selectedStudent.name,
      avatarUrl: selectedStudent.avatarUrl,
      teacherId: 'teacher-1', // Hardcoded teacher ID
      reason,
      date: new Date().toISOString(),
      status: 'Pending',
    };

    const complaintsRef = collection(firestore, 'complaints');
    addDocumentNonBlocking(complaintsRef, newComplaint);

    toast({
      title: 'Complaint filed',
      description: `A complaint against ${selectedStudent.name} has been filed.`,
    });

    setIsOpen(false);
    setReason('');
    setStudentId('');
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          File Complaint
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>File New Complaint</DialogTitle>
          <DialogDescription>Fill in the details below to file a new complaint.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="student" className="text-right">
              Student
            </label>
            <Select onValueChange={setStudentId} value={studentId}>
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select a student" />
              </SelectTrigger>
              <SelectContent>
                {studentsLoading ? (
                  <SelectItem value="loading" disabled>Loading...</SelectItem>
                ) : (
                  students.map((student: Student) => (
                    <SelectItem key={student.id} value={student.id}>{student.name}</SelectItem>
                  ))
                )}
              </SelectContent>
            </Select>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="reason" className="text-right">
              Reason
            </label>
            <Textarea
              id="reason"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              className="col-span-3"
              placeholder="Describe the issue..."
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleFileComplaint}>File Complaint</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
