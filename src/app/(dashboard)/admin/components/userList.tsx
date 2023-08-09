import React, { useContext, useState } from 'react';
import UserContext, { User } from '@/components/UserContext';
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
          placeholder="Search"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
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
            {user.firstName} {user.lastName} 
          </p>
        </div>
      ))}
      <CreateUserModal isOpen={isModalOpen} onRequestClose={closeModal} />
    </div>
  );
}
