// useFetchEvents.ts

import { useState, useEffect } from 'react';
import { fetchData } from '@/utils/api';

export function useFetchEvents() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const json = await fetchData('/api/events/user');
        setData(json);
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return { data, loading, error };
}