// useAssignRole.ts

import { fetchData } from "@/utils/api";
import { useState } from "react";

export default function useAssignRole() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
  
    const assignRole = async (userId: number, roleId: number) => {
      setLoading(true);
      setError(null);
  
      try {
        const data = await fetchData(`/admin/user/${userId}/assign/role/${roleId}`, 'POST');
        return data;
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };
  
    return { assignRole, loading, error };
  }