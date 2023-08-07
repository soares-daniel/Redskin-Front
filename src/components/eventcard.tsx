"use client"
import React, { FC, useContext, useEffect, useState } from 'react';
import { EventsContext } from './EventsContext';
import { getEventClassName  } from '@/utils/eventColor';

export default function EventCard() {
  const { events } = useContext(EventsContext);

  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);
  const upcomingEvents = events.filter(event => new Date(event.end) >= currentDate);
  const sortedEvents = [...upcomingEvents].sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime());


  return (
    <>
      {sortedEvents.map((event, index) => (
        <div 
          className={`${getEventClassName(event.extendedProps ? event.extendedProps.eventType : 0)} rounded shadow mb-4 p-6`}
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
