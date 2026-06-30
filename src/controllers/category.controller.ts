import { FastifyReply, FastifyRequest } from "fastify";
import categoryService from "../services/category.service";

class categoryController {
    async createCategory(req: FastifyRequest, rep: FastifyReply) {
        try {
            const category = req.body as any;

            const responce = await categoryService.createCategory(category)

            return rep.status(201).send(responce)

        } catch (error) {
            return rep.status(500).send({
                message: "internal server error",
                error: (error as Error).message
            })
        }
    }
}

export default new categoryController();