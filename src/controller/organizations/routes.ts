import { FastifyInstance } from "fastify";
import { CreateOrganizationController } from "./createOrganizationController";

export async function organizationRoutes(app: FastifyInstance) {
  const createOrganizationController = new CreateOrganizationController();
  app.post('/', createOrganizationController.handle);
}