// controllers/calendarController.ts

const url = 'http://localhost:8000/api/events';


// controllers/calendarController.ts
export async function fetchEvents() {
  try {
    const response = await fetch(url);
    console.log(response); //check
    return await response.json();
  } catch (error) {
    console.error("Error fetching events", error);
    return [];
  }
}


