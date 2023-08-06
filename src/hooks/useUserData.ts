// useUsersData.ts

import { useState, useEffect } from 'react';
import { useGetUsers } from './useGetUsers';
import useDeleteUser from './useDeleteUser';
import useCreateUser from './useCreateUser';
import useEditUser from './useEditUser';
import { ErrorTypes } from '@/types/errorTypes';
import { User, UserParams } from '@/components/UserContext';


export default function useUsersData() {
  const { users: fetchedUsers, loading: getUsersLoading, error: getUsersError, refetch: refetchUsers } = useGetUsers();
  const { deleteUser, loading: deleteUserLoading, error: deleteUserError } = useDeleteUser();
  const { createUser, loading: createUserLoading, error: createUserError } = useCreateUser();
  const { editUser: editUserCall, loading: editUserLoading, error: editUserError } = useEditUser();

  // Manage users with local state
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    setUsers(fetchedUsers);
  }, [fetchedUsers]);

  const isLoading = getUsersLoading || deleteUserLoading || createUserLoading || editUserLoading;
  const anyError = getUsersError || deleteUserError || createUserError || editUserError;
  const error = typeof anyError === 'string' ? new Error(anyError) : anyError;

  const optimisticEditUser = async (userParams: UserParams) => {
    // Optimistically update the users
    const editedUsers = users.map(user => user.id === userParams.userId ? { ...user, ...userParams } : user);
    setUsers(editedUsers);

    try {
      await editUserCall(userParams);
      // Optionally, you might want to refetch data here for consistency
    } catch (error) {
      // Rollback to the previous users state if there's an error
      setUsers(users);
      throw error; // rethrowing the error for the calling component to handle/display it
    }
  };

  return { users, loading: isLoading, error, refetch: refetchUsers, deleteUser, createUser, editUser: optimisticEditUser };
}
