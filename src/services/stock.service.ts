import { CreateStockInterface } from "../interface/stock.interface";
import Medicine from "../models/medicine.model";
import StockTransaction from "../models/stock.model";

class stockService {
    async addStock(data: CreateStockInterface) {
        try {

            if (data.quantity <= 0) {
                throw new Error("Invalid Quantity")
            }
            const medicine = await Medicine.findOne({ where: { id: data.medicine_id } })

            if (!medicine) {
                throw new Error("Medicine not Found")
            }

            let newQuantity = medicine.quantity;

            if (data.type === "IN") {
                newQuantity += data.quantity
            }

            if (data.type === "OUT") {
                if (medicine.quantity < data.quantity) {
                    throw new Error("Insuficient Stock")
                }
                newQuantity -= data.quantity
            }

            await Medicine.update(
                { quantity: newQuantity },
                { where: { id: data.medicine_id } }
            );

            const stock = await StockTransaction.create({ ...data })

            return {
                message: "Stock Updated Successfully",
                stock_id: stock.id,
                current_quantity: newQuantity
            }

        } catch (error) {
            throw error
        }
    }

    async getHistory(medicine_id: string) {
        try {
            const history = await StockTransaction.findAll(
                {
                    where: { medicine_id: medicine_id },
                    attributes: ["id", "type", "quantity", "created_at"],
                    include: [{ model: Medicine, as: "medicine", attributes: ["name", "company"] }],
                    order: [["created_at", "DESC"]]
                }
            );

            if (history.length === 0) {
                throw new Error("Stock History Not Found")
            }

            return {
                message: "Stock History Found Successfully",
                history
            }
        } catch (error) {
            throw error
        }
    }
}

export default new stockService();