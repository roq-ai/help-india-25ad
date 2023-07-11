import axios from 'axios';
import queryString from 'query-string';
import { PanCardInterface, PanCardGetQueryInterface } from 'interfaces/pan-card';
import { GetQueryInterface } from '../../interfaces';

export const getPanCards = async (query?: PanCardGetQueryInterface) => {
  const response = await axios.get(`/api/pan-cards${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createPanCard = async (panCard: PanCardInterface) => {
  const response = await axios.post('/api/pan-cards', panCard);
  return response.data;
};

export const updatePanCardById = async (id: string, panCard: PanCardInterface) => {
  const response = await axios.put(`/api/pan-cards/${id}`, panCard);
  return response.data;
};

export const getPanCardById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/pan-cards/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deletePanCardById = async (id: string) => {
  const response = await axios.delete(`/api/pan-cards/${id}`);
  return response.data;
};
