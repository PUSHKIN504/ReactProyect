import React, { useEffect, useState } from 'react';
import { Table, Spin, Alert, Input, Card, Button, Form, notification, Collapse, Modal, Descriptions, Row, Col } from 'antd';
import { SearchOutlined, PlusCircleOutlined, EditOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import Flex from 'components/shared-components/Flex';
import utils from 'utils';
import { get, insertar, editar, eliminar } from 'services/EstadoCivilService';


const { Panel } = Collapse;

const Talla = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeKey, setActiveKey] = useState(null);
  const [showTable, setShowTable] = useState(true);
  const [form] = Form.useForm();
  const [currentTalla, setCurrentTalla] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tallas = await get();
        console.log('Datos recibidos de la API:', tallas); 
        if (Array.isArray(tallas)) {
          setData(tallas);
          setFilteredData(tallas);
        } else {
          throw new Error('Data format is incorrect');
        }
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSearch = (e) => {
    const value = e.currentTarget.value.toLowerCase();
    const filtered = utils.wildCardSearch(data, value);
    setFilteredData(filtered);
  };

  const handleCollapseOpen = (key, talla = null) => {
    setActiveKey(key);
    setCurrentTalla(talla);
    setShowTable(false);
    if (talla) {
      form.setFieldsValue(talla);
    } else {
      form.resetFields();
    }
  };

  const handleCollapseClose = () => {
    setActiveKey(null);
    setCurrentTalla(null);
    setShowTable(true);
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const date = new Date().toISOString();
      if (currentTalla) {
        // Editar
        const updatedTalla = {
          ...currentTalla,
          ...values,
          escv_FechaModificacion: date,
          usua_UsuarioModificacion: 1
        };
        await editar(updatedTalla);
        notification.success({ message: 'Operacion realizada correctamente' });
      } else {
        // Nuevo
        const newTalla = {
          ...values,
          escv_FechaCreacion: date,
          usua_UsuarioCreacion: 1,
        };
        await insertar(newTalla);
        notification.success({ message: 'Operacion realizada correctamente' });
      }


      const tallas = await get();
      if (Array.isArray(tallas)) {
        setData(tallas);
        setFilteredData(tallas);
      } else {
        throw new Error('Data format is incorrect');
      }
      handleCollapseClose();
    } catch (error) {
      notification.error({ message: 'Error al guardar la talla', description: error.message });
    }
  };

  const handleDelete = async (talla) => {
    Modal.confirm({
      title: '¿Estás seguro de eliminar este registro?',
      content: 'Esta acción no se puede deshacer',
      onOk: async () => {
        try {
            console.log("TALLLAAA: " + talla)
          await eliminar(talla);
          notification.success({ message: 'Operacion realizada correctamente' });
          const tallas = await get();
          if (Array.isArray(tallas)) {
            setData(tallas);
            setFilteredData(tallas);
          } else {
            throw new Error('Data format is incorrect');
          }
        } catch (error) {
          notification.error({ message: 'Operacion no realizada', description: error.message });
        }
      },
    });
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Spin tip="Cargando..." />
      </div>
    );
  }

  if (error) return <Alert message="Error" description={error.message} type="error" showIcon />;

  const columns = [
    {
      title: 'ID',
      dataIndex: 'escv_Id',
      key: 'escv_Id',
    },
    {
      title: 'Nombre',
      dataIndex: 'escv_Nombre',
      key: 'escv_Nombre',
    },
    {
        title: 'Acciones',
        key: 'actions',
        align: 'center',
        render: (text, record) => (
          <Row justify="center">
           
            <Button
              icon={<EditOutlined />}
              onClick={() => handleCollapseOpen('edit', record)}
              style={{ marginRight: 8 }}
            >
              Editar
            </Button>

            <Button
              icon={<EyeOutlined />}
              onClick={() => handleCollapseOpen('details', record)}
              style={{ marginRight: 8 }}
            >
              Detalles
            </Button>
            <Button
              icon={<DeleteOutlined />}
              onClick={() => handleDelete(record)}
              type="danger"
            >
              Eliminar
            </Button>
          </Row>
        ),
      },
  ];

  return (
    <Card>
      {showTable ? (
        <>
          <Flex alignItems="center" justifyContent="space-between" mobileFlex={false}>
            <div>
              <Button type="primary" icon={<PlusCircleOutlined />} onClick={() => handleCollapseOpen('new')} block>Nuevo</Button>
            </div>
            <Flex className="mb-1" mobileFlex={false}>
              <div className="mr-md-3 mb-3">
                <Input placeholder="Buscar" prefix={<SearchOutlined />} onChange={handleSearch} />
              </div>
            </Flex>
          </Flex>
          <div className="table-responsive">
            <Table 
              columns={columns} 
              dataSource={filteredData} 
              rowKey="escv_Id" 
            />
          </div>
        </>
      ) : (
        <Collapse activeKey={activeKey}>
        <Panel header={currentTalla ? (activeKey === 'details' ? 'Detalles ' : 'Editar Registro') : 'Nuevo Registro'} key={activeKey}>
          {activeKey === 'details' ? (
            <>
              <Card title="Información de Talla" bordered={false}>
                <Row gutter={16}>
                  <Col span={12}>
                    <Descriptions.Item label="ID">ID: {currentTalla.escv_Id}</Descriptions.Item>
                  </Col>
                  
                </Row>
                <Row gutter={16}>
                  <Col span={12}>
                    <Descriptions.Item label="Nombre">Nombre: {currentTalla.escv_Nombre}</Descriptions.Item>
                  </Col>
                </Row>
              </Card>
              <Card title="Auditoría" bordered={false} style={{ marginTop: 16 }}>
                <Row gutter={16}>
                  <Col span={12}>
                    <Descriptions.Item label="Usuario Creación">
                      Usuario Creación: {currentTalla.usuarioCreacionNombre}
                    </Descriptions.Item>
                  </Col>
                  <Col span={12}>
                    <Descriptions.Item label="Fecha Creación">
                      Fecha Creación: {currentTalla.escv_FechaCreacion}
                    </Descriptions.Item>
                  </Col>
                </Row>
                <Row gutter={16}>
                  <Col span={12}>
                    <Descriptions.Item label="Usuario Modificación">
                      Usuario Modificación: {currentTalla.usuarioModificacionNombre}
                    </Descriptions.Item>
                  </Col>
                  <Col span={12}>
                    <Descriptions.Item label="Fecha Modificación">
                      Fecha Modificación: {currentTalla.escv_FechaModificacion}
                    </Descriptions.Item>
                  </Col>
                </Row>
              </Card>
              <Button onClick={handleCollapseClose} style={{ marginLeft: 8 }}>Cancelar</Button>
            </>
          ) : (
            <Form form={form} layout="vertical">
              <Form.Item name="escv_Nombre" label="Nombre" rules={[{ required: true, message: 'Por favor, ingrese el nombre' }]}>
                <Input />
              </Form.Item>
              <Button type="primary" onClick={handleSubmit}>Guardar</Button>
              <Button onClick={handleCollapseClose} style={{ marginLeft: 8 }}>Cancelar</Button>
            </Form>
          )}
        </Panel>
      </Collapse>
      
      )}
    </Card>
  );
};

export default Talla;