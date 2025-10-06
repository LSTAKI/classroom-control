'use client';
import { useCollection, useMemoFirebase } from '@/firebase';
import { collection } from 'firebase/firestore';
import { useFirestore } from '@/firebase';
import type { Homework } from '@/lib/types';

export function useHomework() {
  const firestore = useFirestore();
  const homeworkRef = useMemoFirebase(() => collection(firestore, 'homeworks'), [firestore]);
  const { data: homework, isLoading, error } = useCollection<Homework>(homeworkRef);

  return { homework: homework || [], isLoading, error };
}
