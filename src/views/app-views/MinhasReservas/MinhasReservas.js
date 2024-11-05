import React, { useState, useEffect } from 'react';
import { Table, Button, Dropdown, Menu, Checkbox } from 'antd';
import Header from '../../../layouts/Header/Header';
import { Link } from 'react-router-dom';
import '../Reservas/Reservas.css';
import SlideMenu from '../../../layouts/Slidemenu/Slidemenu';
import axios from 'axios';

const localOptions = [
  { label: 'Laboratorios de Habilidades', value: 'Laboratorios de Habilidades' },
  { label: 'Laboratorio de Informatica', value: 'Laboratorio de Informatica' },
  { label: 'Salas e Auditorio', value: 'Salas e Auditorio' }
];

const statusOptions = [
  { label: 'Ativo', value: 'Ativo' },
  { label: 'Em analise', value: 'Em analise' },
];

function MinhasReservas() {
  const [selectedLocal, setSelectedLocal] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [dataSource, setDataSource] = useState([]);
  const userId = localStorage.getItem('userId');
  console.log(userId)

  useEffect(() => {
    const fetchReservas = async () => {
      try {
        const response = await axios.get('http://localhost:8080/reservas-gerais/listar', {
          params: { userId: userId } // Substitua `seuUserId` pelo ID real do usuário
        });
        
        setDataSource(response.data);
        console.log(response.data);
      } catch (error) {
        console.error('Erro ao buscar reservas:', error);
      }
    };

    fetchReservas();
  }, []);

  const filteredDataSource = dataSource.filter(item =>
    (selectedLocal.length === 0 || selectedLocal.includes(item.local)) &&
    (selectedStatus.length === 0 || selectedStatus.includes(item.status))
  );

  const totalItems = filteredDataSource.length;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredDataSource.slice(startIndex, startIndex + itemsPerPage);

  const handleLocalChange = (checkedValues) => {
    setSelectedLocal(checkedValues);
  };

  const handleStatusChange = (checkedValues) => {
    setSelectedStatus(checkedValues);
  };

  const clearLocalSelection = () => {
    setSelectedLocal([]);
  };

  const clearStatusSelection = () => {
    setSelectedStatus([]);
  };

  const handleChangePage = (page) => {
    setCurrentPage(page);
  };

  const columns = [
    {
      title: (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ marginRight: 8 }}>Local</span>
          <Dropdown
            overlay={
              <Menu>
                {localOptions.map(option => (
                  <Menu.Item key={option.value}>
                    <Checkbox
                      checked={selectedLocal.includes(option.value)}
                      onChange={(e) => {
                        const newSelectedLocal = e.target.checked
                          ? [...selectedLocal, option.value]
                          : selectedLocal.filter(value => value !== option.value);
                        handleLocalChange(newSelectedLocal);
                      }}
                    >
                      {option.label}
                    </Checkbox>
                  </Menu.Item>
                ))}
                <Menu.Item key="clear">
                  <Button type="link" onClick={clearLocalSelection} style={{ padding: 0 }}>
                    Limpar Seleção
                  </Button>
                </Menu.Item>
              </Menu>
            }
            placement="bottomRight"
            trigger={['click']}
          >
            <Button type="link">▼</Button>
          </Dropdown>
        </div>
      ),
      dataIndex: 'local',
      key: 'local',
      width: 186,
      align: 'center',
      render: (text, record) => {
        // Verifica de qual tabela a reserva veio e renderiza o texto correspondente
        if (record.nome_tabela === 'reserva_labinfo') {
          return record.id; 
        } else if (record.nome_tabela === 'reserva_sala') {
          return record.tipo_reserva; 
        }else if (record.nome_tabela === 'reserva_labhab') {
          return record.laboratorio; 
        }
        
        return null; // Retorna null se não houver correspondência
      },
      sorter: (a, b) => (a.local || '').localeCompare(b.local || ''), // Use um valor padrão
    },
    {
      title: (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ marginRight: 8 }}>Status</span>
          <Dropdown
            overlay={
              <Menu>
                {statusOptions.map(option => (
                  <Menu.Item key={option.value}>
                    <Checkbox
                      checked={selectedStatus.includes(option.value)}
                      onChange={(e) => {
                        const newSelectedStatus = e.target.checked
                          ? [...selectedStatus, option.value]
                          : selectedStatus.filter(value => value !== option.value);
                        handleStatusChange(newSelectedStatus);
                      }}
                    >
                      {option.label}
                    </Checkbox>
                  </Menu.Item>
                ))}
                <Menu.Item key="clear">
                  <Button type="link" onClick={clearStatusSelection} style={{ padding: 0 }}>
                    Limpar Seleção
                  </Button>
                </Menu.Item>
              </Menu>
            }
            placement="bottomRight"
            trigger={['click']}
          >
            <Button type="link">▼</Button>
          </Dropdown>
        </div>
      ),
      dataIndex: 'status',
      key: 'status',
      width: 60,
      align: 'center',
      sorter: (a, b) => (a.status || '').localeCompare(b.status || ''), // Use um valor padrão
    },

    {
      title: 'Local disponibilizado',
      dataIndex: 'local',
      key: 'localesc',
      width: 100,
      align: 'center',
      
    },
    {
      title: 'Disciplina',
      dataIndex: 'disciplina',
      key: 'disciplina',
      width: 60,
      align: 'center',
    },
    {
      title: 'Informação',
      dataIndex: 'informacao', // Pode ser 'software' ou 'equipamentos'
      key: 'informacao',
      width: 60,
      align: 'center',
      render: (text, record) => {
        // Verifica de qual tabela a reserva veio e renderiza o texto correspondente
        if (record.nome_tabela === 'reserva_labinfo') {
          return record.software; // Exibe 'software' para reservas de labinfo
        } else if (record.nome_tabela === 'reserva_sala') {
          return record.equipamentos; // Exibe 'equipamentos' para reservas de sala
        }
        return null; // Retorna null se não houver correspondência
      },
    },
    {
      title: 'Data Inicial',
      dataIndex: 'data',
      key: 'data_inicio',
      width: 120,
      align: 'center',
    },
    {
      title: 'Data Final',
      dataIndex: 'data',
      key: 'data_fim',
      width: 120,
      align: 'center',
    },
    {
      title: 'Hora Inicial',
      dataIndex: 'hora_inicio',
      key: 'hora_inicio',
      width: 102,
      align: 'center',
    },
    {
      title: 'Hora Final',
      dataIndex: 'hora_fim',
      key: 'hora_fim',
      width: 102,
      align: 'center',
    },
    {
      title: 'Opções',
      key: 'opcoes',
      render: (_, record) => (
        <Dropdown 
          overlay={
            <Menu>
              <Menu.Item key="edit">
                <Button type="link">Editar</Button>
              </Menu.Item>
              <Menu.Item key="delete">
                <Button type="link" danger>Excluir</Button>
              </Menu.Item>
            </Menu>
          }
          placement="bottomRight" 
        >
          <Button type="link">...</Button>
        </Dropdown>
      ),
      width: 40,
      align: 'center',
    },
  ];

  return (
    <div>
      <SlideMenu />
      <Header />
      <div className="reservas-title">
        <p>
          <Link to="/reservas">Reservas</Link> &gt; Minhas Reservas
        </p>
        <h1>
          <Link to="/reservas">&#8592; </Link> Minhas Reservas
        </h1>
      </div>

      <Table 
        dataSource={paginatedData} 
        columns={columns} 
        pagination={{
          current: currentPage,
          pageSize: itemsPerPage,
          total: totalItems,
          onChange: handleChangePage,
        }} 
        style={{ 
          margin: '40px 100px', 
          width: '90%' 
        }}
        bordered
      />
    </div>
  );
}

export default MinhasReservas;
