"use client";

import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import useEventsData from "@/hooks/useEventsData";


export default function Calendar() {
  const data = useEventsData();

  const stringifiedEvents = data.map((event) => ({
    ...event,
    id: event.id.toString(),
  }));

  return (
    <FullCalendar
      plugins={[dayGridPlugin]}
      initialView="dayGridMonth"
      events={stringifiedEvents}
    />
  );
}