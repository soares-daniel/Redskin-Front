// useEditUser.ts

import {useState} from 'react';
import {fetchData} from '@/utils/api';
import {UserParams} from "@/components/UserContext";



export default function useEditUser() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const editUser = async ({userId, username, firstName, lastName}: UserParams) => {
    setLoading(true);
    setError(null);

    const body: { [key: string]: string } = {};

    if (username) body.username = username;
    if (firstName) body.firstName = firstName;
    if (lastName) body.lastName = lastName;

    try {
      return await fetchData(`/admin/update/user/${userId}`, 'PUT', body);
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