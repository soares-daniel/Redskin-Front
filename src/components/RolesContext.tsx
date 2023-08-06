// RolesContext.tsx

import { createContext } from 'react';

export type Role = {
  id: number;
  name: string;
};

interface RolesContextProps {
  roles: Role[]; // allRoles
  userRoles: Role[]; // roles of selected user
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
  assignRole?: (userId: number, roleId: number) => void; // function to assign role
  removeRole?: (userId: number, roleId: number) => void; // function to remove role
}

const RolesContext = createContext<RolesContextProps | null>(null);

export default RolesContext;
