// EditUserModal.tsx

import React, { useContext, useState, useEffect } from 'react';  // Import useEffect
import Modal from 'react-modal';
import UserContext, { User } from '@/components/UserContext';

type EditUserProps = {
  userId: number;
  username?: string;
  firstName?: string;
  lastName?: string;
};

type EditUserModalProps = {
  isOpen: boolean;
  onRequestClose: () => void;
  user: User;
  setSelectedUser: (user: User) => void;
};

export default function EditUserModal({ isOpen, onRequestClose, user, setSelectedUser }: EditUserModalProps) {  // Don't forget the setSelectedUser prop
  const userContext = useContext(UserContext);
  const [username, setUsername] = useState(user.username || '');
  const [firstName, setFirstName] = useState(user.firstName || '');
  const [lastName, setLastName] = useState(user.lastName || '');

  useEffect(() => { // This effect will run whenever the 'user' prop changes
    setUsername(user.username || '');
    setFirstName(user.firstName || '');
    setLastName(user.lastName || '');
  }, [user]);

  if (!userContext) {
    return null;
  }

  const { editUser, refetch } = userContext;

  const isFormValid = username !== '' || firstName !== '' || lastName !== '';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const editedUser: EditUserProps = {
      userId: user.id
    };

    if (username) editedUser.username = username;
    if (firstName) editedUser.firstName = firstName;
    if (lastName) editedUser.lastName = lastName;

    if (isFormValid) {
      await editUser(editedUser);
    
    await refetch();

    if (userContext.users) {
      const updatedUser = userContext.users.find(u => u.id === user.id);
      setSelectedUser(updatedUser || user);
    }

    onRequestClose();
    // Clear form values
    setUsername('');
    setFirstName('');
    setLastName('');
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
    >
      <h2 className="modal-header">Edit User</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-field">
          <label>
            Username:
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
        </div>
        <div className="form-field">
          <label>
            First Name:
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </label>
        </div>
        <div className="form-field">
          <label>
            Last Name:
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </label>
        </div>
        <button type="submit" disabled={!isFormValid} className={!isFormValid ? 'disabled-button' : ''}>Update</button>
        {!isFormValid && <p className="error-message">Please fill out at least one field</p>}
      </form>
    </Modal>
  );
}
