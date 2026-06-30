import sequelize from "../config/database";
import { CreatePurchaseInterface } from "../interface/purchase.interface";
import Supplier from "../models/supplier.model";
import Medicine from "../models/medicine.model";
import Purchase from "../models/purchase.model";
import PurchaseItem from "../models/purchase_item.model";
import StockTransaction from "../models/stock.model";


class PurchaseService {
    async createPurchase(data: CreatePurchaseInterface) {

        const transaction = await sequelize.transaction();
        try {
            const supplier = await Supplier.findByPk(data.supplier_id, { transaction });

            if (!supplier) {
                throw new Error("Supplier Not Found");
            }

            let totalAmount = 0;

            for (const item of data.items) {
                const medicine = await Medicine.findByPk(item.medicine_id, { transaction });

                if (!medicine) {
                    throw new Error("Medicine Not Found");
                }

                totalAmount += Number(item.quantity) * Number(item.price);
            }


            const purchase = await Purchase.create({ supplier_id: data.supplier_id, total_amount: totalAmount }, { transaction });

            for (const item of data.items) {
                await PurchaseItem.create({
                    purchase_id: purchase.id,
                    medicine_id: item.medicine_id,
                    quantity: item.quantity,
                    price: item.price
                },
                    {transaction}
                );


                const medicine = await Medicine.findByPk(item.medicine_id, { transaction });

                await Medicine.update({ quantity: medicine!.quantity + item.quantity }, { where: { id: item.medicine_id }, transaction });

                await StockTransaction.create({ medicine_id: item.medicine_id, type: "IN", quantity: item.quantity }, { transaction });
            }

            await transaction.commit();

            return {
                message: "Purchase Created Successfully",
                purchase_id: purchase.id,
                total_amount: totalAmount
            }

        } catch (error) {
            await transaction.rollback();
            throw error;
        }
    }
}

export default new PurchaseService();