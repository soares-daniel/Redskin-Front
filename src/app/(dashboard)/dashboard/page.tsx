// dashboard/page.tsx

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
import useRolesData from "@/hooks/useRolesData";
import RolesContext from "@/components/RolesContext";
import withAuth from "@/components/withPrivateRoute";
import withErrorProvider from "@/components/withErrorProvider";
import { useError } from '@/components/ErrorContext'
import ErrorModal from "@/components/ErrorModal";
import CurrentUserRolesContext from "@/components/CurrentUserRolesContext";




function Dashboard() {
  const router = useRouter();
  const { error, setError } = useError();
  const { data: fetchedEvents, loading, error: eventError, addEvent, updateEvent, deleteEvent } = useEventsData();
  const { eventTypes, loading: eventTypesLoading, error: eventTypesError } = useGetEventTypes();
  const [events, setEvents] = useState<FullCalendarEvent[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<FullCalendarEvent[]>([]);
  const [cookies] = useCookies(['userId']);
  const userId = cookies.userId;
  const { userRoles, loading: rolesLoading, error: rolesError, ...otherRolesData } = useRolesData(userId)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);


  useEffect(() => {
    if (error) {
      setErrorMessage(error.message);
      setIsModalOpen(true);
      if (error && error.name === ErrorTypes.NOT_AUTHORIZED) {
        router.push('/login');
      }
      setError(null);
    }
  }, [error, setError]);

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
    
  


  if (loading) return <p>Loading...</p>;
  if (error) return null;
  if (!Array.isArray(events)) return <p>No events to display</p>;
  if (eventTypesLoading) return <p>Loading event types...</p>;
  if (eventTypesError) return <p>Error fetching event types.</p>;
  if (rolesLoading) return <p>Loading user roles...</p>;
  if (rolesError) return <p>Error fetching user roles.</p>;


  return (
    <CurrentUserRolesContext.Provider value={{ ...otherRolesData, userRoles, roles: otherRolesData.roles, loading: rolesLoading, error: rolesError }}>
    <RolesContext.Provider value={{ ...otherRolesData, userRoles, roles: otherRolesData.roles, loading: rolesLoading, error: rolesError }}>
      <UserIdContext.Provider value={userId}>
        <EventTypesContext.Provider value={eventTypes}>
          <EventsContext.Provider value={{ events: filteredEvents, addEvent, updateEvent, deleteEvent }}>
            <Layout>
              <div className="flex h-full gap-2 pt-4">
                <div className="w-1/4 h-screen p-4 flex flex-col">
                  <div className="mb-2"> 
                    <FilterDropdown onFilterChange={handleFilterChange} />
                  </div>
                  <div className="overflow-y-auto flex-1"> 
                    <EventCard />
                  </div>
                  <ErrorModal 
                    isOpen={isModalOpen}
                    onRequestClose={() => setIsModalOpen(false)} errorMessage={errorMessage}                   />
                </div>
                <div id="calendar-container" className="w-3/4 mx-auto p-2 shadow-lg h-full p-4">
                  <Calendar/>
                </div>
              </div>
            </Layout>
          </EventsContext.Provider>
        </EventTypesContext.Provider>
      </UserIdContext.Provider>
    </RolesContext.Provider>
    </CurrentUserRolesContext.Provider>
);
}

export default withAuth(withErrorProvider(Dashboard));