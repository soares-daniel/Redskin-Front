// useUserData.ts

import { useState, useEffect } from 'react';
import { useGetUsers } from './useGetUsers';

export default function useUsersData() {
  const { users, loading, error, refetch } = useGetUsers();

  // Add any additional state or functions you need here

  return { users, loading, error, refetch };
}