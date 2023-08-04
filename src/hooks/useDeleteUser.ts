// useDeleteUser.ts

import { fetchData } from "@/utils/api";
import { useState } from "react";

export default function useDeleteUser() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
  
    const deleteUser = async (userId: number) => {
      setLoading(true);
      setError(null);
  
      try {
        const data = await fetchData(`/users/delete/${userId}`, 'DELETE');
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
  
    return { deleteUser, loading, error };
}
