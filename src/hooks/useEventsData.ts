//useEventsData.tsx

import { useState, useEffect } from 'react';
import { transformEvents, FullCalendarEvent } from '@/utils/eventTransform';
import { useFetchEvents } from './useFetchEvents';
import useDeleteEvent from './useDeleteEvent';
import useUpdateEvent from './useUpdateEvent';
import useCreateEvent from './useCreateEvent';
import { useError } from '@/components/ErrorContext';
import { co } from '@fullcalendar/core/internal-common';
import { set } from 'date-fns';

type NewEvent = Omit<FullCalendarEvent, 'id' | 'extendedProps'> & {
  extendedProps: Omit<FullCalendarEvent['extendedProps'], 'createdBy' | 'createdAt' | 'updatedAt'>
};

export default function useEventsData() {
  const { setError, errorMessage } = useError();
  const [data, setData] = useState<FullCalendarEvent[]>([]);
  const { data: apiData, loading, error, refetch } = useFetchEvents();
  const { deleteEvent: deleteEventApi } = useDeleteEvent();
  const { updateEvent: updateEventApi } = useUpdateEvent();
  const { createEvent: addEventApi } = useCreateEvent();

  useEffect(() => {
    if (apiData) {
      const transformedData = transformEvents(apiData);
      setData(transformedData);
      
    }
  }, [apiData]);

  const addEvent = async (event: NewEvent) => {
    const { title, start, end, extendedProps: { eventType, description } } = event;
    const startDate = start.toISOString();
    const endDate = end.toISOString();
    // Generate a unique temporary ID
    const tempId = 'temp-' + Date.now();
    // Optimistic update
    const tempEvent: FullCalendarEvent = {
      ...event,
      id: tempId,
      extendedProps: {
        ...event.extendedProps,
        createdBy: 'loading...', // placeholder values
        createdAt: new Date(), // placeholder values
        updatedAt: new Date(), // placeholder values
      },
    };
    setData(prevData => [...prevData, tempEvent]);

    try {
      const newEvent = await addEventApi({ eventType, title, description, startDate, endDate });
      if (newEvent) {
        setData(prevData => {
          // Replace the temporary event with the new one from the server
          const index = prevData.findIndex(e => e.id === tempId);
          if (index !== -1) {
            const newData = [...prevData];
            newData[index] = transformEvents([newEvent])[0]; // Use your transformEvents function to ensure the data is in the correct format
            return newData;
          }
          // If the temporary event isn't found in the array for some reason, just add the new event to the end
          return [...prevData, transformEvents([newEvent])[0]];
        });
      }
    } catch (err) {
      console.error('Failed to add event:', err);
      setData(prevData => prevData.filter(e => e.id !== tempId));
    
      if (err instanceof Error) {
        setError(err, err.message);
      } else {
        setError(new Error('An unknown error occurred while adding an event.'));
      }
    }
  };

  const deleteEvent = async (eventId: string) => {
    const eventToBeDeleted = data.find(event => event.id === eventId);

    // Optimistic update
    setData(prevData => prevData.filter(event => event.id !== eventId));

    try {
      await deleteEventApi(eventId);
    } catch (err) {
      console.error('Failed to delete event:', err);
      // Revert the changes only if eventToBeDeleted is defined
      if (eventToBeDeleted) {
        setData(prevData => [...prevData, eventToBeDeleted]);
      }
      if (err instanceof Error) {
        setError(err);
      } else {
        setError(new Error('An unknown error occurred while deleting an event.'));
      }
    }
  };

  const updateEvent = async (updatedEvent: FullCalendarEvent, oldEvent: FullCalendarEvent) => {
    if (!updatedEvent.extendedProps) {
      console.error('Failed to update event: extendedProps is undefined');
      return;
    }
  
    const { title, start, end, extendedProps: { eventType, description } } = updatedEvent;
    const startDate = start.toISOString();
    const endDate = end.toISOString();

    // Optimistic update
    setData(prevData => prevData.map(event => event.id === updatedEvent.id ? updatedEvent : event));

    try {
      const updatedEventData = await updateEventApi(updatedEvent, oldEvent);
      // If the API call is successful, update the event in state with the returned data
      if (updatedEventData) {
        setData(prevData => prevData.map(event => event.id === updatedEvent.id ? transformEvents([updatedEventData])[0] : event));
      }
    } catch (err) {
      console.error('Failed to update event:', err);
      // Revert the changes only if oldEvent is defined
      if (oldEvent) {
        setData(prevData => prevData.map(event => event.id === oldEvent.id ? oldEvent : event));
      }
      if (err instanceof Error) {
        setError(err, err.message);
      } else {
        setError(new Error('An unknown error occurred while adding an event.'));
      }
    }
  };

  

  return { data, loading, error, addEvent, deleteEvent, updateEvent, refetch };
}
