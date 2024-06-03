import React from 'react';
import { Form, Input, DatePicker, Select, Button, Tabs, Row, Col, Checkbox } from 'antd';
import  { useState } from 'react';
import axios from 'axios';
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
  const [form] = Form.useForm();
  const [form2] = Form.useForm();
  const [form3] = Form.useForm();
  const [showTransportistaFields, setShowTransportistaFields] = useState(false);
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
      <TabPane tab="Insertar Tab 1" key="1">
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
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
                name="duca_No_Duca"
                label="No DUCA"
                rules={[{ required: true, message: 'Please input No DUCA!' }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="duca_No_Correlativo_Referencia"
                label="No Correlativo Referencia"
                rules={[{ required: true, message: 'Please input No Correlativo Referencia!' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="duca_AduanaRegistro"
                label="Aduana Registro"
                rules={[{ required: true, message: 'Please input Aduana Registro!' }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="duca_AduanaDestino"
                label="Aduana Destino"
                rules={[{ required: true, message: 'Please input Aduana Destino!' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="duca_Regimen_Aduanero"
                label="Regimen Aduanero"
                rules={[{ required: true, message: 'Please input Regimen Aduanero!' }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="duca_Modalidad"
                label="Modalidad"
                rules={[{ required: true, message: 'Please input Modalidad!' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="duca_Clase"
                label="Clase"
                rules={[{ required: true, message: 'Please input Clase!' }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="duca_FechaVencimiento"
                label="Fecha Vencimiento"
                rules={[{ required: true, message: 'Please input Fecha Vencimiento!' }]}
              >
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="duca_Pais_Procedencia"
                label="Pais Procedencia"
                rules={[{ required: true, message: 'Please input Pais Procedencia!' }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="duca_Pais_Destino"
                label="Pais Destino"
                rules={[{ required: true, message: 'Please input Pais Destino!' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="duca_Deposito_Aduanero"
                label="Deposito Aduanero"
                rules={[{ required: true, message: 'Please input Deposito Aduanero!' }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="duca_Lugar_Desembarque"
                label="Lugar Desembarque"
                rules={[{ required: true, message: 'Please input Lugar Desembarque!' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="duca_Manifiesto"
                label="Manifiesto"
                rules={[{ required: true, message: 'Please input Manifiesto!' }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                name="duca_Titulo"
                label="Titulo"
                rules={[{ required: true, message: 'Please input Titulo!' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="trli_Id"
                label="TRLI ID"
                rules={[{ required: true, message: 'Please input TRLI ID!' }]}
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
                name="duca_FechaCreacion"
                label="Fecha Creacion"
                rules={[{ required: true, message: 'Please input Fecha Creacion!' }]}
              >
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
      </TabPane>


      <TabPane tab="Insertar Tab 2" key="2">
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
      </TabPane>


      <TabPane tab="Insertar Tab 3" key="3">
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
      </TabPane>
    </Tabs>
  );
};

export default UDP_tbDuca_InsertarTab1;
