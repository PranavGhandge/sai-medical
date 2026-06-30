export interface SaleItemInterface {
    medicine_id: string;
    quantity: number;
    price: string | number;

}



export interface CreateSaleInterface {
    customer_name: string;
    customer_phone?: string;
    items: SaleItemInterface[];
}