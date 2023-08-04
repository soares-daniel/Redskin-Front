import React, { useContext, useState } from 'react';
import UserContext, { User } from './UserContext';
import CreateUserModal from '@/app/(dashboard)/admin/components/createUserModal';

type UsersListProps = {
  onUserClick: (user: User) => void;
};

export default function UsersList({ onUserClick }: UsersListProps) {
  const usersContext = useContext(UserContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!usersContext) {
    return null;
  }

  const { users, loading, error, refetch, createUser, } = usersContext;

  if (loading) return <p>Loading...</p>;
  if (error && error.message !== 'Not found') return <p>Error: {error.message}</p>;

  const filteredUsers = users.filter(user =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateUser = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    refetch();
  };

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
        <button onClick={handleCreateUser}>+User</button>
      </div>
      {filteredUsers.map((user, index) => (
        <div className="bg-white rounded shadow mb-4 p-6" 
              key={index}
              onClick={() => onUserClick(user)}
              > 
          <h3 className="text-xl font-bold">{user.username}</h3>
          <p className="text-sm text-gray-600">
            UserId: {user.id}
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
      <CreateUserModal isOpen={isModalOpen} onRequestClose={closeModal} />
    </div>
  );
}
