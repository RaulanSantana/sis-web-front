//MENU PRINCIPAL


import Header from "../../../layouts/Header/Header";
import rapa from "../../../assets/images/rapa.png";
import rli from "../../../assets/images/rli.png";
import mr from "../../../assets/images/mr.png";
import rlh from "../../../assets/images/rlh.png";
import "./Reservas.css";
import { Link } from 'react-router-dom';
import { Row, Col } from 'antd';

function Reservas() {
  return (
    <div>
    <Header />
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
              <Link to="/reserva_a">
                <li>
                  <img src={rapa} alt="Reserva de sala" />
                
                    <p>Reserva de Sala de Aula, Auditórios, Plenário, Salão de Atos</p>
                 
                </li>
                </Link>
                <Link to="/reserva_c">
                <li>
                  <img src={rli} alt="Laboratório de informática" />
                  <p>Reserva Laboratório de Informática</p>
                </li>
                </Link>
              </ul>
            </div>
          </Col>

          {/* Lista à direita */}
          <Col xs={24} md={12}>
            <div className="reservas-lista">
              <ul>
              <Link to="/reserva_b">
                <li>
                  <img src={rlh} alt="Laboratório de habilidades" />
                 
                    <p>Reserva Laboratório Habilidades</p>
                 
                </li>
                </Link>
                <Link to="/minhas_reservas">
                <li>
                  <img src={mr} alt="Minhas reservas" />
                  <p>Minhas Reservas</p>
                </li>
                </Link>
              </ul>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default Reservas;
