import { FastifyInstance } from "fastify";
import MedicineRoutes from "./medicine.routes";
import CategoryRoutes from "./category.routes";
import StockRoutes from "./stock.routes";
import SupplierRoutes from "./supplier.routes";
import PurchaseRoutes from "./purchase.route";
import SaleRoutes from "./sale.route";
import DashboardRoutes from "./dashboard.route";
import InvoiceRoutes from "./invoice.route";




export async function routes(fastify: FastifyInstance) {
    fastify.register(MedicineRoutes, { prefix: "/medicine" });
    fastify.register(CategoryRoutes, { prefix: "/category" });
    fastify.register(StockRoutes, { prefix: "/stock" });
    fastify.register(SupplierRoutes);
    fastify.register(PurchaseRoutes);
    fastify.register(SaleRoutes);
    fastify.register(DashboardRoutes);
    fastify.register(InvoiceRoutes)
}