import React, { useEffect, useState } from 'react';
import { Table, Spin, Alert, Input, Checkbox, Card, Button, Form, notification, Collapse, Modal, Descriptions, Row, Col, Divider } from 'antd';
import { SearchOutlined, PlusCircleFilled, EditFilled, EyeFilled, DeleteFilled, CaretLeftFilled } from '@ant-design/icons';
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
  const [isAduanaChecked, setIsAduanaChecked] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tallas = await get();
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
      setIsAduanaChecked(talla.escv_EsAduana === 1);
    } else {
      form.resetFields();
      setIsAduanaChecked(false);
    }
  };

  const handleCollapseClose = () => {
    setActiveKey(null);
    setCurrentTalla(null);
    setShowTable(true);
  };

  const handleCheckboxChange = (e) => {
    setIsAduanaChecked(e.target.checked);
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const date = new Date().toISOString();
      const aduanaValue = isAduanaChecked ? true : false;

      if (currentTalla) {
        // Editar
        const updatedTalla = {
          ...currentTalla,
          ...values,
          escv_EsAduana: aduanaValue,
          escv_FechaModificacion: date,
          usua_UsuarioModificacion: 1
        };
        await editar(updatedTalla);
        notification.success({ message: 'Operacion realizada correctamente' });
      } else {
        // Nuevo
        const newTalla = {
          ...values,
          escv_EsAduana: aduanaValue,
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
      notification.error({ message: 'Operacion no realizada', description: error.message });
    }
  };

  const handleDelete = async (talla) => {
    Modal.confirm({
      title: '¿Estás seguro de eliminar este registro?',
      content: 'Esta acción no se puede deshacer',
      okText: 'Eliminar', // Cambio del texto del botón de confirmación
      cancelText: 'Cancelar', // Cambio del texto del botón de cancelar
      okType: 'danger',
      onOk: async () => {
        try {
          const values = await form.validateFields();
          const date = new Date().toISOString();
          const id = talla.escv_Id;
          const deleteTalla = {
            escv_Id: id,
            escv_FechaEliminacion: date,
            usua_UsuarioEliminacion: 1
          };

          const response = await eliminar(deleteTalla);

          if (response.code === 200) {
            notification.success({ message: 'Operacion realizada correctamente' });
          } else {
            notification.error({ message: 'Operacion no realizada' });
          }
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
      title: 'Codigo',
      dataIndex: 'escv_Id',
      key: 'escv_Id',
      align: 'center'
    },
    {
      title: 'Nombre',
      dataIndex: 'escv_Nombre',
      key: 'escv_Nombre',
      align: 'center',
    },
    {
      title: 'Acciones',
      key: 'actions',
      align: 'center',
      render: (text, record) => (
        <Row justify="center">
          <Button
            icon={<EditFilled />}
            onClick={() => handleCollapseOpen('edit', record)}
            style={{ marginRight: 8, backgroundColor: 'orange' }}
            type='primary'
          >
            Editar
          </Button>
          <Button
            icon={<EyeFilled />}
            onClick={() => handleCollapseOpen('details', record)}
            style={{ marginRight: 8, backgroundColor: 'darkgray' }}
            type='primary'
          >
            Detalles
          </Button>
          <Button
            icon={<DeleteFilled />}
            onClick={() => handleDelete(record)}
            danger
            type='primary'
          >
            Eliminar
          </Button>
        </Row>
      ),
    },
  ];

  const auditColumns = [
    {
      title: 'Acción',
      dataIndex: 'accion',
      key: 'accion',
      align: 'center',
    },
    {
      title: 'Usuario',
      dataIndex: 'usuario',
      key: 'usuario',
      align: 'center',
    },
    {
      title: 'Fecha',
      dataIndex: 'fecha',
      key: 'fecha',
      align: 'center',
    },
  ];

  const auditData = [
    {
      key: '1',
      accion: 'Creado',
      usuario: currentTalla?.usuarioCreacionNombre,
      fecha: currentTalla?.escv_FechaCreacion,
      align: 'center',
    },
    {
      key: '2',
      accion: 'Modificado',
      usuario: currentTalla?.usuarioModificacionNombre,
      fecha: currentTalla?.escv_FechaModificacion,
      align: 'center',
    },
  ];

  return (
    <Card>
      {showTable ? (
        <>
          <Flex alignItems="center" justifyContent="space-between" mobileFlex={false}>
            <div>
              <Button type="primary" icon={<PlusCircleFilled />} onClick={() => handleCollapseOpen('new')} block>Nuevo</Button>
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
                <Card title="" bordered={false}>
                  <Row gutter={16}>
                    <Col span={12}>
                      <h5>Codigo: </h5>
                    </Col>
                    <Col span={12}>
                      <h5>Nombre: </h5>
                    </Col>
                  </Row>
                  <Row gutter={16}>
                    <Col span={12}>
                      <Descriptions.Item label="ID"> {currentTalla.escv_Id}</Descriptions.Item>
                    </Col>
                    <Col span={12}>
                      <Descriptions.Item label="Nombre">{currentTalla.escv_Nombre}</Descriptions.Item>
                    </Col>
                  </Row>
                </Card>
                <Card title="Auditoría" bordered={false} style={{ marginTop: 16 }}>
                  <div className='table-borderead'>
                  <Table bordered className='justify-content-center' columns={auditColumns} dataSource={auditData} pagination={false} />
                  </div>
                
                </Card>
                <Button icon={<CaretLeftFilled />} type="primary" danger onClick={handleCollapseClose} style={{ marginLeft: 8 }}>Cancelar</Button>
              </>
            ) : (
              <Form form={form} layout="vertical" className="ant-advanced-search-form">
                <Row gutter={24}>
                  <Col span={12}>
                    <Form.Item name="escv_Nombre" label="Nombre" rules={[{ required: true, message: 'Por favor, ingrese el nombre' }]}>
                      <Input />
                    </Form.Item>
                  </Col>
                  {!currentTalla && (
                    <>
                      <Col span={6}>
                        <label>Aduana</label>
                      </Col>
                      <Col span={6}>
                        <Form.Item name="escv_EsAduana" label=" ">
                          <Checkbox checked={isAduanaChecked} onChange={handleCheckboxChange}></Checkbox>
                        </Form.Item>
                      </Col>
                    </>
                  )}
                </Row>
                <Divider />
                <Button icon={<PlusCircleFilled />} type="primary" onClick={handleSubmit}>Guardar</Button>
                <Button icon={<CaretLeftFilled />} type="primary" onClick={handleCollapseClose} style={{ marginLeft: 8 }} danger>Volver</Button>
              </Form>
            )}
          </Panel>
        </Collapse>
      )}
    </Card>
  );
};

export default Talla;
