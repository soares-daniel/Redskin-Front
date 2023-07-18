
import { useState, useEffect } from 'react';
import { fetchEvents } from '../controllers/calendarController';
import { transformEvents } from '../utils/eventTransform';
// Define the shape of an event object.
interface Event {
  id: number;
  title: string;
  start: Date;
  end: Date;
  extendedProps: {
    description: string;
    createdBy: number;
    eventType: number;
    createdAt: Date;
    updatedAt: Date;
  };
}

const useEventsData = () => {
  const [data, setData] = useState<Event[]>([]);

  useEffect(() => {
    fetchEvents().then((apiEvents) => {
      const events = transformEvents(apiEvents);
      setData(events);
    });
  }, []);

  return data;
};

export default useEventsData;
