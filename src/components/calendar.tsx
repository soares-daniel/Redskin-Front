"use client";

import React from "react";
import { useEffect, useState } from "react";
import { fetchEvents } from "../controllers/calendarController";
import { transformEvents } from "../utils/eventTransform";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import { EventDataTransformed } from "../controllers/calendarController";

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

export default function Calendar() {
  const [data, setData] = useState<EventDataTransformed[]>([]);

  useEffect(() => {
    fetchEvents().then((apiEvents) => {
      const events = transformEvents(apiEvents);
      setData(events);
    });
  }, []);

  const stringifiedEvents = data.map(event => ({ ...event, id: event.id.toString() }));

  return (
    <FullCalendar 
      plugins={[ dayGridPlugin ]}
      initialView="dayGridMonth"
      events={stringifiedEvents}
    />
  );
}
