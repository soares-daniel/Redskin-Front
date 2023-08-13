// useFetchEvents.ts

import { useState, useEffect } from 'react';
import { fetchData } from '@/utils/api';
import { useError } from '@/components/ErrorContext';
export function useFetchEvents() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  //const [error, setError] = useState<Error | null>(null);
  const { error, setError } = useError();

  const fetchEvents = async () => {
    try {
      const json = await fetchData('/events/user');
      setData(json);
    } catch (error) {
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []); 

  const refetch = async () => {
    setLoading(true);
    setError(null);
    await fetchEvents();
  };

  return { data, loading, error, refetch };
}
