"use client"

import { useState } from 'react';
import { useLogin } from '@/hooks/useLogin';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login, error } = useLogin();

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    login(username, password);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-red-50"> {/* Changed background color here */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center p-8 bg-white rounded-lg shadow-md max-w-sm w-full"
      >
        <img className="w-36 mb-5" src="logo.png" alt="Logo" />
        <input
          className="block w-full p-2.5 mb-5 border border-e0e0e0 rounded-md text-lg"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
        />
        <input
          className="block w-full p-2.5 mb-5 border border-e0e0e0 rounded-md text-lg"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button
          type="submit"
          className="block w-full p-2.5 bg-blue-600 text-white rounded-md text-xl cursor-pointer transition-colors hover:bg-blue-700"
        >
          Login
        </button>
        {error && <p className="text-center text-red-600 font-bold mt-4">{error}</p>}
      </form>
    </div>
  );
}
