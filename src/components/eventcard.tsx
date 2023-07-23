"use client"
import React, { FC, useEffect, useState } from 'react';
import { EventDataTransformed } from '@/utils/eventTransform';
import useEventsData from '@/hooks/useEventsData';
import { Event } from '@/types/types';
import { FullCalendarEvent } from '@/utils/eventTransform';

export default function EventCard({ events }: { events: FullCalendarEvent[] }) {
  // Sort the events by their start dates
  const sortedEvents = [...events].sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime());

  return (
    <>
      {sortedEvents.map((event, index) => (
        <div className="bg-white rounded shadow mb-4 p-6" key={index}>
          <h3 className="text-xl font-bold">{event.title}</h3>
          <p className="text-sm text-gray-600">
            {new Date(event.start).toLocaleDateString()} -{' '}
            {new Date(event.end).toLocaleDateString()}
          </p>
          {event.extendedProps && (
            <>
              <p className="text-sm text-gray-600">
                Time: {event.start.toString().slice(16, 21)} -{' '} {event.end.toString().slice(16, 21)}
              </p>
              <p className="text-sm text-gray-600">
                Description: {event.extendedProps.description}
              </p>
              <p className="text-sm text-gray-600">
                Created by: {event.extendedProps.createdBy}
              </p>
              <p className="text-sm text-gray-600">
                Event Type: {event.extendedProps.eventType}
              </p>
            </>
          )}
        </div>
      ))}
    </>
  );
}