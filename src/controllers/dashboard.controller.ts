import { FastifyReply, FastifyRequest } from "fastify";
import dashboardService from "../services/dashboard.service";

class DashboardController {

    async getDashboard(req: FastifyRequest, rep: FastifyReply) {
        try {
            const response = await dashboardService.getDashboard();

            return rep.status(200).send(response);

        } catch (error) {

            return rep.status(500).send({
                message: (error as Error).message
            }
            )
        }
    }
}


export default new DashboardController();