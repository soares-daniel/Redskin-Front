import React from 'react';
import { FullCalendarEvent } from '@/utils/eventTransform' // replace with your actual types path

type NewEvent = Omit<FullCalendarEvent, 'id' | 'extendedProps'> & {
    extendedProps: Omit<FullCalendarEvent['extendedProps'], 'createdBy' | 'createdAt' | 'updatedAt'>
  };
  
export const EventsContext = React.createContext<{
    events: FullCalendarEvent[];
    addEvent: (event: NewEvent) => void;
    updateEvent: (event: FullCalendarEvent) => void;
    deleteEvent: (eventId: string) => void;
  }>({
    events: [],
    addEvent: () => {},
    updateEvent: () => {},
    deleteEvent: () => {},
  });