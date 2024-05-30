import React, { useEffect, useState } from 'react';
import { Table, Spin, Alert, Input, Button,Modal, Select ,Form, notification, Collapse, Card, Descriptions, Row, Col, Divider, Popconfirm } from 'antd';
import { SearchOutlined, PlusCircleFilled, EditFilled, EyeFilled, CaretLeftFilled } from '@ant-design/icons';
import { DeleteOutlined,DeleteFilled } from '@ant-design/icons'; // Agregar importación aquí
import Flex from 'components/shared-components/Flex';
import utils from 'utils';
import { get, insertar, editar, eliminar, getcat } from 'services/SubCategoriaService';

const { Panel } = Collapse;
const { Option } = Select;

function onChange(value) {
    console.log(`selected ${value}`);
  }
  
  function onBlur() {
    console.log('blur');
  }
  
  function onFocus() {
    console.log('focus');
  }
  
  function onSearch(val) {
    console.log('search:', val);
  }
  

  
const SubCategoria = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeKey, setActiveKey] = useState(null);
  const [showTable, setShowTable] = useState(true);
  const [form] = Form.useForm();
  const [currentSubCategoria, setCurrentSubCategoria] = useState(null);
  const [getCategoria, setCategoria] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const subCategorias = await get();
        if (Array.isArray(subCategorias)) {
          setData(subCategorias);
          setFilteredData(subCategorias);
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

  useEffect(() => {
    const fetchCategoria = async () => {
      try {
        const Categorias = await getcat();
        if (Array.isArray(Categorias)) {
            setCategoria(Categorias);
        } else {
          throw new Error('Data format is incorrect');
        }
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchCategoria();
  }, []);

  const handleSearch = (e) => {
    const value = e.currentTarget.value.toLowerCase();
    const filtered = utils.wildCardSearch(data, value);
    setFilteredData(filtered);
  };

  const handleCollapseOpen = (key, subCategoria = null) => {
    setActiveKey(key);
    setCurrentSubCategoria(subCategoria);
    setShowTable(false);
    if (subCategoria) {
      form.setFieldsValue(subCategoria);
    } else {
      form.resetFields();
    }
  };

  const handleCollapseClose = () => {
    setActiveKey(null);
    setCurrentSubCategoria(null);
    setShowTable(true);
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const date = new Date().toISOString();

      if (currentSubCategoria) {
        // Editar
        const updatedSubCategoria = {
          ...currentSubCategoria,
          ...values,
          subc_FechaModificacion: date,
          usua_UsuarioModificacion: 1
        };
        await editar(updatedSubCategoria);
        notification.success({ message: 'Operación realizada correctamente' });
      } else {
        // Nuevo
        const newSubCategoria = {
          ...values,
          subc_FechaCreacion: date,
          usua_UsuarioCreacion: 1,
          subc_Estado: true
        };
        await insertar(newSubCategoria);
        notification.success({ message: 'Operación realizada correctamente' });
      }

      const subCategorias = await get();
      if (Array.isArray(subCategorias)) {
        setData(subCategorias);
        setFilteredData(subCategorias);
      } else {
        throw new Error('Data format is incorrect');
      }
      handleCollapseClose();
    } catch (error) {
      notification.error({ message: 'Operación no realizada', description: error.message });
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
          const date = new Date().toISOString();
          const id = talla.subc_Id;
          const deleteTalla = {
            subc_Id: id,
            subc_FechaEliminacion: date,
              usua_UsuarioEliminacion: 1
        };

          const response = await eliminar(deleteTalla);

          if (response.code === 200) {
            notification.success({ message: 'Operacion realizada correctamente' });
          } else {
            notification.error({ message: 'No se puede eliminar este registro' });
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
      title: 'Código',
      dataIndex: 'subc_Id',
      key: 'subc_Id',
      align: 'center'
    },
    {
      title: 'Descripción',
      dataIndex: 'subc_Descripcion',
      key: 'subc_Descripcion',
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
            style={{ marginRight:8, backgroundColor: 'orange' }}
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
      usuario: currentSubCategoria?.usuarioCreacionNombre,
      fecha: currentSubCategoria?.subc_FechaCreacion,
      align: 'center',
    },
    {
      key: '2',
      accion: 'Modificado',
      usuario: currentSubCategoria?.usuarioModificaNombre,
      fecha: currentSubCategoria?.subc_FechaModificacion,
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
              rowKey="subc_Id"
              expandable={{
                expandedRowRender: record => <p>Categoría: {record.cate_Descripcion}</p>,
                rowExpandable: record => record.cate_Id !== null,
              }}
            />
          </div>
        </>
      ) : (
        <Collapse activeKey={activeKey}>
          <Panel header={currentSubCategoria ? (activeKey === 'details' ? 'Detalles ' : 'Editar Registro') : 'Nuevo Registro'} key={activeKey}>
            {activeKey === 'details' ? (
              <>
                <Card title="" bordered={false}>
                  <Row gutter={16}>
                    <Col span={12}>
                      <h5>Código: </h5>
                    </Col>
                    <Col span={12}>
                      <h5>Categoría: </h5>
                    </Col>
                    
                  </Row>
                
                  <Row gutter={16}>
                    <Col span={12}>
                      <Descriptions.Item label="ID"> {currentSubCategoria.subc_Id}</Descriptions.Item>
                    </Col>
                    <Col span={12}>
                      <Descriptions.Item label="ID"> {currentSubCategoria.cate_Descripcion}</Descriptions.Item>
                    </Col>
                  </Row>
                  <Divider></Divider>
                  <Row gutter={16}>
                 
                    <Col span={12}>
                      <h5>Descripción: </h5>
                    </Col>
                  </Row>

                  <Row gutter={16}>
                  <Col span={12}>
                      <Descriptions.Item label="Categoría">{currentSubCategoria.subc_Descripcion}</Descriptions.Item>
                    </Col>
                  </Row>
                </Card>
                <Card title="Auditoría" bordered={false} style={{ marginTop: 16 }}>
                  <div className='table-bordered'>
                    <Table bordered className='justify-content-center' columns={auditColumns} dataSource={auditData} pagination={false} />
                  </div>
                </Card>
                <Button icon={<CaretLeftFilled />} type="primary" danger onClick={handleCollapseClose} style={{ marginLeft: 8 }}>Cancelar</Button>
              </>
            ) : (
              <Form form={form} layout="vertical" className="ant-advanced-search-form">
                <Row gutter={24}>
                  <Col span={12}>
                    <Form.Item name="cate_Id" label="Categoría" rules={[{ required: true, message: 'Por favor, ingrese el ID de la categoría' }]}>
                    <Select
                            showSearch
                            placeholder="Seleccione"
                            optionFilterProp="children"
                            onChange={onChange}
                            onFocus={onFocus}
                            onBlur={onBlur}
                            onSearch={onSearch}
                            filterOption={(input, option) =>
                            option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                        >
                            {getCategoria.map((categoria) => (
                            <Option key={categoria.cate_Id} value={categoria.cate_Id}>
                                {categoria.cate_Descripcion}
                            </Option>
                            ))}
                        </Select>
                    </Form.Item>
                  </Col>
                  <Col span={12}>
                    <Form.Item name="subc_Descripcion" label="Descripción" rules={[{ required: true, message: 'Por favor, ingrese la descripción' }]}>
                      <Input />
                    </Form.Item>
                  </Col>
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

export default SubCategoria;

 
