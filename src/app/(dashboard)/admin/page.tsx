// AdminPage.tsx
"use client"

import Layout from "@/components/layout";
import UsersContext, { User } from "@/components/UserContext";
import useUsersData from "@/hooks/useUserData";
import UsersList from "@/components/userList";
import UserDetails from "@/components/UserDetails";
import { useState } from "react";
import RolesContext from "@/components/RolesContext";
import useRolesData from "@/hooks/useRolesData";

export default function AdminPage() {
  const usersData = useUsersData();
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const rolesData = useRolesData(selectedUser?.id);

  const handleUserClick = (user: User) => {
    setSelectedUser(user);
  };

  return (
    <UsersContext.Provider value={usersData}>
      <RolesContext.Provider value={rolesData}>
        <Layout>
          <div className="flex h-full gap-4 pt-4">
            <div className="w-1/4 overflow-y-auto h-screen p-4">
              <UsersList onUserClick={handleUserClick} />
            </div>
            <div className="w-3/4 overflow-y-auto h-screen p-4">
              <UserDetails user={selectedUser} />
            </div>
          </div>
        </Layout>
      </RolesContext.Provider>
    </UsersContext.Provider>
  );
}
