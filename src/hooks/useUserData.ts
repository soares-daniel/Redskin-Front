// useUsersData.ts

import { useState, useEffect } from 'react';
import { useGetUsers } from './useGetUsers';
import useDeleteUser from './useDeleteUser';
import useCreateUser from './useCreateUser';
import { ErrorTypes } from '@/types/errorTypes';

export default function useUsersData() {
  const { users, loading: getUsersLoading, error: getUsersError, refetch } = useGetUsers();
  const { deleteUser, loading: deleteUserLoading, error: deleteUserError } = useDeleteUser();
  const { createUser, loading: createUserLoading, error: createUserError } = useCreateUser();

  const isLoading = getUsersLoading || deleteUserLoading || createUserLoading;

  const anyError = getUsersError || deleteUserError || createUserError;

  const error = typeof anyError === 'string' ? new Error(anyError) : anyError;


  return { users, loading: isLoading, error, refetch, deleteUser, createUser };
}