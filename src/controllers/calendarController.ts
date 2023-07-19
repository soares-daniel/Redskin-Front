
const baseUrl = 'http://localhost:8000/api/events';

export async function fetchEvents() {
  try {
    const response = await fetch(baseUrl);
    console.log(response); //check
    return await response.json();
  } catch (error) {
    console.error("Error fetching events", error);
    return [];
  }
}



export async function addEvent(event: any) {
  try {
    const response = await fetch(`${baseUrl}/create`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(event),
    });
    console.log(response); //check
    return await response.json();
  } catch (error) {
    console.error("Error adding event", error);
    return null;
  }
}

export async function deleteEvent(eventId: number) {
  try {
    const response = await fetch(`${baseUrl}/delete/${eventId}`, {
      method: 'DELETE',
    });
    console.log(response); //check
    return await response.json();
  } catch (error) {
    console.error("Error deleting event", error);
    return null;
  }
}

