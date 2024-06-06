import React from 'react';
import { Form,Modal, Input, DatePicker, Select, Button, Tabs, Row,Collapse, Col,Divider, Checkbox,Table,Space,Tooltip,MenuItem, Menu  } from 'antd';
import  { useState,useEffect } from 'react';
import { useNavigate  } from 'react-router-dom';
import axios from 'axios';
import { SearchOutlined,CheckOutlined,EditOutlined,InfoCircleOutlined,MoreOutlined ,DeleteOutlined   } from '@ant-design/icons';
// import { useForm, Controller } from 'react-hook-form';
import { useForm } from 'react-hook-form';





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
  const [filasItems, setFilasItems] = useState(10);
  const [searchTextItems, setSearchTextItems] = useState('');
  const [searchTextItemsCompletados, setSearchTextItemsCompletados] = useState('');
  const [completarItem, setCompletarItem] = useState(true);
  const [Item_Id, setItem_Id] = useState(true);
  const [ListadoItems, setListadoItems] = useState([]);
  const [ListadoItemsFull, setListadoItemsFull] = useState([]);
  const [isEditItem, setIsEditItem] = useState(false);
  const [getisvalid, setisvalid] = useState(false);
  const [filasItemsCompletados, setFilasItemsCompletados] = useState(10);
  const [ListadoItemsCompletados, setListadoItemsCompletados] = useState([]);
  const [collapseDocumentosSoporte, setCollapseDocumentosSoporte] = useState(false);
  const [documentosSoporteList, setDocumentosSoporteList] = useState([]);
    const [isEditDocumentoSoporte, setIsEditDocumentoSoporte] = useState(false);
    const [anchorElDocumentos, setAnchorElDocumentos] = useState({});
    const [tiposDocumentos, setTiposDocumentos] = useState([]);

  const navigate = useNavigate();
  const [selectedDevIds, setSelectedDevIds] = useState([]);
  const [form1] = Form.useForm();
  const [form] = Form.useForm();
  const [form2] = Form.useForm();
  const [form3] = Form.useForm();
  const [form4] = Form.useForm();
  const [ListadoDucas, setListadoDucas] = useState([]);
  const [cargandoData, setCargandoData] = useState([]);
  const [activeTab, setActiveTab] = useState("1");
  const [dataDevas, setDataDevas] = useState([]);
    const [Paises, setPaises] = useState([]);
    const [Paisesprocedencia, setPaisesProcedencia] = useState([]);
    const [getRegimenesAduaneros, setRegimenesAduaneros] = useState([]);
    const [values1, setValues1] = useState({});
    const [values2, setValues2] = useState({});
    const [getaduanas, setAduanas] = useState([]);
    const [idsDevasContieneDuca, setidsDevasContieneDuca] = useState([]);
  const [filasDevas, setFilasDevas] = React.useState(10);
  const [searchTextDevas, setSearchTextDevas] = React.useState('');
  const [loadingGuardarDevas, setLoadingGuardarDevas] = React.useState(false);
  const [showTransportistaFields, setShowTransportistaFields] = useState(false);
const [modalVisible, setModalVisible] = useState(false);
const [dataLugarDesembarque, setdataLugarDesembarque] = useState([]);
const [getLugarDesembarque, setLugarDesembarque] = useState([]);
const [TextLugarDesembarque, setTextLugarDesembarque] = useState("");
const [collapseConductor, setCollapseConductor] = useState(false);
const [SearchTextLugarDesembarque, setSearchTextLugarDesembarque] = useState("");
const [getmodosTransporte, setModosTransporte] = useState([]);
const [loadingGuardarTab2, setLoadingGuardarTab2] = useState(false);
const [isValid2, setIsValid2] = useState(true);
const [datosTab2, setDatosTab2] = useState({});
const [getducaid, setducaid] = useState({});
async function ModosTransporte() {
  try {
    const response = await axiosInstance.get("https://localhost:44380/api/ModoTransporte/Listar"); //copiar url despues del endpoint
    const data = response.data.data.map((item) => {
      return {
        value: item.motr_Id,
        label: item.motr_Descripcion,
      };
    });
    setModosTransporte(data) ;
  } catch (error) {
    
  }
}
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
                      icon={<CheckOutlined />}
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
        ModosTransporte();
        CargarDatospaises();
        RegimenesAduaneros();
        aduanas();
        setListadoItems(ListadoItemsFull.filter(item => item.item_PesoBruto === null));
        ListarItems();
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
  useEffect(() => {
    setListadoItems(ListadoItemsFull.filter(item => item.item_PesoBruto === null));
    setListadoItemsCompletados(ListadoItemsFull.filter(item => item.item_PesoBruto !== null));

  }, [ListadoItemsFull, ListadoItems]);
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

async function InsertarDevaPorDuca() {
  try {
    let duca= parseInt(localStorage.getItem("duca_Id"));
      let datos = {
        

          "duca_Id": duca,
          "deva_Id": localStorage.getItem("deva"),
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
                              

                              if (allCorrect) {
                                  setidsDevasContieneDuca(selectedDevIds);
                              }
                          }
                      }
                  } else {
                      const liberarDevasResponse = await LiberarDevasPorDucaId();
                      console.log("entro al liberar");

                      if (liberarDevasResponse.data.data.messageStatus === "1") {
                          let allCorrect = true;
                         

                          if (allCorrect) {
                              setidsDevasContieneDuca(selectedDevIds);
                          }
                      }

                      console.log("esta en el else ");
                  }
              }
              console.log("esta ajuera" + selectedDevIds);
              localStorage.setItem("deva", selectedDevIds);

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
      const response1 = await axiosInstance.post(`${API_URL}PreInsertar`, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      let idDuca = response1.data.data.messageStatus;
      localStorage.setItem("duca_Id", String(idDuca));
      console.log("id duca:", idDuca);
      setducaid(idDuca);
      InsertarDevaPorDuca();

      // const response2 = await axiosInstance.post(InsertarDevaPorDuca,{
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      // });

      // console.log( response2.data.data.messageStatus);
      const values2 = {
        duca_Id: idDuca,
        duca_No_Duca: values.duca_No_Duca,
        duca_No_Correlativo_Referencia: values.duca_No_Correlativo_Referencia,
        duca_AduanaRegistro: values.duca_AduanaRegistro,
        duca_AduanaDestino: parseInt(values.duca_AduanaDestino),
        duca_Regimen_Aduanero: values.duca_Regimen_Aduanero,
        duca_Modalidad: values.duca_Modalidad,
        duca_Clase: values.duca_Clase,
        duca_FechaVencimiento: values.duca_FechaVencimiento.toISOString(),
        duca_Pais_Procedencia: values.duca_Pais_Procedencia,
        duca_Pais_Destino: values.duca_Pais_Destino,
        duca_Deposito_Aduanero: values.duca_Deposito_Aduanero,
        duca_Lugar_Desembarque: values.duca_Lugar_Desembarque, // Ensure this matches the expected NVARCHAR(MAX) type
        duca_Manifiesto: values.duca_Manifiesto,
        duca_Titulo: values.duca_Titulo,
        trli_Id: 2, // Adjust based on your logic
        usua_UsuarioCreacion: 1,
        duca_FechaCreacion: new Date().toISOString()
      };
      console.log('Tab 1 values:', values2);

      const response = await axiosInstance.post(`${API_URL}InsertPart1`, values2, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setActiveTab("3");

      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  const handleClickDocumentos = (event, id) => {
    setAnchorElDocumentos(prevState => ({
        ...prevState,
        [id]: event.currentTarget,
    }));
};

const handleCloseDocumentos = (id) => {
  setAnchorElDocumentos(prevState => ({
      ...prevState,
      [id]: null,
  }));
};
const handleDeleteDocumentos = (id) => {
  eliminarDocumentoSoporte(id);
  handleCloseDocumentos(id);
};

const abrirbusqueda = () => {
        setModalVisible(true);
    };
    const onClose = () => {
        setModalVisible(false);
    };
    const handleChangeFilasItems = (event) => {
      setFilasItems(event.target.value);
  };
  const handleSearchChangeItemsCompletados = (event) => {
    setSearchTextItemsCompletados(event.target.value);
}
const handleSearchChangeItems = (event) => {
  setSearchTextItems(event.target.value);
}
const columnsItems = [
  {
      title: 'No.',
      dataIndex: 'id',
      key: 'id',
      sorter: (a, b) => a.id - b.id
  },
  {
      title: 'Id Item',
      dataIndex: 'item_Id',
      key: 'item_Id',
      sorter: (a, b) => a.item_Id - b.item_Id
  },
  {
      title: 'País Origen',
      dataIndex: 'nombrePaisOrigen',
      key: 'nombrePaisOrigen',
      sorter: (a, b) => a.nombrePaisOrigen.localeCompare(b.nombrePaisOrigen),
  },
  {
      title: 'Cantidad',
      dataIndex: 'item_Cantidad',
      key: 'item_Cantidad',
      sorter: (a, b) => a.item_Cantidad - b.item_Cantidad,
  },
  {
      title: 'Clasificación Arancelaria',
      dataIndex: 'item_ClasificacionArancelaria',
      key: 'item_ClasificacionArancelaria',
      sorter: (a, b) => a.item_ClasificacionArancelaria.localeCompare(b.item_ClasificacionArancelaria),
  },
  {
    title: 'Acciones',
    key: 'operationItems',
    render: (params) => (
      <div key={params.item_Id}>
        <Space direction="horizontal" size="middle">
          <Button
            aria-controls={`menu-${params.item_Id}`}
            aria-haspopup="true"
            onClick={() => handleCompletarItem(params.item_Id)}
            style={{
              borderRadius: '10px',
              backgroundColor: '#634A9E',
              color: 'white',
            }}
            icon={<CheckOutlined />}
          >
            Completar Item
          </Button>
        </Space>
      </div>
    ),
  },
];
async function ListarDevasxNoDuca() {
  try {
      const ducaId = parseInt(localStorage.getItem("duca_Id"));
      const response = await axiosInstance.get(`https://localhost:44380/api/ItemsDEVAxDUCA/ListadoDevasPorducaId?duca_Id=${ducaId}`);
      
      const devas = response.data.data.map(element => element.deva_Id);

      return devas;
  } catch (error) {
      console.error("Error fetching DEVA IDs:", error);
      throw error;  // Rethrow the error if you want to handle it elsewhere
  }
}
async function ListarFacturasPorDevaId(deva_Id) {
  try {
      const response = await axiosInstance.get(`https://localhost:44380/api/Facturas/Listar?deva_Id=${deva_Id}`);
      
      const facturas = response.data.data.map(element => element.fact_Id);

      return facturas;
  } catch (error) {
      console.error("Error fetching factura IDs:", error);
      throw error;  // Rethrow the error if you want to handle it elsewhere
  }
}
async function ListarItemsPorfact_Id(fact_Id) {
  try {
      const response = await axiosInstance.get(`https://localhost:44380/api/Items/Listar?fact_Id=${fact_Id}`);
      
      return response.data.data;
  } catch (error) {
      console.error("Error fetching items by factura ID:", error);
      throw error;  // Rethrow the error if you want to handle it elsewhere
  }
}
const ListarItems = async () => {
  if (getducaid) {
    const devas = await ListarDevasxNoDuca();

      let facturas = [];

      for (let index = 0; index < devas.length; index++) {

          const fact_devas = await ListarFacturasPorDevaId(devas[index]);

          if (fact_devas.length > 0) {
              fact_devas.forEach(element => {
                  facturas.push(element);
              })
          }
      }
      console.log("coso");

      let items = [];

      for (let index = 0; index < facturas.length; index++) {
          const item = await ListarItemsPorfact_Id(facturas[index]);
          console.log(item);

          if (item.length > 0) {
              item.forEach(element => {
                  items.push(element);
              });
          }
      }
      // setListadoItemsFull(items.map((item, index) => {
      //     return {
      //         id: index + 1,
      //         item_Id: item.item_Id,
      //         fact_Id: item.fact_Id,
      //         item_Cantidad: item.item_Cantidad,
      //         item_Cantidad_Bultos: item.item_Cantidad_Bultos,
      //         item_ClaseBulto: item.item_ClaseBulto,
      //         item_Acuerdo: item.item_Acuerdo,
      //         item_PesoNeto: item.item_PesoNeto,
      //         item_PesoBruto: item.item_PesoBruto,
      //         unme_Id: item.unme_Id,
      //         item_IdentificacionComercialMercancias: item.item_IdentificacionComercialMercancias,
      //         item_CaracteristicasMercancias: item.item_CaracteristicasMercancias,
      //         item_Marca: item.item_Marca,
      //         item_Modelo: item.item_Modelo,
      //         merc_Id: item.merc_Id,
      //         pais_IdOrigenMercancia: item.pais_IdOrigenMercancia,
      //         nombrePaisOrigen: item.nombrePaisOrigen,
      //         item_ClasificacionArancelaria: item.item_ClasificacionArancelaria,
      //         item_ValorUnitario: item.item_ValorUnitario,
      //         item_GastosDeTransporte: item.item_GastosDeTransporte,
      //         item_ValorTransaccion: item.item_ValorTransaccion,
      //         item_Seguro: item.item_Seguro,
      //         item_OtrosGastos: item.item_OtrosGastos,
      //         item_ValorAduana: item.item_ValorAduana,
      //         item_CuotaContingente: item.item_CuotaContingente,
      //         item_ReglasAccesorias: item.item_ReglasAccesorias,
      //         item_CriterioCertificarOrigen: item.item_CriterioCertificarOrigen,
      //         usua_UsuarioCreacion: item.usua_UsuarioCreacion,
      //         usuarioCreacionNombre: item.usuarioCreacionNombre,
      //         item_FechaCreacion: item.item_FechaCreacion,
      //         usua_UsuarioModificacion: item.usua_UsuarioModificacion,
      //         usuarioModificacionNombre: item.usuarioModificacionNombre,
      //         usua_UsuarioEliminacion: item.usua_UsuarioEliminacion,
      //         item_FechaEliminacion: item.item_FechaEliminacion,
      //         item_FechaModificacion: item.item_FechaModificacion,
      //         item_Estado: item.item_Estado
      //     }
      // }));
      setListadoItemsFull(items.map((item, index) => ({
        key: index + 1, // Use key for unique identifier
        ...item,
      })));
  }
}
const handleCompletarItem = (id) => {
  setCompletarItem(false);
  setItem_Id(id);
  setValues3_Items("Item_Id", id);

}
const camposToFilterItems = ["id", "item_Id", "nombrePaisOrigen", "item_Cantidad", "item_ClasificacionArancelaria"];

    const filteredRowsItems = ListadoItems.filter((row) => {
        if (searchTextItems === "") {
            return true; // Mostrar todas las filas si el buscador está vacío
        }

        for (const [key, value] of Object.entries(row)) {
            if (camposToFilterItems.includes(key)) {
                const formattedValue =
                    typeof value === "number"
                        ? value.toString()
                        : value.toString().toLowerCase();
                const formattedSearchText =
                    typeof searchTextItems === "number"
                        ? searchTextItems.toString()
                        : searchTextItems.toLowerCase();
                if (formattedValue.includes(formattedSearchText)) {
                    return true;
                }
            }
        }
        return false;
    }
    );
  const onFinishTab2 = async (values3) => {
    try {
      
        setLoadingGuardarTab2(true);
       
          const values5 = {
            duca_Id: getducaid,
            duca_Codigo_Declarante: values3.duca_Codigo_Declarante,
            duca_Numero_Id_Declarante: values3.duca_Numero_Id_Declarante,
            duca_NombreSocial_Declarante: values3.duca_NombreSocial_Declarante,
            duca_DomicilioFiscal_Declarante: values3.duca_DomicilioFiscal_Declarante,
            duca_Codigo_Transportista: values3.duca_Codigo_Transportista,
            duca_Transportista_Nombre: values3.duca_Transportista_Nombre,
            motr_Id: values3.motr_Id,
            cont_NoIdentificacion: values3.cont_NoIdentificacion,
            cont_Licencia: values3.cont_Licencia,
            pais_IdExpedicion: values3.pais_IdExpedicion,
            cont_Nombre: values3.cont_Nombre,
            cont_Apellido: values3.cont_Apellido,
            pais_Id: values3.pais_Id,
            marca_Id: values3.marca_Id,
            tran_IdUnidadTransporte: values3.tran_IdUnidadTransporte,
            tran_Chasis: values3.tran_Chasis,
            tran_Remolque: values3.tran_Remolque,
            tran_CantCarga: values3.tran_CantCarga,
            tran_NumDispositivoSeguridad: values3.tran_NumDispositivoSeguridad,
            tran_Equipamiento: values3.tran_Equipamiento,
            tran_TamanioEquipamiento: values3.tran_TamanioEquipamiento,
            tran_TipoCarga: values3.tran_TipoCarga,
            tran_IdContenedor: values3.tran_IdContenedor,
            usua_UsuarioCreacion: 1,
            tran_FechaCreacion: new Date().toISOString()
          };
          console.log('Tab 2 values:', values5);

          const respuesta = await axiosInstance.post(`${API_URL}InsertPart2`, values5, {
            headers: {
              'Content-Type': 'application/json',
            },
          });
          if (respuesta.data.data !== null) {
            if (respuesta.data.data.codeStatus === 1) {
              setLoadingGuardarTab2(false);
              setValues2((prev) => ({
                ...prev,
                duca_Conductor_Id: parseInt(respuesta.data.data.messageStatus)
              }));
              setActiveTab("4");
              ListarItems();

              console.log(activeTab);
              console.log("guardado con exito");
            } else {
                console.log("error")
            }
          }
        // }
      
    } catch (error) {
      console.log("Error. Ocurrió un error al intentar realizar la operación");
      console.error(error);
    }
  };

  async function InsertarItem(modelo) {
    console.log(modelo);

    try {
        let datos = {
            item_Id: modelo.Item_Id,
            item_Cantidad_Bultos: modelo.CantidadBultos,
            item_ClaseBulto: modelo.ClaseBulto,
            item_Acuerdo: modelo.Acuerdo,
            item_PesoNeto: modelo.PesoNeto,
            item_PesoBruto: modelo.PesoBruto,
            item_GastosDeTransporte: modelo.GastosTransporte,
            item_Seguro: modelo.Seguro,
            item_OtrosGastos: modelo.OtrosGastos,
            item_CuotaContingente: modelo.CuotaContingente,
            item_ReglasAccesorias: modelo.ReglasAccesorias,
            item_CriterioCertificarOrigen: modelo.CriterioParaOrigen,
            usua_UsuarioModificacion: 1,
            item_FechaModificacion: new Date(),
        }

        const response = await axiosInstance.post("https://localhost:44380/api/Items/EditarItemDuca", datos);

        return response;
    } catch (error) {
        console.error(error);
    }
}
const handleChangeFilasItemsCompletados = (event) => {
  setFilasItemsCompletados(event.target.value);
};
const camposToFilterItemCompletados = ["id", "item_Id", "item_Cantidad_Bultos", "item_PesoNeto", "item_GastosDeTransporte", "item_Seguro"];

    const filteredRowsItemsCompletados = ListadoItemsCompletados.filter((row) => {
        if (searchTextItemsCompletados === "") {
            return true; // Mostrar todas las filas si el buscador está vacío
        }

        for (const [key, value] of Object.entries(row)) {
            if (camposToFilterItemCompletados.includes(key)) {
                const formattedValue =
                    typeof value === "number"
                        ? value.toString()
                        : value.toString().toLowerCase();
                const formattedSearchText =
                    typeof searchTextItemsCompletados === "number"
                        ? searchTextItemsCompletados.toString()
                        : searchTextItemsCompletados.toLowerCase();
                if (formattedValue.includes(formattedSearchText)) {
                    return true;
                }
            }
        }
        return false;
    }
    );
const columnsItemsCompletados = [
  {
      title: 'No.',
      dataIndex: 'id',
      key: 'id',
      sorter: (a, b) => a.id - b.id
  },
  {
      title: 'Id Item',
      dataIndex: 'item_Id',
      key: 'item_Id',
      sorter: (a, b) => a.item_Id - b.item_Id
  },
  {
      title: 'Cantidad Bultos',
      dataIndex: 'item_Cantidad_Bultos',
      key: 'item_Cantidad_Bultos',
      sorter: (a, b) => a.item_Cantidad_Bultos - b.item_Cantidad_Bultos,
  },
  {
      title: 'Peso Neto',
      dataIndex: 'item_PesoNeto',
      key: 'item_PesoNeto',
      sorter: (a, b) => a.item_PesoNeto - b.item_PesoNeto,
  },
  {
      title: 'Gastos de transporte',
      dataIndex: 'item_GastosDeTransporte',
      key: 'item_GastosDeTransporte',
      sorter: (a, b) => a.item_GastosDeTransporte - b.item_GastosDeTransporte,
  },
  {
      title: 'Seguro',
      dataIndex: 'item_Seguro',
      key: 'item_Seguro',
      sorter: (a, b) => a.item_Seguro - b.item_Seguro,
  },
  {
      title: 'Acciones',
      key: 'operationItemsCompletados',
      render: (params) =>
          <div key={params.item_Id}>
              <Button
                  aria-controls={`menu-${params.item_Id}`}
                  aria-haspopup="true"
                  onClick={() => { handleEditItems(params) }}
                  style={{
                      borderRadius: '10px',
                      backgroundColor: "#634A9E",
                      color: "white",
                  }}
                  icon={<EditOutlined />}
              >
                  Editar
              </Button>
          </div>
      ,
  },
];
const handleEditItems = (params) => {
  reset3_Items();
  setIsEditItem(true);
  setCompletarItem(false);

  setValues3_Items("Item_Id", params.item_Id, { shouldValidate: true, shouldTouch: true });
  setValues3_Items("CantidadBultos", params.item_Cantidad_Bultos, { shouldValidate: true, shouldTouch: true });
  setValues3_Items("ClaseBulto", params.item_ClaseBulto, { shouldValidate: true, shouldTouch: true });
  setValues3_Items("PesoNeto", params.item_PesoNeto, { shouldValidate: true, shouldTouch: true });
  setValues3_Items("PesoBruto", params.item_PesoBruto, { shouldValidate: true, shouldTouch: true });
  setValues3_Items("CuotaContingente", params.item_CuotaContingente, { shouldValidate: true, shouldTouch: true });
  setValues3_Items("Acuerdo", params.item_Acuerdo, { shouldValidate: true, shouldTouch: true });
  setValues3_Items("CriterioParaOrigen", params.item_CriterioCertificarOrigen, { shouldValidate: true, shouldTouch: true });
  setValues3_Items("ReglasAccesorias", params.item_ReglasAccesorias, { shouldValidate: true, shouldTouch: true });
  setValues3_Items("GastosTransporte", params.item_GastosDeTransporte, { shouldValidate: true, shouldTouch: true });
  setValues3_Items("Seguro", params.item_Seguro, { shouldValidate: true, shouldTouch: true });
  setValues3_Items("OtrosGastos", params.item_OtrosGastos, { shouldValidate: true, shouldTouch: true });
};
const { setValue: setValues3_Items, reset: reset3_Items } = useForm({
  defaultValues: {
    Item_Id: '',
    CantidadBultos: '',
    ClaseBulto: '',
    PesoNeto: '',
    PesoBruto: '',
    CuotaContingente: '',
    Acuerdo: '',
    CriterioParaOrigen: '',
    ReglasAccesorias: '',
    GastosTransporte: '',
    Seguro: '',
    OtrosGastos: '',
  },
});
async function EditarDocumentoSoporte(modelo2) {
  try {
      let datos = {
          doso_Id: modelo2.doso_Id,
          tido_Id: modelo2.CodigoTipoDocumento.value,
          doso_NumeroDocumento: modelo2.NumeroDocumento,
          doso_FechaEmision: modelo2.EmisionDocumento,
          doso_FechaVencimiento: modelo2.FechaVencimiento,
          doso_PaisEmision: modelo2.PaisEmision?.value,
          doso_LineaAplica: modelo2.Linea,
          doso_EntidadEmitioDocumento: modelo2.AutoridadEntidad,
          doso_Monto: modelo2.Monto,
          usua_UsuarioModificacion: 1,
          doso_FechaModificacion: new Date(),
      }

      const response = await axiosInstance.post('https://localhost:44380/api/Duca/EditarPart3', datos);

      return response;
  } catch (error) {
      console.error(error);
  }
}
async function InsertarDocumentoSoporte(modelo9) {
  try {
      let datos = {
          tido_Id: modelo9.CodigoTipoDocumento.value,
          duca_Id: getducaid,
          doso_NumeroDocumento: modelo9.NumeroDocumento,
          doso_FechaEmision: modelo9.EmisionDocumento,
          doso_FechaVencimiento: modelo9.FechaVencimiento,
          doso_PaisEmision: modelo9.PaisEmision,
          doso_LineaAplica: modelo9.Linea,
          doso_EntidadEmitioDocumento: modelo9.AutoridadEntidad,
          doso_Monto: modelo9.Monto,
          usua_UsuarioCreacion: 1,
          doso_FechaCreacion: new Date(),
      }

      console.log(datos);
      const response = await axiosInstance.post('https://localhost:44380/api/Duca/InsertPart3', datos);
      return response;
  } catch (error) {
      console.error(error);
  }
}
const guardarTab3_DocumentosSoporte = async (value9) => {
  if (isEditDocumentoSoporte) {
      
          const respuesta = await EditarDocumentoSoporte(value9);
          if (respuesta.data.data !== null) {
              if (respuesta.data.data.messageStatus === "1") {
                  setIsEditDocumentoSoporte(false);
                  getDocumentosSoporteListByNoDuca();
              } else {
                console.log("error segunto else1");
              }
          }
      
  } else {
      
          const respuesta = await InsertarDocumentoSoporte(value9);
          if (respuesta.data.data !== null) {
              if (respuesta.data.data.messageStatus === "1") {
                  getDocumentosSoporteListByNoDuca();
              } else {
                console.log("error segunto else2");}
          }
      
  }
}
async function EliminarDocumentoSoporte(doso_Id) {
  try {
      const response = await axiosInstance.post(`https://localhost:44380/api/DocumentosDeSoporte/Eliminar?doso_Id=${doso_Id}`)

      return response;
  } catch (error) {
      console.error(error);
  }
}
const eliminarDocumentoSoporte = async (doso_Id) => {
  const respuesta = await EliminarDocumentoSoporte(doso_Id);

  if (respuesta.data.data !== null) {
      if (respuesta.data.data.messageStatus === "1") {
          console.log("Éxito. El registro se elimino correctamente.")
          getDocumentosSoporteListByNoDuca();
      } else {
          console.log("error segunto else");
      }
  }
}



const columnsDocumentos = [
  {
      title: 'No.',
      dataIndex: 'id',
      key: 'id',
      sorter: (a, b) => a.id - b.id
  },
  {
      title: 'Código del tipo Documento',
      dataIndex: 'tido_Codigo',
      key: 'tido_Codigo',
      sorter: (a, b) => a.tido_Codigo.localeCompare(b.tido_Codigo),
  },
  {
      title: 'Número de Documento',
      dataIndex: 'doso_NumeroDocumento',
      key: 'doso_NumeroDocumento',
      sorter: (a, b) => a.doso_NumeroDocumento.localeCompare(b.doso_NumeroDocumento),
  },
  {
    title: 'Acciones',
    key: 'operationDocumentos',
    render: (params) =>
        <div key={params.doso_Id}>
            <Space direction="horizontal">
                <Button
                    aria-controls={`menu-${params.doso_Id}`}
                    aria-haspopup="true"
                    onClick={(e) => handleClickDocumentos(e, params.doso_Id)}
                    shape="round"
                    style={{ backgroundColor: "#634A9E", color: "white" }}
                    icon={<MoreOutlined />}
                >
                    Opciones
                </Button>
                <Menu
                    id={`menu-${params.doso_Id}`}
                    anchorEl={anchorElDocumentos[params.doso_Id]}
                    open={Boolean(anchorElDocumentos[params.doso_Id])}
                    onClose={() => handleCloseDocumentos(params.doso_Id)}
                >
                    <Menu.Item onClick={() => handleEditDocumentos(params)}>
                        <EditOutlined /> Editar
                    </Menu.Item>
                    <Menu.Item onClick={() => handleDeleteDocumentos(params.doso_Id)}>
                        <DeleteOutlined /> Eliminar
                    </Menu.Item>
                </Menu>
            </Space>
        </div>
    ,
},

];
const { control, setValue: setValues3_DocumentosSoporte, reset: reset3_DocumentosSoporte, handleSubmit } = useForm();
const handleEditDocumentos = (params) => {
  setIsEditDocumentoSoporte(true);
  reset3_DocumentosSoporte();

  setValues3_DocumentosSoporte("doso_Id", params.doso_Id);
  setValues3_DocumentosSoporte("CodigoTipoDocumento", tiposDocumentos.find(item => item.value == params.tido_Id), { shouldValidate: true, shouldTouch: true });
  setValues3_DocumentosSoporte("NumeroDocumento", params.doso_NumeroDocumento, { shouldValidate: true });
  setValues3_DocumentosSoporte("EmisionDocumento", params.doso_FechaEmision);
  setValues3_DocumentosSoporte("FechaVencimiento", params.doso_FechaVencimiento);
  setValues3_DocumentosSoporte("PaisEmision", Paises.find(item => item.value == params.doso_PaisEmision));
  setValues3_DocumentosSoporte("Linea", params.doso_LineaAplica);
  setValues3_DocumentosSoporte("AutoridadEntidad", params.doso_EntidadEmitioDocumento);
  setValues3_DocumentosSoporte("Monto", params.doso_Monto);

  handleCloseDocumentos(params.doso_Id);
};

async function ListarDocumentosSoporteByNoDuca() {
  try {
      const response = await axiosInstance.get('https://localhost:44380/api/DocumentosDeSoporte/Listar');

      const data = response.data.data.map((item, index) => {
          return {
              id: index + 1,
              doso_Id: item.doso_Id,
              tido_Id: item.tido_Id,
              tido_Codigo: item.tido_Codigo,
              tido_Descripcion: item.tido_Descripcion,
              duca_Id: item.duca_Id,
              doso_NumeroDocumento: item.doso_NumeroDocumento,
              doso_FechaEmision: item.doso_FechaEmision,
              doso_FechaVencimiento: item.doso_FechaVencimiento,
              doso_PaisEmision: item.doso_PaisEmision,
              doso_LineaAplica: item.doso_LineaAplica,
              doso_EntidadEmitioDocumento: item.doso_EntidadEmitioDocumento,
              doso_Monto: item.doso_Monto
          }
      })
      return data.filter((item) => item.duca_Id === parseInt(parseInt(getducaid)));
  } catch (error) {
      console.error(error);
  }
}
const getDocumentosSoporteListByNoDuca = async () => {
  try {
      const data = await ListarDocumentosSoporteByNoDuca();
      setDocumentosSoporteList(data);
  } catch (error) {
      console.log(error);
  }
}

  const onFinishTab3 = async (values4) => {
    console.log('Tab 3 values:', values4);
    try {
      const respuesta = await InsertarItem(values4);
      if (respuesta.data.data !== null) {
        if (respuesta.data.data.messageStatus === "1") {
          // reset3_Items();
          setCompletarItem(true);
          ListarItems();

          
            setIsEditItem(false);
          
        } else {
          console.log("error segunto else");

        }
      }
    } catch (error) {
      console.log("Error. Ocurrió un error al intentar realizar la operación");
      console.error(error);
    }
  };

  return (
    <Tabs  activeKey={activeTab} onChange={(key) => setActiveTab(key)} >
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
        

        <TabPane   tab="Identificación de la Declaración" key="2">
        <Form form={form1} onFinish={onFinish}>
          <Row gutter={[16, 16]}>
            <Col span={6}>
              <Form.Item
                label="Regimen Aduanero"
                name="duca_Regimen_Aduanero"
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
                name="duca_No_Duca"
                rules={[{ required: true, message: 'Please enter the DUCA number' }]}
              >
                <Input placeholder="DUCA number" />
              </Form.Item>
            </Col>

            <Col span={6}>
              <Form.Item
                label="duca_Id"
                name="duca_Id"
              >
                <Input value={localStorage.getItem("duca_Id")}  />
              </Form.Item >
            </Col>

            <Col span={6}>
              <Form.Item
                label="No. Correlativo o Referencia"
                name="duca_No_Correlativo_Referencia"
                rules={[{ required: true, message: 'Please enter the Correlativo or Referencia number' }]}
              >
                <Input placeholder="Correlativo or Referencia number" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label="Aduana Registro"
                name="duca_AduanaRegistro"
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
                name="duca_FechaVencimiento"
                rules={[{ required: true, message: 'Please select a Fecha de Vencimiento' }]}
              >
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label="País de Procedencia"
                name="duca_Pais_Procedencia"
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
                name="duca_Pais_Destino"
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
                        name="duca_Deposito_Aduanero"
                        rules={[{ required: true, message: 'Please input Depósito Aduanero / Zona Franca!' }]}
                    >
                        <Input />
                    </Form.Item>
                </Col>

                <Col xs={8}>
                    <Form.Item
                        label="Modalidad"
                        name="duca_Modalidad"
                        rules={[{ required: true, message: 'Please input Modalidad!' }]}
                    >
                        <Input />
                    </Form.Item>
                </Col>

                <Col xs={8}>
                    <Form.Item
                        label="Clase"
                        name="duca_Clase"
                        rules={[{ required: true, message: 'Please input Clase!' }]}
                    >
                        <Input />
                    </Form.Item>
                </Col>

                <Col xs={18}>
                    <Form.Item
                        label="Lugar de Desembarque"
                        name="duca_Lugar_Desembarque"
                        // rules={[{ required: true, message: 'Please select Lugar de Desembarque!' }]}
                    >
                     
                        <Select
                            showSearch
                            placeholder="Select a place"
                            optionFilterProp="children"
                            filterOption={(input, option) =>
                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                            }
                        >
                           {getLugarDesembarque.map((pais) => (
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
                name="duca_Manifiesto"
                rules={[{ required: true, message: 'Please enter the Manifiesto' }]}
              >
                <Input placeholder="Manifiesto" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                label="Titulo"
                name="duca_Titulo"
                rules={[{ required: true, message: 'Please enter the Titulo' }]}
              >
                <Input placeholder="Titulo" />
              </Form.Item>
            </Col>
            


            <Col span={6}>
        <Form.Item
            label="Aduana Destino:"
            name="duca_AduanaDestino"
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
        <Form form={form2} onFinish={onFinishTab2}>
          <Row gutter={16}>
            <Col span={24}>
              <Divider orientation="left">Declarante</Divider>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Código"
                name="duca_Codigo_Declarante"
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
                name="duca_Numero_Id_Declarante"
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
                name="duca_NombreSocial_Declarante"
                rules={[{ required: true, message: 'Please enter the Nombre o Razón Social' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="Domicilio Fiscal"
                name="duca_DomicilioFiscal_Declarante"
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
                name="duca_Codigo_Transportista"
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
                name="duca_Transportista_Nombre"
                rules={[{ required: true, message: 'Please enter the Nombre' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Modo de Transporte"
                name="motr_Id"
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
                  {getmodosTransporte.map((modo) => (
                    <Option key={modo.value} value={modo.value}>
                      {modo.label}
                    </Option>
                  ))}
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
      {collapseConductor && (<Collapse activeKey={collapseConductor ? '1' : ''}>
        <Collapse.Panel  key="1">
          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                label="No. Identificación"
                name="cont_NoIdentificacion"
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
                name="cont_Licencia"
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
                name="pais_IdExpedicion"
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
                name="cont_Nombre"
                rules={[{ required: true, message: 'Please enter the Nombres' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Apellidos"
                name="cont_Apellido"
                rules={[{ required: true, message: 'Please enter the Apellidos' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Id Unidad Transporte"
                name="tran_IdUnidadTransporte"
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
                name="pais_Id"
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
                name="marca_Id"
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
                name="tran_Chasis"
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
                name="tran_Remolque"
                rules={[{ required: true, message: 'Please enter the Identificación del Remolque' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Cantidad de Unidades Carga"
                name="tran_CantCarga"
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
                name="tran_NumDispositivoSeguridad"
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
                name="tran_Equipamiento"
                rules={[{ required: true, message: 'Please enter the Equipamiento' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Tamaño del equipamiento"
                name="tran_TamanioEquipamiento"
                rules={[{ required: true, message: 'Please enter the Tamaño del equipamiento' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Tipo de Carga"
                name="tran_TipoCarga"
                rules={[{ required: true, message: 'Please enter the Tipo de Carga' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Número o Números de Identificación"
                name="tran_IdContenedor"
                rules={[{ required: true, message: 'Please enter the Número o Números de Identificación' }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
        </Collapse.Panel>
      </Collapse>)}
          <Row gutter={16}>
            <Col span={24} style={{ textAlign: 'right' }}>
            <Button type="primary" htmlType="submit">
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

      <Tabs.TabPane tab="Mercancias" key="4">
        <Divider orientation="left">Mercancias</Divider>

        <Row gutter={16} style={{ marginTop: 16 }}>
          <Col span={24}>
            <Space direction="vertical" size={16}>
              <Select
                value={filasItems}
                onChange={handleChangeFilasItems}
                style={{ width: 120 }}
              >
                <Select.Option value={10}>10</Select.Option>
                <Select.Option value={20}>20</Select.Option>
                <Select.Option value={30}>30</Select.Option>
              </Select>

              <Input
                placeholder="Buscar"
                value={searchTextItems}
                onChange={handleSearchChangeItems}
                suffix={<SearchOutlined />}
                style={{ width: 200 }}
              />
            </Space>
          </Col>
        </Row>

        <Table
          columns={columnsItems}
          dataSource={filteredRowsItems}
          pagination={{
            pageSize: filasItems,
            showSizeChanger: false,
          }}
          size="small"
          style={{ marginTop: 16 }}
        />

        <Form form={form3} layout="vertical" onFinish={onFinishTab3}>
        <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                label="Id Item"
                name="Item_Id"
                rules={[{ required: true, message: 'Please enter the Id Item' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Cantidad Bultos"
                name="CantidadBultos"
                rules={[{ required: true, message: 'Please enter the Cantidad Bultos' }]}
              >
                <Input maxLength={3} onKeyPress={(event) => { if (!/[0-9]/.test(event.key)) { event.preventDefault(); } }} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Clase de Bultos"
                name="ClaseBulto"
                rules={[{ required: true, message: 'Please enter the Clase de Bultos' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Peso Neto"
                name="PesoNeto"
                rules={[{ required: true, message: 'Please enter the Peso Neto' }]}
              >
                <Input maxLength={12} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Peso Bruto"
                name="PesoBruto"
                rules={[{ required: true, message: 'Please enter the Peso Bruto' }]}
              >
                <Input maxLength={12} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Cuota Contingente"
                name="CuotaContingente"
                rules={[{ required: true, message: 'Please enter the Cuota Contingente' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Acuerdo"
                name="Acuerdo"
                rules={[{ required: true, message: 'Please enter the Acuerdo' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Criterio Para Certificar Origen"
                name="CriterioParaOrigen"
                rules={[{ required: true, message: 'Please enter the Criterio Para Certificar Origen' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Reglas Accesorias"
                name="ReglasAccesorias"
                rules={[{ required: true, message: 'Please enter the Reglas Accesorias' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Gastos de Transporte"
                name="GastosTransporte"
                rules={[{ required: true, message: 'Please enter the Gastos de Transporte' }]}
              >
                <Input maxLength={12} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Seguro"
                name="Seguro"
                rules={[{ required: true, message: 'Please enter the Seguro' }]}
              >
                <Input maxLength={12} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="Otros Gastos"
                name="OtrosGastos"
                rules={[{ required: true, message: 'Please enter the Otros Gastos' }]}
              >
                <Input maxLength={12} />
              </Form.Item>
            </Col>
            
          </Row>
          <Row gutter={16}>
            <Col span={24} style={{ textAlign: 'right' }}>
              <Button type="primary" htmlType="submit">
                Guardar
              </Button>
            </Col>
          </Row>
          <Col span={8}>
              <Button
                disabled={completarItem}
                icon={isEditItem ? "edit" : "add"}
                type="primary"
                style={{
                  borderRadius: "10px",
                  marginRight: "10px",
                  marginTop: "20px"
                }}
                sx={{
                  backgroundColor: "#D1AF3C",
                  color: "white",
                  "&:hover": { backgroundColor: "#EACB60" },
                }}
                  // onClick={() => {
                  //   if (!isValid3_Items) {
                  //     ToastWarning();
                  //   }
                  // }}
                htmlType="submit"
              >
                {isEditItem ? "Editar Mercancía" : "Completar Mercancía"}
              </Button>
            </Col>
        </Form>
        <Row>
    <Col span={24}>
        <Row justify="end" align="middle" gutter={16}>
            <Col>
                <label className='mt-8'>Filas por página:</label>
            </Col>
            <Col>
                <Select
                    value={filasItemsCompletados}
                    onChange={handleChangeFilasItemsCompletados}
                    style={{ width: 80 }}
                    size="small"
                >
                    <Option value={10}>10</Option>
                    <Option value={20}>20</Option>
                    <Option value={30}>30</Option>
                </Select>
            </Col>
            <Col>
                <Input
                    placeholder='Buscar'
                    value={searchTextItemsCompletados}
                    onChange={handleSearchChangeItemsCompletados}
                    size="small"
                    style={{ borderRadius: '10px', width: 200 }}
                    prefix={<SearchOutlined />}
                />
            </Col>
        </Row>
        <div className='center' style={{ width: '95%', margin: 'auto', marginTop: '20px' }}>
            <Table
                locale={{
                    triggerDesc: 'Ordenar descendente',
                    triggerAsc: 'Ordenar ascendente',
                    cancelSort: 'Cancelar',
                    emptyText: 'No data', // Replace this with your loading icon or message
                }}
                columns={columnsItemsCompletados}
                dataSource={filteredRowsItemsCompletados}
                size="small"
                pagination={{
                    pageSize: filasItemsCompletados,
                    showSizeChanger: false,
                    className: "custom-pagination",
                }}
            />
        </div>
    </Col>
</Row>
<div>
            <Checkbox
                defaultChecked={documentosSoporteList.length > 0}
                onClick={() => {
                    setCollapseDocumentosSoporte(!collapseDocumentosSoporte);
                    if (!collapseDocumentosSoporte) {
                        setIsEditDocumentoSoporte(false);
                    }
                }}
            >
                ¿Desea agregar Documentos de Soporte?
            </Checkbox>

            {collapseDocumentosSoporte && (
                <>
                    <Divider style={{ marginTop: '25px', marginBottom: '25px' }}>
                        Documentos de Soporte
                    </Divider>

                    <Form form={form4} onFinish={guardarTab3_DocumentosSoporte}>
                        <Space direction="vertical" size={16} style={{ display: 'flex' }}>
                            <Form.Item
                                name="CodigoTipoDocumento"
                                label="Código del Tipo Documento"
                                rules={[{ required: true, message: 'Por favor seleccione un tipo de documento' }]}
                            >
                                <Select placeholder="Seleccione un tipo de documento">
                                    {/* Replace with your actual options */}
                                    <Option value="1">Tipo 1</Option>
                                    <Option value="2">Tipo 2</Option>
                                </Select>
                            </Form.Item>

                            <Form.Item
                                name="NumeroDocumento"
                                label="Número de Documento"
                                rules={[{ required: true, message: 'Por favor ingrese el número de documento' }]}
                            >
                                <Input style={{ textTransform: "uppercase" }} />
                            </Form.Item>

                            <Form.Item
                                name="EmisionDocumento"
                                label="Fecha Emisión del Documento"
                                rules={[{ required: true, message: 'Por favor seleccione la fecha de emisión' }]}
                            >
                                <DatePicker  />
                            </Form.Item>

                            <Form.Item
                                name="FechaVencimiento"
                                label="Fecha Vencimiento del Documento"
                                rules={[{ required: true, message: 'Por favor seleccione la fecha de vencimiento' }]}
                            >
                                <DatePicker />
                            </Form.Item>

                            <Form.Item
                                name="PaisEmision"
                                label="País de Emisión"
                                rules={[{ required: true, message: 'Por favor seleccione el país de emisión' }]}
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

                            <Form.Item
                                name="Linea"
                                label="Linea (al que aplica el documento)"
                                rules={[{ required: true, message: 'Por favor ingrese la línea' }]}
                            >
                                <Input maxLength={4} onKeyPress={(event) => {
                                    if (!/[0-9]/.test(event.key)) {
                                        event.preventDefault();
                                    }
                                }} />
                            </Form.Item>

                            <Form.Item
                                name="AutoridadEntidad"
                                label={
                                    <>
                                        Autoridad o Entidad que Emitió
                                        <Tooltip title="el Documento">
                                            <InfoCircleOutlined style={{ marginLeft: 4, color: '#ADADAD' }} />
                                        </Tooltip>
                                    </>
                                }
                                rules={[{ required: true, message: 'Por favor ingrese la autoridad o entidad' }]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                name="Monto"
                                label="Monto"
                                rules={[{ required: true, message: 'Por favor ingrese el monto' }]}
                            >
                                <Input maxLength={10} onKeyPress={(event) => {
                                    if (!/[0-9]/.test(event.key)) {
                                        event.preventDefault();
                                    }
                                }} />
                            </Form.Item>

                            <Form.Item>
                                <Button
                                    type="primary"
                                    htmlType="submit"
                                    style={{
                                        borderRadius: "10px",
                                        marginRight: "10px",
                                        marginTop: "25px",
                                        backgroundColor: "#D1AF3C",
                                        color: "white",
                                    }}
                                    onClick={() => {
                                        if (!isEditDocumentoSoporte) {
                                            // Add your validation logic here
                                        }
                                    }}
                                >
                                    {isEditDocumentoSoporte ? "Editar Documento" : "Agregar Documento"}
                                </Button>
                            </Form.Item>
                        </Space>
                    </Form>

                    <div style={{ width: '95%', margin: 'auto', marginTop: '20px' }}>
                        <Table
                            locale={{
                                triggerDesc: 'Ordenar descendente',
                                triggerAsc: 'Ordenar ascendente',
                                cancelSort: 'Cancelar',
                                emptyText: "No Data", // Replace with your loading icon if needed
                            }}
                            columns={columnsDocumentos}
                            dataSource={documentosSoporteList}
                            size="small"
                            pagination={{
                                pageSize: 10,
                                showSizeChanger: false,
                                className: "custom-pagination",
                            }}
                        />
                    </div>
                </>
            )}
        </div>
      </Tabs.TabPane>             
   
    </Tabs>
  );
};

export default UDP_tbDuca_InsertarTab1;
