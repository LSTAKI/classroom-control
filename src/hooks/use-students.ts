'use client';
import { useState, useEffect } from 'react';
import type { Student } from '@/lib/types';
import placeholderImages from '@/lib/placeholder-images.json';

const initialStudents: Student[] = [
    { id: 'student-1', name: 'Liam Johnson', email: 'liam.johnson@example.com', role: 'student', classId: 'class-101', attendance: [{date: '2023-10-01', status: 'present'}], marks: [{subject: 'Math', score: 92}, {subject: 'Science', score: 88}], activityScore: 95, avatarUrl: placeholderImages.placeholderImages.find(p => p.id === 'student-1')?.imageUrl || '' },
    { id: 'student-2', name: 'Olivia Smith', email: 'olivia.smith@example.com', role: 'student', classId: 'class-101', attendance: [{date: '2023-10-01', status: 'present'}], marks: [{subject: 'Math', score: 85}, {subject: 'Science', score: 91}], activityScore: 90, avatarUrl: placeholderImages.placeholderImages.find(p => p.id === 'student-2')?.imageUrl || '' },
    { id: 'student-3', name: 'Noah Williams', email: 'noah.williams@example.com', role: 'student', classId: 'class-101', attendance: [{date: '2023-10-01', status: 'absent'}], marks: [{subject: 'Math', score: 78}, {subject: 'Science', score: 82}], activityScore: 80, avatarUrl: placeholderImages.placeholderImages.find(p => p.id === 'student-3')?.imageUrl || '' },
    { id: 'student-4', name: 'Emma Brown', email: 'emma.brown@example.com', role: 'student', classId: 'class-101', attendance: [{date: '2023-10-01', status: 'present'}], marks: [{subject: 'Math', score: 95}, {subject: 'Science', score: 96}], activityScore: 98, avatarUrl: placeholderImages.placeholderImages.find(p => p.id === 'student-4')?.imageUrl || '' },
    { id: 'student-5', name: 'Oliver Jones', email: 'oliver.jones@example.com', role: 'student', classId: 'class-101', attendance: [{date: '2023-10-01', status: 'present'}], marks: [{subject: 'Math', score: 88}, {subject: 'Science', score: 85}], activityScore: 85, avatarUrl: placeholderImages.placeholderImages.find(p => p.id === 'student-5')?.imageUrl || '' },
    { id: 'student-6', name: 'Ava Garcia', email: 'ava.garcia@example.com', role: 'student', classId: 'class-101', attendance: [{date: '2023-10-01', status: 'present'}], marks: [{subject: 'Math', score: 90}, {subject: 'Science', score: 92}], activityScore: 93, avatarUrl: placeholderImages.placeholderImages.find(p => p.id === 'student-6')?.imageUrl || '' },
];


export function useStudents() {
  const [students, setStudents] = useState<Student[]>(initialStudents);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Simulate fetching data
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  return { students: students || [], isLoading, error };
}
