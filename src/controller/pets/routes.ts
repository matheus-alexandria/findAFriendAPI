import { FastifyInstance } from "fastify";
import { CreatePetController } from "./createPetController";
import { authenticateToken } from "../../middlewares/authenticateToken";
import { GetAllPetsController } from "./getAllPetsController";

export async function petRoutes(app: FastifyInstance) {
  const createPetController = new CreatePetController();
  app.post('/', {
    preHandler: [authenticateToken]
  }, createPetController.handle);

  const getAllPetsController = new GetAllPetsController();
  app.get('/', getAllPetsController.handle);
}