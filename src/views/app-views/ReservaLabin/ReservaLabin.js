import React, { useState, useEffect } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import { Form, Input, Select, Button, message, Row, Col, Card } from 'antd';
import Header from '../../../layouts/Header/Header';
import { Link } from 'react-router-dom';
import { InfoCircleOutlined } from '@ant-design/icons';
import '../Reservas/Reservas.css';
import formAlert from '../../../assets/images/form-alert.png';
import SlideMenu from '../../../layouts/Slidemenu/Slidemenu';
import axios from 'axios';
import moment from 'moment';

const ReservaLabin = () => {
  const navigate = useNavigate();
  const { id } = useParams();  // Aqui pegamos o valor do parâmetro id da URL
  const [horariosDisponiveis, setHorariosDisponiveis] = useState([]);
  const [showCard, setShowCard] = useState(false); 
  const [showSoftwareInfo, setShowSoftwareInfo] = useState(false); // Novo estado
  const [form] = Form.useForm();  // Inicializando o hook useForm
  const [isEdit, setIsEdit] = useState(false); // Novo estado para identificar se é edição ou criação



  useEffect(() => {
    if (id) {
      setIsEdit(true); // Se o id estiver presente, estamos editando
      axios.put(http://localhost:8080/reservas-labinfo/editar/${id})
        .then(response => {
       
          form.setFieldsValue({
            disciplina: response.data.disciplina,
            data: moment(response.data.data).format('YYYY-MM-DD'),
            turno: response.data.turno,
            software: response.data.software ? response.data.software.split(', ') : [],
            equipamentos: response.data.equipamentos ? response.data.equipamentos.split(', ') : [],
            hora_inicio: response.data.hora_inicio,
            hora_fim: response.data.hora_fim,
            observacao: response.data.observacao,
            reserva_dia: response.data.reserva_dia,
          });
  
          // Configura horários disponíveis dependendo do turno
          handleTurno(response.data.turno);
        })
        .catch(error => console.error('Erro ao carregar os dados:', error));
    }
  }, [id]);  // O efeito só será executado novamente quando o id mudar
  

  const onFinish = async (values) => {
    try {
      const formattedValues = {
        disciplina: values.disciplina,
        data: values.data,
        turno: values.turno,
        software: values.software ? values.software.join(', ') : null,
        equipamentos: values.equipamentos ? values.equipamentos.join(', ') : null,
        hora_inicio: values.hora_inicio, 
        hora_fim: values.hora_fim,       
        observacao: values.observacao,
        reserva_dia: values.reserva_dia,
        id_usuario: localStorage.getItem('userId'),
      };

      let response;
      if (isEdit) {
        // Se for edição, use PUT
        response = await axios.put(http://localhost:8080/reservas-labinfo/editar/${id}, formattedValues);
        message.success('Reserva editada com sucesso!');
        navigate('/minhas_reservas');
      } else {
        // Se for criação, use POST
        response = await axios.post('http://localhost:8080/reservas-labinfo/criar', formattedValues);
        message.success('Reserva realizada com sucesso!');
      }
      
      console.log('Resposta da API:', response.data);
      form.resetFields();
    } catch (error) {
      console.error('Erro ao realizar a reserva:', error.response ? error.response.data : error);
      message.error('Erro ao realizar a reserva. Tente novamente.');
    }
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Falha no envio:', errorInfo);
  };

  const handleTurno = (turno) => {
    let horarios = {
      'manhã': ['08:00', '09:00', '10:00', '11:00','12:00'],
      'tarde': ['13:00', '14:00', '15:00', '16:00', '17:00'],
      'noite': ['19:00', '20:00', '21:00', '22:00'],
    };

    setHorariosDisponiveis(horarios[turno] || []);

    if (horarios[turno]) {
      form.setFieldsValue({
        hora_inicio: horarios[turno][0],
        hora_fim: horarios[turno][horarios[turno].length - 1],
      });
    } else {
      form.resetFields(['hora_inicio', 'hora_fim']);
    }
  };

  const handleInfoClick = () => {
    setShowCard(!showCard); // Alterna a exibição do card de reservas
  };

  const handleSoftwareInfoClick = () => {
    setShowSoftwareInfo(!showSoftwareInfo); // Alterna a exibição do card de software
  };

  return (
    <div>
      <Header />

      <div className="reservas-title">
        <p>
          <Link to="/reservas">Reservas</Link> &gt; Reserva de Laboratórios de Informática
        </p>
        <h1>
          <Link to="/reservas">&#8592; </Link> Reserva de Laboratórios de Informática
          <InfoCircleOutlined 
            style={{ marginLeft: 10, fontSize: '20px', cursor: 'pointer' }} 
            onClick={handleInfoClick} 
          />
        </h1>
      </div>

      {showCard && (
        <Card className="info-card" style={{ zIndex: "1001", position: 'absolute', top: '60px', right: '150px', width: 300 }}>
          <p>Laboratórios de informática só podem ser reservados no mínimo 7 dias de antecedência.</p>
          <Button type="primary" onClick={handleInfoClick}>Fechar</Button>
        </Card> 
      )}

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
                Campo obrigatório <img src={formAlert} 
                alt="Alerta" style={{ width: 10, marginLeft: 2 }} />
              </span>}]}
            >
              <Input placeholder='Digite a disciplina' />
            </Form.Item>
            <Form.Item 
  label="Software" 
  name="software"
>
  <Select
    mode="tags"
    placeholder="Selecione o Software"
    allowClear
    style={{ flex: 1 }}
  >
    <Select.Option value="visualcode">Visual Studio Code</Select.Option>
    <Select.Option value="anaconda">Anaconda</Select.Option>
    <Select.Option value="3dstudio">3D Studio Max</Select.Option>
    <Select.Option value="autocad">Auto CAD</Select.Option>
    <Select.Option value="revit">Revit</Select.Option>
    <Select.Option value="scateup">Scate UP</Select.Option>
  </Select>
</Form.Item>

              {showSoftwareInfo && (
                <Card className="info-card" style={{ marginTop: 10 }}>
                  <p>Software é um conjunto de instruções que permitem que um computador realize tarefas específicas. Inclui aplicativos, sistemas operacionais e ferramentas de desenvolvimento.</p>
                  <Button type="primary" onClick={handleSoftwareInfoClick}>Fechar</Button>
                </Card>
              )}
           
            <Form.Item 
            label="Equipamentos a ser utilizados na aula"
            name ="equipamentos">
              <Select mode="multiple" placeholder="Selecione os equipamentos">
                <Select.Option value="roteador">Roteador TP-Link</Select.Option>
                <Select.Option value="caixa_de_som">Caixa de som</Select.Option>
                <Select.Option value="polycom">Polycom</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item 
            label="Observação"
            name="observacao">
              <Input.TextArea rows={4} />
            </Form.Item>
            <Form.Item>

            <Button type="primary" htmlType="submit">
            {isEdit ? "Salvar" : "Realizar Reserva"}
            <Link to={'/minhas_reservas'}> </Link>
          </Button>


          <Link to={'/minhas_reservas'}> </Link>

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
              rules={[{ required: true, message: 'Campo obrigatório' }]}
            >
              <Select placeholder="Selecione o turno" onChange={handleTurno}> 
                <Select.Option value="manhã">Manhã</Select.Option>
                <Select.Option value="tarde">Tarde</Select.Option>
                <Select.Option value="noite">Noite</Select.Option>
              </Select>
              </Form.Item>
            <div className="horario-container">
              <Form.Item 
                label="Horário Início" 
                className="horario-item"
                name="hora_inicio" 
                rules={[{ required: true, message: 'Campo obrigatório' }]}
              >
                <Select placeholder="Selecione o horário de início">
                  {horariosDisponiveis.map(horario => (
                    <Select.Option key={horario} value={horario}>
                      {horario}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item 
                label="Horário Fim" 
                className="horario-item"
                name="hora_fim" 
                rules={[{ required: true, message: 'Campo obrigatório' }]}
              >
                <Select placeholder="Selecione o horário de fim">
                  {horariosDisponiveis.map(horario => (
                    <Select.Option key={horario} value={horario}>
                      {horario}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </div>
          
            <Form.Item label="Realizar a reserva até o final do semestre para todo o dia da semana selecionado ?" name="reserva_dia">
              <Select placeholder="Selecione o dia da semana">
                <Select.Option value="segunda">Segunda</Select.Option>
                <Select.Option value="terca">Terça</Select.Option>
                <Select.Option value="quarta">Quarta</Select.Option>
                <Select.Option value="quinta">Quinta</Select.Option>
                <Select.Option value="sexta">Sexta</Select.Option>
                <Select.Option value="sabado">Sábado</Select.Option>
                <Select.Option value="domingo">Domingo</Select.Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <SlideMenu/>
    </div>
  );
};

export default ReservaLabin;
