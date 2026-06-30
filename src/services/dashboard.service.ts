import { Op } from "sequelize";
import Medicine from "../models/medicine.model";
import Supplier from "../models/supplier.model";
import Sale from "../models/sale.model";
import Purchase from "../models/purchase.model";


class DashboardService {

    async getDashboard() {

        const totalMedicines = await Medicine.count();

        const totalSuppliers = await Supplier.count();

        const totalSales = await Sale.sum("total_amount") || 0;

        const totalPurchase = await Purchase.sum("total_amount") || 0;

        const lowStock = await Medicine.count({
            where: {
                quantity: {
                    [Op.lt]: 10
                }
            }
        }
        );

        const expiredMedicine = await Medicine.count(
            {
                where: {
                    expiry_date: {
                        [Op.lt]: new Date()
                    }
                }
            }
        );

        return {
            total_medicines: totalMedicines,
            total_suppliers: totalSuppliers,
            total_sales: totalSales,
            total_purchase: totalPurchase,
            low_stock: lowStock,
            expired_medicine: expiredMedicine
        }

    }

}


export default new DashboardService();