// useRemoveRole.ts

import { fetchData } from "@/utils/api";
import { useState } from "react";

export default function useRemoveRole() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
  
    const removeRole = async (userId: number, roleId: number) => {
      setLoading(true);
      setError(null);
  
      try {
        const data = await fetchData(`/users/user/${userId}/remove/${roleId}`, 'DELETE');
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
  
    return { removeRole, loading, error };
  }