import { FastifyInstance } from "fastify";
import purchaseController from "../controllers/purchase.controller";


async function PurchaseRoutes(fastify: FastifyInstance) {
    fastify.post("/purchase", purchaseController.createPurchase);
}

export default PurchaseRoutes;