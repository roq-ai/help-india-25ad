import { GetQueryInterface } from 'interfaces';

export interface FaqInterface {
  id?: string;
  question: string;
  answer: string;
  created_at?: any;
  updated_at?: any;

  _count?: {};
}

export interface FaqGetQueryInterface extends GetQueryInterface {
  id?: string;
  question?: string;
  answer?: string;
}
