// SelectedUserContext.tsx

import { createContext, useContext, useState, ReactNode } from 'react';
import { User } from "@/components/UserContext";

const SelectedUserContext = createContext<{
  selectedUser: User | null;
  setSelectedUser: (user: User | null) => void;
} | null>(null);

export const useSelectedUser = () => {
  const context = useContext(SelectedUserContext);
  if (!context) {
    throw new Error('useSelectedUser must be used within a SelectedUserProvider');
  }
  return context;
};

type SelectedUserProviderProps = {
  children: ReactNode;
}

export const SelectedUserProvider: React.FC<SelectedUserProviderProps> = ({ children }) => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  return (
    <SelectedUserContext.Provider value={{ selectedUser, setSelectedUser }}>
      {children}
    </SelectedUserContext.Provider>
  );
};
