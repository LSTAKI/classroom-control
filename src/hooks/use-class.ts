'use client';
import { useDoc, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import { useFirestore } from '@/firebase';
import type { Class } from '@/lib/types';

export function useClass(classId: string | undefined) {
  const firestore = useFirestore();
  const classRef = useMemoFirebase(() => (classId ? doc(firestore, 'classes', classId) : null), [firestore, classId]);
  const { data: classData, isLoading, error } = useDoc<Class>(classRef);

  return { classData, isLoading, error };
}
