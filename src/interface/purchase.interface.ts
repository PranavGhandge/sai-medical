export interface PurchaseItemInterface {
    medicine_id:string;
    quantity:number;
    price:string | number;
}

export interface CreatePurchaseInterface {
    supplier_id:string;
    items:PurchaseItemInterface[];
}