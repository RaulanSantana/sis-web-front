import './Header.css';
import { useNavigate } from 'react-router-dom'; // Importa o hook useNavigate

function Header({ setUsuario }) {
  const navigate = useNavigate(); // Inicializa o hook useNavigate

  const handleSetUsuario = () => {
    const usuario = "usuariocomum"; 
    setUsuario(usuario); 
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    navigate('/login'); // Redireciona para a página de login
  };
  
  return (
    <div className='cabecalho'>
      <i className="fas fa-search"></i>
      <button onClick={handleSetUsuario}>Set</button>
      <div className="right-section">
        <i className="fas fa-envelope"></i>
        <i className="fas fa-bell"></i>
        <div className="user-info">
          <p>Nome do Usuário</p>
          <p className='mat'>Matrícula: 202012345</p>
        </div>
        <div>
          <button onClick={handleLogout}>Sair</button> {/* Use button padrão aqui */}
        </div>
      </div>
    </div>
  );
}

export default Header;
