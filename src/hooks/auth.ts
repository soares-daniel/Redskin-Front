
// auth.ts
import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
//import baseUrl from .env
const baseUrl = process.env.API_URL;

export default function useSuperUserToken() {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = Cookies.get('superUserToken');

    if (storedToken) {
      setToken(storedToken);
    } else {
      const login = async () => {
        try {
          const response = await fetch(`${baseUrl}/authorization/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              username: process.env.SUPER_USER,
              password: process.env.SUPER_PASS, 
            }),
          });

          if (response.ok) {
            const data = await response.json();
            setToken(data.authorizedUser.token);
            Cookies.set('superUserToken', data.authorizedUser.token, { expires: 7 }); // Store the token in a cookie for 7 days
          } else {
            console.error('Failed to log in as superuser');
          }
        } catch (error) {
          console.error('Error logging in as superuser', error);
        }
      };

      login();
    }
  }, []);

  return token;
}