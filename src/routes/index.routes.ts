import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import { organizationRoutes } from "../controller/organizations/routes";
import { petRoutes } from "../controller/pets/routes";

export async function routes(app: FastifyInstance) {
  app.register(organizationRoutes, {
    prefix: '/org'
  });

  app.register(petRoutes);
}