import { FastifyInstance } from "fastify";
import { CreateOrganizationController } from "./createOrganizationController";

export function organizationRoutes(app: FastifyInstance) {
  const createOrganizationController = new CreateOrganizationController();
  app.post('/', createOrganizationController.handle);
}