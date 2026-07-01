import { Op } from "sequelize";
import Sale from "../models/sale.model";
import SaleItem from "../models/sale_item.model";


class ReportService {

    async getDailySales() {

        const today = new Date();

        const start = new Date(today);
        start.setHours(0, 0, 0, 0);

        const end = new Date(today);
        end.setHours(23, 59, 59, 999);

        const sales = await Sale.findAll({
            where: {
                sale_date: {
                    [Op.between]: [
                        start,
                        end]
                }
            }, attributes: [
                "id",
                "customer_name",
                "total_amount",
                "sale_date"]
        });

        const total = sales.reduce(
            (sum: any, item: any) => sum + Number(item.total_amount), 0
        );

        return {
            date: today,
            total_sales: total,
            orders: sales.length,
            sales
        };
    }

    async getMonthlySales() {
        const today = new Date();
        const start = new Date(
            today.getFullYear(),
            today.getMonth(),
            1
        );


        const end = new Date(
            today.getFullYear(),
            today.getMonth() + 1,
            0
        );

        const sales = await Sale.findAll({
            where: {
                sale_date: {
                    [Op.between]: [
                        start,
                        end]
                }
            },

            attributes: [
                "id",
                "total_amount",
                "sale_date"
            ]
        });



        const total = sales.reduce((sum: any, item: any) => sum + Number(item.total_amount), 0);
        return {
            month: today.getMonth() + 1,
            total_sales: total,
            orders: sales.length,
            sales
        };
    }


    async getProfitReport() {

        const items = await SaleItem.findAll({ attributes: ["quantity", "price"] });

        let revenue = 0;

        items.forEach((item: any) => {

            revenue += Number(item.quantity) * Number(item.price);
        });


        return {
            total_revenue: revenue,
            profit: revenue,
            message: "Profit calculated successfully"
        };
    }
}

export default new ReportService();