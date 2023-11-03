import { FastifyInstance } from "fastify";
import { CreatePetController } from "./createPetController";

export async function petRoutes(app: FastifyInstance) {
  const createPetController = new CreatePetController();
  app.post('/', createPetController.handle);
}