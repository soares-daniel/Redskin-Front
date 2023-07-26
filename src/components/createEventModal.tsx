// createEventModal.tsx

import "@/app/globals.css";
import React, { useContext, useState } from 'react';
import Modal from 'react-modal';
import useCreateEvent from '@/hooks/useCreateEvent';
import { EventsContext } from './EventsContext';
import { FullCalendarEvent } from '@/utils/eventTransform';

type NewEvent = Omit<FullCalendarEvent, 'id' | 'extendedProps'> & {
  extendedProps: Omit<FullCalendarEvent['extendedProps'], 'createdBy' | 'createdAt' | 'updatedAt'>
};

type CreateEventModalProps = {
  isOpen: boolean;
  onRequestClose: () => void;
};

export default function CreateEventModal({ isOpen, onRequestClose }: CreateEventModalProps) {
  const { addEvent } = useContext(EventsContext);
  const [eventType, setEventType] = useState(0);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  //const { addEvent } = useEventsData();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    const newEvent: NewEvent = {
      title,
      start: new Date(startDate),
      end: new Date(endDate),
      extendedProps: {
        eventType,
        description
      }
    };
  
    addEvent(newEvent);
    onRequestClose();
  };

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
        }
      }}
    >
      <h2 className="modal-header">Create Event</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-field">
          <label>
            Event Type:
            <input 
              type="number" 
              value={eventType} 
              onChange={(e) => setEventType(Number(e.target.value))} 
              required 
            />
          </label>
        </div>
        <div className="form-field">
          <label>
            Title:
            <input 
              type="text" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              required 
            />
          </label>
        </div>
        <div className="form-field">
          <label>
            Description:
            <textarea 
              value={description} 
              onChange={(e) => setDescription(e.target.value)} 
              required 
            />
          </label>
        </div>
        <div className="form-field">
          <label>
            Start Date:
            <input 
              type="datetime-local" 
              value={startDate} 
              onChange={(e) => setStartDate(e.target.value)} 
              required 
            />
          </label>
        </div>
        <div className="form-field">
          <label>
            End Date:
            <input 
              type="datetime-local" 
              value={endDate} 
              onChange={(e) => setEndDate(e.target.value)} 
              required 
            />
          </label>
        </div>
        <button type="submit">Create</button>
      </form>
    </Modal>
  );
}
