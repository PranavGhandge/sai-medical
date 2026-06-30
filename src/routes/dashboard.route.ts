import { FastifyInstance } from "fastify";
import dashboardController from "../controllers/dashboard.controller";


async function DashboardRoutes(fastify: FastifyInstance) {

    fastify.get("/dashboard", dashboardController.getDashboard);

}

export default DashboardRoutes;