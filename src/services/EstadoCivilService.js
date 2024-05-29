import axios from 'axios';

const API_URL = 'https://localhost:44380/api/EstadosCiviles';
const API_KEY = '4b567cb1c6b24b51ab55248f8e66e5cc';

const axiosInstance = axios.create({
  headers: {
    'XApiKey': API_KEY,
    'accept': '/',
  }
});
// `${BASE_URL}API/Alimento/Find/${idCombo}`

export const get = async () => {
  try {

    const response = await axiosInstance.get(`${API_URL}/Listar?escv_EsAduana=true`);
    console.log('Respuesta de la API:', response.data);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};



export const insertar = async (talla) => {
  try {
    const response = await axiosInstance.post(`${API_URL}/Insertar`, talla, {
      headers: {
        'Content-Type': 'application/json',
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const editar = async (talla) => {
  try {
    const response = await axiosInstance.post(`${API_URL}/Editar`, talla, {
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