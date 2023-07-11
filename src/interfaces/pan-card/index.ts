import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface PanCardInterface {
  id?: string;
  pan_number: string;
  user_id: string;
  status: string;
  digital_copy?: string;
  created_at?: any;
  updated_at?: any;

  user?: UserInterface;
  _count?: {};
}

export interface PanCardGetQueryInterface extends GetQueryInterface {
  id?: string;
  pan_number?: string;
  user_id?: string;
  status?: string;
  digital_copy?: string;
}
