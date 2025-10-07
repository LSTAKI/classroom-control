'use client';
import { useState, useEffect } from 'react';
import type { CalendarEvent } from '@/lib/types';

const initialEvents: Omit<CalendarEvent, 'id'>[] = [
    { type: 'homework', title: 'Algebra Chapter 5 due', date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toISOString(), description: 'Due at the beginning of class.' },
    { type: 'event', title: 'Parent-Teacher Meeting', date: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(), description: 'Discuss student progress.' },
    { type: 'holiday', title: 'Thanksgiving Break', date: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000).toISOString(), description: 'School closed.' },
    { type: 'homework', title: 'Cell Biology Report due', date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), description: 'Submit via the portal.' },
];

const LOCAL_STORAGE_KEY = 'calendarEvents';


export function useCalendarEvents() {
  const [calendarEvents, setCalendarEvents] = useState<CalendarEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    try {
        const storedEvents = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (storedEvents) {
            setCalendarEvents(JSON.parse(storedEvents));
        } else {
            const eventsWithIds = initialEvents.map((event, index) => ({...event, id: `${index + 1}`}));
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(eventsWithIds));
            setCalendarEvents(eventsWithIds);
        }
    } catch (e) {
        setError(e as Error);
    } finally {
        setIsLoading(false);
    }
  }, []);

  const addEvent = (newEvent: Omit<CalendarEvent, 'id'>) => {
    setCalendarEvents(prev => {
        const updatedEvents = [...prev, { ...newEvent, id: (prev.length + 1).toString() }];
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedEvents));
        return updatedEvents;
    });
  };

  return { calendarEvents, isLoading, error, addEvent };
}
