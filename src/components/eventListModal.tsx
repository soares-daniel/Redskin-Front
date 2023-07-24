import { FullCalendarEvent } from '@/utils/eventTransform';
import React from 'react';
import Modal from 'react-modal';

interface Event {
  id: string;
  title: string;
}

interface EventListModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
    events: FullCalendarEvent[];
    onEdit: (event: FullCalendarEvent) => void; // Update this line
  }

export default function EventListModal({ isOpen, onRequestClose, events, onEdit }: EventListModalProps) {
  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
      <h2>Events on Selected Date</h2>
      <ul>
        {events.map((event) => (
          <li key={event.id}>
            {event.title}
            <button onClick={() => onEdit(event)}>Edit</button>
          </li>
        ))}
      </ul>
      <button onClick={onRequestClose}>Close</button>
    </Modal>
  );
}
