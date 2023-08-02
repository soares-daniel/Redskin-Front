// src/components/RolesContext.tsx

import { createContext } from 'react';

export type Role = {
    id: number;
    name: string;
  };

interface RolesContextProps {
  roles: Role[];
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

const RolesContext = createContext<RolesContextProps | null>(null);

export default RolesContext;