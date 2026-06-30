import { FastifyReply, FastifyRequest } from "fastify";
import { CreateSaleInterface } from "../interface/sale.interface";
import saleService from "../services/sale.service";

class SaleController {
    async createSale(req: FastifyRequest, rep: FastifyReply) {

        try {
            const data = req.body as CreateSaleInterface;

            const response = await saleService.createSale(data);

            return rep.status(201).send(response);

        } catch (error) {
            return rep.status(400).send({
                message: (error as Error).message
            });
        }
    }
}


export default new SaleController();