import React from 'react';
import { navigate } from 'gatsby';

const LoginForm = ({ onSwitchToSignup }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/home');  // Redirecionar para a Home após o login
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input type="email" placeholder="Digite seu email" />
        </div>
        <div>
          <label>Senha:</label>
          <input type="password" placeholder="Digite sua senha" />
        </div>
        <button type="submit">Entrar</button>
      </form>
      <p>
        Não possui cadastro ainda? <span onClick={onSwitchToSignup} style={{ cursor: 'pointer', color: 'blue' }}>Cadastre-se!</span>
      </p>
    </div>
  );
};

export default LoginForm;
