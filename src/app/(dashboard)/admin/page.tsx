// AdminPage.tsx
"use client"

import Layout from "@/components/layout";
import UsersContext, { User } from "@/components/UserContext";
import useUsersData from "@/hooks/useUserData";
import UsersList from "@/app/(dashboard)/admin/components/userList";
import UserDetails from "@/app/(dashboard)/admin/components/UserDetails";
import { useEffect, useState } from "react";
import RolesContext from "@/components/RolesContext";
import useRolesData from "@/hooks/useRolesData";
import withAdmin from "@/components/withAdminPriv";
import CurrentUserRolesContext from "@/components/CurrentUserRolesContext";
import { useCookies } from "react-cookie";
import withErrorProvider from "@/components/withErrorProvider";
import { useError } from '@/components/ErrorContext'
import ErrorModal from "@/components/ErrorModal";
import { useRouter } from "next/navigation";
import { ErrorTypes } from "@/types/errorTypes";

function AdminPage() {
  const usersData = useUsersData();
  const router = useRouter();
  const { error, setError } = useError();
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const rolesData = useRolesData(selectedUser?.id);
  const [cookies] = useCookies(['userId']);
  const userId = cookies.userId;
  const { userRoles, loading: rolesLoading, error: rolesError, ...otherRolesData } = useRolesData(userId)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (error) {
      setErrorMessage(error.message);
      setIsModalOpen(true);
      if (error && error.name === ErrorTypes.NOT_AUTHORIZED) {
        router.push('/login');
      }
      setError(null);
    }
  }, [error, setError]);

  const handleUserClick = (user: User) => {
    setSelectedUser(user);
  };

  const handleUpdatedUser = (updatedUser: User) => {
    setSelectedUser(updatedUser);
  };

  const handleRefresh = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    window.location.reload();
};


  return (
    <CurrentUserRolesContext.Provider value={{ ...otherRolesData, userRoles, roles: otherRolesData.roles, loading: rolesLoading, error: rolesError }}>
    <UsersContext.Provider value={usersData}> 
      <RolesContext.Provider value={rolesData}>
        <Layout>
          <div className="flex h-full gap-4 pt-4">
            <div className="w-1/4 overflow-y-auto h-screen p-4">
              <UsersList onUserClick={handleUserClick} />
            </div>
            <ErrorModal 
                    isOpen={isModalOpen}
                    onRequestClose={() => setIsModalOpen(false)} errorMessage={errorMessage}
            />
            <div className="w-3/4 overflow-y-auto h-screen p-4">
            <UserDetails user={selectedUser} onUserUpdate={handleUpdatedUser} />
            </div>
          </div>
        </Layout>
      </RolesContext.Provider>
    </UsersContext.Provider>
    </CurrentUserRolesContext.Provider>
  );
}

export default withAdmin(withErrorProvider(AdminPage));