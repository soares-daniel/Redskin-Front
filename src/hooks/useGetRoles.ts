// useGetRoles.ts

import { useState, useEffect } from 'react';
import { fetchData } from '@/utils/api';

export function useGetRoles() {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchRoles = async () => {
    try {
      const data = await fetchData('/roles');
      setRoles(data);
      localStorage.setItem('roles', JSON.stringify(data));
    } catch (error) {
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  const refetch = async () => {
    setLoading(true);
    setError(null);
    await fetchRoles();
  };

  return { roles, loading, error, refetch };
}
