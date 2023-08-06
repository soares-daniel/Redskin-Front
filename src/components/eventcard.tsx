"use client"
import React, { FC, useContext, useEffect, useState } from 'react';
import { EventsContext } from './EventsContext';

export default function EventCard() {
  const { events } = useContext(EventsContext);
  
  // Get current date at the start of the day (midnight)
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

  const upcomingEvents = events.filter(event => new Date(event.end) >= currentDate);
  
  // Sort the events
  const sortedEvents = [...upcomingEvents].sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime());

  // Function to determine background color based on event type
  const getBackgroundColor = (eventType: number) => {
    switch(eventType) {
      case 1: return 'bg-green-200 bg-opacity-30';  
      case 2: return 'bg-red-200 bg-opacity-30';   
      case 3: return 'bg-gray-600 bg-opacity-30';   
      default: return 'bg-white';
    }
  };

  return (
    <>
      {sortedEvents.map((event, index) => (
        <div 
          className={`${getBackgroundColor(event.extendedProps ? event.extendedProps.eventType : 0)} rounded shadow mb-4 p-6`}
          key={index}
        >
          <h3 className="text-xl font-bold">{event.title}</h3>
          <p className="text-sm text-gray-600">
            {new Date(event.start).toLocaleDateString()} -{' '}
            {new Date(event.end).toLocaleDateString()}
          </p>
          {event.extendedProps && (
            <>
              <p className="text-sm text-gray-600">
                {event.start.toString().slice(16, 21)} -{' '} {event.end.toString().slice(16, 21)}
              </p>
              <p className="text-sm text-gray-600">
                {event.extendedProps.description}
              </p>
            </>
          )}
        </div>
      ))}
    </>
  );
}
