import React, { useState, useEffect } from 'react';
import { Spin } from 'antd';
import { APP_PREFIX_PATH, AUTH_PREFIX_PATH } from 'configs/AppConfig'

import {
    Button,
    Form,
    Input,
    Select,
    Card,
    Menu,
    Dropdown,
    Table,
    Typography,
    Space,
    Tooltip,
    Divider,
    Modal
} from 'antd';
// import { ExportToCsv } from 'export-to-csv';
import {
    SearchOutlined,
    FileTextOutlined,
    MoreOutlined,
    EditOutlined,
    PrinterOutlined,
    FilePdfOutlined,
    FileExcelOutlined,
    PlusOutlined,
    DownloadOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import UDP_tbDuca_InsertarTab1 from "./PersonaNatural";
const API_URL = 'https://localhost:44380/api/Duca';
const API_KEY = '4b567cb1c6b24b51ab55248f8e66e5cc';

const axiosInstance = axios.create({
  headers: {
    'XApiKey': API_KEY,
    'accept': '/',
  }
});
const { Option } = Select;
const { Text } = Typography;
const LoadingIcon = () => <Spin tip="Loading..." />;


async function ExportData() {
    try {
        const response = await axiosInstance.get(`${API_URL}/Listar`);
        const data = response.data.data.map((item, index) => {
            return {
                key: index + 1,
                duca_No_Duca: item.duca_No_Duca,
                duca_No_Correlativo_Referencia: item.duca_No_Correlativo_Referencia,
                nombre_pais_procedencia: item.nombre_pais_procedencia,
                nombre_Aduana_Registro: item.nombre_Aduana_Registro
            };
        });
        return data;
    }
    catch (error) {
        
        
    }
};
async function ListadoDuca() {
    try {
        const response = await axiosInstance.get(`${API_URL}/Listar`);

        const data = response.data.data.map((item, index) => {
            return {
                id: index + 1,
                duca_Id: item.duca_Id,
                duca_No_Duca: item.duca_No_Duca ? item.duca_No_Duca : "",
                duca_No_Correlativo_Referencia: item.duca_No_Correlativo_Referencia ? item.duca_No_Correlativo_Referencia : "",
                duca_AduanaRegistro: item.duca_AduanaRegistro,
                duca_AduanaDestino: item.duca_AduanaDestino,
                duca_DomicilioFiscal_Exportador: item.duca_DomicilioFiscal_Exportador,
                duca_Tipo_Iden_Exportador: item.duca_Tipo_Iden_Exportador,
                duca_Pais_Emision_Exportador: item.duca_Pais_Emision_Exportador,
                duca_Numero_Id_Importador: item.duca_Numero_Id_Importador,
                duca_Pais_Emision_Importador: item.duca_Pais_Emision_Importador,
                duca_DomicilioFiscal_Importador: item.duca_DomicilioFiscal_Importador,
                duca_Regimen_Aduanero: item.duca_Regimen_Aduanero,
                tran_IdUnidadTransporte: item.tran_IdUnidadTransporte,
                tran_TamanioEquipamiento: item.tran_TamanioEquipamiento,
                duca_Modalidad: item.duca_Modalidad,
                duca_Clase: item.duca_Clase,
                duca_Codigo_Declarante: item.duca_Codigo_Declarante,
                duca_Numero_Id_Declarante: item.duca_Numero_Id_Declarante,
                duca_NombreSocial_Declarante: item.duca_NombreSocial_Declarante,
                duca_DomicilioFiscal_Declarante: item.duca_DomicilioFiscal_Declarante,
                duca_Pais_Procedencia: item.duca_Pais_Procedencia,
                duca_Pais_Exportacion: item.duca_Pais_Exportacion,
                duca_Pais_Destino: item.duca_Pais_Destino,
                duca_Deposito_Aduanero: item.duca_Deposito_Aduanero,
                duca_Lugar_Desembarque: item.duca_Lugar_Desembarque,
                emba_Codigo: item.emba_Codigo,
                duca_Manifiesto: item.duca_Manifiesto,
                duca_Titulo: item.duca_Titulo,
                duca_Codigo_Transportista: item.duca_Codigo_Transportista,
                duca_PesoBrutoTotal: item.duca_PesoBrutoTotal,
                duca_PesoNetoTotal: item.duca_PesoNetoTotal,
                motr_Id: item.motr_Id,
                duca_Transportista_Nombre: item.duca_Transportista_Nombre,
                duca_Conductor_Id: item.duca_Conductor_Id,
                duca_Codigo_Tipo_Documento: item.duca_Codigo_Tipo_Documento,
                duca_FechaVencimiento: item.duca_FechaVencimiento.toString().substring(0, 10),
                duca_CanalAsignado: item.duca_CanalAsignado,
                trli_Id: item.trli_Id,
                usua_UsuarioCreacion: item.usua_UsuarioCreacion,
                duca_FechaCreacion: item.duca_FechaCreacion,
                usua_UsuarioModificacion: item.usua_UsuarioModificacion,
                duca_FechaModificacion: item.duca_FechaModificacion,
                duca_Estado: item.duca_Estado,
                duca_Finalizado: item.duca_Finalizado,
                deva_FechaAceptacion: item.deva_FechaAceptacion,
                decl_NumeroIdentificacion: item.decl_NumeroIdentificacion,
                tipo_identidad_exportador_descripcion: item.tipo_identidad_exportador_descripcion,
                nombre_pais_exportador: item.nombre_pais_exportador,
                decl_Nombre_Raso: item.decl_Nombre_Raso,
                nombre_Aduana_Registro: item.nombre_Aduana_Registro ? item.nombre_Aduana_Registro : "",
                nombre_Aduana_Salida: item.nombre_Aduana_Salida,
                deva_AduanaIngresoId: item.deva_AduanaIngresoId,
                nombre_Aduana_Ingreso: item.nombre_Aduana_Ingreso,
                deva_AduanaDespachoId: item.deva_AduanaDespachoId,
                nombre_Aduana_Despacho: item.nombre_Aduana_Despacho,
                nombre_pais_importador: item.nombre_pais_importador,
                nombre_pais_procedencia: item.nombre_pais_procedencia ? item.nombre_pais_procedencia : "",
                nombre_pais_exportacion: item.nombre_pais_exportacion,
                nombre_pais_destino: item.nombre_pais_destino,
                cont_Id: item.cont_Id,
                cont_Licencia: item.cont_Licencia,
                nombre_pais_conductor: item.nombre_pais_conductor,
                cont_NoIdentificacion: item.cont_NoIdentificacion,
                cont_Nombre: item.cont_Nombre,
                cont_Apellido: item.cont_Apellido,
                pais_IdExpedicion: item.pais_IdExpedicion,
                tran_Id: item.tran_Id,
                id_pais_transporte: item.id_pais_transporte,
                nombre_pais_transporte: item.nombre_pais_transporte,
                marca_Id: item.marca_Id,
                transporte_marca_Id: item.transporte_marca_Id,
                transporte_marc_Descripcion: item.transporte_marc_Descripcion,
                tran_Chasis: item.tran_Chasis,
                tran_Remolque: item.tran_Remolque,
                tran_CantCarga: item.tran_CantCarga,
                tran_NumDispositivoSeguridad: item.tran_NumDispositivoSeguridad,
                tran_Equipamiento: item.tran_Equipamiento,
                tran_TipoCarga: item.tran_TipoCarga,
                tran_IdContenedor: item.tran_IdContenedor,
                base_Gasto_TransporteM_Importada: item.base_Gasto_TransporteM_Importada,
                base_Costos_Seguro: item.base_Costos_Seguro,
                baseCalculos_inco_Id: item.baseCalculos_inco_Id,
                baseCalculos_inco_Descripcion: item.baseCalculos_inco_Descripcion,
                base_Valor_Aduana: item.base_Valor_Aduana,
                deva_ConversionDolares: item.deva_ConversionDolares,
                usua_NombreCreacion: item.usua_NombreCreacion,
                usua_NombreModificacion: item.usua_NombreModificacion
            };
        });
        return data;
    }
    catch (error) {
        console.error(error);
    }
};
function DucaIndex() {
    const navigate = useNavigate();
    const [searchText, setSearchText] = useState('');
    const [anchorEl, setAnchorEl] = useState({});
    const [anchorElExportar, setAnchorElExportar] = useState({});
    const [filas, setFilas] = useState(10);
    const [ListadoDucas, setListadoDucas] = useState([]);
    const [ExportData, SetExportData] = useState([]);
    const [cargandoData, setCargandoData] = useState([]);


    const csvHeader = [
        { label: 'No.' },
        { label: 'No. de DUCA' },
        { label: 'No. correlativo o referencia' },
        { label: 'País de procedencia' },
        { label: 'Aduana de Registro' },
    ];

    const csvOptions = {
        filename: 'Ducas',
        fieldSeparator: ',',
        quoteStrings: '"',
        decimalSeparator: '.',
        showLabels: true,
        useBom: true,
        useKeysAsHeaders: false,
        headers: csvHeader.map((c) => c.label),
    };

    // const csvExporter = new ExportToCsv(csvOptions);

    // const handleExportData = () => {
    //     try {
    //         csvExporter.generateCsv(ExportData);
    //     } catch (error) {
    //         console.error(error);
    //     }
    // };

    const getDatosTabla = async () => {
        try {
            setCargandoData([]);
            setListadoDucas([]);

            const data = await ListadoDuca();
            setListadoDucas(data);
            data.length > 0 ? setCargandoData(data) : setCargandoData(null);
            SetExportData(await ExportData());
        } catch (error) {
            setCargandoData(null);
            console.error(error);
        }
    };

    const handleClick = (event, id) => {
        setAnchorEl((prevState) => ({
            ...prevState,
            [id]: event.currentTarget,
        }));
    };

    const handleClose = (id) => {
        setAnchorEl((prevState) => ({
            ...prevState,
            [id]: null,
        }));
    };

    const handleClickExportar = (event, id) => {
        setAnchorElExportar((prevState) => ({
            ...prevState,
            [id]: event.currentTarget,
        }));
    };

    const handleCloseExportar = () => {
        setAnchorElExportar((prevState) => ({
            ...prevState,
            ['menu-exportar']: null,
        }));
    };

    const handleEdit = (params) => {
        navigate("/Duca/editar", { state: params });
        localStorage.setItem("duca_Id", params.duca_Id);
        handleClose(params.id);
    };

    const handleReporte = (id) => {
        navigate("/Duca/Reporte", { state: { id } });
        handleClose(id);
    };

    const handleBoletin = (params) => {
        navigate("/BoletinDePago/crear", { state: params });
        handleClose(params.id);
    };

    const handleChange = (value) => {
        setFilas(value);
    };

    useEffect(() => {
        localStorage.removeItem("duca_Id");
        getDatosTabla();
    }, []);

    const columns = [
        {
            title: 'No.',
            dataIndex: 'id',
            key: 'id',
            sorter: (a, b) => a.id - b.id,
        },
        {
            title: 'No. de DUCA',
            dataIndex: 'duca_No_Duca',
            key: 'duca_No_Duca',
            sorter: (a, b) => a.duca_No_Duca.localeCompare(b.duca_No_Duca),
        },
        {
            title: 'No. correlativo o referencia',
            dataIndex: 'duca_No_Correlativo_Referencia',
            key: 'duca_No_Correlativo_Referencia',
            sorter: (a, b) => a.duca_No_Correlativo_Referencia.localeCompare(b.duca_No_Correlativo_Referencia),
        },
        {
            title: 'País de procedencia',
            dataIndex: 'nombre_pais_procedencia',
            key: 'nombre_pais_procedencia',
            sorter: (a, b) => a.nombre_pais_procedencia.localeCompare(b.nombre_pais_procedencia),
        },
        {
            title: 'Aduana de Registro',
            dataIndex: 'nombre_Aduana_Registro',
            key: 'nombre_Aduana_Registro',
            sorter: (a, b) => a.duca_FechaVencimiento.localeCompare(b.duca_FechaVencimiento),
        },
        {
            title: 'Acciones',
            key: 'operation',
            render: (params) => (
                <Space>
                    <Dropdown
                        overlay={
                            <Menu>
                                {!params.duca_Finalizado && (
                                    <Menu.Item onClick={() => handleEdit(params)}>
                                        <EditOutlined /> Editar
                                    </Menu.Item>
                                )}
                               
                            </Menu>
                        }
                        trigger={['click']}
                    >
                        <Button icon={<MoreOutlined />} style={{ borderRadius: '10px', backgroundColor: '#634A9E', color: 'white' }}>
                            Opciones
                        </Button>
                    </Dropdown>
                </Space>
            ),
        },
    ];

    const camposToiFilterList = [
        "id",
        "duca_No_Duca",
        "duca_No_Correlativo_Referencia",
        "nombre_pais_procedencia",
        "duca_FechaVencimiento",
    ];

    const filteredRowsList = ListadoDucas.filter((row) => {
        if (searchText === "") {
            return true;
        }

        for (const [key, value] of Object.entries(row)) {
            if (camposToiFilterList.includes(key)) {
                const formattedValue = typeof value === "number" ? value.toString() : value.toString().toLowerCase();
                const formattedSearchText = searchText.toLowerCase();
                if (formattedValue.includes(formattedSearchText)) {
                    return true;
                }
            }
        }
        return false;
    }).reverse();

    const handleSearchChange = (event) => {
        setSearchText(event.target.value);
    };

    return (
        <Card style={{ margin: '40px' }}>
            <Card.Meta
                title="Lugares de Desembarque"
                description="Gestión de lugares de desembarque"
            />
            <div style={{ padding: '16px' }}>
                <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
                    <Space direction="horizontal" style={{ justifyContent: 'space-between' }}>
                        <Button
                            type="primary"
                            icon={<PlusOutlined />}
                            
                            onClick={() => navigate("/app/DucaCreate")}
                        >
                            Nuevo
                        </Button>

                        
                    </Space>

                    <Space direction="horizontal" style={{ justifyContent: 'space-between', width: '100%' }}>
                        <div>
                            <Text>Filas por página:</Text>
                            <Select value={filas} onChange={handleChange} style={{ width: 80 }}>
                                <Option value={10}>10</Option>
                                <Option value={20}>20</Option>
                                <Option value={30}>30</Option>
                            </Select>
                        </div>

                        <Input
                            placeholder="Buscar"
                            value={searchText}
                            onChange={handleSearchChange}
                            prefix={<SearchOutlined />}
                            style={{ borderRadius: "10px", width: 200 }}
                        />
                    </Space>
                </Space>
            </div>
            <Table
                columns={columns}
                dataSource={filteredRowsList}
                rowKey="id"
                pagination={{
                    pageSize: filas,
                    showSizeChanger: false,
                    position: ['bottomCenter'],
                }}
                locale={{
                    emptyText: LoadingIcon(cargandoData),
                }}
                scroll={{ x: true }}
            />
        </Card>
    );
}

export default DucaIndex;
