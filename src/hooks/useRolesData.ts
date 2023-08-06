// src/hooks/useRolesData.ts

import { useEffect, useState } from "react";
import useGetUserRoles from "./useGetUserRoles";
import { Role } from "@/components/RolesContext";
import useAssignRole from "./useAssignRole";
import useRemoveRole from "./useRemoveRole";
import { useGetRoles } from "./useGetRoles";

export default function useRolesData(userId?: number) {
  const { data, loading: fetchLoading, error: fetchError, fetchRoles } = useGetUserRoles(userId);
  const { assignRole, loading: assignLoading, error: assignError } = useAssignRole();
  const { removeRole, loading: removeLoading, error: removeError } = useRemoveRole();

  const { roles: allRoles, loading: allRolesLoading, error: allRolesError, refetch: refetchAllRoles } = useGetRoles();

  const [userRoles, setUserRoles] = useState<Role[]>([]);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);

  useEffect(() => {
    setUserRoles(data ? (data.length > 0 ? data : []) : []);
    setSelectedRole(null);
  }, [data, userId]);

  const isLoading = fetchLoading || assignLoading || removeLoading || allRolesLoading;
  const anyError = fetchError || 
                  (typeof assignError === 'string' ? new Error(assignError) : assignError) || 
                  (typeof removeError === 'string' ? new Error(removeError) : removeError) ||
                  allRolesError;

  const optimisticAssignRole = async (userId: number, roleId: number) => {
    
    const roleToAdd = (allRoles as Role[]).find(role => role.id === roleId);
  
    // Optimistically update the userRoles
    if (roleToAdd) {
      setUserRoles(prevRoles => [...prevRoles, roleToAdd]);
    }

    try {
      await assignRole(userId, roleId);
      // Optionally, you might want to refetch data here for consistency
    } catch (error) {
      // Rollback the optimistic update if there's an error
      setUserRoles(prevRoles => prevRoles.filter(role => role.id !== roleId));
      throw error; // rethrowing the error for the calling component to handle/display it
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
    } catch (error) {
      // Rollback the optimistic update if there's an error
      if (roleToRemove) {
        setUserRoles(prevRoles => [...prevRoles, roleToRemove]);
      }
      throw error; // rethrowing the error for the calling component to handle/display it
    }
  };

  const refetch = async () => {
    await Promise.all([refetchAllRoles(), fetchRoles()]);
  };

  return { 
    roles: allRoles, 
    userRoles, 
    loading: isLoading, 
    error: anyError, 
    selectedRole, 
    setSelectedRole, 
    refetch, 
    assignRole: optimisticAssignRole, 
    removeRole: optimisticRemoveRole 
  };
}
