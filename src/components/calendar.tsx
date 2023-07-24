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
import multiMonthPlugin from '@fullcalendar/multimonth'
import EventListModal from './eventListModal';
import useUpdateEvent from '@/hooks/useUpdateEvent';
import CreateEventModal from './createEventModal';
import UpdateEventModal from './updateEventModal';


interface CalendarProps {
  onDateClick: (date: Date) => void;
}

export default function Calendar({ events }: { events: FullCalendarEvent[] }) {
  const { deleteEvent } = useDeleteEvent();
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedEvents, setSelectedEvents] = useState<FullCalendarEvent[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<FullCalendarEvent | undefined>(undefined);
  //const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [isListModalOpen, setIsListModalOpen] = useState(false);
  const { updateEvent } = useUpdateEvent();
  const [eventToEdit, setEventToEdit] = useState<FullCalendarEvent | undefined>(undefined);
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  

  const customButtons = {
    createEventButton: {
      text: 'Create',
      click: () => setIsCreateModalOpen(true),
    },
  };


  const handleDeleteEvent = async (clickInfo: EventClickArg) => {
    if (window.confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      const eventId = (clickInfo.event.id);
      await deleteEvent(eventId);
      // After deleting the event from the server, remove it from the calendar
      clickInfo.event.remove();
    }
  };


  const handleDateClick = (clickInfo: DateClickArg) => {
   // Filter the events on the clicked date
   const eventsOnSelectedDate = events.filter((event) => {
      const eventStartDate = new Date(event.start).setHours(0, 0, 0, 0);
      const eventEndDate = new Date(event.end).setHours(23, 59, 59, 999);
      const clickedDate = clickInfo.date.setHours(0, 0, 0, 0);

      return eventStartDate <= clickedDate && clickedDate <= eventEndDate;
    });

    // Update the local state
    setSelectedEvents(eventsOnSelectedDate);

    // Open the event list modal
    setIsListModalOpen(true);

    // Ensure the event modal is closed
    setIsEventModalOpen(false);
  };



  const handleEditEvent = (eventToEdit: FullCalendarEvent) => {
    setEventToEdit(eventToEdit);
    setIsUpdateModalOpen(true);
    setIsListModalOpen(false); // close the list modal
  };

  return (
  <div>
    <EventListModal
        isOpen={isListModalOpen}
        onRequestClose={() => setIsListModalOpen(false)}
        events={selectedEvents}
        onEdit={handleEditEvent}
      />
    <CreateEventModal isOpen={isCreateModalOpen} onRequestClose={() => setIsCreateModalOpen(false)}/>
    <UpdateEventModal 
        isOpen={isUpdateModalOpen} 
        onRequestClose={() => setIsUpdateModalOpen(false)}
        eventToEdit={eventToEdit}
      />
    <FullCalendar
      plugins={[dayGridPlugin, interactionPlugin, multiMonthPlugin]}
      customButtons={customButtons}
      headerToolbar={{
        left: 'prev,next today createEventButton', // Add the custom button to the header
        center: 'title',
        right: 'dayGridMonth multiMonthYear', // Only show the month view button
      }}
      initialView="dayGridMonth"
      selectable={true}
      dateClick={handleDateClick}
      eventClick={handleDeleteEvent}
      events={events}
      eventClassNames={(info) => info.event.extendedProps.classNames}
    />
    
  </div>
  );
}
