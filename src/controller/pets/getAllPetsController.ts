import { FastifyReply, FastifyRequest } from "fastify";
import { GetAllPetsUseCase } from "../../useCases/getAllPetsUseCase";
import { PetsPrismaRepository } from "../../repositories/prisma/petsPrismaRepository";
import { z } from "zod";

export class GetAllPetsController {
  async handle(req: FastifyRequest, res: FastifyReply) {
    try {
      const getPetsByStateRouteSchema = z.object({
        state: z.string(),
      });
  
      const { state } = getPetsByStateRouteSchema.parse(req.params);
  
      const getAllPetsQuerySchema = z.object({
        age: z.enum(['filhote', 'adulto', 'idoso']).optional(),
        size: z.enum(['pequeno', 'medio', 'grande']).optional(),
        energyLevel: z.enum(['baixa', 'media', 'alta']).optional(),
        independencyLevel: z.enum(['baixa', 'media', 'alta']).optional(),
        environment: z.enum(['casa', 'apartamento', 'aberto']).optional(),
      });
  
      const {
        age,
        size,
        energyLevel,
        independencyLevel,
        environment
      } = getAllPetsQuerySchema.parse(req.query);
  
      const petsRepository = new PetsPrismaRepository();
      const getAllPetsUseCase = new GetAllPetsUseCase(petsRepository);
  
      const { pets } = await getAllPetsUseCase.execute({
        state,
        age, 
        size,
        energyLevel,
        independencyLevel,
        environment
      });
  
      return res.send({
        pets
      });
    } catch (err) {
      if (err instanceof Error) {
        return res.status(404).send({
          message: err.message,
        });
      }

      throw err;
    }
  }
}