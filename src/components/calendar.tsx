"use client";

import React, { useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import useEventsData from '@/hooks/useEventsData';
import { transformEvents } from '@/utils/eventTransform';
import { DateSelectArg, EventClickArg } from 'fullcalendar';
import { createEventId } from './event-utils';
import interactionPlugin from '@fullcalendar/interaction';
import useDeleteEvent from '@/hooks/useDeleteEvent';


export default function Calendar() {
  const { data, loading, error } = useEventsData();
  const { deleteEvent } = useDeleteEvent();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleDeleteEvent = async (clickInfo: EventClickArg) => {
    if (window.confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      const eventId = (clickInfo.event.id);
      await deleteEvent(eventId);
      // After deleting the event from the server, remove it from the calendar
      clickInfo.event.remove();
    }
  };

  

  return (
    <FullCalendar
      plugins={[dayGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      selectable={true}
      //select={handleAddEvent}
      eventClick={handleDeleteEvent}
      events={data}
      eventClassNames={(info) => info.event.extendedProps.classNames}
    />
  );
}