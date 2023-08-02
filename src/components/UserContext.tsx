// UserContext.ts

import { createContext } from 'react';

export interface User {
    id: number;
    username: string;
    firstName: string;
    lastName: string;
    extendedProps: {
      createdAt: Date;
      updatedAt: Date;
    };
  };
  
interface UsersContextProps {
  users: User[];
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

const UsersContext = createContext<UsersContextProps | null>(null);

export default UsersContext;