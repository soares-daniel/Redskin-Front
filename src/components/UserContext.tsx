// UserContext.tsx

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
    deleteUser: (userId: number) => Promise<void>;
    createUser: (username: string, firstName: string, lastName: string, password: string) => Promise<User>;
    editUser: (userId: number, username: string, firstName: string, lastName: string, password: string) => Promise<any>;
  }

const UsersContext = createContext<UsersContextProps | null>(null);

export default UsersContext;