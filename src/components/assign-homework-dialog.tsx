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
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Calendar } from './ui/calendar';
import { Calendar as CalendarIcon, PlusCircle } from 'lucide-react';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';
import { useStudents } from '@/hooks/use-students';
import type { Homework, Student } from '@/lib/types';

interface AssignHomeworkDialogProps {
    addHomework: (homework: Omit<Homework, 'id'>) => void;
}

export default function AssignHomeworkDialog({ addHomework }: AssignHomeworkDialogProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState<Date | undefined>();
  const [subject, setSubject] = useState('');
  
  const { toast } = useToast();
  const { students, isLoading: studentsLoading } = useStudents();


  const handleAssignHomework = async () => {
    if (!title || !dueDate || !subject) {
      toast({
        variant: 'destructive',
        title: 'Missing fields',
        description: 'Please fill out all fields to assign homework.',
      });
      return;
    }
    
    if (studentsLoading || !students || students.length === 0) {
        toast({
            variant: 'destructive',
            title: 'No students',
            description: 'Cannot assign homework, no students found.',
          });
        return;
    }

    const newHomework = {
      title,
      description,
      dueDate: dueDate.toISOString(),
      subject,
      status: 'Assigned' as const,
      assignedBy: 'teacher-1', // Hardcoded teacher ID
      assignedTo: students.map((s: Student) => s.id),
      attachments: [],
    };

    addHomework(newHomework);

    toast({
      title: 'Homework Assigned',
      description: `"${title}" has been assigned to the class.`,
    });

    setIsOpen(false);
    setTitle('');
    setDescription('');
    setDueDate(undefined);
    setSubject('');
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          Assign Homework
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Assign New Homework</DialogTitle>
          <DialogDescription>Fill in the details below to assign new homework to the class.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="title" className="text-right">
              Title
            </label>
            <Input id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="subject" className="text-right">
              Subject
            </label>
            <Input id="subject" value={subject} onChange={(e) => setSubject(e.target.value)} className="col-span-3" />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="description" className="text-right">
              Description
            </label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="dueDate" className="text-right">
              Due Date
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={'outline'}
                  className="col-span-3 justify-start text-left font-normal"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dueDate ? format(dueDate, 'PPP') : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar mode="single" selected={dueDate} onSelect={setDueDate} initialFocus />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={handleAssignHomework}>Assign Homework</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
