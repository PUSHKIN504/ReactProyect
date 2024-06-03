import React, { useEffect, useState } from 'react';
import { Table, Spin, Alert, Input, Button, Modal, Select, Form, notification, Collapse, Card, Descriptions, Row, Col, Divider, Steps } from 'antd';
import { SearchOutlined, PlusCircleFilled, EditFilled, EyeFilled, CaretLeftFilled } from '@ant-design/icons';
import { DeleteFilled } from '@ant-design/icons';
import Flex from 'components/shared-components/Flex';
import utils from 'utils';
import { get, insertar, editar, eliminar, getPerson, getPais } from 'services/PersonaNaturalService';

const { Search } = Input;
const { Panel } = Collapse;
const { Option } = Select;
const { Step } = Steps;

const SubCategoria = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeKey, setActiveKey] = useState(null);
  const [showTable, setShowTable] = useState(true);
  const [form] = Form.useForm();
  const [currentSubCategoria, setCurrentSubCategoria] = useState(null);
  const [getPersonas, setPerson] = useState([]);
  const [getPaises, setPaises] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);

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
    const fetchPerson = async () => {
      try {
        const Person = await getPerson();
        if (Array.isArray(Person)) {
          setPerson(Person);
        } else {
          throw new Error('Data format is incorrect');
        }
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchPerson();
  }, []);

  useEffect(() => {
    const fetchPais = async () => {
      try {
        const Paises = await getPais();
        if (Array.isArray(Paises)) {
          setPaises(Paises);
        } else {
          throw new Error('Data format is incorrect');
        }
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchPais();
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
    setCurrentStep(0); // Reset the step when closing
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
      okText: 'Eliminar',
      cancelText: 'Cancelar',
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
            notification.success({ message: 'Operación realizada correctamente' });
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
          notification.error({ message: 'Operación no realizada', description: error.message });
        }
      },
    });
  };

  const handleSearchByDNI = (value) => {
    const person = getPersonas.find((p) => p.pers_RTN === value);
    if (person) {
      form.setFieldsValue({ pers_Id: person.pers_Id });
    } else {
      notification.error({ message: 'El RTN ingresado no es valido' });
    }
  };

  const next = () => {
    setCurrentStep(currentStep + 1);
  };

  const prev = () => {
    setCurrentStep(currentStep - 1);
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

  const steps = [
    {
      title: 'Paso 1',
      content: (
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item name="subc_Descripcion" label="PERSONA RTN" rules={[{ required: true, message: 'Por favor, ingrese el DNI' }]}>
              <Search placeholder="Buscar..." onSearch={handleSearchByDNI} enterButton />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="pers_Id" label="PERSONA" rules={[{ required: true, message: 'Por favor, seleccione la persona' }]}>
              <Select
                showSearch
                placeholder="Seleccione"
                optionFilterProp="children"
                onChange={(value) => form.setFieldsValue({ pers_Id: value })}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                {getPersonas.map((person) => (
                  <Option key={person.pers_Id} value={person.pers_Id}>
                    {person.pers_Nombre}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
        </Row>
      ),
    },
    {
      title: 'Paso 2',
      content: (
        <Row gutter={24}>
          <Col span={12}>
            <Form.Item name="pais_Id" label="PAIS" rules={[{ required: true, message: 'Por favor, seleccione el país' }]}>
              <Select
                showSearch
                placeholder="Seleccione"
                optionFilterProp="children"
                onChange={(value) => form.setFieldsValue({ pais_Id: value })}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                }
              >
                {getPaises.map((pais) => (
                  <Option key={pais.pais_Id} value={pais.pais_Id}>
                    {pais.pais_Nombre}
                  </Option>
                ))}
              </Select>
            </Form.Item>
          </Col>
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
                <Button icon={<CaretLeftFilled />} type="primary" danger onClick={handleCollapseClose} style={{ marginLeft: 8 }}>Volver</Button>
              </>
            ) : (
              <>
                <Steps current={currentStep}>
                  {steps.map(item => (
                    <Step key={item.title} title={item.title} />
                  ))}
                </Steps>
                <Form form={form} layout="vertical" className="ant-advanced-search-form" style={{ marginTop: 16 }}>
                  {steps[currentStep].content}
                  <div className="steps-action">
                    {currentStep < steps.length - 1 && (
                      <Button type="primary" onClick={() => next()}>
                        Siguiente
                      </Button>
                    )}
                    {currentStep === steps.length - 1 && (
                      <Button type="primary" onClick={handleSubmit}>
                        Guardar
                      </Button>
                    )}
                    {currentStep > 0 && (
                      <Button style={{ marginLeft: 8 }} onClick={() => prev()}>
                        Anterior
                      </Button>
                    )}
                    <Button icon={<CaretLeftFilled />} type="primary" onClick={handleCollapseClose} style={{ marginLeft: 8 }} danger>
                      Volver
                    </Button>
                  </div>
                </Form>
              </>
            )}
          </Panel>
        </Collapse>
      )}
    </Card>
  );
};

export default SubCategoria;
