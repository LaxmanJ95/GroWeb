import {Address} from '../../common/model/com.common.model.address';

export class OrderRequest{
  userId:number;
  billingAddressId:number;
  shippingAddressId:number;
  paymentMethod:string;
};

export class Order{
    orderId:number;
    date:'';
    totalPrice:number;
    totalQuantity:number;
    shippingAddress: Address;
};

export class OrderSummary {
  totalItems:number;
	tax:number;
	price:number;
	totalPrice:number;
}
