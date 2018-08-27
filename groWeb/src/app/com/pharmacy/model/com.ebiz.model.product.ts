export class Product{
    checkedFlag:string ;
    id:number=0;
    name: string;
    specialPrice:number=0;
    costPrice:string;
    productClass:string;
    subClass:string;
    imageFile: string;
    desc: string[];
    originalQuantity:number;
    quantity:number=1;
    packing:string;
    description:string;
    userId:number;
    active:number=1;
    inInventory:number=0;
    isWished:boolean = false;
    inCart:boolean = false;
    productExpirty:string;
};
export class Products{
    product: Product[];
}
export class ProductSearch{
    id:string;
    name: string;
    totalItems:string;
    totalPrice:string;
    status:number=0;
    fromDate:string = "";
    toDate:string = "";
}