import { FastifyInstance } from "fastify";
import { z } from "zod";
import { prisma } from "../lib/prisma";
import { organizationRoutes } from "../controller/organizations/routes";

export async function routes(app: FastifyInstance) {
  // app.post('/pet', async (request, response) => {
  //   const createPetRequestSchema = z.object({
  //     about: z.string(),
  //     age: z.enum(['filhote', 'adulto', 'idoso']),
  //     size: z.enum(['pequeno', 'medio', 'grande']),
  //     energyLevel: z.enum(['baixa', 'media', 'alta']),
  //     independencyLevel: z.enum(['baixa', 'media', 'alta']),
  //     environment: z.enum(['house', 'open', 'apartment']),
  //   });

  //   const { 
  //     about,
  //     age,
  //     size,
  //     energyLevel,
  //     independencyLevel,
  //     environment
  //   } = createPetRequestSchema.parse(request.body);

  //   const pet = await prisma.pet.create({
  //     data: {
  //       about,
  //       age,
  //       size,
  //       energy_level: energyLevel,
  //       independency_level: independencyLevel,
  //       environment
  //     }
  //   });
    
  //   return response.send({
  //     pet
  //   });
  // });

  app.register(organizationRoutes, {
    prefix: '/org'
  });
}