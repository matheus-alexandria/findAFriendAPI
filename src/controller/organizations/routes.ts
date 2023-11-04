import { FastifyInstance } from "fastify";
import { CreateOrganizationController } from "./createOrganizationController";
import { OrganizationLoginController } from "./organizationLoginController";

export async function organizationRoutes(app: FastifyInstance) {
  const createOrganizationController = new CreateOrganizationController();
  app.post('/', createOrganizationController.handle);

  const organizationLoginController = new OrganizationLoginController();
  app.post('/login', organizationLoginController.handle);
}