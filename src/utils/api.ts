// api.ts

import { NotAuthorizedError, UnknownError } from "./errors";

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
      if (response.status === 401) {
        throw new NotAuthorizedError();
      } else {
        throw new UnknownError();
      }
    }
  
    return response.json();
  }
  
