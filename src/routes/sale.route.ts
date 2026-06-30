import { FastifyInstance } from "fastify";
import saleController from "../controllers/sale.controller";


async function SaleRoutes(fastify: FastifyInstance) {
    fastify.post("/sale", saleController.createSale);
}

export default SaleRoutes;