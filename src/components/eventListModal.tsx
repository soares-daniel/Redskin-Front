//eventListModal.tsx

import { FullCalendarEvent } from '@/utils/eventTransform';
import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { format } from 'date-fns';

interface Event {
  id: string;
  title: string;
}

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
            top: 'auto',
            left: 'auto',
            right: 'auto',
            bottom: 'auto',
            width: '80%',
            maxWidth: '500px',
            height: 'fit-content',
            backgroundColor: '#f3f3f3',
            padding: '20px',
            borderRadius: '10px',
            boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)'
          }
        }}
      >
        <button onClick={onRequestClose} className="modal-close-button">Close</button>
        <h2 className="modal-header">Events on {selectedDate ? format(selectedDate, 'yyyy-MM-dd') : ''}</h2>
        <ul className="modal-list">
          {localEvents.map((event) => (
            <li key={event.id} className="modal-list-item">
              <span>{event.title}</span>
              <span>{event.start.toString().slice(0, 21)} - {event.end.toString().slice(0, 21)}</span>
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