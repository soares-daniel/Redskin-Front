// updateEventModal.tsx

import "@/app/globals.css";
import React, { useState, useEffect, useContext } from 'react';
import Modal from 'react-modal';
import { FullCalendarEvent } from '@/utils/eventTransform';
import { EventsContext } from './EventsContext';
import EventTypesContext from './EventTypesContext';

type UpdateEventModalProps = {
  isOpen: boolean;
  onRequestClose: () => void;
  eventToEdit?: FullCalendarEvent;
  onDelete: (event: FullCalendarEvent) => void;
};

export default function UpdateEventModal({ isOpen, onRequestClose, eventToEdit, onDelete }: UpdateEventModalProps) {
  const { updateEvent, deleteEvent } = useContext(EventsContext);
  const eventTypes = useContext(EventTypesContext);
  const [eventType, setEventType] = useState(eventToEdit ? Number(eventToEdit.extendedProps.eventType) : 0);
  const [title, setTitle] = useState(eventToEdit ? eventToEdit.title : '');
  const [description, setDescription] = useState(eventToEdit ? eventToEdit.extendedProps.description : '');
  const [startDate, setStartDate] = useState(eventToEdit ? formatDateTime(eventToEdit.start) : '');
  const [endDate, setEndDate] = useState(eventToEdit ? formatDateTime(eventToEdit.end) : '');

  const isStartDateBeforeEndDate = () => {
    const startDateTime = new Date(startDate);
    const endDateTime = new Date(endDate);
  
    return startDateTime < endDateTime;
  };

  const isFormValid = eventType !== 0 && 
  title !== '' && 
  startDate !== '' && 
  endDate !== '' && 
  isStartDateBeforeEndDate();


  function formatDateTime(date: Date) {
    const offset = date.getTimezoneOffset();
    const adjustedDate = new Date(date.getTime() - offset * 60 * 1000);
    return adjustedDate.toISOString().slice(0, 16);
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
  
    if (!eventToEdit || !isFormValid) return;
  
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
  
    updateEvent(updatedEvent, eventToEdit);
    onRequestClose();
  };

  const handleDelete = (event: FullCalendarEvent) => {
    onDelete(event);
    onRequestClose();
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
        }
      }}
    >
      <h2 className="modal-header">Update Event</h2>
      <button onClick={onRequestClose} className="modal-close-button bg-red-500 bg-opacity-60 text-white p-1 rounded hover:bg-red-600 absolute top-4 right-4">Close</button>
      <button 
        onClick={() => {
          if (eventToEdit) {
            handleDelete(eventToEdit);
          }
        }} 
        className="modal-delete-button bg-red-500 bg-opacity-60 text-white p-1 rounded hover:bg-red-600 absolute top-4 left-4"
      >
        Delete
      </button>

      <form onSubmit={handleSubmit}>
      <div className="form-field">
            <label>
              Event Type:
            </label>
            {eventTypes.map((type, index) => (
              <button 
                type="button"
                className={`event-type-button event-type-button-${index + 1} ${eventType === type.id ? 'event-type-button-selected' : ''}`}
                onClick={() => setEventType(type.id)}
              >
                {type.description}
              </button>
            ))}
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
        <button type="submit" disabled={!isFormValid} className={!isFormValid ? 'disabled-button' : ''}>Update</button>
        {!isFormValid && <p className="error-message">
          Please fill out all required fields<br />
          Please check that start and end dates are correct
        </p>}
      </form>
    </Modal>
  );
}
