import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { CreatePetUseCase } from "../../useCases/createPetUseCase";
import { OrganizationsPrismaRepository } from "../../repositories/prisma/organizationsPrismaRepository";
import { PetsPrismaRepository } from "../../repositories/prisma/petsPrismaRepository";

export class CreatePetController {
  async handle(req: FastifyRequest, res: FastifyReply) {
    try {
      const createPetRequestSchema = z.object({
        about: z.string(),
        age: z.enum(['filhote', 'adulto', 'idoso']),
        size: z.enum(['pequeno', 'medio', 'grande']),
        energyLevel: z.enum(['baixa', 'media', 'alta']),
        independencyLevel: z.enum(['baixa', 'media', 'alta']),
        environment: z.enum(['casa', 'apartamento', 'aberto']),
        organizationId: z.string().uuid()
      });
  
      const { 
        about,
        age,
        size,
        energyLevel,
        independencyLevel,
        environment,
        organizationId
      } = createPetRequestSchema.parse(req.body);
  
      const petsRepository = new PetsPrismaRepository();
      const organizationsRepository = new OrganizationsPrismaRepository();
      const createPetUseCase = new CreatePetUseCase(
        petsRepository,
        organizationsRepository
      );
  
      const pet = await createPetUseCase.execute({
        about,
        age,
        size,
        energyLevel,
        independencyLevel,
        environment,
        organizationId
      });
  
      return res.send(pet);
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).send({
          message: err.message
        });
      }
    }
  }
}