//useUpdateEvent.ts

import { useState } from 'react';
import { fetchData } from '@/utils/api';

export default function useUpdateEvent() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [updatedEvent, setUpdatedEvent] = useState(null);

  const updateEvent = async (eventId: string, eventData: {
    eventType: number;
    title: string;
    description: string;
    startDate: string;
    endDate: string;
  }) => {
    setLoading(true);
    setError(null);

    try {
      const data = await fetchData(`/events/update/${eventId}`, 'PUT', eventData);
      setUpdatedEvent(data);
      return data;
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unknown error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  return { updateEvent, loading, error, updatedEvent };
}