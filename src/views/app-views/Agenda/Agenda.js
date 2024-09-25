import React, { useState } from 'react';
import { Form, Select, Button, message, Row, Col, Calendar, Badge } from 'antd';
import Header from '../../../layouts/Header/Header';
import { Link } from 'react-router-dom';

function Agenda() {
  const [form] = Form.useForm();
  
  // Estado para armazenar o local selecionado
  const [filteredLocal, setFilteredLocal] = useState(null);

  // Mock de dados de reserva
  const reservedDates = {
    '2024-09-26': 'Laboratório de Informatica - C220',
    '2024-09-28': 'Laboratório de Habilidades - Laboratório de Bioquimica',
    '2024-09-30': 'Salas de aula - C250',
  };

  // Função para aplicar o filtro
  const onFinish = (values) => {
    console.log('Valores enviados:', values);
    setFilteredLocal(values.local); // Atualiza o estado com o local filtrado
    message.success('Filtro aplicado com sucesso!');
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Falha no envio:', errorInfo);
  };

  // Função para renderizar as células do calendário
  const dateCellRender = (value) => {
    const dateString = value.format('YYYY-MM-DD');
    const reservation = reservedDates[dateString];

    // Exibe a reserva apenas se corresponder ao local filtrado ou se nenhum local foi selecionado
    if (reservation && (!filteredLocal || reservation.toLowerCase().includes(filteredLocal.toLowerCase()))) {
      return (
        <div style={{ padding: '5px', textAlign: 'center' }}>
          <Badge color="red" text={reservation} />
        </div>
      );
    }
    return null;
  };

  return (
    <div>
      <Header />
      <div className="reservas-title">
        <p>
          <Link to="/reservas">Reservas</Link> &gt; <span>Agenda de reservas</span>
        </p>
        <h1><Link to="/reservas">&#8592; </Link>Agenda de reservas</h1>
      </div>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Row gutter={16} className="reserva-container">
          <Col xs={24} md={12}>
            <Form.Item 
              label="Local" 
              name="local"
            >
              <Select placeholder="Selecione o local">
                <Select.Option value="c250">Salas de aula</Select.Option>
                <Select.Option value="Auditórios">Auditórios</Select.Option>
                <Select.Option value="c220">Laboratório de Informatica</Select.Option>
                <Select.Option value="Laboratorio de bioquimica">Laboratório de Habilidades</Select.Option>
                <Select.Option value="Plenário">Plenário</Select.Option>
                <Select.Option value="Salão de atos">Salão de atos</Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Form.Item>
          <Button style={{marginLeft: "200px"}} type="primary" htmlType="submit">Aplicar Filtro</Button>
        </Form.Item>
      </Form>

      {/* Adicionando o componente de calendário abaixo do formulário */}
      <div style={{
          margin: '40px 100px',
          width: '90%'
        }}>
        <Calendar 
          fullscreen={false} 
          dateCellRender={dateCellRender} // Passando a função para renderizar células
        />
      </div>
    </div>
  );
}

export default Agenda;
