import { Types } from 'mongoose';

export interface IFlatBooking {
  flat: Types.ObjectId; 
  name: string;
  email: string;
  phone: string;
  message?: string;
  user?: Types.ObjectId; 
}
