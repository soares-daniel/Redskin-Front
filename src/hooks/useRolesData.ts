// src/hooks/useRolesData.ts

import { useEffect, useState } from "react";
import useFetchRoles from "./useFetchRoles";
import { Role } from "@/components/RolesContext";
import useAssignRole from "./useAssignRole";
import useRemoveRole from "./useRemoveRole";
import { useGetRoles } from "./useGetRoles";

export default function useRolesData(userId?: number) {
  const { data, loading: fetchLoading, error: fetchError, fetchRoles } = useFetchRoles(userId);
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
  
  const refetch = async () => {
    await Promise.all([refetchAllRoles(), fetchRoles()]);
  };

  return { roles: allRoles, userRoles, loading: isLoading, error: anyError, selectedRole, setSelectedRole, refetch, assignRole, removeRole };
}
