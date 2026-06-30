import { FastifyInstance } from "fastify";
import categoryController from "../controllers/category.controller"

async function CategoryRoutes(fastify: FastifyInstance) {
    fastify.post("/category", categoryController.createCategory)
}

export default CategoryRoutes;