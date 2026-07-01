import { FastifyReply, FastifyRequest } from "fastify";
import invoiceService from "../services/invoice.service";


class InvoiceController {

    async generateInvoice(req: FastifyRequest, rep: FastifyReply) {
        try {

            const { sale_id } = req.params as { sale_id: string };

            await invoiceService.generateInvoice(sale_id, rep);

        } catch (error) {
            return rep.status(400).send({
                message: (error as Error).message
            });
        }
    }
}

export default new InvoiceController();