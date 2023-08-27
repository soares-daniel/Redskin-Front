// api.ts
import { Forbidden, NotAuthorizedError, NotFoundError, UnknownError } from "./errors";

export async function fetchData(
    url: string,
    method: string = 'GET',
    body?: BodyInit | object,
    headers?: HeadersInit
) {
    let baseUrl = `${process.env.NEXT_PUBLIC_API_PROTOCOL}://${process.env.NEXT_PUBLIC_API_URL}${process.env.NEXT_PUBLIC_API_BASE_PATH}`;
    if(process.env.NEXT_PUBLIC_API_PORT) {
        baseUrl = `${process.env.NEXT_PUBLIC_API_PROTOCOL}://${process.env.NEXT_PUBLIC_API_URL}:${process.env.NEXT_PUBLIC_API_PORT}${process.env.NEXT_PUBLIC_API_BASE_PATH}`;
    }
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

    let response: Response;

    try {
        response = await fetch(`${baseUrl}${url}`, options);
    } catch (error) {
        // This error occurs when the network is offline, the request was blocked, etc.
        //! used because different browser throw different errors
        if (error instanceof TypeError && (error.message.includes("Failed to fetch") || error.message.includes("NetworkError"))) {
            throw new Error("Network error. Please check your connection.");
        } else {
            // rethrow if something else
            throw error;
        }
    }
    
    if (!response.ok) {
        switch (response.status) {
            case 401:
                throw new NotAuthorizedError();
            case 403:
                throw new Forbidden();
            case 404:
                throw new NotFoundError();
            default:
                console.log("this the default error");
                throw new UnknownError();
        }
    }

    return response.json();
}
