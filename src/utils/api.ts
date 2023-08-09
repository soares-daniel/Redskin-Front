// api.ts

import { NotAuthorizedError, NotFoundError, UnknownError } from "./errors";

export async function fetchData(
    url: string,
    method: string = 'GET',
    body?: BodyInit | object,
    headers?: HeadersInit
  ) {
    const baseUrl = `${process.env.NEXT_PUBLIC_API_PROTOCOL}://${process.env.NEXT_PUBLIC_API_URL}:${process.env.NEXT_PUBLIC_API_PORT}${process.env.NEXT_PUBLIC_API_BASE_PATH}`;
    const options: RequestInit = {
      method,

      headers: headers || {
        'Content-Type': 'application/json',
        'authorization': 'Bearer undefined'
      },
      credentials: 'include',
    };
    
    body && (options.body = body.toString());

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
