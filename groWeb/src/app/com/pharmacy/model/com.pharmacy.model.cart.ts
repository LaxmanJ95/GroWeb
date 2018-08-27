export class CartItem{
    id:number;
    productId: number;
    quantity:number;
    //description: string;
    productName:string;
    price:number;
    imageFile:string;
    userId:number;
    totalPrice:number;
    uploadedFiles:string;
    presOrder:number;
    inCart:boolean = false;
    saved:number = 0;
};
export class Cart{
    totalPrice : number;
    totalQuantity: number;
    cartItems: CartItem[];
};
export class CartTotal{
    totalPrice : number;
    totalQuantity: number;
};
export class UpdateQuantityRequest{
    cartId:number;
    productId:number;
    quantity:number;

};
