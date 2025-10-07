'use client';
import { useState, useEffect } from 'react';
import type { Submission } from '@/lib/types';

const initialSubmissions: {[key: string]: Submission[]} = {
    'hw-1': [
        { id: 'sub-1-1', homeworkId: 'hw-1', studentId: 'student-1', status: 'Submitted', submittedAt: new Date().toISOString() },
        { id: 'sub-1-2', homeworkId: 'hw-1', studentId: 'student-2', status: 'Submitted', submittedAt: new Date().toISOString() },
        { id: 'sub-1-3', homeworkId: 'hw-1', studentId: 'student-3', status: 'Pending' },
        { id: 'sub-1-4', homeworkId: 'hw-1', studentId: 'student-4', status: 'Checked' },
        { id: 'sub-1-5', homeworkId: 'hw-1', studentId: 'student-5', status: 'Incomplete' },
        { id: 'sub-1-6', homeworkId: 'hw-1', studentId: 'student-6', status: 'Submitted', submittedAt: new Date().toISOString() },
    ],
    'hw-2': [
        { id: 'sub-2-1', homeworkId: 'hw-2', studentId: 'student-1', status: 'Pending' },
        { id: 'sub-2-2', homeworkId: 'hw-2', studentId: 'student-2', status: 'Submitted', submittedAt: new Date().toISOString() },
        { id: 'sub-2-3', homeworkId: 'hw-2', studentId: 'student-3', status: 'Pending' },
        { id: 'sub-2-4', homeworkId: 'hw-2', studentId: 'student-4', status: 'Pending' },
        { id: 'sub-2-5', homeworkId: 'hw-2', studentId: 'student-5', status: 'Submitted', submittedAt: new Date().toISOString() },
        { id: 'sub-2-6', homeworkId: 'hw-2', studentId: 'student-6', status: 'Submitted', submittedAt: new Date().toISOString() },
    ],
    'hw-3': [
        { id: 'sub-3-1', homeworkId: 'hw-3', studentId: 'student-1', status: 'Checked' },
        { id: 'sub-3-2', homeworkId: 'hw-3', studentId: 'student-2', status: 'Checked' },
        { id: 'sub-3-3', homeworkId: 'hw-3', studentId: 'student-3', status: 'Incomplete' },
        { id: 'sub-3-4', homeworkId: 'hw-3', studentId: 'student-4', status: 'Checked' },
        { id: 'sub-3-5', homeworkId: 'hw-3', studentId: 'student-5', status: 'Checked' },
        { id: 'sub-3-6', homeworkId: 'hw-3', studentId: 'student-6', status: 'Checked' },
    ]
};


export function useSubmissions(homeworkId: string | undefined) {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    setIsLoading(true);
    // Simulate fetching data
    setTimeout(() => {
        if (homeworkId && initialSubmissions[homeworkId]) {
            setSubmissions(initialSubmissions[homeworkId]);
        } else {
            setSubmissions([]);
        }
        setIsLoading(false);
    }, 500);
  }, [homeworkId]);

  const updateSubmissionStatus = (submissionId: string, status: Submission['status']) => {
    if (!homeworkId) return;
    setSubmissions(prev => prev.map(s => s.id === submissionId ? { ...s, status } : s));
  };


  return { submissions: submissions || [], isLoading, error, updateSubmissionStatus };
}
