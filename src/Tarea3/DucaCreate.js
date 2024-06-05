import React from 'react';
import { Form,Modal, Input, DatePicker, Select, Button, Tabs, Row,Collapse, Col,Divider, Checkbox,Table } from 'antd';
import  { useState,useEffect } from 'react';
import { useNavigate  } from 'react-router-dom';
import axios from 'axios';
import { SearchOutlined,CheckOutlined   } from '@ant-design/icons';
// import { useForm, Controller } from 'react-hook-form';



const API_URL = 'https://localhost:44380/api/Duca/';
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
  const [ListadoDucas, setListadoDucas] = useState([]);
  const [cargandoData, setCargandoData] = useState([]);
  const [activeTab, setActiveTab] = useState("1");
  const [dataDevas, setDataDevas] = useState([]);
    const [Paises, setPaises] = useState([]);
    const [Paisesprocedencia, setPaisesProcedencia] = useState([]);
    const [getRegimenesAduaneros, setRegimenesAduaneros] = useState([]);
    const [values1, setValues1] = useState({});
    const [getaduanas, setAduanas] = useState([]);
    const [idsDevasContieneDuca, setidsDevasContieneDuca] = useState([]);
  const [filasDevas, setFilasDevas] = React.useState(10);
  const [searchTextDevas, setSearchTextDevas] = React.useState('');
  const [loadingGuardarDevas, setLoadingGuardarDevas] = React.useState(false);
  const [showTransportistaFields, setShowTransportistaFields] = useState(false);
const [modalVisible, setModalVisible] = useState(false);
const [dataLugarDesembarque, setdataLugarDesembarque] = useState([]);
const [LugarDesembarque, setLugarDesembarque] = useState([]);
const [TextLugarDesembarque, setTextLugarDesembarque] = useState("");
const [collapseConductor, setCollapseConductor] = useState(false);
const [SearchTextLugarDesembarque, setSearchTextLugarDesembarque] = useState("");

function onChange(value) {
    console.log(`selected ${value}`);
  }
  
  function selectRegimen(value) {
    console.log(`selected ${value}`);
  }
  function selectAdu(value) {
    console.log(`selected ${value}`);
  }
const CargarDatospaises = async () => {
    
        const data = await paises();
        setPaises(data);
    
}

async function aduanas() {
  try {
    const response = await axiosInstance.get("https://localhost:44380/api/Aduanas/Listar");
    const data = response.data.data.map((item) => ({
      value: item.adua_Id,
      label: `${item.adua_Id} - ${item.adua_Nombre}`,
    }));
    setAduanas(data);
  } catch (error) {
    console.error(error);
  }
}
async function RegimenesAduaneros() {
  try {
    const response = await axiosInstance.get("https://localhost:44380/api/RegimenAduanero/Listar");
    const data = response.data.data.map((item) => ({
      value: item.regi_Id,
      label: `${item.regi_Codigo} - ${item.regi_Descripcion}`,
    }));
    setRegimenesAduaneros(data);
  } catch (error) {
    console.error(error);
  }
}

async function paises() {
    try {
      const response = await axiosInstance.get("https://localhost:44380/api/Paises/Listar?pais_EsAduana=true"); 
      const data = response.data.data.map((item, index) => {
        return {
          key: index + 1,
          value: item.pais_Id,
          label: `${item.pais_Codigo} - ${item.pais_Nombre} - ${item.pais_prefijo}`,
        };
      });
      return data;
    } catch (error) {
      // handle error
    }
  }


  

async function ListarLugarEmbarque (code) {
  try {
    console.log("entro al listado"+ dataLugarDesembarque);
    let codigo = code.trim().toUpperCase()
    const response = await axiosInstance.get('https://localhost:44380/api/LugaresEmbarque/Listar?codigo='+codigo);
    const data = response.data.data.map((item, index) => {
        return {
            key: index + 1,
            emba_Id: item.emba_Id,
            emba_Codigo: item.emba_Codigo,
            emba_Descripcion: item.emba_Descripcion,                
        };
    });
    console.log(code);
    return data;
} catch (error) {
    throw error;
}
}
const camposToFilterLugarDesembarque = ["key", "emba_Codigo", "emba_Descripcion"];

    const filteredRowsLugarDesembarque = dataLugarDesembarque.filter((row) => {
        if (SearchTextLugarDesembarque === "") {
            return true; // Mostrar todas las filas si el buscador está vacío
        }

        for (const [key, value] of Object.entries(row)) {
            if (camposToFilterLugarDesembarque.includes(key)) {
                const formattedValue =
                    typeof value === "number"
                        ? value.toString()
                        : value.toString().toLowerCase();
                const formattedSearchText =
                    typeof SearchTextLugarDesembarque === "number"
                        ? SearchTextLugarDesembarque.toString()
                        : SearchTextLugarDesembarque.toLowerCase();
                if (formattedValue.includes(formattedSearchText)) {
                    return true;
                }
            }
        }
        return false;
    });
const handleSeleccionarLugarDesembarque = (params) => {
  const lugar = dataLugarDesembarque.filter((Lugar) => Lugar.emba_Id === params.emba_Id).map((item, index) => {
      return {
          value: item.emba_Id,
          label: `${item.emba_Codigo} - ${item.emba_Descripcion}`,
      }
  });

  setLugarDesembarque(lugar);
  console.log(lugar);
  setValues1("LugarDesembarque", lugar[0]);

}
const CargarDatosLugarDesembarque = async (code) => {
        if (code == "") {
            setdataLugarDesembarque([]);
        } else {
            const data = await ListarLugarEmbarque(code);
            setdataLugarDesembarque(data);
        }
    }
const EnviarData = async (value) => {
        CargarDatosLugarDesembarque(value);
    }
const [pageSize, setPageSize] = useState(10); 

const handleChangePageSize = (value) => {
        setPageSize(value);
    };

  const columns = [
    
      {
          title: 'No.',
          dataIndex: 'key',
          key: 'key',
          sorter: (a, b) => a.key - b.key, //sorting for Numbers
      },
      {
          title: 'Código del lugar de desembarque',
          dataIndex: 'emba_Codigo',
          key: 'emba_Codigo',
          sorter: (a, b) => a.emba_Codigo.localeCompare(b.emba_Codigo), //sorting for Letters
      },
      {
          title: 'Lugar de desembarque',
          dataIndex: 'emba_Descripcion',
          key: 'emba_Descripcion',
          sorter: (a, b) => a.emba_Descripcion.localeCompare(b.emba_Descripcion), //sorting for Letters
      },
      {
          title: 'Acciones',
          key: 'operation',
          render: (params) => (
              <div key={params.emba_Id}>
                  <Button
                      aria-controls={`menu-${params.emba_Id}`}
                      aria-haspopup="true"
                      onClick={() => handleSeleccionarLugarDesembarque(params)}
                      variant="contained"
                      style={{
                          borderRadius: '10px',
                          backgroundColor: '#634A9E',
                          color: 'white',
                      }}
                      startIcon={<CheckOutlined >check</CheckOutlined >}
                  >
                      Seleccionar
                  </Button>
              </div>
          ),
      },
  
    ];

    const data = [
        // Define your table data here
    ];

    useEffect(() => {
        CargarDatospaises();
        RegimenesAduaneros();
        aduanas();
    },[]);

  useEffect(() => {
    if (Paises.length>0) {
        setPaisesProcedencia([Paises.find(item=>item.value===97)]);
        setValues1("PaisDestino", Paises.find(item=>item.value===97));
    }
    // CargarDatospaises();    
    getListadoDucas();
    // ListarItems();
  }, [Paises]);
  async function ListarDevasPorDuca() {
    try {
        const response = await axiosInstance.get(`${API_URL}ListaDevaNoDuca`);
        const data = response.data.data.map((item, index) => {
            return {
                key: index + 1,
                deva_Id: item.deva_Id,
                pais_ExportacionId: item.pais_ExportacionId,
                pais_Codigo: item.pais_Codigo,
                pais_Nombre: `${item.pais_Codigo} - ${item.pais_Nombre}`,
                inco_Id: item.inco_Id,
                inco_Codigo: item.inco_Codigo,
                regi_Id: item.regi_Id,
                regi_Codigo: item.regi_Codigo,
                regi_Descripcion: item.regi_Descripcion,
                deva_FechaAceptacion: item.deva_FechaAceptacion,
                deva_ConversionDolares: item.deva_ConversionDolares
            };
        });
        return data;
    } catch (error) {
        console.error(error);
    }
}
async function ListadoDuca() {
  try {
      const response = await axiosInstance.get(`${API_URL}Listar`);

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


async function TratadoByPaisId(pais_Id){
  try {
      const response = await axiosInstance.get(`https://localhost:44380/api/PaisesEstanTratadosConHonduras/TratadoByPaisId?pais_Id=${parseInt(pais_Id)}`);

      return response;
  } catch (error) {
      console.error(error);
  }
}
  const getListadoDucas = async () => {
    try {
        setCargandoData([]);
        setDataDevas([]);
  
        const data = await ListadoDuca();
        setListadoDucas(data);
  
        const itemsData = await ListarDevasPorDuca();
        setDataDevas(itemsData);
        itemsData.length > 0 ? setCargandoData(itemsData) : setCargandoData(null);
  
    } catch (error) {
        setCargandoData(null)
    }
  }
//guardar deva


const ToastWarningPersonalizado = (message) => {
  message.warning(message);
};



const ListarItems = () => {
  // Your logic for listing items
};

const validacion = (step) => {
  // Your validation logic
};
async function ListTratadosById(trli_Id){
  try {
      const response = await axiosInstance.get(`https://localhost:44380/api/TratadosLibreComercio/ListTratadosById?trli_Id=${parseInt(trli_Id)}`);

      return response;
  } catch (error) {
      console.error(error);
  }
}

async function LiberarDevasPorDucaId(){
  try {
      const response = await axiosInstance.post(`https://localhost:44380/api/ItemsDEVAxDUCA/LiberarDevasPorDucaId?duca_Id=${parseInt(localStorage.getItem("duca_Id"))}`)
      return response;
  } catch (error) {
      ;
  }
}

async function InsertarDevaPorDuca(deva_Id) {
  try {
      let datos = {
          "duca_Id": parseInt(localStorage.getItem("duca_Id")),
          "deva_Id": deva_Id,
          "usua_UsuarioCreacion": 1,
          "dedu_FechaCreacion": new Date(),
      }

      const response = await axiosInstance.post("https://localhost:44380/api/ItemsDEVAxDUCA/Insertar", datos);

      return response;
  } catch (error) {
      ;
  }
}
const GuardarDEVAS = async () => {
  try {
      if (selectedDevIds.length !== 0) {
          setValues1("trli_Id", null);

          let paisExpoIgual = true;
          let IncotermIgual = true;
          console.log(selectedDevIds);
          const devaUno = dataDevas.find(item => item.deva_Id === selectedDevIds[0]);

          // setPaises(Paises.filter(item => item.value !== 97));

          // setRegimenesAduaneros([RegimenesAduaneros.find(item => item.value === devaUno.regi_Id)]);
          // setValues1("RegimenAduanero", RegimenesAduaneros.find(item => item.value === devaUno.regi_Id));

          for (let index = 0; index < selectedDevIds.length; index++) {
              const element = dataDevas.find(item => item.deva_Id === selectedDevIds[index]);
              console.log("entro al for" + element.deva_Id + selectedDevIds + "devauno:"+devaUno.inco_Id+ "incoid:"+ element.inco_Id);

              if (devaUno.inco_Id !== element.inco_Id) {
                  IncotermIgual = false;
                  console.log("entro al inco" + IncotermIgual);

              }

              if (devaUno.pais_ExportacionId !== element.pais_ExportacionId) {
                  paisExpoIgual = false;
                  console.log("entro al paiexpo" + paisExpoIgual);

              }
          }

          if (!paisExpoIgual && !IncotermIgual) {
              console.log("Las DEVA que seleccione deben poseer el mismo país de exportación y el mismo incoterm.");
          } else if (!paisExpoIgual && IncotermIgual) {
              console.log("Las DEVA que seleccione deben poseer el mismo país de exportación.");
          } else if (paisExpoIgual && !IncotermIgual) {
              console.log("Las DEVA que seleccione deben poseer el mismo incoterm.");
          } else {
              setLoadingGuardarDevas(true);
              const respuestaPaisesTratados = await TratadoByPaisId(devaUno.pais_ExportacionId);
              console.log("entro al guardardevassetloading");
              console.log("localstorage:" + localStorage.getItem("duca_Id"));


              if (respuestaPaisesTratados.data.data.messageStatus !== "0") {
                  const respuestaTrataboById = await ListTratadosById(respuestaPaisesTratados.data.data.messageStatus);
                  console.log("entro al Paisestratados");
                  if (respuestaTrataboById.data.data.length > 0) {
                      const tlcVentaja = respuestaTrataboById.data.data[0];
                      console.log("entro al tratado");
                      setValues1("trli_Id", {
                          value: tlcVentaja.trli_Id,
                          label: tlcVentaja.trli_NombreTratado
                      });
                  }
              } else {
                  setValues1("trli_Id", {
                      value: 0,
                      label: 'No Aplica'
                  });
                  console.log("entro al setvalues");
              }

              if (localStorage.getItem("duca_Id")) {
                  selectedDevIds.sort((a, b) => a - b);
                  idsDevasContieneDuca.sort((a, b) => a - b);

                  if (idsDevasContieneDuca.length === selectedDevIds.length) {
                      let allIguales = true;
                      idsDevasContieneDuca.forEach((item, index) => {
                          if (item !== selectedDevIds[index]) {
                              allIguales = false;
                          }
                      });

                      if (allIguales) {
                          
                      } else {
                          const liberarDevasResponse = await LiberarDevasPorDucaId();
                          if (liberarDevasResponse.data.data.messageStatus === "1") {

                              let allCorrect = true;
                              for (let index = 0; index < selectedDevIds.length; index++) {
                                  const response2 = await InsertarDevaPorDuca(selectedDevIds[index]);

                                  if (response2.data.data.messageStatus !== "1") {
                                      allCorrect = false;
                                  }
                              }

                              if (allCorrect) {
                                  ListarItems();
                                  setidsDevasContieneDuca(selectedDevIds);
                              }
                          }
                      }
                  } else {
                      const liberarDevasResponse = await LiberarDevasPorDucaId();
                      console.log("entro al liberar");

                      if (liberarDevasResponse.data.data.messageStatus === "1") {
                          let allCorrect = true;
                          for (let index = 0; index < selectedDevIds.length; index++) {
                              const response2 = await InsertarDevaPorDuca(selectedDevIds[index]);

                              if (response2.data.data.messageStatus !== "1") {
                                  allCorrect = false;
                              }
                          }

                          if (allCorrect) {
                              ListarItems();
                              setidsDevasContieneDuca(selectedDevIds);
                          }
                      }

                      console.log("esta en el else ");
                  }
              }
              console.log("esta ajuera" + selectedDevIds);
              setidsDevasContieneDuca(selectedDevIds);
              setActiveTab("2");
              setLoadingGuardarDevas(false);
              validacion(2);
          }
      } else {
          console.log('Advertencia. Debe seleccionar al menos una DEVA.');
      }
  } catch (error) {
      console.error(error);
  }
};



///deva
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

  // const GuardarDEVAS = () => {
  //   // Your save logic here
  // };
  const camposToFilterDevas = ["key", "deva_Id", "adua_IngresoNombre", "adua_DespachoNombre"];

  const filteredRowsDevas = dataDevas.filter((row) => {
      if (searchTextDevas === "") {
          return true;  // Mostrar todas las filas si el buscador está vacío
      }

      for (const [key, value] of Object.entries(row)) {
          if (camposToFilterDevas.includes(key)) {
              const formattedValue =
                  typeof value === 'number'
                      ? value.toString()
                      : value.toString().toLowerCase();
              const formattedSearchText =
                  typeof searchTextDevas === 'number'
                      ? searchTextDevas.toString()
                      : searchTextDevas.toLowerCase();
              if (formattedValue.includes(formattedSearchText)) {
                  return true;
              }
          }
      }
      return false;
  });

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
    console.log("entro");
    try {
      console.log('Tab 1 values:', values);
      const response = await axiosInstance.post(`${API_URL}InsertPart1`, values, {
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
const abrirbusqueda = () => {
        setModalVisible(true);
    };
    const onClose = () => {
        setModalVisible(false);
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
    <Tabs activeKey={activeTab} onChange={(key) => setActiveTab(key)}>
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
                  onChange={selectRegimen}
                  filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                > 


              
                  {getRegimenesAduaneros.map((regimen) => (
                    <Option key={regimen.value} value={regimen.value}>
                      {regimen.label}
                    </Option>
                  ))}
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
                  onChange={selectAdu}
                  filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {getaduanas.map((aduana) => (
                    <Option key={aduana.value} value={aduana.value}>
                      {aduana.label}
                    </Option>
                  ))}
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
                  {Paises.map((Pais) => (
                    <Option key={Pais.value} value={Pais.value}>
                      {Pais.label}
                    </Option>
                  ))}
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
                  onChange={onChange}

                  filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {Paises.map((pais) => (
                    <Option key={pais.value} value={pais.value}>
                      {pais.label}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Row gutter={16}>
                <Col xs={8}>
                    <Form.Item
                        label="Depósito Aduanero / Zona Franca"
                        name="DepositoAduanero"
                        rules={[{ required: true, message: 'Please input Depósito Aduanero / Zona Franca!' }]}
                    >
                        <Input />
                    </Form.Item>
                </Col>

                <Col xs={8}>
                    <Form.Item
                        label="Modalidad"
                        name="Modalidad"
                        rules={[{ required: true, message: 'Please input Modalidad!' }]}
                    >
                        <Input />
                    </Form.Item>
                </Col>

                <Col xs={8}>
                    <Form.Item
                        label="Clase"
                        name="Clase"
                        rules={[{ required: true, message: 'Please input Clase!' }]}
                    >
                        <Input />
                    </Form.Item>
                </Col>

                <Col xs={18}>
                    <Form.Item
                        label="Lugar de Desembarque"
                        name="LugarDesembarque"
                        // rules={[{ required: true, message: 'Please select Lugar de Desembarque!' }]}
                    >
                     
                        <Select
                            showSearch
                            placeholder="Select a place"
                            optionFilterProp="children"LugarDesembarque
                            filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                        >
                           {LugarDesembarque.map((pais) => (
                              <Option key={pais.value} value={pais.value}>
                                {pais.label}
                              </Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Col>

                <Col xs={6}>
                    <Form.Item>
                      
                        <Button
                            type="primary"
                            icon={<SearchOutlined />}
                             onClick={abrirbusqueda}
                        >
                            Search
                        </Button>
                    </Form.Item>
                </Col>
                <Modal
                    visible={modalVisible}
                    title="Your Modal Title"
                    onCancel={onClose}
                    footer={null} 
                    // Remove the default footer if not needed
                >
                    <div>
                        <div style={{ marginBottom: 15 }}>
                              <Input.Search
                                  placeholder="Buscar"
                                  allowClear
                                  onSearch={EnviarData}
                                  enterButton={<Button type="primary" icon={<SearchOutlined />} />}
                              />
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 15 }}>
                            <label>Filas por página:</label>
                            <Select defaultValue={pageSize} onChange={handleChangePageSize}>
                                <Option value={10}>10</Option>
                                <Option value={25}>25</Option>
                                <Option value={50}>50</Option>
                            </Select>
                        </div>
                        <Table
                            columns={columns}
                            dataSource={filteredRowsLugarDesembarque}
                            pagination={{ pageSize: pageSize }}
                            locale={{
                                emptyText: 'Sin resultados',
                                triggerDesc: 'Ordenar descendente',
                                triggerAsc: 'Ordenar ascendente',
                                cancelSort: 'Cancelar',
                            }}
                        />
                    </div>
                </Modal>
            </Row>

         
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
            


            <Col span={6}>
        <Form.Item
            label="Aduana Destino:"
            name="AduanaDestino"
            rules={[{ required: true, message: 'Please enter the Aduana Destino' }]}
        >
            <Input
                onChange={(e) => {
                    setValues1("AduanaDestino", e.target.value);
                }}
                placeholder="Aduana Destino"
            />
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

      <TabPane tab="Declarante" key="3">
        <Form form={form} onFinish={onFinishTab2}>
          <Row gutter={16}>
            <Col span={24}>
              <Divider orientation="left">Declarante</Divider>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Código"
                name="Codigo_Declarante"
                rules={[{ required: true, message: 'Please enter the Código' }]}
              >
                <Input
                  maxLength={15}
                  style={{ textTransform: 'uppercase' }}
                  onKeyPress={(e) => {
                    if (!/[0-9]/.test(e.key)) e.preventDefault();
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="No. Identificación"
                name="NoIdentificacion_Declarante"
                rules={[{ required: true, message: 'Please enter the No. Identificación' }]}
              >
                <Input
                  maxLength={17}
                  style={{ textTransform: 'uppercase' }}
                  onKeyPress={(e) => {
                    if (!/[0-9]/.test(e.key)) e.preventDefault();
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Nombre o Razón Social"
                name="NombreRazonSocial_Declarante"
                rules={[{ required: true, message: 'Please enter the Nombre o Razón Social' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="Domicilio Fiscal"
                name="DomicilioFiscal_Declarante"
                rules={[{ required: true, message: 'Please enter the Domicilio Fiscal' }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Divider orientation="left">Transportista</Divider>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Código"
                name="Codigo"
                rules={[{ required: true, message: 'Please enter the Código' }]}
              >
                <Input
                  maxLength={5}
                  style={{ textTransform: 'uppercase' }}
                  onKeyPress={(e) => {
                    if (!/[0-9]/.test(e.key)) e.preventDefault();
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Nombre"
                name="Nombre"
                rules={[{ required: true, message: 'Please enter the Nombre' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Modo de Transporte"
                name="ModoTransporte"
                rules={[{ required: true, message: 'Please select the Modo de Transporte' }]}
              >
                <Select
                  showSearch
                  placeholder="Select a Modo de Transporte"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {/* {ModosTransporte.map((modo) => (
                    <Option key={modo.value} value={modo.value}>
                      {modo.label}
                    </Option>
                  ))} */}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
        <Col span={24}>
          <Checkbox onChange={(e) => setCollapseConductor(e.target.checked)}>
            ¿Desea llenar los campos de Conductor?
          </Checkbox>
        </Col>
      </Row>
      <Collapse activeKey={collapseConductor ? '1' : ''}>
        <Collapse.Panel  key="1">
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                label="No. Identificación"
                name="NoIdentificador"
                rules={[{ required: true, message: 'Please enter the No. Identificación' }]}
              >
                <Input
                  maxLength={15}
                  style={{ textTransform: 'uppercase' }}
                  onKeyPress={(e) => {
                    if (!/[0-9]/.test(e.key)) e.preventDefault();
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="No. Licencia de Conducir"
                name="NoLicenciaConducir"
                rules={[{ required: true, message: 'Please enter the No. Licencia de Conducir' }]}
              >
                <Input
                  maxLength={15}
                  style={{ textTransform: 'uppercase' }}
                  onKeyPress={(e) => {
                    if (!/[0-9]/.test(e.key)) e.preventDefault();
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="País Expedición"
                name="PaisExpedicion"
                rules={[{ required: true, message: 'Please select the País Expedición' }]}
              >
                <Select
                  showSearch
                  placeholder="Select a País Expedición"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {Paises.map((pais) => (
                    <Option key={pais.value} value={pais.value}>
                      {pais.label}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Nombres"
                name="Nombres"
                rules={[{ required: true, message: 'Please enter the Nombres' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Apellidos"
                name="Apellidos"
                rules={[{ required: true, message: 'Please enter the Apellidos' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Id Unidad Transporte"
                name="IdUnidadTransporte"
                rules={[{ required: true, message: 'Please enter the Id Unidad Transporte' }]}
              >
                <Input
                  maxLength={15}
                  style={{ textTransform: 'uppercase' }}
                  onKeyPress={(e) => {
                    if (!/[0-9]/.test(e.key)) e.preventDefault();
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="País de Registro"
                name="PaisRegistro"
                rules={[{ required: true, message: 'Please select the País de Registro' }]}
              >
                <Select
                  showSearch
                  placeholder="Select a País de Registro"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {Paises.map((pais) => (
                    <Option key={pais.value} value={pais.value}>
                      {pais.label}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Marca"
                name="Marca"
                rules={[{ required: true, message: 'Please select the Marca' }]}
              >
                <Select
                  showSearch
                  placeholder="Select a Marca"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {/* {Marcas.map((marca) => (
                    <Option key={marca.value} value={marca.value}>
                      {marca.label}
                    </Option>
                  ))} */}
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Chasis / Vin"
                name="ChasisVin"
                rules={[{ required: true, message: 'Please enter the Chasis / Vin' }]}
              >
                <Input
                  maxLength={17}
                  style={{ textTransform: 'uppercase' }}
                  onKeyPress={(e) => {
                    if (!/[A-Za-z0-9]/.test(e.key)) e.preventDefault();
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Identificación del Remolque"
                name="IdentificacionRemolque"
                rules={[{ required: true, message: 'Please enter the Identificación del Remolque' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Cantidad de Unidades Carga"
                name="CantidadUnidadesCarga"
                rules={[{ required: true, message: 'Please enter the Cantidad de Unidades Carga' }]}
              >
                <Input
                  maxLength={5}
                  onKeyPress={(e) => {
                    if (!/[0-9]/.test(e.key)) e.preventDefault();
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Número de Dispositivo Seguridad"
                name="NumeroDispositivo"
                rules={[{ required: true, message: 'Please enter the Número de Dispositivo Seguridad' }]}
              >
                <Input
                  maxLength={3}
                  onKeyPress={(e) => {
                    if (!/[0-9]/.test(e.key)) e.preventDefault();
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Equipamiento"
                name="Equipamiento"
                rules={[{ required: true, message: 'Please enter the Equipamiento' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Tamaño del equipamiento"
                name="TamanioEquipamiento"
                rules={[{ required: true, message: 'Please enter the Tamaño del equipamiento' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Tipo de Carga"
                name="TipoCarga"
                rules={[{ required: true, message: 'Please enter the Tipo de Carga' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Número o Números de Identificación"
                name="NIdentificacionContenedor"
                rules={[{ required: true, message: 'Please enter the Número o Números de Identificación' }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
        </Collapse.Panel>
      </Collapse>
          <Row gutter={16}>
            <Col span={24} style={{ textAlign: 'right' }}>
            <Button
            type="primary"
            htmlType="submit"
            style={{ paddingTop: '6px' }}
            >
            Submit
            </Button>
              <Button
                // onClick={DialogCancelarDuca}
                style={{ marginLeft: 8 }}
              >
                Cancelar
              </Button>
            </Col>
          </Row>
        </Form>
      </TabPane>


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
