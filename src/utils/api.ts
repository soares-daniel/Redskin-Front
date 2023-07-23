// api.ts

export async function fetchData(
    url: string,
    method: string = 'GET',
    body?: object,
  ) {
    const baseUrl = 'http://localhost:8000';
    const options: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    };
    
    if (body && (method === 'POST' || method === 'PUT')) {
      options.body = JSON.stringify(body);
    }
    
    const response = await fetch(`${baseUrl}${url}`, options);
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Unknown error');
    }
  
    return response.json();
  }

  
