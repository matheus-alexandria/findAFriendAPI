import { FastifyReply, FastifyRequest } from "fastify";
import { GetAllPetsUseCase } from "../../useCases/getAllPetsUseCase";
import { PetsPrismaRepository } from "../../repositories/prisma/petsPrismaRepository";
import { z } from "zod";

export class GetAllPetsController {
  async handle(req: FastifyRequest, res: FastifyReply) {
    const getAllPetsQuerySchema = z.object({
      age: z.enum(['filhote', 'adulto', 'idoso']).optional(),
      size: z.enum(['pequeno', 'medio', 'grande']).optional(),
      energyLevel: z.enum(['baixa', 'media', 'alta']).optional(),
    });

    const {
      age,
      size,
      energyLevel
    } = getAllPetsQuerySchema.parse(req.query);

    const petsRepository = new PetsPrismaRepository();
    const getAllPetsUseCase = new GetAllPetsUseCase(petsRepository);

    const { pets } = await getAllPetsUseCase.execute({
      age, 
      size,
      energyLevel
    });

    return res.send({
      pets
    });
  }
}