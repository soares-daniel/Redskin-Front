// useCreateUser.ts

import { fetchData } from "@/utils/api";
import { useState } from "react";

export default function useCreateUser() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
  
    const createUser = async (username: string, firstName: string, lastName: string, password: string) => {
      setLoading(true);
      setError(null);
  
      try {
        const data = await fetchData(`/users/create`, 'POST', {
          username,
          firstName,
          lastName,
          password,
        });
        return data;
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };
  
    return { createUser, loading, error };
}
