import { FastifyInstance } from "fastify";
import stockController from "../controllers/stock.controller";

async function StockRoutes(fastify: FastifyInstance) {
    fastify.post("/add-stock", stockController.addStock);
    fastify.get("/:medicine_id",stockController.getHistory)
}

export default StockRoutes;