import { FastifyReply, FastifyRequest } from "fastify";
import { CreatePurchaseInterface } from "../interface/purchase.interface";
import purchaseService from "../services/purchase.service";

class PurchaseController {

    async createPurchase(req: FastifyRequest, rep: FastifyReply) {
        try {

            const data = req.body as CreatePurchaseInterface;
            const response = await purchaseService.createPurchase(data);

            return rep.status(201).send(response);

        } catch (error) {

            return rep.status(400).send({
                message: (error as Error).message

            });
        }
    }
}

export default new PurchaseController();