import { FastifyReply, FastifyRequest } from "fastify";
import { CreateSupplierInterface, UpdateSupplierInterface } from "../interface/supplier.interface";
import supplierService from "../services/supplier.service";

class SupplierController {
    async createSupplier(req: FastifyRequest, rep: FastifyReply) {
        try {
            const data = req.body as CreateSupplierInterface;
            const response = await supplierService.createSupplier(data);

            return rep.status(201).send(response);

        } catch (error) {
            return rep.status(400).send({
                message: (error as Error).message
            });
        }
    }



    async getAllSupplier(req: FastifyRequest, rep: FastifyReply) {

        try {
            const response = await supplierService.getAllSupplier();
            return rep.status(200).send(response);

        } catch (error) {
            return rep.status(400).send({
                message: (error as Error).message
            });
        }
    }




    async getSupplierById(req: FastifyRequest, rep: FastifyReply) {

        try {

            const { id } = req.params as { id: string };
            const response = await supplierService.getSupplierById(id);

            return rep.status(200).send(response);

        } catch (error) {
            return rep.status(400).send({
                message: (error as Error).message
            });
        }
    }

    async updateSupplier(req: FastifyRequest, rep: FastifyReply) {
        try {

            const { id } = req.params as { id: string };
            const data = req.body as UpdateSupplierInterface;
            const response = await supplierService.updateSupplier(id, data);

            return rep.status(200).send(response);

        } catch (error) {
            return rep.status(400).send({
                message: (error as Error).message
            })
        }
    }

    async deleteSupplier(req: FastifyRequest, rep: FastifyReply) {
        try {
            const { id } = req.params as { id: string };
            const response = await supplierService.deleteSupplier(id);
            return rep.status(200).send(response);

        } catch (error) {
            return rep.status(400).send({
                message: (error as Error).message
            })
        }
    }
}

export default new SupplierController();