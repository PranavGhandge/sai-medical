export interface CreateStockInterface {
    medicine_id: string;
    type: "IN" | "OUT";
    quantity: number;
}