// src/hooks/useRolesData.ts

import { useEffect, useState } from "react";
import useGetUserRoles from "./useGetUserRoles";
import { Role } from "@/components/RolesContext";
import useAssignRole from "./useAssignRole";
import useRemoveRole from "./useRemoveRole";
import { useGetRoles } from "./useGetRoles";
import { useError } from '@/components/ErrorContext';

export default function useRolesData(userId?: number) {
  const { setError } = useError();
  const { data, loading: fetchLoading, error: fetchError, fetchRoles } = useGetUserRoles(userId);
  const { assignRole } = useAssignRole();
  const { removeRole } = useRemoveRole();

  const { roles: allRoles, loading: allRolesLoading, error: allRolesError, refetch: refetchAllRoles } = useGetRoles();

  const [userRoles, setUserRoles] = useState<Role[]>([]);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);

  useEffect(() => {
    setUserRoles(data ? (data.length > 0 ? data : []) : []);
    setSelectedRole(null);
  }, [data, userId]);

  const optimisticAssignRole = async (userId: number, roleId: number) => {
    
    const roleToAdd = (allRoles as Role[]).find(role => role.id === roleId);
  
    // Optimistically update the userRoles
    if (roleToAdd) {
      setUserRoles(prevRoles => [...prevRoles, roleToAdd]);
    }

    try {
      await assignRole(userId, roleId);
      // Optionally, you might want to refetch data here for consistency
    } catch (err) {
      // Rollback the optimistic update if there's an error
      setUserRoles(prevRoles => prevRoles.filter(role => role.id !== roleId));
      if (err instanceof Error) {
        console.log(err);
        setError(err);
      } else {
        setError(new Error('An unknown error occurred while adding a role.'));
      }
    }
  };

  const optimisticRemoveRole = async (userId: number, roleId: number) => {
    // Store the role that we're about to remove (for possible rollback)
    const roleToRemove = userRoles.find(role => role.id === roleId);
  
    // Optimistically update the userRoles by removing the role
    setUserRoles(prevRoles => prevRoles.filter(role => role.id !== roleId));

    try {
      await removeRole(userId, roleId);
      // Optionally, you might want to refetch data here for consistency
    } catch (err) {
      // Rollback the optimistic update if there's an error
      if (roleToRemove) {
        setUserRoles(prevRoles => [...prevRoles, roleToRemove]);
      }
      if (err instanceof Error) {
        console.log(err);
        setError(err);
      } else {
        setError(new Error('An unknown error occurred while removing a role.'));
      }
    }
  };

  const refetch = async () => {
    await Promise.all([refetchAllRoles(), fetchRoles()]);
  };

  return { 
    roles: allRoles, 
    userRoles, 
    loading: fetchLoading,
    error: fetchError,
    selectedRole, 
    setSelectedRole, 
    refetch, 
    assignRole: optimisticAssignRole, 
    removeRole: optimisticRemoveRole 
  };
}
