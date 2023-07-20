//const baseUrl = process.env.API_URL;
const baseUrl = 'http://localhost:8000/api';

import { useState, useEffect } from 'react';
import useSuperUserToken from './auth';
import { EventDataTransformed, transformEvents } from '@/utils/eventTransform';

export default function useApi() {
  const token = useSuperUserToken();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [eventsData, setEventsData] = useState<EventDataTransformed[]>([]);

  const deleteEvent = async (eventId: number) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${baseUrl}/events/delete/${eventId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      console.log('Delete event response', response); //check
      setIsLoading(false);
      return await response.json();
    } catch (error) {
      console.error("Error deleting event", error);
      setError(error instanceof Error ? error.message : 'An error occurred');
      setIsLoading(false);
      return null;
    }
  };

  const fetchEvents = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${baseUrl}/events`);
      console.log('Fetch events response', response); // Log the response
      setIsLoading(false);
      const data = await response.json();
      console.log('Fetch events data', data); // Log the data
      const transformedData = data.map(transformEvents); // Transform the data
      setEventsData(Array.isArray(transformedData) ? transformedData : []);
      return Array.isArray(transformedData) ? transformedData : [];
    } catch (error) {
      console.error("Error fetching events", error);
      setError(error instanceof Error ? error.message : 'An error occurred');
      setIsLoading(false);
      return [];
    }
  };

  // addEvent here

  return { deleteEvent, fetchEvents, isLoading, error };
}