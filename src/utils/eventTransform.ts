export interface EventDataTransformed {
  id: number;
  title: string;
  start: Date;
  end: Date;
  extendedProps: {
    description: string;
    createdBy: string;
    eventType: number;
    createdAt: Date;
    updatedAt: Date; 
  };
}

export interface FullCalendarEvent extends Omit<EventDataTransformed, 'id'> {
  id: string;
}

export function transformEvents(apiEvents: any[]): FullCalendarEvent[] {
  return apiEvents.map((event: {
    id: number;
    title: string;
    startDate: string;
    endDate: string;
    description: string;
    createdBy: string;
    eventType: number;
    createdAt: string;
    updatedAt: string;
  }) => ({
    id: event.id.toString(), // Convert id to string
    title: event.title,
    start: new Date(event.startDate), 
    end: new Date(event.endDate), 
    extendedProps: {
      description: event.description,
      createdBy: event.createdBy,
      eventType: event.eventType,
      createdAt: new Date(event.createdAt), 
      updatedAt: new Date(event.updatedAt), 
      classNames: `event-type-${event.eventType}`,
    },
  }));
}

