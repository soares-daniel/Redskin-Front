// controllers/calendarController.ts

const url = 'http://localhost:8000/api/events';

export interface EventDataTransformed {
  id: number;
  title: string;
  start: Date;
  end: Date;
  extendedProps: {
    description: string;
    createdBy: number;
    eventType: number;
    createdAt: Date;
    updatedAt: Date;
  };
}

// controllers/calendarController.ts
export async function fetchEvents() {
  try {
    const response = await fetch(url);
    console.log(response);  // Add this line
    return await response.json();
  } catch (error) {
    console.error("Error fetching events", error);
    return [];
  }
}


