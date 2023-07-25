// updateEventModal.tsx

import React, { useState, useEffect, useContext } from 'react';
import Modal from 'react-modal';
import useUpdateEvent from '@/hooks/useUpdateEvent';
import "@/app/globals.css";
import { FullCalendarEvent } from '@/utils/eventTransform';
import useEventsData from '@/hooks/useEventsData';
import { EventsContext } from './EventsContext';

type UpdateEventModalProps = {
  isOpen: boolean;
  onRequestClose: () => void;
  eventToEdit?: FullCalendarEvent;
};

export default function UpdateEventModal({ isOpen, onRequestClose, eventToEdit }: UpdateEventModalProps) {
  const { events, addEvent, updateEvent } = useContext(EventsContext);
  const { updateEvent: updateEventApi } = useUpdateEvent();
  //const { updateEvent } = useEventsData();
  const [eventType, setEventType] = useState(eventToEdit ? Number(eventToEdit.extendedProps.eventType) : 0);
  const [title, setTitle] = useState(eventToEdit ? eventToEdit.title : '');
  const [description, setDescription] = useState(eventToEdit ? eventToEdit.extendedProps.description : '');
  const [startDate, setStartDate] = useState(eventToEdit ? eventToEdit.start.toISOString() : '');
  const [endDate, setEndDate] = useState(eventToEdit ? eventToEdit.end.toISOString() : '');

  useEffect(() => {
    if (eventToEdit) {
      setEventType(Number(eventToEdit.extendedProps.eventType));
      setTitle(eventToEdit.title);
      setDescription(eventToEdit.extendedProps.description);
      setStartDate(eventToEdit.start.toISOString());
      setEndDate(eventToEdit.end.toISOString());
    }
  }, [eventToEdit]);

  const handleSubmit = async (e: React.FormEvent) => {
    console.log("handleSubmit");
    e.preventDefault();

    if (!eventToEdit) return;

    const updatedEvent = await updateEventApi(eventToEdit.id, { eventType, title, description, startDate, endDate });

    if (!updatedEvent) {
      throw new Error('Failed to update event');
    }
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
