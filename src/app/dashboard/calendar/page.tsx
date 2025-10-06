'use client';
import { useState } from 'react';
import type { DayPicker } from 'react-day-picker';
import PageHeader from '@/components/page-header';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { CalendarEvent } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import AiEventSuggester from '@/components/ai-event-suggester';
import { useCalendarEvents } from '@/hooks/use-calendar-events';

export default function CalendarPage() {
    const { calendarEvents, isLoading } = useCalendarEvents();
    const [date, setDate] = useState<Date | undefined>(new Date());
    const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(() => {
        if (isLoading || !calendarEvents) return null;
        const today = format(new Date(), 'yyyy-MM-dd');
        return calendarEvents.find(event => format(new Date(event.date), 'yyyy-MM-dd') === today) || null;
    });

    const handleDayClick: React.ComponentProps<typeof DayPicker>['onDayClick'] = (day, modifiers) => {
        setDate(day);
        if(!calendarEvents) return;
        const dayStr = format(day, 'yyyy-MM-dd');
        const eventOnDay = calendarEvents.find(e => format(new Date(e.date), 'yyyy-MM-dd') === dayStr);
        setSelectedEvent(eventOnDay || null);
    };

    if (isLoading) {
        return <div>Loading...</div>
    }
    
    const eventDates = calendarEvents.map(event => new Date(event.date));
    const modifiers = {
        events: eventDates.filter((_, i) => calendarEvents[i].type === 'event'),
        holidays: eventDates.filter((_, i) => calendarEvents[i].type === 'holiday'),
        homework: eventDates.filter((_, i) => calendarEvents[i].type === 'homework'),
    };

    const modifiersClassNames = {
        events: 'bg-chart-2/30 rounded-full',
        holidays: 'bg-destructive/30 rounded-full',
        homework: 'bg-primary/30 rounded-full',
        today: 'bg-accent text-accent-foreground rounded-md',
    };

    return (
        <div>
            <div className="flex justify-between items-center">
                <PageHeader title="Calendar" description="View and manage class events, deadlines, and holidays." />
                <AiEventSuggester events={calendarEvents} />
            </div>

            <div className="grid md:grid-cols-3 gap-8 mt-6">
                <Card className="md:col-span-2">
                     <Calendar
                        mode="single"
                        selected={date}
                        onDayClick={handleDayClick}
                        className="p-0"
                        classNames={{
                            months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
                            month: "space-y-4 flex-1",
                            caption_label: "text-lg font-medium",
                            table: "w-full border-collapse space-y-1",
                            head_row: "flex",
                            head_cell: "text-muted-foreground rounded-md w-full font-normal text-[0.8rem]",
                            row: "flex w-full mt-2",
                            cell: "h-14 w-full text-center text-sm p-0 relative [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
                            day: "h-14 w-full p-0 font-normal aria-selected:opacity-100",
                            day_selected: "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground rounded-md",
                        }}
                        modifiers={modifiers}
                        modifiersClassNames={modifiersClassNames}
                    />
                </Card>
                <Card>
                    <CardHeader>
                        <CardTitle>
                            {date ? format(date, 'PPP') : 'Select a date'}
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {selectedEvent ? (
                            <div>
                                 <Badge className="capitalize mb-2" variant={
                                     selectedEvent.type === 'holiday' ? 'destructive' :
                                     selectedEvent.type === 'event' ? 'success' : 'default'
                                 }>
                                     {selectedEvent.type}
                                 </Badge>
                                <h3 className="font-semibold text-lg">{selectedEvent.title}</h3>
                                {selectedEvent.description && (
                                    <p className="text-muted-foreground mt-1">{selectedEvent.description}</p>
                                )}
                            </div>
                        ) : (
                            <p className="text-muted-foreground">No events for this day.</p>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
