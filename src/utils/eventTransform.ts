// eventTransform.ts

export interface EventDataTransformed {
  id: number;
  title: string;
  start: Date; // Update the type to Date
  end: Date; // Update the type to Date
  extendedProps: {
    description: string;
    createdBy: string;
    eventType: string;
    createdAt: Date; // Update the type to Date
    updatedAt: Date; // Update the type to Date
  };
}

export function transformEvents(apiEvents: any[]): EventDataTransformed[] {
  return apiEvents.map((event: {
    id: number;
    title: string;
    startDate: string;
    endDate: string;
    description: string;
    createdBy: string;
    eventType: string;
    createdAt: string;
    updatedAt: string;
  }) => ({
    id: event.id,
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

