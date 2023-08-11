//useCreateEvent.ts

import { useState } from 'react';
import { useCookies } from 'react-cookie';
import { fetchData } from '@/utils/api';

export default function useCreateEvent() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [createdEvent, setCreatedEvent] = useState(null);
  const [cookies] = useCookies(['userId']);

  const createEvent = async (eventData: {
    eventType: number;
    title: string;
    description: string;
    startDate: string;
    endDate: string;
  }) => {
    setLoading(true);
    setError(null);

    // Get the user ID from the cookie
    const createdBy = Number(cookies.userId);

    try {
      const data = await fetchData('/events/create', 'POST', {
        ...eventData,
        createdBy,
      });
      setCreatedEvent(data);
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

  return { createEvent, loading, error, createdEvent };
}