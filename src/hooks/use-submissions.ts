'use client';
import { useCollection, useMemoFirebase } from '@/firebase';
import { collection } from 'firebase/firestore';
import { useFirestore } from '@/firebase';
import type { Submission } from '@/lib/types';

export function useSubmissions(homeworkId: string) {
  const firestore = useFirestore();
  const submissionsRef = useMemoFirebase(() => collection(firestore, `homeworks/${homeworkId}/submissions`), [firestore, homeworkId]);
  const { data: submissions, isLoading, error } = useCollection<Submission>(submissionsRef);

  return { submissions