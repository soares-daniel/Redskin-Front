//useUpdateEvent.ts

import { useState } from 'react';
import { fetchData } from '@/utils/api';
import {FullCalendarEvent} from "@/utils/eventTransform";

export default function useUpdateEvent() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [updatedEvent, setUpdatedEvent] = useState(null);

  const updateEvent = async (updatedEvent: FullCalendarEvent, oldEvent: FullCalendarEvent) => {
    setLoading(true);
    setError(null);

    const body: { [key: string]: string } = {};

    // Compare the updated event to the old event to see what changed and add it to the body

    if(updatedEvent.title !== oldEvent.title) body.title = updatedEvent.title;
    if(updatedEvent.start !== oldEvent.start) body.startDate = updatedEvent.start.toISOString();
    if(updatedEvent.end !== oldEvent.end) body.endDate = updatedEvent.end.toISOString();
    if(updatedEvent.extendedProps.eventType !== oldEvent.extendedProps.eventType) {
      body.eventType = updatedEvent.extendedProps.eventType.toString();
    }
    if(updatedEvent.extendedProps.description !== oldEvent.extendedProps.description) {
        body.description = updatedEvent.extendedProps.description;
    }

    try {
      const data = await fetchData(`/events/update/${updatedEvent.id}`, 'PUT', body);
      setUpdatedEvent(data);
      return data;
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unknown error occurred');
      }
      throw error; // Rethrow error for useEventsData
    } finally {
      setLoading(false);
    }
  };

  return { updateEvent, loading, error, updatedEvent };
}