import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCookies } from 'react-cookie';

export function useLogin() {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const baseUrl = 'http://localhost:8000';
  const [cookies, setCookie] = useCookies(['token']);

  const login = async (username: string, password: string) => {
    try {
      const response = await fetch(`${baseUrl}/api/authorization/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
        credentials: 'include',
      });

      if (response.ok) {
        const data = await response.json();
        //setCookie('token', data.token, { path: '/' });
        //console.log the data but stringify it first
        console.log(JSON.stringify(data));
        //console.log(data);
        router.push('/dashboard');
      } else {
        const errorData = await response.json();
        setError(errorData.message);
      }
    } catch (error) {
        setError((error as Error).message);
    }
  };

  return { login, error };
}