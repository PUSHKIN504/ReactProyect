import axios from 'axios';

const API_URL = 'https://localhost:44380/api/PersonaNatural';
const API_KEY = '4b567cb1c6b24b51ab55248f8e66e5cc';


const API_URLPERSONA = 'https://localhost:44380/api/Personas/Listar';
const axiosInstance = axios.create({
  headers: {
    'XApiKey': API_KEY,
    'accept': '/',
  }
});

export const get = async () => {
  try {
    const response = await axiosInstance.get(`${API_URL}/Listar`);
    console.log('Respuesta de la API:', response.data);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};
export const getPerson = async () => {
    try {
      const response = await axiosInstance.get('https://localhost:44380/api/Personas/Listar');
      return response.data.data;
    } catch (error) {
      throw error;
    }
  };

  export const getPais = async () => {
    try {
      const response = await axiosInstance.get('https://localhost:44380/api/Paises/Listar?pais_EsAduana=true');
      return response.data.data;
    } catch (error) {
      throw error;
    }
  };
  export const getProvincias = async () => {
    try {
      const response = await axiosInstance.get('https://localhost:44380/api/Provincias/Listar?pvin_EsAduana=false');
      return response.data.data;
    } catch (error) {
      throw error;
    }
  };

  export const getCiudades = async () => {
    try {
      const response = await axiosInstance.get('https://localhost:44380/api/Ciudades/Listar?ciud_EsAduana=true');
      return response.data.data;
    } catch (error) {
      throw error;
    }
  };

  export const getCiudadesPorProvincia = async (id) => {
    try {
      const response = await axiosInstance.get('https://localhost:44380/api/Ciudades/CiudadesFiltradaPorProvincias?pvin_Id=' + id);
      return response.data.data;
    } catch (error) {
      throw error;
    }
  };


export const insertar = async (subcategoria) => {
  try {
    const response = await axiosInstance.post(`${API_URL}/Insertar`, subcategoria, {
      headers: {
        'Content-Type': 'application/json',
      }
    });

      if (response.data && response.data.success && response.data.data && response.data.data.messageStatus) {
        return { success: true, data: response.data }; 
      } else {
        throw new Error('Error');
      }
    // return response.data;
  } catch (error) {
    throw error;
  }
};

// export const subi = async (subcategoria) => {
//   try {
//     const response = await axiosInstance.post(`${API_URL}/Insertar`, subcategoria, {
//       headers: {
//         'Content-Type': 'application/json',
//       }
//     });
//     return response.data;
//   } catch (error) {
//     throw error;
//   }
// };

export const editar = async (subcategoria) => {
  try {
    const response = await axiosInstance.post(`${API_URL}/Editar`, subcategoria, {
      headers: {
        'Content-Type': 'application/json',
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const finalizar = async (talla) => {
  try {
    const response = await axiosInstance.post(`${API_URL}/Finalizar`, talla, {
      headers: {
        'Content-Type': 'application/json',
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
