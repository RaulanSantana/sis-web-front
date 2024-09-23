// JavaScript/React
import React, { useState } from 'react';
import './Slidemenu.css';
import driverIcon from '../../assets/images/amber_10582319.png';
import salaIcon from '../../assets/images/calendar_936567.png';
import provaIcon from '../../assets/images/check-mark_857440.png';
import graduacaoIcon from '../../assets/images/education.png';
import documentosIcon from '../../assets/images/paper_2541979.png';
import componentesIcon from '../../assets/images/school-bag.png';
import bibliotecaIcon from '../../assets/images/mouse-gaming_12645239.png';
import inscricoesIcon from '../../assets/images/check_8819874.png';
import inicioIcon from '../../assets/images/square_14034325.png';
import menuIcon from '../../assets/images/menu_8600362.png';
import homeIcon from '../../assets/images/minhauno.svg';
import financeiroIco from '../../assets/images/piggy-bank.png';
import { Link } from 'react-router-dom';


const SlideMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  

  const handleMouseEnter = () => {
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    setIsOpen(false);
  };

  return (
    <div className="menu-container" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div className={`menu ${isOpen ? 'open' : ''}`}>
        <div className="menu-hamburger">
        <img
    src={isOpen ? homeIcon : menuIcon}
    alt="Menu/Home"
    className={`menu-icon ${isOpen ? 'home-icon' : 'menu-icon-small'}`}
  />
        </div>

        <div className={`menu-content ${isOpen ? 'menu-content' : 'menu-content-complete'}`}>
          <ul>
            <li>
            <Link to="/" className="menu-item" onClick={handleMouseLeave}>
              <img src={inicioIcon} alt="Início" className="menu-icon" />

              {isOpen && <span className="menu-text" >Início</span>}
              </Link>
            </li>
            <li>
              <img src={graduacaoIcon} alt="Graduação" className="menu-icon" />
              {isOpen && <span className="menu-text">Graduação</span>}
            </li>
            <li>
              <img src={componentesIcon} alt="Componentes" className="menu-icon" />
              {isOpen && <span className="menu-text">Componentes</span>}
            </li>
            <li>
              <img src={financeiroIco} alt="Situação financeira" className="menu-icon" />
              {isOpen && <span className="menu-text">Situação financeira</span>}
            </li>
            <li>
              <img src={bibliotecaIcon} alt="Biblioteca" className="menu-icon" />
              {isOpen && <span className="menu-text">Biblioteca</span>}
            </li>
            <li>
              <img src={provaIcon} alt="Minha Prova" className="menu-icon" />
              {isOpen && <span className="menu-text">Minha Prova</span>}
            </li>
            <li>
              <img src={inscricoesIcon} alt="Inscrições" className="menu-icon" />
              {isOpen && <span className="menu-text">Inscrições</span>}
            </li>
            <li>
              <img src={documentosIcon} alt="Documentos Digitais" className="menu-icon" />
              {isOpen && <span className="menu-text">Documentos Digitais</span>}
            </li>
            <li>
              <img src={driverIcon} alt="Meu Drive" className="menu-icon" />
              {isOpen && <span className="menu-text">Meu Drive</span>}
            </li>
            <li>
            <Link to="/reservas" className="menu-item" onClick={handleMouseLeave}>
              <img src={salaIcon} alt="Reservas de Sala" className="menu-icon" />
              
              {isOpen && <span className="menu-text">Reservas de Sala</span>}
           
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SlideMenu;
