import './Header.css';

function Header() {
  return (
    <div className='cabecalho'>
      <i className="fas fa-search"></i> {/* Ícone de lupa na extrema esquerda */}
      <div className="right-section">
        <i className="fas fa-envelope"></i> {/* Ícone de carta */}
        <i className="fas fa-bell"></i>     {/* Ícone de sino */}
        <div className="user-info">
          <p>Nome do Usuario</p>
          <p className='mat'>Matricula: 202012345</p>
        </div>
      </div>
    </div>
  );
}

export default Header;
