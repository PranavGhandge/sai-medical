import { FastifyInstance } from "fastify";
import MedicineRoutes from "./medicine.routes";
import CategoryRoutes from "./category.routes";
import StockRoutes from "./stock.routes";




export async function routes(fastify: FastifyInstance) {
    fastify.register(MedicineRoutes, { prefix: "/medicine" });
    fastify.register(CategoryRoutes, { prefix: "/category" });
    fastify.register(StockRoutes, { prefix: "/stock" })
}