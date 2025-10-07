'use client';
import { useState, useEffect } from 'react';
import type { Ranking } from '@/lib/types';
import placeholderImages from '@/lib/placeholder-images.json';

const initialRankings: Ranking[] = [
    { id: 'r-1', studentId: 'student-4', studentName: 'Emma Brown', avatarUrl: placeholderImages.placeholderImages.find(p => p.id === 'student-4')?.imageUrl || '', rank: 1, homeworkCompletion: 100, complaints: 0, activityScore: 98 },
    { id: 'r-2', studentId: 'student-1', studentName: 'Liam Johnson', avatarUrl: placeholderImages.placeholderImages.find(p => p.id === 'student-1')?.imageUrl || '', rank: 2, homeworkCompletion: 95, complaints: 0, activityScore: 95 },
    { id: 'r-3', studentId: 'student-6', studentName: 'Ava Garcia', avatarUrl: placeholderImages.placeholderImages.find(p => p.id === 'student-6')?.imageUrl || '', rank: 3, homeworkCompletion: 98, complaints: 0, activityScore: 93 },
    { id: 'r-4', studentId: 'student-2', studentName: 'Olivia Smith', avatarUrl: placeholderImages.placeholderImages.find(p => p.id === 'student-2')?.imageUrl || '', rank: 4, homeworkCompletion: 92, complaints: 1, activityScore: 90 },
    { id: 'r-5', studentId: 'student-5', studentName: 'Oliver Jones', avatarUrl: placeholderImages.placeholderImages.find(p => p.id === 'student-5')?.imageUrl || '', rank: 5, homeworkCompletion: 88, complaints: 1, activityScore: 85 },
    { id: 'r-6', studentId: 'student-3', studentName: 'Noah Williams', avatarUrl: placeholderImages.placeholderImages.find(p => p.id === 'student-3')?.imageUrl || '', rank: 6, homeworkCompletion: 80, complaints: 2, activityScore: 80 },
];

export function useRankings() {
  const [rankings, setRankings] = useState<Ranking[]>(initialRankings);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Simulate fetching data
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  return { rankings: rankings || [], isLoading, error };
}
