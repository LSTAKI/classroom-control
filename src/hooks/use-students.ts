'use client';
import { useCollection, useMemoFirebase } from '@/firebase';
import { collection } from 'firebase/firestore';
import { useFirestore } from '@/firebase';
import type { Student } from '@/lib/types';

export function useStudents() {
  const firestore = useFirestore();
  const studentsRef = useMemoFirebase(() => collection(firestore, 'students'), [firestore]);
  const { data: students, isLoading, error } = useCollection<Student>(studentsRef);

  return { students: students || [], isLoading, error };
}
