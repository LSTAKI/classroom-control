'use client';
import { useState, useTransition } from 'react';
import { Button } from './ui/button';
import { Sparkles, Loader2 } from 'lucide-react';
import { suggestEvents } from '@/ai/flows/ai-event-suggestion';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from './ui/dialog';
import type { CalendarEvent } from '@/lib/types';
import { useHomework } from '@/hooks/use-homework';
import { format } from 'date-fns';

interface AiEventSuggesterProps {
  events: CalendarEvent[];
}

export default function AiEventSuggester({ events }: AiEventSuggesterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [suggestion, setSuggestion] = useState('');
  const [isPending, startTransition] = useTransition();
  const { homework } = useHomework();

  const handleSuggestion = () => {
    startTransition(async () => {
      // Dummy data for the AI prompt as real data isn't stored
      const classSchedule = 'Mon/Wed/Fri 10-11 AM: Grade 10 Math. Tue/Thu 1-2 PM: Grade 10 Science.';
      const curriculum = 'Math: Algebra II, Geometry. Science: Biology, Chemistry basics.';
      const existingEvents = events.map(e => `${e.title} on ${e.date}`).join(', ');
      const homeworkDeadlines = homework
        .filter(hw => new Date(hw.dueDate) > new Date())
        .map(hw => `${hw.title} due on ${format(new Date(hw.dueDate), 'PPP')}`)
        .join(', ');

      try {
        const result = await suggestEvents({ classSchedule, curriculum, existingEvents, homeworkDeadlines });
        setSuggestion(result.suggestedEvents);
        setIsOpen(true);
      } catch (error) {
        console.error('AI suggestion failed:', error);
        setSuggestion('Sorry, I couldn\'t generate suggestions at this time.');
        setIsOpen(true);
      }
    });
  };

  return (
    <>
      <Button onClick={handleSuggestion} disabled={isPending}>
        {isPending ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <Sparkles className="mr-2 h-4 w-4" />
        )}
        Get AI Suggestions
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Sparkles className="text-primary" />
              AI Event Suggestions
            </DialogTitle>
            <DialogDescription>
              Here are some events suggested by AI to enhance your curriculum.
            </DialogDescription>
          </DialogHeader>
          <div className="prose prose-sm dark:prose-invert max-h-[400px] overflow-y-auto rounded-md border p-4">
             <p className="text-sm text-foreground whitespace-pre-wrap">{suggestion}</p>
          </div>
          <DialogFooter>
            <Button onClick={() => setIsOpen(false)}>Close</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
