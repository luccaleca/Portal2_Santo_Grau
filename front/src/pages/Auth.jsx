import React, { useState } from 'react';
import LoginForm from '../components/AuthPage/LoginForm';
import CadastroForm from '../components/AuthPage/CadastroForm';

const Auth = () => {
  // Estado para controlar qual formulário está sendo exibido
  const [isLogin, setIsLogin] = useState(true);

  // Funções para alternar entre os formulários
  const switchToSignup = () => setIsLogin(false);
  const switchToLogin = () => setIsLogin(true);

  return (
    <div>
      {isLogin ? (
        <LoginForm onSwitchToSignup={switchToSignup} />
      ) : (
        <CadastroForm onSwitchToLogin={switchToLogin} />
      )}
    </div>
  );
};

export default Auth;
