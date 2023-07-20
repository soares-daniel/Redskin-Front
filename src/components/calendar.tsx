"use client";

import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
//import { addEvent, deleteEvent, fetchEvents } from '@/controllers/calendarController';
import useEventsData from '@/hooks/useEventsData';
import { EventDataTransformed, transformEvents } from '@/utils/eventTransform';
import { DateSelectArg, EventClickArg } from 'fullcalendar';
import { createEventId } from './event-utils';
import interactionPlugin from '@fullcalendar/interaction';
import useApi from '@/hooks/useAPI';

export default function Calendar() {
  const { deleteEvent, fetchEvents } = useApi();
  const [data, setData] = useState<EventDataTransformed[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const eventsData = await fetchEvents();
      setData(eventsData);
    };

    fetchData();
  }, [fetchEvents]);

  //transform the data to the format required by FullCalendar
  const stringifiedEvents = data.map((event) => ({
    ...event,
    id: event.id.toString(),
    classNames: event.extendedProps.eventType,
  }));

  const handleDeleteEvent = async (clickInfo: EventClickArg) => {
    if (window.confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      //remove from UI
      clickInfo.event.remove();
      const eventId = Number(clickInfo.event.id);
      //call API to delete the event from DB
      await deleteEvent(eventId);
    }
  };

  return (
    <FullCalendar
      plugins={[dayGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      selectable={true}
      // select={handleAddEvent} // Commented out for now
      eventClick={handleDeleteEvent}
      events={stringifiedEvents}
      eventClassNames={(info) => info.event.extendedProps.classNames}
    />
  );
}