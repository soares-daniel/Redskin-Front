// eventColor.ts

export const getEventClassName = (eventType: number) => {
    switch(eventType) {
      case 1: return 'event-type-1';  
      case 2: return 'event-type-2';   
      case 3: return 'event-type-3';   
      default: return 'default-event';
    }
};
