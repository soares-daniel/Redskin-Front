export function transformEvents(apiEvents: any[]) {
    return apiEvents.map((event: { id: any; title: any; startDate: string | number | Date; endDate: string | number | Date; description: any; createdBy: any; eventType: any; createdAt: string | number | Date; updatedAt: string | number | Date; }) => ({
      id: event.id.toString(),
      title: event.title,
      start: new Date(event.startDate),
      end: new Date(event.endDate),
      extendedProps: {
        description: event.description,
        createdBy: event.createdBy,
        eventType: event.eventType,
        createdAt: new Date(event.createdAt),
        updatedAt: new Date(event.updatedAt)
      }
    }));
  }
  