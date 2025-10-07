'use client';
import { useState, useEffect } from 'react';
import type { Complaint } from '@/lib/types';
import placeholderImages from '@/lib/placeholder-images.json';

const initialComplaints: Omit<Complaint, 'id'>[] = [
    { studentId: 'student-3', studentName: 'Noah Williams', avatarUrl: placeholderImages.placeholderImages.find(p => p.id === 'student-3')?.imageUrl || '', teacherId: 'teacher-1', reason: 'Disturbing the class during the science lesson.', date: '2023-10-22T10:00:00Z', status: 'Pending' },
    { studentId: 'student-5', studentName: 'Oliver Jones', avatarUrl: placeholderImages.placeholderImages.find(p => p.id === 'student-5')?.imageUrl || '', teacherId: 'teacher-1', reason: 'Did not complete the assigned math homework.', date: '2023-10-20T14:30:00Z', status: 'Resolved' },
];

const LOCAL_STORAGE_KEY = 'complaints';

export function useComplaints() {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    try {
        const storedComplaints = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (storedComplaints) {
            setComplaints(JSON.parse(storedComplaints));
        } else {
            const complaintsWithIds = initialComplaints.map((c, i) => ({ ...c, id: `${i + 1}` }));
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(complaintsWithIds));
            setComplaints(complaintsWithIds);
        }
    } catch (e) {
        setError(e as Error);
    } finally {
        setIsLoading(false);
    }
  }, []);
  
  const addComplaint = (newComplaint: Omit<Complaint, 'id'>) => {
    setComplaints(prev => {
        const updatedComplaints = [...prev, { ...newComplaint, id: (prev.length + 1).toString() }];
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedComplaints));
        return updatedComplaints;
    });
  };

  const updateComplaintStatus = (complaintId: string, status: Complaint['status']) => {
    setComplaints(prev => {
        const updatedComplaints = prev.map(c => c.id === complaintId ? { ...c, status } : c);
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedComplaints));
        return updatedComplaints;
    });
  };


  return { complaints, isLoading, error, addComplaint, updateComplaintStatus };
}
