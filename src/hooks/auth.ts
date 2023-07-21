require('dotenv').config();
import { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';


const baseUrl = 'http://localhost:8000/api'; // replace with your base URL

export default function useSuperUserToken() {
  const [token, setToken] = useState<string | null>(null);
  const [cookies, setCookie] = useCookies(['superUserToken']);

  useEffect(() => {
    const storedToken = cookies.superUserToken;

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
            setCookie('superUserToken', data.authorizedUser.token, { expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) }); // Store the token in a cookie for 7 days
          } else {
            const errorData = await response.json();
            console.error('Failed to log in as superuser', errorData);
          }
        } catch (error) {
          console.error('Error logging in as superuser', error);
        }
      };

      login();
    }
  }, [cookies, setCookie]);

  return token;
}