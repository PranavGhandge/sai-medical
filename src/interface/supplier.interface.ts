export interface CreateSupplierInterface {
    name:string;
    phone:string;
    email?:string;
    address?:string;
}

export interface UpdateSupplierInterface {
    name?:string;
    phone?:string;
    email?:string;
    address?:string;
}