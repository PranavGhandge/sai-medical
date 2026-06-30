import { FastifyInstance } from "fastify";
import medicineController from "../controllers/medicine.controller";

async function MedicineRoutes(fastify: FastifyInstance) {
    fastify.post("/add/medicine", medicineController.addMedicine);
    fastify.get("/medicines", medicineController.getAllMedicine);
    fastify.get("/medicine/:id", medicineController.getMedicineById); 
    fastify.put("/medicine/:id", medicineController.updateMedicine);
    fastify.delete("/medicine/:id", medicineController.deleteMedicine);
}


export default MedicineRoutes;