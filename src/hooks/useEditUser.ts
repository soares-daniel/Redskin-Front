// useEditUser.ts

import { useState } from 'react';
import { fetchData } from '@/utils/api';

export default function useEditUser() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const editUser = async (userId: number, username: string, firstName: string, lastName: string, password: string) => {
    setLoading(true);
    setError(null);

    try {
      const data = await fetchData(`/users/update/${userId}`, 'PUT', {
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

  return { editUser, loading, error };
}