// EditUserModal.tsx

import React, { useContext, useState, useEffect } from 'react';
import Modal from 'react-modal';
import UserContext, { User } from '@/components/UserContext';

type EditUserProps = {
  userId: number;
  username: string;
  firstName: string;
  lastName: string;
  password: string;
};

type EditUserModalProps = {
  isOpen: boolean;
  onRequestClose: () => void;
  user: User; 
};

export default function EditUserModal({ isOpen, onRequestClose, user }: EditUserModalProps) {
  const userContext = useContext(UserContext);
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (user) {
      setUsername(user.username);
      setFirstName(user.firstName);
      setLastName(user.lastName);
    }
  }, [user]);

  if (!userContext) {
    return null;
  }

  const { editUser } = userContext

  const isFormValid = username !== '' && firstName !== '' && lastName !== '' && password !== '';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (isFormValid) {
      const editedUser: EditUserProps = {
        userId: user.id,
        username,
        firstName,
        lastName,
        password 
      };
  
      await editUser(editedUser.userId, editedUser.username, editedUser.firstName, editedUser.lastName, editedUser.password);
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
              required 
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
              required 
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
              required 
            />
          </label>
        </div>
        <div className="form-field">
          <label>
            Password (re-enter or change):
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </label>
        </div>
        <button type="submit" disabled={!isFormValid} className={!isFormValid ? 'disabled-button' : ''}>Update</button>
        {!isFormValid && <p className="error-message">Please fill out all required fields</p>}
      </form>
    </Modal>
  );
}

