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

const findByTitle = async (endpoint: string) => {
  const response = await apiClient.get<any[]>(endpoint);
  return response.data;
};

const create = async (endpoint: string, data: any) => {
  const response = await apiClient.post<any>(endpoint, data);
  return response.data;
};

const update = async (endpoint: string, title: string) => {
  const response = await apiClient.put<any>(endpoint, {
    title,
  });
  return response.data;
};

const deleteById = async (endpoint: string) => {
  const response = await apiClient.delete<any>(endpoint);
  return response.data;
};

const deleteAll = async (endpoint: string) => {
  const response = await apiClient.delete<any>(endpoint);
  return response.data;
};

const ApiService = {
  findAll,
  findById,
  findByTitle,
  create,
  update,
  deleteById,
  deleteAll,
};

export default ApiService;
