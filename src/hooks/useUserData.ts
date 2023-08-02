// useUserData.ts

import { useState, useEffect } from 'react';
import { useGetUsers } from './useGetUsers';

export default function useUsersData() {
  const { users, loading, error, refetch } = useGetUsers();

  // Add state
  // Add functions

  return { users, loading, error, refetch };
}