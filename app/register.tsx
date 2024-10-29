import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import styled from "styled-components/native";
import { useRouter } from "expo-router"; // Importamos 



interface MessageContainerProps {
    type: 'error' | 'success';
}

interface MessageTextProps {
    type: 'error' | 'success';
}

export default function Register() {
        const router=useRouter();
        const onPressLearnMore = ()=>{
          router.push({
            pathname: "/",
          });
        }

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<'error' | 'success'>('success');

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleRegister = () => {
    if (!email || !username || !password || !confirmPassword) {
      setMessage('Por favor, completa todos los campos.');
      setMessageType('error');
      return;
    }

    if (!validateEmail(email)) {
      setMessage('Por favor, introduce un correo electrónico válido.');
      setMessageType('error');
      return;
    }

    if (username.length < 3) {
      setMessage('El nombre de usuario debe tener al menos 3 caracteres.');
      setMessageType('error');
      return;
    }

    if (password.length < 6) {
      setMessage('La contraseña debe tener al menos 6 caracteres.');
      setMessageType('error');
      return;
    }

    if (password !== confirmPassword) {
      setMessage('Las contraseñas no coinciden.');
      setMessageType('error');
      return;
    }

    setMessage('Registro completado correctamente.');
    setMessageType('success');
    onPressLearnMore()
   
  };

  return (
    <MainContainer>
     <FormContainer>
      <Text>Registro</Text>
      <StyledTextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <StyledTextInput
        placeholder="Nombre de usuario"
        value={username}
        onChangeText={setUsername}
      />
      <StyledTextInput
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <StyledTextInput
        placeholder="Confirmar contraseña"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />
      
      {/* Mostrar mensaje de validación */}
      {message ? (
        <MessageContainer type={messageType}>
          <MessageText type={messageType}>{message}</MessageText>
        </MessageContainer>
      ) : null}
      
      <ButtonContainer>
        <Button title="Registrar" onPress={handleRegister} />
      </ButtonContainer>
      </FormContainer>
    </MainContainer>
  );
}
const MainContainer = styled(View)`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #f5fcff;
`;

const FormContainer = styled(View)`
  width: 80%;
  max-width: 300px;
  padding: 20px;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  elevation: 5;
  align-items: center;
`;

const StyledTextInput = styled(TextInput)`
  width: 100%;
  border: 1px solid orange;
  padding: 10px;
  margin-bottom: 15px;
  border-radius: 5px;
`;

const ButtonContainer = styled(View)`
  width: 100%;
  border: 1px solid lightblue;
  border-radius: 5px;
  margin-top: 10px;
`;

// estilos para el mensaje
const MessageContainer = styled(View)<MessageContainerProps>`
  margin-top: 15px;
  padding: 10px;
  border-radius: 5px;
  width: 100%;
  background-color: ${props => (props.type === 'error' ? '#ffdddd' : '#ddffdd')}; 
  border: 1px solid ${props => (props.type === 'error' ? '#f44336' : '#4caf50')}; 
`;

const MessageText = styled(Text)<MessageTextProps>`
  color: ${props => (props.type === 'error' ? '#f44336' : '#4caf50')}; 
  text-align: center;
`;
