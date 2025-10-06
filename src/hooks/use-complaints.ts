'use client';
import { useCollection, useMemoFirebase } from '@/firebase';
import { collection } from 'firebase/firestore';
import { useFirestore } from '@/firebase';
import type { Complaint } from '@/lib/types';

export function useComplaints() {
  const firestore = useFirestore();
  const complaintsRef = useMemoFirebase(() => collection(firestore, 'complaints'), [firestore]);
  const { data: complaints, isLoading, error } = useCollection<Complaint>(complaintsRef);

  return { complaints: complaints || [], isLoading, error };
}
