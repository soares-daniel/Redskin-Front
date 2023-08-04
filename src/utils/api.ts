// api.ts

import { NotAuthorizedError, NotFoundError, UnknownError } from "./errors";

export async function fetchData(
    url: string,
    method: string = 'GET',
    body?: object,
  ) {
    const baseUrl = `${process.env.NEXT_PUBLIC_API_PROTOCOL}://${process.env.NEXT_PUBLIC_API_URL}:${process.env.NEXT_PUBLIC_API_PORT}${process.env.NEXT_PUBLIC_API_BASE_PATH}`;
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
      } 
      else if (response.status === 404) {
        throw new NotFoundError();
      }
        else {
        throw new UnknownError();
      }
    }
  
    return response.json();
  }
  
