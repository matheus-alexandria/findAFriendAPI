import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { FindPetUseCase } from "../../useCases/findPetUseCase";
import { PetsPrismaRepository } from "../../repositories/prisma/petsPrismaRepository";
import { NotFoundError } from "../../errors/NotFoundError";

export class FindPetController {
  async handle(req: FastifyRequest, res: FastifyReply) {
    try {
      const findPetSchema = z.object({
        petId: z.string().uuid(),
      });
  
      const { petId } = findPetSchema.parse(req.params);
  
      const petsRepository = new PetsPrismaRepository();
      const findPetUseCase = new FindPetUseCase(petsRepository);
  
      const { pet } = await findPetUseCase.execute({ petId });
  
      return res.send({
        pet
      });
    } catch (err) {
      if (err instanceof NotFoundError) {
        return res.status(404).send({
          message: err.message
        });
      }
    }
  }
}