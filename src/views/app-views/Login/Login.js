import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Para redirecionar após o login
import './Login.css'; 

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); // Hook para navegação

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Faz a chamada à API para verificar as credenciais
      const response = await fetch('http://localhost:8080/usuario-login/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }), // Envia email e senha
      });

      const data = await response.json();

      // Verifica se o login foi bem-sucedido
      if (response.ok) {
        // Redireciona para a página após login (exemplo: /dashboard)
        navigate('/dashboard');
      } else {
        // Exibe mensagem de erro caso as credenciais sejam inválidas
        setErrorMessage(data.message || 'Email ou senha incorretos.');
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      setErrorMessage('Ocorreu um erro. Tente novamente mais tarde.');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      {errorMessage && <p className="error">{errorMessage}</p>}
      <form onSubmit={handleLogin}>
        <div className="input-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Digite seu email"
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Senha:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Digite sua senha"
            required
          />
        </div>
        <button  className="botaologar" type="submit">Entrar</button>
      </form>
    </div>
  );
};

export default Login;
