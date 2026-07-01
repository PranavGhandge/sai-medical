import { FastifyInstance } from "fastify";

import invoiceController from "../controllers/invoice.controller";



async function InvoiceRoutes(fastify: FastifyInstance) {
    fastify.get("/invoice/:sale_id", invoiceController.generateInvoice);
}

export default InvoiceRoutes;
