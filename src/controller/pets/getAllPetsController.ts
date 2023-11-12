import { FastifyReply, FastifyRequest } from "fastify";
import { GetAllPetsUseCase } from "../../useCases/getAllPetsUseCase";
import { PetsPrismaRepository } from "../../repositories/prisma/petsPrismaRepository";

export class GetAllPetsController {
  async handle(req: FastifyRequest, res: FastifyReply) {
    const petsRepository = new PetsPrismaRepository();
    const getAllPetsUseCase = new GetAllPetsUseCase(petsRepository);

    const { pets } = await getAllPetsUseCase.execute();
    return res.send({
      pets
    });
  }
}