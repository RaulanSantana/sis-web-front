import React from 'react';
import { Form, Input, Select, Button, message, Row, Col } from 'antd';
import Header from '../../../layouts/Header/Header';
import { Link } from 'react-router-dom';
import '../Reservas/Reservas.css';
import formAlert from '../../../assets/images/form-alert.png'
;
function Reserva_a() {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log('Valores enviados:', values);
    message.success('Reserva realizada com sucesso!');
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Falha no envio:', errorInfo);
  };

  return (
    <div>
    <Header />
    <div className="reservas-title">
    <p>
  <Link to="/reservas">Reservas</Link> &gt; Reserva de Sala de Aula, Auditórios, Plenário, Salão de Atos 
</p>
<h1> <Link to="/reservas" >&#8592; </Link> Reserva Laboratório Habilidades</h1>
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
              label="Disciplina" 
              name="disciplina"
              rules={[{ required: true, message: <span>
                Campo obrigatório <img src={formAlert} alt="Alerta" style={{ width: 10, marginLeft: 2 }} />
              </span>}]}
            >
              <Input placeholder='Digite a disciplina' />
            </Form.Item>
            <Form.Item 
              label="Tipo de Reserva" 
              name="tipoReserva" 
              rules={[{ required: true, message: <span>
                Campo obrigatório <img src={formAlert} alt="Alerta" style={{ width: 10, marginLeft: 2 }} />
              </span>}]}
            >
              <Select placeholder="Selecione o tipo de reserva">
                <Select.Option value="sala_de_aula">Sala de aula</Select.Option>
                <Select.Option value="auditorios">Auditórios</Select.Option>
                <Select.Option value="plenario">Plenário</Select.Option>
                <Select.Option value="salao_de_atos">Salão de atos</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="Equipamentos">
              <Select mode="multiple" placeholder="Selecione os equipamentos">
                <Select.Option value="polycom">Polycom</Select.Option>
                <Select.Option value="caixa_de_som">Caixa de som</Select.Option>
                <Select.Option value="projetor">Projetor</Select.Option>
                <Select.Option value="tv">TV</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item label="Observação">
              <Input.TextArea rows={4} />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">Realizar Reserva</Button>
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item 
              label="Data" 
              name="data"
              rules={[{ required: true, message: <span>
                Campo obrigatório <img src={formAlert} alt="Alerta" style={{ width: 10, marginLeft: 2 }} />
              </span>}]}
            >
              <Input type="date" />
            </Form.Item>
            <Form.Item 
              label="Turno"
              name="turno" 
              rules={[{ required: true, message: <span>
                Campo obrigatório <img src={formAlert} alt="Alerta" style={{ width: 10, marginLeft: 2 }} />
              </span>}]}
            >
              <Select placeholder="Selecione o turno"> 
                <Select.Option value="manhã">Manhã</Select.Option>
                <Select.Option value="tarde">Tarde</Select.Option>
                <Select.Option value="noite">Noite</Select.Option>
              </Select>
            </Form.Item>
            <div className="horario-container">
              <Form.Item 
                label="Horário Início" 
                className="horario-item"
                name="horarioInicio" 
                rules={[{ required: true, message: <span>
                  Campo obrigatório <img src={formAlert} alt="Alerta" style={{ width: 10, marginLeft: 2 }} />
                </span>}]}
              >
                <Input type="time" />
              </Form.Item>
              <Form.Item 
                label="Horário Fim" 
                className="horario-item"
                name="horarioFim" 
                rules={[{ required: true, message: <span>
                  Campo obrigatório <img src={formAlert} alt="Alerta" style={{ width: 10, marginLeft: 2 }} />
                </span>}]}
              >
                <Input type="time" />
              </Form.Item>
            </div>
          
            <Form.Item label="Realizar a reserva até o final do semestre para todo o dia da semana selecionado ?" name="validadeReserva">
              <Select placeholder="Selecione o dia da semana">
                <Select.Option value="segunda">Segunda</Select.Option>
                <Select.Option value="terca">Terça</Select.Option>
                <Select.Option value="quarta">Quarta</Select.Option>
                <Select.Option value="quinta">Quinta</Select.Option>
                <Select.Option value="sexta">Sexta</Select.Option>
                <Select.Option value="sabado">Sábado</Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default Reserva_a;
