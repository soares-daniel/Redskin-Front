"use client";

import React from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { addEvent, deleteEvent, fetchEvents } from '@/controllers/calendarController';
import useEventsData from '@/hooks/useEventsData';
import { transformEvents } from '@/utils/eventTransform';
import { DateSelectArg, EventClickArg } from 'fullcalendar';
import { createEventId } from './event-utils';
import interactionPlugin from '@fullcalendar/interaction';


export default function Calendar() {
  const data = useEventsData();

  //transform the data to the format required by FullCalendar
  const stringifiedEvents = data.map((event) => ({
    ...event,
    id: event.id.toString(),
    classNames: event.extendedProps.eventType,
  }));

 const handleAddEvent = async (selectInfo: DateSelectArg) => {
  let title = prompt('Please enter a new title for your event');
  let calendarApi = selectInfo.view.calendar;
  // clear date selection
  calendarApi.unselect(); 

  if (title) {
    const newEvent = {
      id: createEventId(),
      title,
      start: selectInfo.startStr,
      end: selectInfo.endStr,
      createdBy: 0,
      eventType: 0,
      description: 'string',
    };

    calendarApi.addEvent(newEvent);

    // Here you can call your API to store the event in the database
    await addEvent(newEvent);
  }
};

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
      select={handleAddEvent}
      eventClick={handleDeleteEvent}
      events={stringifiedEvents}
      eventClassNames={(info) => info.event.extendedProps.classNames}
    />
  );
}