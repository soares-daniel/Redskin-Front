// useUsersData.ts

import { useState, useEffect } from 'react';
import { useGetUsers } from './useGetUsers';
import useDeleteUser from './useDeleteUser';
import useCreateUser from './useCreateUser';
import useEditUser from './useEditUser';
import { ErrorTypes } from '@/types/errorTypes';

export default function useUsersData() {
  const { users, loading: getUsersLoading, error: getUsersError, refetch } = useGetUsers();
  const { deleteUser, loading: deleteUserLoading, error: deleteUserError } = useDeleteUser();
  const { createUser, loading: createUserLoading, error: createUserError } = useCreateUser();
  const { editUser, loading: editUserLoading, error: editUserError } = useEditUser();

  const isLoading = getUsersLoading || deleteUserLoading || createUserLoading || editUserLoading;

  const anyError = getUsersError || deleteUserError || createUserError || editUserError;

  const error = typeof anyError === 'string' ? new Error(anyError) : anyError;

  return { users, loading: isLoading, error, refetch, deleteUser, createUser, editUser };
}