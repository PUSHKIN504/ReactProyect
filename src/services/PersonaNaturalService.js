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

export const insertar = async (subcategoria) => {
  try {
    const response = await axiosInstance.post(`${API_URL}/Insertar`, subcategoria, {
      headers: {
        'Content-Type': 'application/json',
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

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

export const eliminar = async (talla) => {
  try {
    const response = await axiosInstance.post(`${API_URL}/Eliminar`, talla, {
      headers: {
        'Content-Type': 'application/json',
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
