// src/components/UserDetails.tsx

import { useContext, useState } from "react";
import { User } from "@/components/UserContext";
import RolesContext from '@/components/RolesContext';

type UserDetailsProps = {
  user: User | null;
};

export default function UserDetails({ user }: UserDetailsProps) {
  const rolesContext = useContext(RolesContext);

  const [selectedRole, setSelectedRole] = useState<number | null>(null);

  if (!user || !rolesContext) {
    return <div>Select a user to see details</div>;
  }

  const { roles, userRoles, assignRole, removeRole } = rolesContext;

  const handleAssignRole = (roleId: number) => {
    if (user && assignRole) {
      const roleAlreadyAssigned = userRoles.some(role => role.id === roleId);
      if (!roleAlreadyAssigned) {
        assignRole(user.id, roleId);
        setSelectedRole(null);  // reset selection
      } else {
        alert("Role is already assigned to the user");
      }
    }
  };

  const handleRemoveRole = (roleId: number) => {
    if (user && removeRole) {
      removeRole(user.id, roleId);
    }
  };

  return (
    <div>
      <h2>{user.username}</h2>
      <p>UserId: {user.id}</p>
      <p>First name: {user.firstName}</p>
      <p>Last name: {user.lastName}</p>
      <h3>Roles:</h3>
      <ul>
        {userRoles.map((role, index) => (
          <li key={index}>
            {role.name} <button onClick={() => handleRemoveRole(role.id)}>Remove</button>
          </li>
        ))}
      </ul>
      <h3>Assign Role:</h3>
      <select value={selectedRole || ''} onChange={e => setSelectedRole(Number(e.target.value))}>
        <option value="">Select a role</option>
        {roles.map((role, index) => (
          <option key={index} value={role.id}>{role.name}</option>
        ))}
      </select>
      <button onClick={() => handleAssignRole(selectedRole as number)}>Assign Role</button>
    </div>
  );
}
