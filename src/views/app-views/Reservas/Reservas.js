import { useState } from "react";
import Header from "../../../layouts/Header/Header";
import rapa from "../../../assets/images/rapa.png";
import rli from "../../../assets/images/rli.png";
import mr from "../../../assets/images/mr.png";
import rlh from "../../../assets/images/rlh.png";
import gsl from "../../../assets/images/gsl.png";
import ar from "../../../assets/images/ar.png";
import agr from "../../../assets/images/agr.png";
import si from "../../../assets/images/si.png";
import { Link } from 'react-router-dom';
import { Row, Col } from 'antd';
import "./Reservas.css";
import SlideMenu from "../../../layouts/Slidemenu/Slidemenu";

function Reservas() {
  const [usuario, setUsuario] = useState(""); 

  return (
    <div>
      <Header setUsuario={setUsuario} />

      <div className="reservas-title">
        <p>
          <Link to="/reservas">Reservas</Link>
        </p>
      </div>

      <div className="reservas-container-menu">
        <Row gutter={16}>
          {/* Lista à esquerda */}
          <Col xs={24} md={12}>
            <div className="reservas-lista">
              <ul>
                <Link to="/reserva_sala">
                  <li>
                    <img src={rapa} alt="Reserva de sala" />
                    <p>Reserva de Sala de Aula, Auditórios, Plenário, Salão de Atos</p>
                  </li>
                </Link>
                <Link to="/reserva_labin">
                  <li>
                    <img src={rli} alt="Laboratório de informática" />
                    <p>Reserva Laboratório de Informática</p>
                  </li>
                </Link>

                {/* Só mostra esses menus se o usuário NÃO for "usuariocomum" */}
                {usuario === "usuariocomum" && (
                  <>
                    <Link to="/aprov_reservas">
                      <li>
                        <img src={ar} alt="Aprovação de reservas" />
                        <p>Aprovação de reservas</p>
                      </li>
                    </Link>
                    <Link to="/softwares_instalados">
                      <li>
                        <img src={si} alt="Software instalados" />
                        <p>Software instalados</p>
                      </li>
                    </Link>
                  </>
                )}
              </ul>
            </div>
          </Col>

          {/* Lista à direita */}
          <Col xs={24} md={12}>
            <div className="reservas-lista">
              <ul>
                <Link to="/reserva_labhab">
                  <li>
                    <img src={rlh} alt="Laboratório de habilidades" />
                    <p>Reserva Laboratório de Habilidades</p>
                  </li>
                </Link>
                <Link to="/minhas_reservas">
                  <li>
                    <img src={mr} alt="Minhas reservas" />
                    <p>Minhas Reservas</p>
                  </li>
                </Link>

                {/* Só mostra esses menus se o usuário NÃO for "usuariocomum" */}
                {usuario === "usuariocomum" && (
                  <>
                    <Link to="/agenda">
                      <li>
                        <img src={agr} alt="Agenda de reservas" />
                        <p>Agenda de reservas</p>
                      </li>
                    </Link>
                    <Link to="/gerencia_salas">
                      <li>
                        <img src={gsl} alt="Gerencia de salas e Laboratórios" />
                        <p>Gerencia de salas e Laboratórios</p>
                      </li>
                    </Link>
                  </>
                )}
              </ul>
            </div>
          </Col>
        </Row>
      </div>
      <SlideMenu/>
    </div>
   
  );
}

export default Reservas;
