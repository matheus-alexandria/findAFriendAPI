import { FastifyInstance } from "fastify";
import { CreatePetController } from "./createPetController";
import { authenticateToken } from "../../middlewares/authenticateToken";

export async function petRoutes(app: FastifyInstance) {
  const createPetController = new CreatePetController();
  app.post('/', {
    preHandler: [authenticateToken]
  }, createPetController.handle);
}