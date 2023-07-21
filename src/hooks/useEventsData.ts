
import { useState, useEffect } from 'react';
import { useFetchEvents } from './useAPI';
import { transformEvents, FullCalendarEvent } from '@/utils/eventTransform';

export default function useEventsData() {
  const [data, setData] = useState<FullCalendarEvent[]>([]);
  const { data: apiData, loading, error } = useFetchEvents();

  useEffect(() => {
    if (apiData) {
      const transformedData = transformEvents(apiData);
      setData(transformedData);
    }
  }, [apiData]);

  return { data, loading, error };
}

