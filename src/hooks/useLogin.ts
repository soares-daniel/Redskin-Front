// useLogin.ts

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { fetchData } from '@/utils/api';
import { useCookies } from 'react-cookie';

export function useLogin() {
  const [error, setError] = useState<string | null>(null);
  const [cookies, setCookie] = useCookies(['userId']);
  const router = useRouter();

  const login = async (username: string, password: string) => {
    try {
      const data = await fetchData('/api/authorization/login', 'POST', {
        username,
        password,
      });

      // Store the user ID in a cookie
      setCookie('userId', data.id, { path: '/', sameSite: 'strict'});

      router.push('/dashboard');
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('An unknown error occurred');
      }
    }
  };

  return { login, error };
}
