// EditUserModal.tsx

import React, { useContext, useEffect, useState } from 'react';
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
  onUserUpdate: (updatedUser: User) => void;
};

export default function EditUserModal({ isOpen, onRequestClose, user, onUserUpdate }: EditUserModalProps) {
  const userContext = useContext(UserContext);
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  useEffect(() => {
    if (isOpen) {
      setUsername(user.username || '');
      setFirstName(user.firstName || '');
      setLastName(user.lastName || '');
    }
  }, [isOpen, user]);

  if (!userContext) {
    return null;
  }

  const { editUser } = userContext

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
      const updatedUserFromAPI = await editUser(editedUser);
      if (updatedUserFromAPI) {
        onUserUpdate(updatedUserFromAPI);
      }
      onRequestClose();
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