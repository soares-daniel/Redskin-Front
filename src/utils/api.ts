// api.ts

import { Forbidden, NotAuthorizedError, NotFoundError, UnknownError } from "./errors";

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

    // if body is URLSearchParams toString it else stringify it
    if (body) {
        options.body = body instanceof URLSearchParams ? body.toString() : JSON.stringify(body);
    }

    const response = await fetch(`${baseUrl}${url}`, options);
    
    if (!response.ok) {
    
        switch (response.status) {
            case 401:
                throw new NotAuthorizedError();
            case 403:
                throw new Forbidden();
            case 404:
                throw new NotFoundError();
            default:
                throw new UnknownError();
        }
    }

    return response.json();
}
