import { createContext } from 'react';
import { FullCalendarEvent } from '@/utils/eventTransform' // replace with your actual types path

export interface EventParams {
    eventId: string;
    eventType?: number;
    title?: string;
    description?: string;
    startDate?: string;
    endDate?: string;
}

type NewEvent = Omit<FullCalendarEvent, 'id' | 'extendedProps'> & {
    extendedProps: Omit<FullCalendarEvent['extendedProps'], 'createdBy' | 'createdAt' | 'updatedAt'>
  };
  
export const EventsContext = createContext<{
    events: FullCalendarEvent[];
    addEvent: (event: NewEvent) => void;
    updateEvent: (newEvent: FullCalendarEvent, oldEvent: FullCalendarEvent) => void;
    deleteEvent: (eventId: string) => void;
  }>({
    events: [],
    addEvent: () => {},
    updateEvent: () => {},
    deleteEvent: () => {},
  });