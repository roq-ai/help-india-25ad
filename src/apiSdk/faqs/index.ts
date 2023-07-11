import axios from 'axios';
import queryString from 'query-string';
import { FaqInterface, FaqGetQueryInterface } from 'interfaces/faq';
import { GetQueryInterface } from '../../interfaces';

export const getFaqs = async (query?: FaqGetQueryInterface) => {
  const response = await axios.get(`/api/faqs${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createFaq = async (faq: FaqInterface) => {
  const response = await axios.post('/api/faqs', faq);
  return response.data;
};

export const updateFaqById = async (id: string, faq: FaqInterface) => {
  const response = await axios.put(`/api/faqs/${id}`, faq);
  return response.data;
};

export const getFaqById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/faqs/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteFaqById = async (id: string) => {
  const response = await axios.delete(`/api/faqs/${id}`);
  return response.data;
};
