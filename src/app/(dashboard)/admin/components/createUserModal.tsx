// createUserModal.tsx

import React, { useContext, useState } from 'react';
import Modal from 'react-modal';
import UserContext from '@/components/UserContext';

type NewUser = {
  username: string;
  firstName: string;
  lastName: string;
  password: string;
};

type CreateUserModalProps = {
  isOpen: boolean;
  onRequestClose: () => void;
};

export default function CreateUserModal({ isOpen, onRequestClose }: CreateUserModalProps) {
  const userContext = useContext(UserContext);
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');

  if (!userContext) {
    return null;
  }

  const { createUser } = userContext

  const resetForm = () => {
    setUsername('');
    setFirstName('');
    setLastName('');
    setPassword('');
  };

  const isFormValid = username !== '' && firstName !== '' && lastName !== '' && password !== '';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (isFormValid) {
      const newUser: NewUser = {
        username,
        firstName,
        lastName,
        password
      };
  
      await createUser(newUser.username, newUser.firstName, newUser.lastName, newUser.password);
      resetForm();
      onRequestClose();
    }
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onRequestClose={onRequestClose}
      style={{
        overlay: {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        },
        content: {
          position: 'relative',
          top: 'auto',
          left: 'auto',
          right: 'auto',
          bottom: 'auto',
          width: '80%',
          maxWidth: '500px',
          height: 'fit-content', 
        }
      }}
    >
      <h2 className="modal-header">Create User</h2>
      <button onClick={resetForm} style={{ position: 'absolute', top: '10px', left: '10px' }}>Reset Form</button>
      <button onClick={onRequestClose} style={{ position: 'absolute', top: '10px', right: '10px' }}>Close</button>
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
            Password:
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
            />
          </label>
        </div>
        <button type="submit" disabled={!isFormValid} className={!isFormValid ? 'disabled-button' : ''}>Create</button>
        {!isFormValid && <p className="error-message">Please fill out all required fields</p>}
      </form>
    </Modal>
  );
}
