"use client"
import { FC, useEffect, useState } from 'react';
import { fetchEvents } from '@/controllers/calendarController';
import { EventDataTransformed } from '@/utils/eventTransform';
import useEventsData from '@/hooks/useEventsData';


export default function EventCard() {
  const data = useEventsData();

  return (
    <div>
      {data.map((event, index) => (
        <div className="bg-white rounded shadow mb-4 p-6" key={index}>
          <h3 className="text-xl font-bold">{event.title}</h3>
          <p className="text-sm text-gray-600">
            {new Date(event.start).toLocaleDateString()} -{' '}
            {new Date(event.end).toLocaleDateString()}
          </p>
          {event.extendedProps && (
            <>
              <p className="text-sm text-gray-600">
                All day event: {event.extendedProps.description}
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
    </div>
  );
};
