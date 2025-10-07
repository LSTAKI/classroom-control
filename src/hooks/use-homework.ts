'use client';
import { useState, useEffect } from 'react';
import type { Homework } from '@/lib/types';

const initialHomework: Homework[] = [
    { id: 'hw-1', title: 'Algebra Chapter 5', subject: 'Math', description: 'Complete all exercises in chapter 5.', dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(), status: 'Assigned', attachments: [], assignedBy: 'teacher-1', assignedTo: [] },
    { id: 'hw-2', title: 'Cell Biology Report', subject: 'Science', description: 'Write a 2-page report on cell mitosis.', dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), status: 'Assigned', attachments: [], assignedBy: 'teacher-1', assignedTo: [] },
    { id: 'hw-3', title: 'Geometry Proofs', subject: 'Math', description: 'Solve the provided worksheet on geometric proofs.', dueDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), status: 'Checked', attachments: [], assignedBy: 'teacher-1', assignedTo: [] },
];

export function useHomework() {
  const [homework, setHomework] = useState<Homework[]>(initialHomework);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Simulate fetching data
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  const addHomework = (newHw: Omit<Homework, 'id'>) => {
    setHomework(prev => [...prev, { ...newHw, id: `hw-${prev.length + 1}` }]);
  };

  return { homework: homework || [], isLoading, error, addHomework };
}
