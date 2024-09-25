import './Header.css';

function Header({ setUsuario }) {
  const handleSetUsuario = () => {
    const usuario = "usuariocomum"; 
    setUsuario(usuario); 
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
       
      </div>
    </div>
  );
}

export default Header;
