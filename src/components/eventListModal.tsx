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
          backgroundColor: '#ffffff',
          padding: '20px',
          borderRadius: '10px',
          boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)'
        }
      }}
    >
      <button onClick={onRequestClose} className="modal-close-button bg-red-500 bg-opacity-60 text-white p-1 rounded hover:bg-red-600 absolute top-4 right-4">Close</button>
      <h2 className="modal-header text-xl mb-6 mt-2">{selectedDate ? format(selectedDate, 'dd-MM-yyyy') : ''}</h2>
      <ul className="modal-list divide-y divide-gray-200">
      {localEvents.map((event) => (
        <li key={event.id} className="modal-list-item py-4">
          <div className="modal-event-info">
            <h3 className="text-xl mb-1">{event.title}</h3>
            <div className="text-sm mb-2">
               {format(new Date(event.start), 'dd/MM')} - {format(new Date(event.end), 'dd/MM')}
            </div>
            <div className="text-sm mb-2">
               {format(new Date(event.start), 'HH:mm')} - {format(new Date(event.end), 'HH:mm')}
            </div>
          </div>
          <div className="modal-buttons mt-2">
            <button onClick={() => onEdit(event)} className="modal-edit-button border-green-400 text-green-600 p-1 rounded hover:bg-green-600 hover:text-white mr-2">Edit</button>
            <button onClick={() => handleDelete(event)} className="modal-delete-button border-red-400 text-red-600 p-1 rounded hover:bg-red-600 hover:text-white">Delete</button>
          </div>
        </li>
      ))}
      </ul>
    </Modal>
);
}
