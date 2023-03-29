import axios from 'axios';

const API_KEY = '641db5920596099ce1528402';

const apiClient = axios.create({
  baseURL: `https://${API_KEY}.mockapi.io/api`,
  headers: {
    'Content-type': 'application/json',
  },
});

const findAll = async (endpoint: string) => {
  const response = await apiClient.get<any[]>(endpoint);
  return response.data;
};

const findById = async (endpoint: string) => {
  const response = await apiClient.get<any>(endpoint);
  return response.data;
};

const create = async (endpoint: string, data: any) => {
  const response = await apiClient.post<any>(endpoint, data);
  return response.data;
};

const deleteById = async (endpoint: string) => {
  const response = await apiClient.delete<any>(endpoint);
  return response.data;
};

const ApiService = {
  findAll,
  findById,
  create,
  deleteById,
};

export default ApiService;
