'use client';
import { useState, useEffect } from 'react';
import type { Complaint } from '@/lib/types';
import placeholderImages from '@/lib/placeholder-images.json';

const initialComplaints: Complaint[] = [
    { id: '1', studentId: 'student-3', studentName: 'Noah Williams', avatarUrl: placeholderImages.placeholderImages.find(p => p.id === 'student-3')?.imageUrl || '', teacherId: 'teacher-1', reason: 'Disturbing the class during the science lesson.', date: '2023-10-22T10:00:00Z', status: 'Pending' },
    { id: '2', studentId: 'student-5', studentName: 'Oliver Jones', avatarUrl: placeholderImages.placeholderImages.find(p => p.id === 'student-5')?.imageUrl || '', teacherId: 'teacher-1', reason: 'Did not complete the assigned math homework.', date: '2023-10-20T14:30:00Z', status: 'Resolved' },
];

export function useComplaints() {
  const [complaints, setComplaints] = useState<Complaint[]>(initialComplaints);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Simulate fetching data
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);
  
  const addComplaint = (newComplaint: Omit<Complaint, 'id'>) => {
    setComplaints(prev => [...prev, { ...newComplaint, id: (prev.length + 1).toString() }]);
  };

  const updateComplaintStatus = (complaintId: string, status: Complaint['status']) => {
    setComplaints(prev => prev.map(c => c.id === complaintId ? { ...c, status } : c));
  };


  return { complaints, isLoading, error, addComplaint, updateComplaintStatus };
}
