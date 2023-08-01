"use client"

import Layout from "@/components/layout";
import UsersContext from "@/components/UserContext";
import useUsersData from "@/hooks/useUserData";
import UsersList from "@/components/userList";

export default function AdminPage() {
    const usersData = useUsersData();

    return (
        <UsersContext.Provider value={usersData}>
            <Layout>
                <div className="flex h-full gap-4 pt-4">
                    <div className="w-1/4 overflow-y-auto h-screen p-4">
                        <UsersList />

                    </div>
                </div>
            </Layout>
        </UsersContext.Provider>
    );
}