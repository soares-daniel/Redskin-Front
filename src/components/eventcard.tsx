"use client"
import { FC, useEffect, useState } from 'react';
import { fetchEvents } from '@/controllers/calendarController';
import { EventDataTransformed } from '@/utils/eventTransform';
import useEventsData from '@/hooks/useEventsData';
import { Event } from '@/types/types';


export default function EventCard({ event }: { event: Event }) {
  return (
    <div className="bg-white rounded shadow mb-4 p-6">
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
  );
}
