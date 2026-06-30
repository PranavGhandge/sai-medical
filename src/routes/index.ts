import { FastifyInstance } from "fastify";
import MedicineRoutes from "./medicine.routes";
import CategoryRoutes from "./category.routes";




export async function routes(fastify: FastifyInstance) {
    fastify.register(MedicineRoutes, { prefix: "/medicine" });
    fastify.register(CategoryRoutes, { prefix: "/category" })
}