import { useState } from 'react';
import { useRouter } from 'next/navigation';

export function useLogin() {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const baseUrl = 'http://localhost:8000';

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
      });

      if (response.ok) {
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