// src/components/UserDetails.tsx

import { useContext, useState } from "react";
import { User } from "@/components/UserContext";
import RolesContext from '@/components/RolesContext';
import UsersContext from '@/components/UserContext';
import useUsersData from "@/hooks/useUserData";
import EditUserModal from "@/app/(dashboard)/admin/components/editUserModal";

type UserDetailsProps = {
  user: User | null;
  setSelectedUser: (user: User) => void;
};

export default function UserDetails({ user, setSelectedUser }: UserDetailsProps) {
  const usersContext = useContext(UsersContext);
  const rolesContext = useContext(RolesContext);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState<number | null>(null);

  if (!user || !rolesContext || !usersContext) {
    return <div className="text-lg text-center py-5">Select a user to see details</div>;
  }
  const { users, loading, error: usersError, refetch: refetchUser, createUser, deleteUser } = usersContext;

  const { roles, userRoles, assignRole, removeRole, refetch: refetchRoles } = rolesContext;

  const handleAssignRole = (roleId: number) => {
    if (user && assignRole) {
      const roleAlreadyAssigned = userRoles.some(role => role.id === roleId);
      if (!roleAlreadyAssigned) {
        assignRole(user.id, roleId);
        setSelectedRole(null);  // reset selection
        //refetchRoles();
      } else {
        alert("Role is already assigned to the user");
      }
    }
  };

  const handleRemoveRole = (roleId: number) => {
    if (user && removeRole) {
      removeRole(user.id, roleId);
      //refetchRoles();
    }
  };

  const handleDelete = async () => {
    await deleteUser(user.id);
    refetchUser();
  };

  return (
    <div className="p-5 bg-white shadow rounded">
        <div className="relative w-full h-full">
          <button 
            className="absolute top-2 right-2 bg-red-500 text-white rounded px-2 py-1" 
            onClick={handleDelete}
          >
            Delete User
          </button>
          <button 
            className="absolute top-2 right-10 bg-green-500 text-white rounded px-2 py-1" 
            onClick={() => setIsEditModalOpen(true)} 
          >
            Edit User
          </button>
          <div className="p-4">
          </div>
        </div>
      <h2 className="text-2xl font-bold mb-2">{user.username}</h2>
      <p className="text-gray-600 mb-2">UserId: {user.id}</p>
      <p className="text-gray-600 mb-2">First name: {user.firstName}</p>
      <p className="text-gray-600 mb-2">Last name: {user.lastName}</p>
      <h3 className="text-xl font-semibold mt-4 mb-2">Roles:</h3>
      <ul className="mb-4">
        {userRoles.map((role, index) => (
          <li key={index} className="mb-1">
            {role.name} <button className="text-red-600 hover:text-red-800" onClick={() => handleRemoveRole(role.id)}>Remove</button>
          </li>
        ))}
      </ul>
      <h3 className="text-xl font-semibold mt-4 mb-2">Assign Role:</h3>
      <div className="flex items-center">
        <select value={selectedRole || ''} onChange={e => setSelectedRole(Number(e.target.value))} className="border-gray-300 border rounded p-2 mr-4 flex-grow">
          <option value="">Select a role</option>
          {roles.map((role, index) => (
            <option key={index} value={role.id}>{role.name}</option>
          ))}
        </select>
        <button className="bg-blue-600 text-white rounded p-2" onClick={() => handleAssignRole(selectedRole as number)}>Assign Role</button>
      </div>
      <EditUserModal 
          isOpen={isEditModalOpen} 
          onRequestClose={() => setIsEditModalOpen(false)}
          user={user}
          setSelectedUser={setSelectedUser}
        />
    </div>
  );
}
