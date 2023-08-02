// src/hooks/useRolesData.ts

import { useEffect, useState } from "react";
import useFetchRoles from "./useFetchRoles";
import { Role } from "@/components/RolesContext";

export default function useRolesData(userId?: number) {
    const { data, loading, error, fetchRoles } = useFetchRoles(userId);
    const [roles, setRoles] = useState<Role[]>([]);
    const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  
    useEffect(() => {
        setRoles(data ? (data.length > 0 ? data : []) : []);
      setSelectedRole(null);
    }, [data, userId]);
  
    return { roles, loading, error, selectedRole, setSelectedRole, refetch: fetchRoles };
  }