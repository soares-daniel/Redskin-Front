// useDeleteEvent.ts

import { useState } from 'react';
import { fetchData } from '@/utils/api';

export default function useDeleteEvent() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [deletedEvent, setDeletedEvent] = useState(null);

  const deleteEvent = async (eventId: string) => {
    setLoading(true);
    setError(null);

    try {
      const data = await fetchData(`/events/delete/${Number(eventId)}`, 'DELETE');
      setDeletedEvent(data);
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

  return { deleteEvent, loading, error, deletedEvent };
}
