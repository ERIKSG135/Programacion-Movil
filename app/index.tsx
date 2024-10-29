import React, { useState } from "react";
import { View, TextInput, Button, Image, Text } from "react-native";
import styled from 'styled-components/native';
import { useRouter } from "expo-router";

interface MessageContainerProps {
  type: 'error' | 'success';
}

interface MessageTextProps {
  type: 'error' | 'success';
}

export default function LoginScreen() {
  const router=useRouter();
  const onPressLearnMore = ()=>{
    router.push({
      pathname: "./register",
    });
  }
  
  const [email, setEmail] = useState<string>('');  
  const [password, setPassword] = useState<string>('');  
  const [message, setMessage] = useState<string>('');  
  const [messageType, setMessageType] = useState<'error' | 'success'>('error'); 

  const validateEmail = (email: string): boolean => {  
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = () => {
    console.log("Botón presionado");  

    if (!email || !password) {
      setMessage('Por favor, completa todos los campos.');
      setMessageType('error');
      return;
    }

    if (!validateEmail(email)) {
      setMessage('Por favor, introduce un correo electrónico válido.');
      setMessageType('error');
      return;
    }

    if (password.length < 6) {
      setMessage('La contraseña debe tener al menos 6 caracteres.');
      setMessageType('error');
      return;
    }

    setMessage('Has iniciado sesión correctamente.');
    setMessageType('success');
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <MainContainer>
      <FormContainer>
        <TitleContainer>
          <Logo source={{ uri: 'https://portal.ucol.mx/content/micrositios/188/image/Escudo2021/Dos_lineas/UdeC_2L_392.png' }} />
        </TitleContainer>
        <StyledTextInput
          placeholder="Correo electrónico"
          value={email}
          onChangeText={setEmail}
        />
        <StyledTextInput
          placeholder="Contraseña"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <ButtonContainer>
          <StyledButton title="Iniciar sesión" onPress={handleLogin} />
        </ButtonContainer>
        {message ? (
          <MessageContainer type={messageType}>
            <MessageText type={messageType}>{message}</MessageText>
          </MessageContainer>
        ) : null}

<ButtonContainer>
      <Button title="Registrarse" onPress={onPressLearnMore} color="#841584" accessibilityLabel="Register button"/>
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

const TitleContainer = styled(View)`
  width: 100%;
  background-color: white;
  padding: 15px;
  margin-bottom: 20px;
  align-items: center;
  border: 2px solid black;
`;

const Logo = styled(Image)`
  width: 140px;
  height: 120px;
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

const StyledButton = styled(Button)`
  background-color: lightblue;
`;

// Nuevos estilos para el mensaje
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
