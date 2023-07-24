
import { useState, useEffect } from 'react';
import { transformEvents, FullCalendarEvent } from '@/utils/eventTransform';
import { useFetchEvents } from './useFetchEvents';

export default function useEventsData() {
  const [data, setData] = useState<FullCalendarEvent[]>([]);
  const { data: apiData, loading, error } = useFetchEvents();

  useEffect(() => {
    if (apiData) {
      const transformedData = transformEvents(apiData);
      setData(transformedData);
    }
  }, [apiData]);
  const addEvent = (event: FullCalendarEvent) => {
    setData(prevData => [...prevData, event]);
  };

  return { data, loading, error, addEvent };
}

