"use client";

import React, { useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import { addEvent, fetchEvents } from '@/controllers/calendarController';
import useEventsData from '@/hooks/useEventsData';
import { transformEvents } from '@/utils/eventTransform';
import { DateSelectArg, EventClickArg } from 'fullcalendar';
import { createEventId } from './event-utils';
import interactionPlugin from '@fullcalendar/interaction';
//import useSuperUserToken from '@/hooks/auth';
import { useCookies } from 'react-cookie';
import useDeleteEvent from '@/hooks/useDeleteEvent';


export default function Calendar() {
  const { data, loading, error } = useEventsData();
  //const { addEvent } = useAddEvent();
  const { deleteEvent } = useDeleteEvent();
  //const token = useSuperUserToken();
  //const [cookies] = useCookies(['superUserToken']);
  
/*
  useEffect(() => {
    if (token) {
      // TEST: Print the token to the terminal
      console.log('Received auth token:', token); 
    }
  }, [token]); */
/*
  useEffect(() => {
    console.log('Token from cookie:', cookies.superUserToken); // Print the token
  }, [cookies]);
*/
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