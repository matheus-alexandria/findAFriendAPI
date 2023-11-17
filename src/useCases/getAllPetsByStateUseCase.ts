import { Pet } from "@prisma/client";
import { PetsRepository } from "../repositories/petsRepository";

export class GetAllPetsByStateUseCase {
  constructor(
    private petsRepository: PetsRepository
  ) {}

  async execute({ state }: GetAllPetsByStateUseCaseRequest): Promise<GetAllPetsByStateUseCaseResponse> {
    const pets = await this.petsRepository.findManyByState(state);

    return {
      pets
    }
  }
}

interface GetAllPetsByStateUseCaseRequest {
  state: string;
}

interface GetAllPetsByStateUseCaseResponse {
  pets: Pet[]
}
