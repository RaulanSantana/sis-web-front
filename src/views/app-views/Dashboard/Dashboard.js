import React from 'react';
import SlideMenu from '../../../layouts/Slidemenu/Slidemenu';
import Header from '../../../layouts/Header/Header';
import { Row, Col } from 'antd';
import './Dashboard.css';
import dayjs from 'dayjs'; // Biblioteca para manipular datas

function Dashboard() {
  const daysOfWeek = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'];

  // Pegando a data atual e ajustando para o início da semana (segunda-feira)
  const today = dayjs();
  const startOfWeek = today.startOf('week').add(1, 'day'); // A partir da segunda-feira

  return (
    <div className="App">
      <Header />
      <div className="calendar-container">

        <Row gutter={16}>
          {daysOfWeek.map((day, index) => {
            const currentDay = startOfWeek.add(index, 'day'); // Adiciona o índice para pegar o dia correto da semana
            const formattedDate = currentDay.format('DD MMMM'); // Formato: 25 Setembro

            return (
              <Col key={index} span={24 / daysOfWeek.length}>
                <div className="day-box">
                  <h2>{day}</h2>
                  <p className="date">{formattedDate}</p> {/* Exibe o dia e o mês */}
                </div>
              </Col>
            );
          })}
        </Row>
      </div>
      <SlideMenu />
    </div>
  );
}

export default Dashboard;
