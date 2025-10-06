'use client';
import { useCollection, useMemoFirebase } from '@/firebase';
import { collection } from 'firebase/firestore';
import { useFirestore } from '@/firebase';
import type { Ranking } from '@/lib/types';

export function useRankings() {
  const firestore = useFirestore();
  const rankingsRef = useMemoFirebase(() => collection(firestore, 'rankings'), [firestore]);
  const { data: rankings, isLoading, error } = useCollection<Ranking>(rankingsRef);

  return { rankings: rankings || [], isLoading, error };
}
