"use client"
import { useEffect, useState } from 'react';
import { fetchEvents } from 'src/controllers/calendarController';

const Test = () => {
  const [data, setData] = useState<Array<{title: string}>>([]); // <--- type explicitly provided here

  useEffect(() => {
    const fetchData = async () => {
      const events = await fetchEvents();
      setData(events);
    }

    fetchData();
  }, []);

  return (
    <div>
      {data.length > 0
        ? data.map((event, index) => <p key={index}>{event.title}</p>)
        : "Fetching events..."}
    </div>
  );
};

export default Test;
