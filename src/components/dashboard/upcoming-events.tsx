import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { MOCK_CALENDAR_EVENTS } from "@/lib/mock-data";
import { Calendar, Clock } from "lucide-react";
import { format, formatDistanceToNow } from 'date-fns';
import { Badge, type BadgeProps } from "../ui/badge";

export default function UpcomingEvents() {
    const upcomingEvents = MOCK_CALENDAR_EVENTS
        .filter(event => new Date(event.date) >= new Date())
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
        .slice(0, 4);

    const getBadgeVariant = (type: 'homework' | 'event' | 'holiday'): BadgeProps['variant'] => {
        switch(type) {
            case 'homework': return 'default';
            case 'event': return 'success';
            case 'holiday': return 'destructive';
            default: return 'outline';
        }
    }
    
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Upcoming Events
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {upcomingEvents.map(event => (
                        <div key={event.id} className="flex items-start gap-4">
                             <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted">
                                <span className="text-lg font-bold text-primary">{format(new Date(event.date), 'dd')}</span>
                            </div>
                            <div className="flex-1">
                                <div className="flex items-center justify-between">
                                    <p className="font-semibold">{event.title}</p>
                                    <Badge variant={getBadgeVariant(event.type)} className="capitalize">{event.type}</Badge>
                                </div>
                                <p className="text-sm text-muted-foreground flex items-center gap-1">
                                    <Clock className="h-3 w-3" />
                                    {format(new Date(event.date), 'EEE, MMM d, yyyy')} ({formatDistanceToNow(new Date(event.date), { addSuffix: true })})
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
