export interface CreateMedicineInterface {
    name: string;
    company: string;
    price: string | number;
    quantity: number;
    expiry_date: Date;
    category_id: string;
}

export interface UpdateMedicineInterface {
    name?: string;
    company?: string;
    price?: string | number;
    quantity?: number;
    category_id?: string;
    expiry_date?: Date;
}

export interface MedicineQueryInterface {
    page?: number;
    limit?: number;
    search?: string;
    company?: string;
    category_id?: string;
    expiry?: boolean;
    min_price?: number;
    max_price?: number;
    sortBy?: string;
    order?: "ASC" | "DESC";
}