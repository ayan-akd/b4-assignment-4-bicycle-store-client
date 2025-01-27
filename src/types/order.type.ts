import { TUserData } from "./global.type";
import { TProduct } from "./product.type";

export type TOrder = {
  _id: string;
  orderId: string;
  user: TUserData;
  product: TProduct;
  address: string;
  quantity: number;
  totalPrice: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
};
