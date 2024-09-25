import React from 'react';
import { Form, Select, Input, Button, message, Row, Col } from 'antd';
import Header from '../../../layouts/Header/Header';
import { Link } from 'react-router-dom';

function AdicionarSoftware() {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log('Valores enviados:', values);
    message.success('Software adicionado com sucesso!');
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Falha no envio:', errorInfo);
  };

  return (
    <div>
      <Header />
      <div className="reservas-title">
        <p>
          <Link to="/reservas">Reservas</Link> &gt; <Link to="/softwares_instalados">Softwares Instalados</Link> &gt; <span>Adicionar Software</span>
        </p>
        <h1><Link to="/softwares_instalados">&#8592; </Link>Adicionar Software</h1>
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
              label="Bloco" 
              name="bloco"
              rules={[{ required: true, message: 'Campo obrigatório' }]}
            >
              <Select placeholder="Selecione o bloco">
                <Select.Option value="A">A</Select.Option>
                <Select.Option value="B">B</Select.Option>
                <Select.Option value="C">C</Select.Option>
                <Select.Option value="D">D</Select.Option>
                <Select.Option value="E">E</Select.Option>
                <Select.Option value="F">F</Select.Option>
                <Select.Option value="G">G</Select.Option>
              </Select>
            </Form.Item>
            
            <Form.Item 
              label="Laboratório" 
              name="laboratorio"
              showSearch
              rules={[{ required: true, message: 'Campo obrigatório' }]}
            >
              <Select 
              placeholder="Selecione o laboratório"
              
              >
                <Select.Option value="c20">c20</Select.Option>
              
              </Select>
            </Form.Item>
           

            <Form.Item>
              <Button type="primary" htmlType="submit">Adicionar</Button>
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
          <Form.Item 
              label="Software" 
              name="software" 
              rules={[{ required: true, message: 'Campo obrigatório' }]}
            >
              <Select placeholder="Selecione o software" style={{ width: 'calc(100% - 100px)' }}>
                <Select.Option value="laboratorio_quimica">VS Code</Select.Option>
                {/* Adicione mais opções de software aqui */}
              </Select>
            </Form.Item>

            <Form.Item
              label="Quantidade"
              name="quantidade"
              rules={[{ required: true, message: 'Campo obrigatório' }]}
            >
              <Input type="number" placeholder="Quantidade" style={{ width: '90px' }} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default AdicionarSoftware;
