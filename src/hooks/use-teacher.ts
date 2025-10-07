'use client';
import { useDoc, useMemoFirebase } from '@/firebase';
import { doc } from 'firebase/firestore';
import { useFirestore } from '@/firebase';
import type { User } from '@/lib/types';

export function useTeacher(userId: string | undefined | null) {
  const firestore = useFirestore();
  const teacherRef = useMemoFirebase(() => (userId ? doc(firestore, 'users', userId) : null), [firestore, userId]);
  const { data: teacher, isLoading, error } = useDoc<User>(teacherRef);

  return { teacher, isLoading, error };
}
