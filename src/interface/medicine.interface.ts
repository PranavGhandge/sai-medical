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
    sortBy?: string;
    order?: "ASC" | "DESC";
}