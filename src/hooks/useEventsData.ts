
import { useState, useEffect } from 'react';
import { transformEvents, FullCalendarEvent } from '@/utils/eventTransform';
import { useFetchEvents } from './useFetchEvents';
import useDeleteEvent from './useDeleteEvent';
import useUpdateEvent from './useUpdateEvent';
import useCreateEvent from './useCreateEvent';

type NewEvent = Omit<FullCalendarEvent, 'id' | 'extendedProps'> & {
  extendedProps: Omit<FullCalendarEvent['extendedProps'], 'createdBy' | 'createdAt' | 'updatedAt'>
};

export default function useEventsData() {
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
    const newEvent = await addEventApi({ eventType, title, description, startDate, endDate });
    if (newEvent) {
      setData(prevData => [...prevData, newEvent]);
      await refetch();
    }
  };

  const deleteEvent = async (eventId: string) => {
    try {
      await deleteEventApi(eventId);
      setData(prevData => prevData.filter(event => event.id !== eventId));
    } catch (error) {
      console.error('Failed to delete event:', error);
    }
    
  };

  const updateEvent = async (updatedEvent: FullCalendarEvent) => {
    try {
      const { title, start, end, extendedProps: { eventType, description } } = updatedEvent;
      const startDate = start.toISOString();
      const endDate = end.toISOString();
      await updateEventApi(updatedEvent.id, { eventType, title, description, startDate, endDate });
      setData(prevData => prevData.map(event => event.id === updatedEvent.id ? updatedEvent : event));
    } catch (error) {
      console.error('Failed to update event:', error);
    }
    await refetch();
  };

  return { data, loading, error, addEvent, deleteEvent, updateEvent };
}

