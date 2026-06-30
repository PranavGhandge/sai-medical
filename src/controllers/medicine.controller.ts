import { FastifyReply, FastifyRequest } from "fastify";
import { CreateMedicineInterface, MedicineQueryInterface, UpdateMedicineInterface } from "../interface/medicine.interface";
import medicineService from "../services/medicine.service";

class MedicineController {
    async addMedicine(req: FastifyRequest, rep: FastifyReply) {
        try {
            const medicinedata = req.body as CreateMedicineInterface;

            const response = await medicineService.addMedicine(medicinedata)

            return rep.status(201).send(response)

        } catch (error) {
            console.log(error)
            return rep.status(500).send({
                message: "Internal server error",
                error: (error as Error).message
            })
        }
    }

    async getAllMedicine(req: FastifyRequest, rep: FastifyReply) {
        try {

            const { page, limit, search } = req.query as MedicineQueryInterface;

            const response = await medicineService.getAllMedicine({
                page: Number(page) || 1,
                limit: Number(limit) || 10,
                search
            });

            return rep.status(200).send(response)
        } catch (error) {
            return rep.status(500).send({
                message: "Internal Server Error",
                error: (error as Error).message
            })
        }
    }

    async getMedicineById(req: FastifyRequest, rep: FastifyReply) {
        try {
            const { id } = req.params as { id: string }

            const response = await medicineService.getMedicineById(id)

            return rep.status(200).send(response)

        } catch (error) {
            return rep.status(500).send({
                message: "internal server error",
                error: (error as Error).message
            })
        }
    }

    async updateMedicine(req: FastifyRequest, rep: FastifyReply) {
        try {
            const { id } = req.params as { id: string };

            const data = req.body as UpdateMedicineInterface;

            const response = await medicineService.updateMedicine(id, data)
            return rep.status(200).send(response)

        } catch (error) {
            return rep.status(500).send({
                message: "internal server error",
                error: (error as Error).message
            })
        }
    }

    async deleteMedicine(req: FastifyRequest, rep: FastifyReply) {
        try {
            const { id } = req.params as { id: string };

            const response = await medicineService.deleteMedicine(id)

            return rep.status(200).send(response)

        } catch (error) {
            return rep.status(500).send({
                message: "internal server error",
                error: (error as Error).message
            })
        }
    }

    async getExpiryMedicine(req: FastifyRequest, rep: FastifyReply) {
        try {
            const response = await medicineService.getExpiryMedicine();
            return rep.status(200).send(response);

        } catch (error) {

            return rep.status(400).send({
                message: (error as Error).message
            });
        }
    }

    async getLowStockMedicine(req: FastifyRequest, rep: FastifyReply) {
        try {
            const response = await medicineService.getLowStockMedicine();
            return rep.status(200).send(response);

        } catch (error) {
            return rep.status(400).send({
                message: (error as Error).message
            });
        }
    }
}

export default new MedicineController();