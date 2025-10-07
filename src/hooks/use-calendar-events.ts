'use client';
import { useState, useEffect } from 'react';
import type { CalendarEvent } from '@/lib/types';

const initialEvents: CalendarEvent[] = [
    { id: '1', type: 'homework', title: 'Algebra Chapter 5 due', date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(), description: 'Due at the beginning of class.' },
    { id: '2', type: 'event', title: 'Parent-Teacher Meeting', date: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(), description: 'Discuss student progress.' },
    { id: '3', type: 'holiday', title: 'Thanksgiving Break', date: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000).toISOString(), description: 'School closed.' },
    { id: '4', type: 'homework', title: 'Cell Biology Report due', date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), description: 'Submit via the portal.' },
];


export function useCalendarEvents() {
  const [calendarEvents, setCalendarEvents] = useState<CalendarEvent[]>(initialEvents);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    // Simulate fetching data
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  const addEvent = (newEvent: Omit<CalendarEvent, 'id'>) => {
    setCalendarEvents(prev => [...prev, { ...newEvent, id: (prev.length + 1).toString() }]);
  };

  return { calendarEvents: calendarEvents || [], isLoading, error, addEvent };
}
