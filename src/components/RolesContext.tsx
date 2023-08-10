// RolesContext.tsx
import { createContext } from 'react';

export type Role = {
  id: number;
  name: string;
};


interface RolesContextProps {
  roles: Role[]; // allRoles
  userRoles: Role[]; // user specific roles
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
  assignRole?: (userId: number, roleId: number) => void; 
  removeRole?: (userId: number, roleId: number) => void; 
}

const RolesContext = createContext<RolesContextProps | null>(null);

export default RolesContext;
