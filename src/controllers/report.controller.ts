import { FastifyReply, FastifyRequest } from "fastify";
import reportService from "../services/report.service";

class ReportController {
    async getDailySales(req: FastifyRequest, rep: FastifyReply) {

        try {

            const response = await reportService.getDailySales();

            return rep.status(200).send(response);

        } catch (error) {

            return rep.status(500).send({
                message: (error as Error).message

            });
        }
    }


    async getMonthlySales(req: FastifyRequest, rep: FastifyReply) {
        try {
            const response = await reportService.getMonthlySales();

            return rep.status(200).send(response);

        } catch (error) {
            return rep.status(500).send({
                message: (error as Error).message
            });
        }
    }

    async getProfitReport(req: FastifyRequest, rep: FastifyReply) {
        try {

            const response = await reportService.getProfitReport();
            return rep.status(200).send(response);

        } catch (error) {

            return rep.status(500).send({
                message: (error as Error).message
            });
        }
    }
}



export default new ReportController();