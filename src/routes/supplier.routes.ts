import { FastifyInstance } from "fastify";
import supplierController from "../controllers/supplier.controller";


async function SupplierRoutes(fastify: FastifyInstance) {
    fastify.post("/supplier", supplierController.createSupplier);
    fastify.get("/suppliers", supplierController.getAllSupplier);
    fastify.get("/supplier/:id", supplierController.getSupplierById);
    fastify.put("/supplier/:id", supplierController.updateSupplier);
    fastify.delete("/supplier/:id", supplierController.deleteSupplier)
}

export default SupplierRoutes;