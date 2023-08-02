"use client"

import Layout from "@/components/layout";
import UsersContext, { User } from "@/components/UserContext";
import useUsersData from "@/hooks/useUserData";
import UsersList from "@/components/userList";
import  UserDetails  from "@/components/UserDetails";
import { SetStateAction, useState } from "react";

export default function AdminPage() {
  const usersData = useUsersData();
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleUserClick = (user: User) => {
    setSelectedUser(user);
  };

  return (
    <UsersContext.Provider value={usersData}>
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
    </UsersContext.Provider>
  );
}