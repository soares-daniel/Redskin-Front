// updateEventModal.tsx

import "@/app/globals.css";
import React, { useState, useEffect, useContext } from 'react';
import Modal from 'react-modal';
import { FullCalendarEvent } from '@/utils/eventTransform';
import { EventsContext } from './EventsContext';

type UpdateEventModalProps = {
  isOpen: boolean;
  onRequestClose: () => void;
  eventToEdit?: FullCalendarEvent;
};

export default function UpdateEventModal({ isOpen, onRequestClose, eventToEdit }: UpdateEventModalProps) {
  const { updateEvent } = useContext(EventsContext);
  const [eventType, setEventType] = useState(eventToEdit ? Number(eventToEdit.extendedProps.eventType) : 0);
  const [title, setTitle] = useState(eventToEdit ? eventToEdit.title : '');
  const [description, setDescription] = useState(eventToEdit ? eventToEdit.extendedProps.description : '');
  const [startDate, setStartDate] = useState(eventToEdit ? formatDateTime(eventToEdit.start) : '');
  const [endDate, setEndDate] = useState(eventToEdit ? formatDateTime(eventToEdit.end) : '');

  function formatDateTime(date: Date) {
    return date.toISOString().slice(0, 16);
  }

  useEffect(() => {
    if (eventToEdit) {
      setEventType(Number(eventToEdit.extendedProps.eventType));
      setTitle(eventToEdit.title);
      setDescription(eventToEdit.extendedProps.description);
      setStartDate(formatDateTime(eventToEdit.start));
      setEndDate(formatDateTime(eventToEdit.end));
    }
  }, [eventToEdit]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!eventToEdit) return;
  
    const updatedEvent = {
      id: eventToEdit.id,
      title,
      start: new Date(startDate),
      end: new Date(endDate),
      extendedProps: {
        eventType,
        description,
        createdBy: eventToEdit.extendedProps.createdBy,
        createdAt: eventToEdit.extendedProps.createdAt,
        updatedAt: eventToEdit.extendedProps.updatedAt
      },
    };
  
    updateEvent(updatedEvent);
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
      <h2 className="modal-header">Update Event</h2>
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
        <button type="submit">Update</button>
      </form>
    </Modal>
  );
}
