"use client"
import React, { useEffect, useState } from "react";
import Layout from "@/components/layout";
import Calendar from "@/components/calendar";
import EventCard from "@/components/eventcard";
import useEventsData from "@/hooks/useEventsData";
import { useRouter } from "next/navigation";
import { ErrorTypes } from "@/types/errorTypes";
import { EventsContext } from "@/components/EventsContext";
import UserIdContext from '@/components/UserIdContext';
import EventTypesContext from '@/components/EventTypesContext';
import { useCookies } from 'react-cookie';
import { useGetEventTypes } from '@/hooks/useGetEventTypes';
import FilterDropdown from "@/components/filterDropdown";
import { FullCalendarEvent } from "@/utils/eventTransform";



export default function Dashboard() {
  const router = useRouter();
  const { data: fetchedEvents, loading, error, addEvent, updateEvent, deleteEvent } = useEventsData();
  const { eventTypes, loading: eventTypesLoading, error: eventTypesError } = useGetEventTypes();
  const [events, setEvents] = useState<FullCalendarEvent[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<FullCalendarEvent[]>([]);
  const [cookies] = useCookies(['userId']);
  const userId = cookies.userId;

    useEffect(() => {
      setEvents(fetchedEvents);
      setFilteredEvents(fetchedEvents);
  }, [fetchedEvents]);


    const handleFilterChange = (filteredIds: number[]) => {
      setFilteredEvents(
        events.filter(event => 
          filteredIds.includes(event.extendedProps.eventType) 
        )
      );
    }
    
  
  useEffect(() => {
    if (error && error.name === ErrorTypes.NOT_AUTHORIZED) {
      router.push('/login');
    }
  }, [error, router]);

  if (loading) return <p>Loading...</p>;
  if (error) return null;
  if (!Array.isArray(events)) return <p>No events to display</p>;
  if (eventTypesLoading) return <p>Loading event types...</p>;
  if (eventTypesError) return <p>Error fetching event types.</p>;


  return (
    <UserIdContext.Provider value={userId}>
      <EventTypesContext.Provider value={eventTypes}>
        <EventsContext.Provider value={{ events: filteredEvents, addEvent, updateEvent, deleteEvent }}>
          <Layout>
            <div className="flex h-full gap-4 pt-4">
              <div className="w-1/4 overflow-y-auto h-screen p-4">
                <FilterDropdown onFilterChange={handleFilterChange} />
                <EventCard />
              </div>
              <div className="w-3/4 border border-gray-400 mx-auto p-2">
                <Calendar/>
              </div>
            </div>
          </Layout>
        </EventsContext.Provider>
      </EventTypesContext.Provider>
    </UserIdContext.Provider>
  );
}