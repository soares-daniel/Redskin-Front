// useGetEventTypes.ts

import { useState, useEffect } from 'react';
import { fetchData } from '@/utils/api';

export function useGetEventTypes() {
  const [eventTypes, setEventTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchEventTypes = async () => {
    try {
      const data = await fetchData('/users/event_types');
      setEventTypes(data);
      localStorage.setItem('eventTypes', JSON.stringify(data));
    } catch (error) {
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEventTypes();
  }, []);

  const refetch = async () => {
    setLoading(true);
    setError(null);
    await fetchEventTypes();
  };

  return { eventTypes, loading, error, refetch };
}