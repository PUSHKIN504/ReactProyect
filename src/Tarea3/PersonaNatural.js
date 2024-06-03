import React from 'react';
import { Form, Input, DatePicker, Select, Button, Tabs, Row, Col, Checkbox,Table } from 'antd';
import  { useState } from 'react';
import { useNavigate  } from 'react-router-dom';
import axios from 'axios';
import { SearchOutlined } from '@ant-design/icons';
import { useForm, Controller } from 'react-hook-form';



const API_URL = 'https://localhost:44380/api/SubCategoria';
const API_KEY = '4b567cb1c6b24b51ab55248f8e66e5cc';
const axiosInstance = axios.create({
  headers: {
    'XApiKey': API_KEY,
    'accept': '/',
  }
});
const { TabPane } = Tabs;
const { Option } = Select;

const UDP_tbDuca_InsertarTab1 = () => {
  const navigate = useNavigate();
  const [selectedDevIds, setSelectedDevIds] = useState([]);
  const [form1] = Form.useForm();
  const [form] = Form.useForm();
  const [form2] = Form.useForm();
  const [form3] = Form.useForm();
  const [filasDevas, setFilasDevas] = React.useState(10);
  const [searchTextDevas, setSearchTextDevas] = React.useState('');
  const [loadingGuardarDevas, setLoadingGuardarDevas] = React.useState(false);
  const [showTransportistaFields, setShowTransportistaFields] = useState(false);


  const handleSeleccionarDevas = (e, devaId) => {
      if (e.target.checked) {
          setSelectedDevIds((prevSelectedDevIds) => [...prevSelectedDevIds, devaId]);
      } else {
          setSelectedDevIds(selectedDevIds.filter((id) => id !== devaId));
      }
  };

  const columnsDevas = [
    {
        title: "No.",
        dataIndex: "key",
        key: "key",
        sorter: (a, b) => a.key - b.key, // sorting for Numbers
    },
    {
        title: "Código DEVA",
        dataIndex: "deva_Id",
        key: "deva_Id",
        sorter: (a, b) => a.deva_Id - b.deva_Id,
    },
    {
        title: "País de exportación",
        dataIndex: "pais_Nombre",
        key: "pais_Nombre",
        sorter: (a, b) => a.pais_Nombre.localeCompare(b.pais_Nombre),
    },
    {
        title: "Incoterm",
        dataIndex: "inco_Codigo",
        key: "inco_Codigo",
        sorter: (a, b) => a.inco_Codigo.localeCompare(b.inco_Codigo),
    },
    {
      title: "Seleccionar DEVA",
      key: "operation",
      render: (params) => (
          <div key={params.deva_Id}>
              <Checkbox
                  aria-controls={`menu-${params.deva_Id}`}
                  aria-haspopup="true"
                  checked={selectedDevIds.includes(params.deva_Id)}
                  onClick={(e) => handleSeleccionarDevas(e, params.deva_Id)}
                  variant="contained"
                  style={{
                      borderRadius: "5px",
                      backgroundColor: "#ebe6f7",
                      alignItems: "center",
                      color: "#634A9E",
                      cursor: "pointer"
                  }}
              ></Checkbox>
          </div>
      ),
  },
];

  const handleChangeFilasDevas = (value) => {
    setFilasDevas(value);
  };

  const handleSearchChangeDevas = (e) => {
    setSearchTextDevas(e.target.value);
  };

  const GuardarDEVAS = () => {
    // Your save logic here
  };
  const filteredRowsDevas=[];

  const onFinish1 = (values) => {
    console.log('primertab:', values);
    // Handle form submission for Tab 2
    // axios.post('your_api_endpoint_tab2', values)
    //   .then(response => {
    //     message.success('Data submitted successfully for Tab 2');
    //   })
    //   .catch(error => {
    //     message.error('Submission failed for Tab 2');
    //   });
  };
  const onFinish = async (values) => {
    try {
      console.log('Tab 1 values:', values);
      const response = await axios.post(`${API_URL}/InsertarTab1`, values, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const onFinishTab2 = (values) => {
    console.log('Tab 2 values:', values);
    // Handle form submission for Tab 2
    // axios.post('your_api_endpoint_tab2', values)
    //   .then(response => {
    //     message.success('Data submitted successfully for Tab 2');
    //   })
    //   .catch(error => {
    //     message.error('Submission failed for Tab 2');
    //   });
  };

  const onFinishTab3 = (values) => {
    console.log('Tab 3 values:', values);
    // Handle form submission for Tab 3
    // axios.post('your_api_endpoint_tab3', values)
    //   .then(response => {
    //     message.success('Data submitted successfully for Tab 3');
    //   })
    //   .catch(error => {
    //     message.error('Submission failed for Tab 3');
    //   });
  };

  return (
    <Tabs defaultActiveKey="1">
       <Tabs.TabPane tab="Asignar DEVAS a una DUCA" key="1">
       <Form
          form={form1}
          layout="vertical"
          onFinish={onFinish1}
        >
          <Row gutter={16}>
            <Col span={24}>
              <div style={{ marginBottom: '20px', textAlign: 'right' }}>
                <Input
                  placeholder="Buscar"
                  value={searchTextDevas}
                  onChange={handleSearchChangeDevas}
                  style={{ width: 200, marginRight: 16 }}
                  suffix={<SearchOutlined />}
                />
                <Select
                  value={filasDevas}
                  onChange={handleChangeFilasDevas}
                  style={{ width: 120 }}
                >
                  <Select.Option value={10}>10</Select.Option>
                  <Select.Option value={20}>20</Select.Option>
                  <Select.Option value={30}>30</Select.Option>
                </Select>
              </div>
              <Table
                columns={columnsDevas}
                dataSource={filteredRowsDevas}
                pagination={{ pageSize: filasDevas }}
                size="small"
              />
              <div style={{ textAlign: 'right', marginTop: 16 }}>
                <Button
                  type="primary"
                  icon={<SearchOutlined />}
                  onClick={GuardarDEVAS}
                  loading={loadingGuardarDevas}
                  style={{ marginRight: 8 }}
                >
                  {loadingGuardarDevas ? "Procesando..." : "Siguiente"}
                </Button>
                <Button
                  onClick={() => {
                    navigate('/Duca/index');
                  }}
                >
                  Cancelar
                </Button>
              </div>
            </Col>
          </Row>
          </Form>
        </Tabs.TabPane>

        {/* <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
        > */}
        

        <TabPane tab="Identificación de la Declaración" key="2">
        <Form form={form} onFinish={onFinish}>
          <Row gutter={[16, 16]}>
            <Col span={6}>
              <Form.Item
                label="Regimen Aduanero"
                name="RegimenAduanero"
                rules={[{ required: true, message: 'Please select a Regimen Aduanero' }]}
              >
                <Select
                  showSearch
                  placeholder="Select a Regimen Aduanero"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                > 


              
                  {/* {RegimenesAduaneros.map((regimen) => (
                    <Option key={regimen.value} value={regimen.value}>
                      {regimen.label}
                    </Option>
                  ))} */}
                </Select>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label="No. de DUCA"
                name="NoDuca"
                rules={[{ required: true, message: 'Please enter the DUCA number' }]}
              >
                <Input placeholder="DUCA number" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label="No. Correlativo o Referencia"
                name="NoCorrelativoReferencia"
                rules={[{ required: true, message: 'Please enter the Correlativo or Referencia number' }]}
              >
                <Input placeholder="Correlativo or Referencia number" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label="Aduana Registro"
                name="AduanaRegistro"
                rules={[{ required: true, message: 'Please select an Aduana Registro' }]}
              >
                <Select
                  showSearch
                  placeholder="Select an Aduana Registro"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {/* {Aduanas.map((aduana) => (
                    <Option key={aduana.value} value={aduana.value}>
                      {aduana.label}
                    </Option>
                  ))} */}
                </Select>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label="Fecha de Vencimiento"
                name="FechaVencimiento"
                rules={[{ required: true, message: 'Please select a Fecha de Vencimiento' }]}
              >
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label="País de Procedencia"
                name="PaisProcedencia"
                rules={[{ required: true, message: 'Please select a País de Procedencia' }]}
              >
                <Select
                  showSearch
                  placeholder="Select a País de Procedencia"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {/* {PaisesProcedencia.map((pais) => (
                    <Option key={pais.value} value={pais.value}>
                      {pais.label}
                    </Option>
                  ))} */}
                </Select>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label="País de Destino"
                name="PaisDestino"
                rules={[{ required: true, message: 'Please select a País de Destino' }]}
              >
                <Select
                  showSearch
                  placeholder="Select a País de Destino"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {/* {PaisesDestino.map((pais) => (
                    <Option key={pais.value} value={pais.value}>
                      {pais.label}
                    </Option>
                  ))} */}
                </Select>
              </Form.Item>
            </Col>
         
            <Col span={6}>
              <Form.Item
                label="Manifiesto"
                name="Manifiesto"
                rules={[{ required: true, message: 'Please enter the Manifiesto' }]}
              >
                <Input placeholder="Manifiesto" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label="Titulo"
                name="Titulo"
                rules={[{ required: true, message: 'Please enter the Titulo' }]}
              >
                <Input placeholder="Titulo" />
              </Form.Item>
            </Col>
            {/* Include other Form.Item components */}
          </Row>
          <Row>
            <Col>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Col>
          </Row>
        </Form>
      </TabPane>

      <Tabs.TabPane tab="Insertar Tab 2" key="3">
        <Form
          form={form2}
          layout="vertical"
          onFinish={onFinishTab2}
        >
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="duca_Id"
                label="DUCA ID"
                rules={[{ required: true, message: 'Please input DUCA ID!' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="duca_Codigo_Declarante"
                label="Codigo Declarante"
                rules={[{ required: true, message: 'Please input Codigo Declarante!' }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="duca_Numero_Id_Declarante"
                label="Numero ID Declarante"
                rules={[{ required: true, message: 'Please input Numero ID Declarante!' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="duca_NombreSocial_Declarante"
                label="Nombre Social Declarante"
                rules={[{ required: true, message: 'Please input Nombre Social Declarante!' }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="duca_DomicilioFiscal_Declarante"
                label="Domicilio Fiscal Declarante"
                rules={[{ required: true, message: 'Please input Domicilio Fiscal Declarante!' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="duca_Codigo_Transportista"
                label="Codigo Transportista"
                rules={[{ required: true, message: 'Please input Codigo Transportista!' }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Checkbox
            checked={showTransportistaFields}
            onChange={(e) => setShowTransportistaFields(e.target.checked)}
          >
            Agregar informacion del transportista
          </Checkbox>
          {showTransportistaFields && (
            <>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="duca_Transportista_Nombre"
                    label="Transportista Nombre"
                    rules={[{ required: true, message: 'Please input Transportista Nombre!' }]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="motr_Id"
                    label="MOTR ID"
                    rules={[{ required: true, message: 'Please input MOTR ID!' }]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="cont_NoIdentificacion"
                    label="No Identificacion"
                    rules={[{ required: true, message: 'Please input No Identificacion!' }]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="cont_Licencia"
                    label="Licencia"
                    rules={[{ required: true, message: 'Please input Licencia!' }]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="pais_IdExpedicion"
                    label="Pais Expedicion"
                    rules={[{ required: true, message: 'Please input Pais Expedicion!' }]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="cont_Nombre"
                    label="Nombre"
                    rules={[{ required: true, message: 'Please input Nombre!' }]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="cont_Apellido"
                    label="Apellido"
                    rules={[{ required: true, message: 'Please input Apellido!' }]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="pais_Id"
                    label="Pais ID"
                    rules={[{ required: true, message: 'Please input Pais ID!' }]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="marca_Id"
                    label="Marca ID"
                    rules={[{ required: true, message: 'Please input Marca ID!' }]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="tran_IdUnidadTransporte"
                    label="Unidad Transporte"
                    rules={[{ required: true, message: 'Please input Unidad Transporte!' }]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="tran_Chasis"
                    label="Chasis"
                    rules={[{ required: true, message: 'Please input Chasis!' }]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="tran_Remolque"
                    label="Remolque"
                    rules={[{ required: true, message: 'Please input Remolque!' }]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="tran_CantCarga"
                    label="Cantidad Carga"
                    rules={[{ required: true, message: 'Please input Cantidad Carga!' }]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="tran_NumDispositivoSeguridad"
                    label="Num Dispositivo Seguridad"
                    rules={[{ required: true, message: 'Please input Num Dispositivo Seguridad!' }]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="tran_Equipamiento"
                    label="Equipamiento"
                    rules={[{ required: true, message: 'Please input Equipamiento!' }]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="tran_TamanioEquipamiento"
                    label="Tamaño Equipamiento"
                    rules={[{ required: true, message: 'Please input Tamaño Equipamiento!' }]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="tran_TipoCarga"
                    label="Tipo Carga"
                    rules={[{ required: true, message: 'Please input Tipo Carga!' }]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="tran_IdContenedor"
                    label="ID Contenedor"
                    rules={[{ required: true, message: 'Please input ID Contenedor!' }]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="usua_UsuarioCreacion"
                    label="Usuario Creacion"
                    rules={[{ required: true, message: 'Please input Usuario Creacion!' }]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="tran_FechaCreacion"
                    label="Fecha Creacion"
                    rules={[{ required: true, message: 'Please input Fecha Creacion!' }]}
                  >
                    <DatePicker style={{ width: '100%' }} />
                  </Form.Item>
                </Col>
              </Row>
            </>
          )}
          <Form.Item>
            <Button
            type="primary"
            htmlType="submit"
            style={{ paddingTop: '6px' }}
            >
            Submit
            </Button>
          </Form.Item>
        </Form>
      </Tabs.TabPane>


      <Tabs.TabPane tab="Insertar Tab 3" key="4">
        <Form form={form3} layout="vertical" onFinish={onFinishTab3}>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="tido_Id" label="TIDO ID" rules={[{ required: true, message: 'Please input TIDO ID!' }]}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="duca_Id" label="DUCA ID" rules={[{ required: true, message: 'Please input DUCA ID!' }]}>
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="doso_NumeroDocumento" label="Numero Documento" rules={[{ required: true, message: 'Please input Numero Documento!' }]}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="doso_FechaEmision" label="Fecha Emision" rules={[{ required: true, message: 'Please input Fecha Emision!' }]}>
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="doso_FechaVencimiento" label="Fecha Vencimiento" rules={[{ required: true, message: 'Please input Fecha Vencimiento!' }]}>
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="doso_PaisEmision" label="Pais Emision" rules={[{ required: true, message: 'Please input Pais Emision!' }]}>
                <Select>
                  {/* Populate options dynamically */}
                  <Option value="1">Pais 1</Option>
                  <Option value="2">Pais 2</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="doso_LineaAplica" label="Linea Aplica" rules={[{ required: true, message: 'Please input Linea Aplica!' }]}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="doso_EntiadEmitioDocumento" label="Entidad Emitio Documento" rules={[{ required: true, message: 'Please input Entidad Emitio Documento!' }]}>
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="doso_Monto" label="Monto" rules={[{ required: true, message: 'Please input Monto!' }]}>
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="usua_UsuarioCreacion" label="Usuario Creacion" rules={[{ required: true, message: 'Please input Usuario Creacion!' }]}>
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="doso_FechaCreacion" label="Fecha Creacion" rules={[{ required: true, message: 'Please input Fecha Creacion!' }]}>
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Tabs.TabPane>
    </Tabs>
  );
};

export default UDP_tbDuca_InsertarTab1;
