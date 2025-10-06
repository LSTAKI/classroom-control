'use server';

/**
 * @fileOverview Suggests relevant events to add to the calendar based on the class schedule and curriculum.
 *
 * - suggestEvents - A function that suggests relevant events.
 * - SuggestEventsInput - The input type for the suggestEvents function.
 * - SuggestEventsOutput - The return type for the suggestEvents function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestEventsInputSchema = z.object({
  classSchedule: z.string().describe('The class schedule.'),
  curriculum: z.string().describe('The curriculum.'),
  existingEvents: z.string().describe('The existing events in the calendar.'),
  homeworkDeadlines: z.string().describe('The existing homework deadlines.'),
});
export type SuggestEventsInput = z.infer<typeof SuggestEventsInputSchema>;

const SuggestEventsOutputSchema = z.object({
  suggestedEvents: z.string().describe('The suggested events to add to the calendar.'),
});
export type SuggestEventsOutput = z.infer<typeof SuggestEventsOutputSchema>;

export async function suggestEvents(input: SuggestEventsInput): Promise<SuggestEventsOutput> {
  return suggestEventsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestEventsPrompt',
  input: {schema: SuggestEventsInputSchema},
  output: {schema: SuggestEventsOutputSchema},
  prompt: `You are a helpful assistant that suggests relevant events to add to a teacher's calendar based on their class schedule, curriculum, existing events, and homework deadlines, so you can efficiently enrich the curriculum and improve student engagement.

Class Schedule: {{{classSchedule}}}
Curriculum: {{{curriculum}}}
Existing Events: {{{existingEvents}}}
Homework Deadlines: {{{homeworkDeadlines}}}

Suggest some events that would enhance learning and engagement for the students. Return the events in plain text. Focus on improving curriculum retention.
`,
});

const suggestEventsFlow = ai.defineFlow(
  {
    name: 'suggestEventsFlow',
    inputSchema: SuggestEventsInputSchema,
    outputSchema: SuggestEventsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
