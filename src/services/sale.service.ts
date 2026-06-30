import sequelize from "../config/database";
import { CreateSaleInterface } from "../interface/sale.interface";
import Medicine from "../models/medicine.model";
import Sale from "../models/sale.model";
import SaleItem from "../models/sale_item.model";
import StockTransaction from "../models/stock.model";


class SaleService {

    async createSale(data: CreateSaleInterface) {

        const transaction = await sequelize.transaction();

        try {

            let totalAmount = 0;

            // 1. Check medicine & stock
            for (const item of data.items) {

                const medicine = await Medicine.findByPk(item.medicine_id, { transaction });

                if (!medicine) {

                    throw new Error(
                        "Medicine Not Found"
                    );
                }


                if (medicine.quantity < item.quantity) {
                    throw new Error(
                        "Insufficient Stock"
                    );
                }

                totalAmount += Number(item.quantity) * Number(item.price);

            }

            // 2. Create Sale

            const sale = await Sale.create({
                customer_name: data.customer_name,
                customer_phone: data.customer_phone,
                total_amount: totalAmount
            },

                { transaction });


            // 3. Create Items + Reduce Stock

            for (const item of data.items) {

                await SaleItem.create({
                    sale_id: sale.id,
                    medicine_id: item.medicine_id,
                    quantity: item.quantity,
                    price: item.price
                },

                    {
                        transaction
                    }
                );

                const medicine = await Medicine.findByPk(item.medicine_id, { transaction });


                await Medicine.update({ quantity: medicine!.quantity - item.quantity },
                    {
                        where: {
                            id: item.medicine_id
                        },
                        transaction
                    });


                // Stock OUT entry

                await StockTransaction.create({
                    medicine_id: item.medicine_id,
                    type: "OUT",
                    quantity: item.quantity
                },

                    {
                        transaction
                    });
            }

            await transaction.commit();

            return {
                message: "Sale Created Successfully",
                sale_id: sale.id,
                total_amount: totalAmount
            };

        } catch (error) {

            await transaction.rollback();
            throw error;
        }

    }
}


export default new SaleService();