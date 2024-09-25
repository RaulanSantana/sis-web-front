import React, { useState } from 'react';
import { Table, Button, Dropdown, Menu, Checkbox } from 'antd';
import Header from '../../../layouts/Header/Header';
import { Link } from 'react-router-dom';
import '../Reservas/Reservas.css';

const localOptions = [
  { label: 'A', value: 'A' },
  { label: 'B', value: 'B' },
  { label: 'C', value: 'C' },
  { label: 'D', value: 'D' },
  { label: 'E', value: 'E' },
  { label: 'F', value: 'F' },
  { label: 'G', value: 'G' },
  { label: 'H', value: 'H' },
];

function SoftwaresInstalados() {
  const [selectedLocal, setSelectedLocal] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const dataSource = [
    { key: '1', bloco: 'A', laboratorio: 'c310 ', software: 'Visual Code A', quantidade: 5 },
    { key: '2', bloco: 'A', laboratorio: 'c310 ', software: 'Anaconda B', quantidade: 3 },
    { key: '3', bloco: 'C', laboratorio: 'Lab 3', software: 'Software C', quantidade: 7 },
    { key: '4', bloco: 'D', laboratorio: 'Lab 4', software: 'Software D', quantidade: 2 },
    // Adicione mais itens conforme necessário para testar a paginação
  ];

  const filteredDataSource = dataSource.filter(item =>
    selectedLocal.length === 0 || selectedLocal.includes(item.bloco)
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
          <span style={{ marginRight: 8 }}>Bloco</span>
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
      dataIndex: 'bloco',
      key: 'bloco',
      width: 30,
      align: 'center',
    },
    {
      title: 'Laboratório',
      dataIndex: 'laboratorio',
      key: 'laboratorio',
      width: 40,
      align: 'center',
    },
    {
      title: 'Software',
      dataIndex: 'software',
      key: 'software',
      width: 40,
      align: 'center',
    },
    {
      title: 'Quantidade',
      dataIndex: 'quantidade',
      key: 'quantidade',
      width: 40,
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
                <Link to="/adicionarSoftware">
                <Button type="link">Editar</Button>
                </Link>
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
      <Header />
      <div className="reservas-title">
        <p>
          <Link to="/reservas">Reservas</Link> &gt; Softwares Instalados
        </p>
        <h1>
          <Link to="/reservas">&#8592; </Link> Software Instalados
        </h1>
        <div style={{display: 'flex'}}>
            <Link to="/adicionarSoftware">
        <Button type="primary" htmlType="submit" style={{ marginLeft:"800px" }}>Adicionar Software</Button>
        </Link>
        </div>
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

export default SoftwaresInstalados;
