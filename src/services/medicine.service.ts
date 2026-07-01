import { CreateMedicineInterface, MedicineQueryInterface, UpdateMedicineInterface } from "../interface/medicine.interface";
import Category from "../models/category.model";
import Medicine from "../models/medicine.model";
import { Op } from "sequelize";

class MedicineService {
    async addMedicine(data: CreateMedicineInterface) {
        try {
            const checkexist = await Medicine.findOne({ where: { name: data.name, company: data.company } })

            if (checkexist) {
                throw new Error("Medicine Already Exist")
            }

            const created = await Medicine.create({ ...data })

            return {
                success: true,
                message: "Medicine Added Successfully",
                medicine: {
                    medicine_id: created.id,
                    medicine_name: created.name,
                    medicine_compnay: created.company,
                    medicine_price: created.price,
                    medicine_quantity: created.quantity,
                    category_id: created.category_id
                }
            }
        } catch (error) {
            throw error
        }
    }

    async getAllMedicine(query: MedicineQueryInterface) {
        try {

            const page = query.page || 1;

            const limit = query.limit || 10;

            const offset = (page - 1) * limit;

            const where: any = {};

            if (query.search) {
                where.name = {
                    [Op.like]: `%${query.search}%`
                }
            }

            if (query.company) {
                where.company = query.company;
            }

            if (query.category_id) {
                where.category_id = query.category_id;
            }

            if (query.expiry) {
                const today = new Date();
                where.expiry_date = {
                    [Op.lte]: today
                }
            }

            if (query.min_price && query.max_price) {
                where.price = {
                    [Op.between]: [
                        query.min_price,
                        query.max_price
                    ]
                }
            }

            let order: any = [
                ["created_at", "DESC"]
            ];

            if (query.sortBy) {
                order = [
                    [
                        query.sortBy,
                        query.order || "ASC"
                    ]
                ]
            }


            const { rows, count } = await Medicine.findAndCountAll({
                where, limit, offset, include: [{ model: Category, as: "category", attributes: ["id", "name"] }], order, attributes: { exclude: ["created_at", "updated_at", "category_id"] }
            })

            return {
                message: "Medicine Found Successfully",
                total: count,
                page,
                limit,
                medicine: rows
            }
        } catch (error) {
            throw error
        }
    }

    async getMedicineById(id: string) {
        try {
            const medicine = await Medicine.findOne(
                {
                    where: { id: id },
                    include: [{
                        model: Category,
                        attributes: ["id", "name"]
                    }],
                    attributes: { exclude: ["created_at", "updated_at", "category_id"] }
                }
            );

            if (!medicine) {
                throw new Error("Medicine Not Found")
            }

            return {
                message: "Medicine Found Successfully",
                medicine: medicine
            }
        } catch (error) {
            throw error
        }
    }

    async updateMedicine(id: string, data: UpdateMedicineInterface) {
        try {
            const medicine = await Medicine.findOne({ where: { id: id } });

            if (!medicine) {
                throw new Error("Medicine Not Found")
            }

            await Medicine.update(data, { where: { id: id } })

            return {
                message: "Medicine Updated Successfully"
            }
        } catch (error) {
            throw error
        }
    }

    async deleteMedicine(id: string) {
        try {
            const medicine = await Medicine.findOne({ where: { id: id } })

            if (!medicine) {
                throw new Error("Medicine Not Found")
            }

            await Medicine.destroy({ where: { id: id } })

            return {
                message: "Medicine Deleted Successfully"
            }
        } catch (error) {
            throw error
        }
    }

    async getExpiryMedicine() {
        try {

            const today = new Date();

            const next30Days = new Date();

            next30Days.setDate(
                today.getDate() + 30
            );

            const medicines = await Medicine.findAll({
                where: {
                    expiry_date: {
                        [Op.lte]: next30Days
                    }
                },

                attributes: [
                    "id",
                    "name",
                    "company",
                    "quantity",
                    "expiry_date"
                ]

            });

            if (medicines.length === 0) {

                throw new Error(
                    "No Expiry Medicine Found"
                )
            }

            return {
                message: "Expiry Medicine Found Successfully",
                medicines
            }

        } catch (error) {
            throw error
        }
    }

    async getLowStockMedicine() {
        try {
            const medicines = await Medicine.findAll({
                where: {
                    quantity: {
                        [Op.lt]: 10

                    }
                },

                attributes: [
                    "id",
                    "name",
                    "company",
                    "quantity"
                ]
            });


            if (medicines.length === 0) {
                throw new Error(
                    "No Low Stock Medicine Found"
                )
            }

            return {
                message: "Low Stock Medicine Found Successfully",
                medicines
            }

        } catch (error) {
            throw error
        }

    }
}

export default new MedicineService();