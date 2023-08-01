import React, { useContext, useState } from 'react';
import UserContext from './UserContext';

export default function UsersList() {
  const contextValue = useContext(UserContext);
  const [searchTerm, setSearchTerm] = useState('');

  if (!contextValue) {
    return <p>Error: UsersContext not found</p>;
  }

  const { users, loading, error, refetch } = contextValue;

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const filteredUsers = users.filter(user =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Search users"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <button onClick={refetch}>Refresh</button>
      </div>
      {filteredUsers.map((user, index) => (
        <div className="bg-white rounded shadow mb-4 p-6" key={index}>
          <h3 className="text-xl font-bold">{user.username}</h3>
          <p className="text-sm text-gray-600">
            User ID: {user.id}
          </p>
            {user.extendedProps && (
            <>
              <p className="text-sm text-gray-600">
                Created at: {user.extendedProps.createdAt.toString().slice(0, 10)}
              </p>
              <p className="text-sm text-gray-600">
                Updated at: {user.extendedProps.updatedAt.toString().slice(0, 10)}
              </p>
            </>
            )}
        </div>
      ))}
    </div>
  );
}
