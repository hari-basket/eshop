import { OrderItem } from './order-item';
import { User } from '@maa/users';

export class Order {
  id?: number;
  user_id?: number;
  order_items?: OrderItem[];
  status?: number;
  total_price?: number;
  user?: User;
  createdAt?: string;
  updatedAt?: string;
}
