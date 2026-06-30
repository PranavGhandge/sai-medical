import { FastifyReply, FastifyRequest } from "fastify";
import { CreateStockInterface } from "../interface/stock.interface";
import stockService from "../services/stock.service";

class stockController {
    async addStock(req: FastifyRequest, rep: FastifyReply) {
        try {
            const stock = req.body as CreateStockInterface;

            const response = await stockService.addStock(stock)

            return rep.status(201).send(response)
        } catch (error) {
            return rep.status(500).send({
                message: "Internal Server Error",
                error: (error as Error).message
            })
        }
    }

    async getHistory(req: FastifyRequest, rep: FastifyReply) {
        try {
            const { medicine_id } = req.params as { medicine_id: string }

            const response = await stockService.getHistory(medicine_id)

            return rep.status(200).send(response)
        } catch (error) {
            return rep.status(500).send({
                message: "Internal Server Error",
                error: (error as Error).message
            })
        }
    }
}

export default new stockController();