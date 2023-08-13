// src/hooks/useGetUserRoles.ts

import { Role } from "@/components/RolesContext";
import { fetchData } from "@/utils/api";
import { useEffect, useState } from "react";
import { useError } from "@/components/ErrorContext";

export default function useGetUserRoles(userId?: number) {
    const [data, setData] = useState<Role[] | null>(null);
    const [loading, setLoading] = useState(false);
   // const [error, setError] = useState<Error | null>(null);
    const {error, setError } = useError();

  
    const fetchRoles = async () => {
      if (userId === undefined) {
        setData(null);
        return;
      }
  
      setLoading(true);
      try {
        const data = await fetchData(`/users/user/${userId}/roles`);
        setData(data);
      } catch (error) {
        setError(error as Error);
        console.log("Error fetching user roles: ", error);
        setData(null);
      } finally {
        setLoading(false);
      }
    };
  
    useEffect(() => {
      fetchRoles();
    }, [userId]);
  
    return { data, loading, error, fetchRoles };
  }