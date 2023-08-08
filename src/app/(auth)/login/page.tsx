"use client"
import styled from 'styled-components';
import { useState } from 'react';
import { useLogin } from '@/hooks/useLogin';

const FormContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f6f6f6;
`;

const StyledForm = styled.form`
  display: flex;         // Set this as a flex container
  flex-direction: column; // Arrange children in a column
  align-items: center;    // Center children horizontally
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: #ffffff;
  max-width: 400px;
  width: 100%;
`;

const LogoImage = styled.img`
  width: 150px;
  margin-bottom: 20px;
`;

const StyledInput = styled.input`
  display: block;
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #e0e0e0;
  border-radius: 5px;
  font-size: 16px;
`;

const StyledButton = styled.button`
  display: block;
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #007bff;
  color: white;
  font-size: 18px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

const ErrorText = styled.p`
  color: red;
  text-align: center;
  font-weight: bold;
`;

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login, error } = useLogin();

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    login(username, password);
  };

  return (
    <FormContainer>
      <StyledForm onSubmit={handleSubmit}>
        <LogoImage src="images/prd_logo.png" alt="Logo" />
        <StyledInput type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" required />
        <StyledInput type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
        <StyledButton type="submit">Login</StyledButton>
        {error && <ErrorText>{error}</ErrorText>}
      </StyledForm>
    </FormContainer>
  );
}