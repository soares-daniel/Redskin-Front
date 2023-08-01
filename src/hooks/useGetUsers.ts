// useGetUsers.ts

import { useState, useEffect } from 'react';
import { fetchData } from '@/utils/api';

export function useGetUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchUsers = async () => {
    try {
      const data = await fetchData('/api/users');
      setUsers(data);
    } catch (error) {
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const refetch = async () => {
    setLoading(true);
    setError(null);
    await fetchUsers();
  };

  return { users, loading, error, refetch };
}