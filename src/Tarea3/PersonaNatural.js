import React, { useEffect, useState } from 'react';
import { Table, Spin, Alert, Input, Button, Modal, Select, Form, notification, Collapse, Card, Descriptions, Row, Col, Divider, Steps } from 'antd';
import { SearchOutlined, PlusCircleFilled, EditFilled, EyeFilled, CaretLeftFilled } from '@ant-design/icons';
import { DeleteFilled } from '@ant-design/icons';
import Flex from 'components/shared-components/Flex';
import utils from 'utils';
import { get, insertar, editar, eliminar, getPerson, getCiudades, getProvincias } from 'services/PersonaNaturalService';
import { Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';

const { Search } = Input;
const { Panel } = Collapse;
const { Option } = Select;
const { Step } = Steps;

const { TextArea } = Input;

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
  const [getPersonas, setPerson] = useState([]);
  const [getprovincias, setProvincias] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [getciudades, setCiudades] = useState([]);
  const [selectedFileName, setSelectedFileName] = useState('Seleccione');
  const [selectedFileName2, setSelectedFileName2] = useState('Seleccione');
  const [selectedFileName3, setSelectedFileName3] = useState('Seleccione');
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
        const Provincias = await getProvincias();
        if (Array.isArray(Provincias)) {
          // Filtrar las provincias basadas en el pais_Id igual a 97
        const filteredProvincias = Provincias.filter(provincia => provincia.pais_Id === 97);
        setProvincias(filteredProvincias);
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

  useEffect(() => {
    const fetchCiudades = async () => {
      try {
        const Ciudades = await getCiudades();
        if (Array.isArray(Ciudades)) {
          setCiudades(Ciudades);
        } else {
          throw new Error('Data format is incorrect');
        }
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchCiudades();
  }, []);


  const handleSearch = (e) => {
    const value = e.currentTarget.value.toLowerCase();
    const filtered = utils.wildCardSearch(data, value);
    setFilteredData(filtered);
  };

  const handleCollapseOpen = (key, subCategoria = null) => {
    setActiveKey(key);
    setCurrentSubCategoria(subCategoria);
    setSelectedFileName('Seleccione');
    setSelectedFileName2('Seleccione');
    setSelectedFileName3('Seleccione');
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
      console.log("Valores del formulario:", values);
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
          pena_ArchivoRTN: selectedFileName,
          pena_ArchivoDNI: selectedFileName2,
          pena_ArchivoNumeroRecibo: selectedFileName3,

          pena_NombreArchRTN: selectedFileName, 
          pena_NombreArchDNI: selectedFileName2,
          pena_NombreArchRecibo: selectedFileName3,
          pena_FechaCreacion: date,
          usua_UsuarioCreacion: 1,
          
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

   const handleImageUpload = async ({ file }) => {
    const formData = new FormData();
    formData.append('file', file);
    setSelectedFileName(file.name); // Update the state with the selected file name
    try {
      const response = await axios.post('https://localhost:44380/api/PersonaNatural/Archivo', formData, {
        headers: {
          'XApiKey': '4b567cb1c6b24b51ab55248f8e66e5cc',
          'accept': '/',
        },
      });
      // setImageUrl(response.data.data.url);
      notification.success({ message: 'Imagen subida correctamente' });
    } catch (error) {
      notification.error({ message: 'Error al subir la imagen', description: 'Asegúrese que sea un Formato Valido' });
    }
  };

  const handleImageUpload2 = async ({ file }) => {
    const formData = new FormData();
    formData.append('file', file);
    setSelectedFileName2(file.name); // Update the state with the selected file name
    try {
      const response = await axios.post('https://localhost:44380/api/PersonaNatural/Archivo', formData, {
        headers: {
          'XApiKey': '4b567cb1c6b24b51ab55248f8e66e5cc',
          'accept': '/',
        },
      });
      // setImageUrl(response.data.data.url);
      notification.success({ message: 'Imagen subida correctamente' });
    } catch (error) {
      notification.error({ message: 'Error al subir la imagen', description: 'Asegúrese que sea un Formato Valido' });
    }
  };

  const handleImageUpload3 = async ({ file }) => {
    const formData = new FormData();
    formData.append('file', file);
    setSelectedFileName3(file.name); // Update the state with the selected file name
    try {
      const response = await axios.post('https://localhost:44380/api/PersonaNatural/Archivo', formData, {
        headers: {
          'XApiKey': '4b567cb1c6b24b51ab55248f8e66e5cc',
          'accept': '/',
        },
      });
      // setImageUrl(response.data.data.url);
      notification.success({ message: 'Imagen subida correctamente' });
    } catch (error) {
      notification.error({ message: 'Error al subir la imagen', description: 'Asegúrese que sea un Formato Valido' });
    }
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
              rowKey="pena_Id"
                 
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
              <Form form={form} layout="vertical" className="ant-advanced-search-form">
              <Row gutter={24}>
                <Col span={12}>
                  <Form.Item name="busqueda" label="Persona RTN">
                  <Search placeholder="Buscar..." onSearch={handleSearchByDNI} enterButton />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="pers_Id" label="Persona" rules={[{ required: true, message: 'Por favor, seleccione la persona' }]}>
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
                      {getPersonas.map((persona) => (
                        
                        <Option key={persona.pers_Id} value={persona.pers_Id}>
                          {persona.pers_Nombre}
                          
                        </Option>
                      ))}
                       
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12}>
                <Form.Item name="pena_RTN" label="RTN" rules={[{ required: true, message: 'Por favor, ingrese el RTN' }]}>
                  <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                <Form.Item name="pena_NombreArchRTN" label="Archivo RTN" rules={[{ required: true, message: 'Por favor, ingrese el archivo RTN' }]}>
                <Upload
                showUploadList={false}
                customRequest={handleImageUpload}
                >
                   <Button icon={<UploadOutlined />}>{selectedFileName}</Button>
                </Upload>
                  </Form.Item>
                </Col>
                <Col span={12}>
                <Form.Item name="pena_DNI" label="DNI" rules={[{ required: true, message: 'Por favor, ingrese el DNI' }]}>
                  <Input type='text'/>
                  </Form.Item>
                </Col>
                <Col span={12}>
                <Form.Item name="pena_NombreArchDNI" label="Archivo DNI" rules={[{ required: true, message: 'Por favor, ingrese el archivo DNI' }]}>
                <Upload
                showUploadList={false}
                customRequest={handleImageUpload2}
                >
                  <Button icon={<UploadOutlined />}>{selectedFileName2}</Button>
                </Upload>
                  </Form.Item>
                </Col>
            
      
                <Col span={12}>
                <Form.Item name="pena_NumeroRecibo" label="Numero Recibo" rules={[{ required: true, message: 'Por favor, ingrese el numero de recibo' }]}>
                  <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                <Form.Item name="pena_NombreArchRecibo" label="Archivo Num. Recibio" rules={[{ required: true, message: 'Por favor, ingrese el archivo DNI' }]}>
                <Upload
                showUploadList={false}
                customRequest={handleImageUpload3}
                >
                 <Button icon={<UploadOutlined />}>{selectedFileName3}</Button>
                </Upload>
                  </Form.Item>
                </Col>
              </Row>
      
                <Row gutter={24}>
                 <Col span={12}>
                  <Form.Item name="pvin_Id" label="Departamento">
                    <Select
                      showSearch
                      placeholder="Seleccione"
                      optionFilterProp="children"
                      onChange={(value) => 
                        form.setFieldsValue({ pvin_Id: value })
                      }
                      filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      {getprovincias.map((prov) => (
                        <Option key={prov.pvin_Id} value={prov.pvin_Id}>
                          {prov.pvin_Nombre}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name="ciud_Id" label="Municipio" rules={[{ required: true, message: 'Por favor, ingrese la ciudad' }]}>
                    <Select
                      showSearch
                      placeholder="Seleccione"
                      optionFilterProp="children"
                      onChange={(value) => 
                        form.setFieldsValue({ ciud_Id: value })
                      }
                      filterOption={(input, option) =>
                        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                      }
                    >
                      {getciudades.map((ciudad) => (
                        <Option key={ciudad.ciud_Id} value={ciudad.ciud_Id}>
                          {ciudad.ciud_Nombre}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={24}>
                <Form.Item name="pena_DireccionExacta" label="Direccion Exacta" rules={[{ required: true, message: 'Por favor, ingrese el archivo DNI' }]}>
                <TextArea rows={1}/>
                  </Form.Item>
                </Col>
                <Col span={12}>
                <Form.Item name="pena_TelefonoFijo" label="Telefono Fijo" rules={[{ required: true, message: 'Por favor, ingrese el telefono fijo' }]}>
                 <Input   defaultValue="+504 " />
          
                  </Form.Item>
                </Col>
                <Col span={12}>
                <Form.Item name="pena_TelefonoCelular" label="Telefono Celular" rules={[{ required: true, message: 'Por favor, ingrese el telefono celular' }]}>
                <Input   defaultValue="+504 " />
                  </Form.Item>
                </Col>
                <Col span={12}>
                 <Form.Item name="pena_CorreoElectronico" label="Correo Electronico" rules={[{ required: true, message: 'Por favor, ingrese el correo electronico' }]}>
           
                  <Input type='Email'/>
                  </Form.Item>
                </Col>
                <Col span={4}>
                </Col>
                <Col span={6}>
                  <Form.Item name="" label=" " >
                  <Button type="primary">
                  Enviar Verificacion
                  </Button> 
                  </Form.Item>
           
                </Col>
                <Col span={2}>
                </Col>
                <Col span={12}>
                 <Form.Item name="pena_CorreoAlternativo" label="Correo Alternativo">
                  <Input type='email'/>
                  </Form.Item>
                </Col>
                <Col span={4}>
                </Col>
                <Col span={6}>
                  <Form.Item name="" label=" " >
                  <Button type="primary">
                  Enviar Verificacion
                  </Button> 
                  </Form.Item>
           
                </Col>
                <Col span={12}>
                <Form.Item name="pena_DNI" label="DNI" rules={[{ required: true, message: 'Por favor, ingrese el DNI' }]}>
                  <Input type='text'/>
                  </Form.Item>
                </Col>
              </Row>
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
