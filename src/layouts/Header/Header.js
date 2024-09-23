import './Header.css';

function Header() {
  return (
    <div className='cabecalho'>
      <i className="fas fa-search"></i>  {/* Ícone de lupa na extrema esquerda */}
      <div className="right-section">
       
        <i className="fas fa-envelope"></i> {/* Ícone de carta */}
        <i className="fas fa-bell"></i>     {/* Ícone de sino */}
        <p>Nome do Usuario</p>
      </div>
    </div>
  );
}

export default Header;
