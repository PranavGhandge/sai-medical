import { FastifyInstance } from "fastify";
import reportController from "../controllers/report.controller";


async function ReportRoutes(fastify: FastifyInstance) {

    fastify.get("/report/daily-sales", reportController.getDailySales);
    fastify.get("/report/monthly-sales", reportController.getMonthlySales);
    fastify.get("/report/profit", reportController.getProfitReport);
}

export default ReportRoutes;