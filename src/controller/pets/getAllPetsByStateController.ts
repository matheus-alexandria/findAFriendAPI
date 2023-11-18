import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { PetsPrismaRepository } from "../../repositories/prisma/petsPrismaRepository";
import { GetAllPetsByStateUseCase } from "../../useCases/getAllPetsByStateUseCase";

export class GetAllPetsByStateController {
  async handle(req: FastifyRequest, res: FastifyReply) {
    try {
      const getPetsByStateRouteSchema = z.object({
        state: z.string(),
      });
  
      const { state } = getPetsByStateRouteSchema.parse(req.params);
  
      const petsRepository = new PetsPrismaRepository();
      const getAllPetsByStateUseCase = new GetAllPetsByStateUseCase(petsRepository);
  
      const { pets } = await getAllPetsByStateUseCase.execute({ state });
  
      return res.send({
        pets
      });
    } catch (err) {
      throw err;
    }
  }
}