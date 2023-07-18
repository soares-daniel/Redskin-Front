// useEventsData.ts

import { useState, useEffect } from 'react';
import { fetchEvents } from '../controllers/calendarController';
import { transformEvents } from '../utils/eventTransform';
import { EventDataTransformed } from "../utils/eventTransform";

export default function useEventsData() {
  const [data, setData] = useState<EventDataTransformed[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiEvents = await fetchEvents();
        const events = transformEvents(apiEvents);
        setData(events);
      } catch (error) {
        console.error("Error fetching events", error);
        setData([]);
      }
    };

    fetchData();
  }, []);

  return data;
}

