import React, { useState } from 'react';
import { Table, Button, Dropdown, Menu, Checkbox } from 'antd';
import Header from '../../../layouts/Header/Header';
import { Link } from 'react-router-dom';
import '../Reservas/Reservas.css';

const localOptions = [
  { label: 'Salas', value: 'Sala' },
  { label: 'Laboratorios de Habilidades', value: 'Laboratorios de Habilidades' },
  { label: 'Laboratorio de Informatica', value: 'Laboratorio de Informatica' },
  { label: 'Auditorio',value: 'Auditorio'}
];



function AprovReservas() {
  const [selectedLocal, setSelectedLocal] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const dataSource = [
    {
      key: '1',
      local: 'Sala',
      status: 'Finalizado',
      disciplina: 'Disciplina 1',
      data_inicio: '2024-09-23',
      data_fim: '2024-09-23',
      localesc: 'c350'
    },
    {
      key: '2',
      local: 'Laboratorio de Habilidades',
      status: 'Ativo',
      disciplina: 'Disciplina 2',
      data_inicio: '2024-09-24',
      data_fim: '2024-09-24',
      localesc: 'Laboratorio de farmacologia'
    },
    {
      key: '3',
      local: 'Laboratorio de Informatica',
      status: 'Em analise',
      disciplina: 'Disciplina 3',
      data_inicio: '2024-09-25',
      data_fim: '2024-09-25',
      localesc: 'labc40',
      informacao: 'Roteador, Notebook' 
    },
    {
      key: '4',
      local: 'Auditorio',
      status: 'Reprovado',
      disciplina: 'Disciplina 4',
      data_inicio: '2024-09-25',
      data_fim: '2024-09-25',
      localesc: 'Salão nobre',
      informacao: 'Microfone, Caixa de som',
      observacao: 'Ter baterias reservas para o microfone'
    },
    // Adicione mais itens conforme necessário para testar a paginação
  ];

  const filteredDataSource = dataSource.filter(item =>
    (selectedLocal.length === 0 || selectedLocal.includes(item.local))
  );

  const totalItems = filteredDataSource.length;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredDataSource.slice(startIndex, startIndex + itemsPerPage);

  const handleLocalChange = (checkedValues) => {
    setSelectedLocal(checkedValues);
  };

 

  const clearLocalSelection = () => {
    setSelectedLocal([]);
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
      sorter: (a, b) => a.status.localeCompare(b.status),
    },
    {
      title: 'Lab / Sala / Auditorio',
      dataIndex: 'localesc',
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
      dataIndex: 'informacao',
      key: 'informacao',
      width: 60,
      align: 'center',
    },
    {
      title: 'Observação',
      dataIndex: 'observacao',
      key: 'observacao',
      width: 60,
      align: 'center',
    },
    {
      title: 'Data Inicial',
      dataIndex: 'data_inicio',
      key: 'data_inicio',
      width: 120,
      align: 'center',
      sorter: (a, b) => a.status.localeCompare(b.status),
    },
    {
      title: 'Data Final',
      dataIndex: 'data_fim',
      key: 'data_fim',
      width: 120,
      align: 'center',
      sorter: (a, b) => a.status.localeCompare(b.status),
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
                <Button type="link">Deferir</Button>
              </Menu.Item>
              <Menu.Item key="delete">
                <Button type="link" danger>Indeferir</Button>
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
      <Header />
      <div className="reservas-title">
        <p>
          <Link to="/reservas">Reservas</Link> &gt; Aprovação de reservas
        </p>
        <h1>
          <Link to="/reservas">&#8592; </Link> Aprovação de reservas
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

export default AprovReservas;
