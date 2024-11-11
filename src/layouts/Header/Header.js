import './Header.css';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Header({ setUsuario }) {
  const navigate = useNavigate(); // Inicializa o hook useNavigate
  const [dataSource, setDataSource] = useState([]);
  
  const handleSetUsuario = () => {
    const usuario = "usuariocomum"; 
    setUsuario(usuario); 
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    navigate('/login'); // Redireciona para a página de login
  };
  const userId = localStorage.getItem('userId'); // Pega o ID do usuário do localStorage


  useEffect(() => {
    const fetchUsuario = async () => {
      if (userId) {
        try {
          const response = await axios.get(`http://localhost:8080/login/logado`, {
            params: { userId: userId } // Envia o userId como parâmetro de consulta
          });
          setDataSource(response.data);
        } catch (error) {
          console.error('Erro ao buscar usuário:', error);
        }
      }
    };
  
    fetchUsuario();
  }, []);
  


  return (
    <div className='cabecalho'>
      <i className="fas fa-search"></i>
      <button onClick={handleSetUsuario}>Set</button>
      <div className="right-section">
        <i className="fas fa-envelope"></i>
        <i className="fas fa-bell"></i>
        <div className="user-info">
          <p>{dataSource.nome || 'Nome do Usuário'}</p> {/* Exibindo o nome do usuário */}
          <p className='mat'>Matrícula: {dataSource.matricula || '202012345'}</p> {/* Exibindo a matrícula */}
        </div>
        <div>
          <button onClick={handleLogout}>Sair</button>
        </div>
      </div>
    </div>
  );
}

export default Header;
