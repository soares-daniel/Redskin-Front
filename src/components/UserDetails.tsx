// src/components/UserDetails.tsx

import { User } from "./UserContext";

type UserDetailsProps = {
    user: User | null;
  };
  
  export default function UserDetails({ user }: UserDetailsProps) {
    if (!user) {
      return <div>Select a user to see details</div>; 
    }
  
    return (
      <div>
        <h2>{user.username}</h2>
        <p>UserId: {user.id}</p>
        <p>First name: {user.firstName}</p>
        <p>Last name: {user.lastName}</p>
        {/* Add more user details here */}
      </div>
    );
  } 