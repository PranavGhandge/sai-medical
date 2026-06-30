import Supplier from "../models/supplier.model";
import { CreateSupplierInterface, UpdateSupplierInterface } from "../interface/supplier.interface";

class SupplierService {

    async createSupplier(data: CreateSupplierInterface) {
        const exist = await Supplier.findOne({
            where: { phone: data.phone }
        })

        if (exist) {
            throw new Error("Supplier Already Exist")
        }

        const supplier = await Supplier.create(data as any);

        return {
            message: "Supplier Created Successfully",
            supplier_id: supplier.id
        }
    }

    async getAllSupplier() {

        const suppliers = await Supplier.findAll();

        return {
            message: "Supplier Found Successfully",
            suppliers
        }
    }

    async getSupplierById(id: string) {

        const supplier = await Supplier.findByPk(id);

        if (!supplier) {
            throw new Error("Supplier Not Found")
        }

        return {
            message: "Supplier Found Successfully",
            supplier
        }
    }


    async updateSupplier(id: string, data: UpdateSupplierInterface) {

        const supplier = await Supplier.findByPk(id);

        if (!supplier) {
            throw new Error("Supplier Not Found")
        }


        await Supplier.update(data, { where: { id } })

        return {
            message: "Supplier Updated Successfully"
        }
    }


    async deleteSupplier(id: string) {

        const supplier = await Supplier.findByPk(id);

        if (!supplier) {
            throw new Error("Supplier Not Found")
        }

        await Supplier.destroy({ where: { id } })

        return {
            message: "Supplier Deleted Successfully"
        }

    }

}

export default new SupplierService();