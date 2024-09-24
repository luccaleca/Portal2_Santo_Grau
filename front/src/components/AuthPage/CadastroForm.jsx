import React from 'react';

const CadastroForm = ({ onSwitchToLogin }) => {
  return (
    <div>
      <h2>Cadastro</h2>
      <form>
        <div>
          <label>Nome:</label>
          <input type="text" placeholder="Digite seu nome" required />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" placeholder="Digite seu email" required />
        </div>
        <div>
          <label>Senha:</label>
          <input type="password" placeholder="Digite sua senha" required />
        </div>
        <button type="submit">Cadastrar</button>
      </form>
      <p>
        Já possui conta? <span onClick={onSwitchToLogin} style={{ cursor: 'pointer', color: 'blue' }}>Faça login!</span>
      </p>
    </div>
  );
};

export default CadastroForm;
