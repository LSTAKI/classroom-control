'use client';
import { useCollection, useMemoFirebase } from '@/firebase';
import { collection } from 'firebase/firestore';
import { useFirestore } from '@/firebase';
import type { CalendarEvent } from '@/lib/types';

export function useCalendarEvents() {
  const firestore = useFirestore();
  const calendarEventsRef = useMemoFirebase(() => collection(firestore, 'calendar_events'), [firestore]);
  const { data: calendarEvents, isLoading, error } = useCollection<CalendarEvent>(calendarEventsRef);

  return { calendarEvents: calendarEvents || [], isLoading, error };
}
