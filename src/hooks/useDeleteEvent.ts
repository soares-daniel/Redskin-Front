// useDeleteEvent.ts

import { useState } from 'react';
import { useCookies } from 'react-cookie';

export default function useDeleteEvent() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [deletedEvent, setDeletedEvent] = useState(null);
  const [cookies] = useCookies(['superUserToken']);

  const deleteEvent = async (eventId: string) => {
    setLoading(true);
    setError(null);

    try {
        const response = await fetch(`http://localhost:8000/api/events/delete/${Number(eventId)}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${cookies.superUserToken}`,
          },
        });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message);

      }

      const data = await response.json();
      setDeletedEvent(data);
      setLoading(false);
    } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('An unknown error occurred');
        }
        setLoading(false);
      }
  };

  return { deleteEvent, loading, error, deletedEvent };
}