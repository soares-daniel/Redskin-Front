"use client";

import React, { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import useEventsData from '@/hooks/useEventsData';
import { FullCalendarEvent, transformEvents } from '@/utils/eventTransform';
import { DateSelectArg, EventClickArg } from 'fullcalendar';
import { createEventId } from './event-utils';
import interactionPlugin, { DateClickArg } from '@fullcalendar/interaction';
import useDeleteEvent from '@/hooks/useDeleteEvent';
import EventPopup from './eventPopup';


interface CalendarProps {
  onDateClick: (date: Date) => void;
}

export default function Calendar({ events }: { events: FullCalendarEvent[] }) {
  const { deleteEvent } = useDeleteEvent();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedEvents, setSelectedEvents] = useState<FullCalendarEvent[]>([]);


  const handleDeleteEvent = async (clickInfo: EventClickArg) => {
    if (window.confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      const eventId = (clickInfo.event.id);
      await deleteEvent(eventId);
      // After deleting the event from the server, remove it from the calendar
      clickInfo.event.remove();
    }
  };

  return (
  <div>
    <FullCalendar
      plugins={[dayGridPlugin, interactionPlugin]}
      initialView="dayGridMonth"
      selectable={true}
      //dateClick={handleDateClick}
      eventClick={handleDeleteEvent}
      events={events}
      eventClassNames={(info) => info.event.extendedProps.classNames}
    />
    
  </div>
  );
}