//eventListModal.tsx

import { FullCalendarEvent } from '@/utils/eventTransform';
import React from 'react';
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
  }

  export default function EventListModal({ isOpen, onRequestClose, events, onEdit, selectedDate }: EventListModalProps) {
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
          {events.map((event) => (
            <li key={event.id} className="modal-list-item">
              <span>{event.title}</span>
              <button onClick={() => onEdit(event)} className="modal-edit-button">Edit</button>
            </li>
          ))}
        </ul>
      </Modal>
    );
  }
