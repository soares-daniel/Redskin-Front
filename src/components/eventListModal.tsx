//eventListModal.tsx

import { FullCalendarEvent } from '@/utils/eventTransform';
import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { format } from 'date-fns';

interface EventListModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  events: FullCalendarEvent[];
  onEdit: (event: FullCalendarEvent) => void;
  selectedDate: Date | null;
  onDelete: (event: FullCalendarEvent) => void;
}

export default function EventListModal({ isOpen, onRequestClose, events, onEdit, onDelete, selectedDate }: EventListModalProps) {
  const [localEvents, setLocalEvents] = useState(events);

  useEffect(() => {
    setLocalEvents(events);
  }, [events]);

  const handleDelete = (event: FullCalendarEvent) => {
    onDelete(event);
    setLocalEvents(localEvents.filter(e => e.id !== event.id));
  }

  return (
    <Modal 
      isOpen={isOpen} 
      onRequestClose={onRequestClose}
      style={{
        overlay: {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        },
        content: {
          position: 'relative',
          width: '80%',
          maxWidth: '500px',
          backgroundColor: '#f3f3f3',
          padding: '20px',
          borderRadius: '10px',
          boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)'
        }
      }}
    >
      <button onClick={onRequestClose} className="modal-close-button bg-red-500 text-white p-1 rounded hover:bg-red-600">Close</button>
      <h2 className="modal-header text-xl mb-4 mt-2">Events on {selectedDate ? format(selectedDate, 'yyyy-MM-dd') : ''}</h2>
      <ul className="modal-list space-y-3">
      {localEvents.map((event) => (
    <li key={event.id} className="modal-list-item">
      <div className="modal-event-info">
        <h3 className="text-xl mb-1">{event.title}</h3>
        <div className="text-sm mb-2">
          {format(new Date(event.start), 'dd.MM')} - {format(new Date(event.end), 'dd.MM')}
        </div>
      </div>
      <div className="modal-buttons">
        <button onClick={() => onEdit(event)} className="modal-edit-button">Edit</button>
        <button onClick={() => handleDelete(event)} className="modal-delete-button">Delete</button>
      </div>
    </li>
  ))}
      </ul>
    </Modal>
  );
}
