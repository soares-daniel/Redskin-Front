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
      <div className="flex mb-4 items-center space-x-4">
        <input
          type="text"
          placeholder="Search users"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
        <button 
          onClick={refetch} 
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Refresh
        </button>
        <button 
          onClick={handleCreateUser} 
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Create
        </button>
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
