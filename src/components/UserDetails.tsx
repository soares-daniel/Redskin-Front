// src/components/UserDetails.tsx

import { useContext } from "react";
import { User } from "@/components/UserContext";
import RolesContext from '@/components/RolesContext';

type UserDetailsProps = {
    user: User | null;
  };
  
  export default function UserDetails({ user }: UserDetailsProps) {
    const rolesContext = useContext(RolesContext);
  
    if (!user || !rolesContext) {
      return <div>Select a user to see details</div>;
    }
  
    const { roles } = rolesContext;
    return (
      <div>
        <h2>{user.username}</h2>
        <p>UserId: {user.id}</p>
        <p>First name: {user.firstName}</p>
        <p>Last name: {user.lastName}</p>
        <h3>Roles:</h3>
        <ul>
            {roles.map((role, index) => (
            <li key={index}>{role.name}</li>
            ))}
        </ul>
      </div>
    );
  } 