'use client';
import { useState, useEffect } from 'react';
import type { Homework } from '@/lib/types';

const initialHomework: Omit<Homework, 'id'>[] = [
    { title: 'Algebra Chapter 5', subject: 'Math', description: 'Complete all exercises in chapter 5.', dueDate: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(), status: 'Assigned', attachments: [], assignedBy: 'teacher-1', assignedTo: [] },
    { title: 'Cell Biology Report', subject: 'Science', description: 'Write a 2-page report on cell mitosis.', dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), status: 'Assigned', attachments: [], assignedBy: 'teacher-1', assignedTo: [] },
    { title: 'Geometry Proofs', subject: 'Math', description: 'Solve the provided worksheet on geometric proofs.', dueDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), status: 'Checked', attachments: [], assignedBy: 'teacher-1', assignedTo: [] },
];

const LOCAL_STORAGE_KEY = 'homework';

export function useHomework() {
  const [homework, setHomework] = useState<Homework[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    try {
        const storedHomework = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (storedHomework) {
            setHomework(JSON.parse(storedHomework));
        } else {
            const homeworkWithIds = initialHomework.map((hw, i) => ({ ...hw, id: `hw-${i + 1}` }));
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(homeworkWithIds));
            setHomework(homeworkWithIds);
        }
    } catch(e) {
        setError(e as Error);
    } finally {
        setIsLoading(false);
    }
  }, []);

  const addHomework = (newHw: Omit<Homework, 'id'>) => {
    setHomework(prev => {
        const updatedHomework = [...prev, { ...newHw, id: `hw-${prev.length + 1}` }];
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedHomework));
        return updatedHomework;
    });
  };

  return { homework, isLoading, error, addHomework };
}
