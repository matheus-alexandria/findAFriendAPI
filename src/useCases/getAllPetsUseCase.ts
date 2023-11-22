import { Pet } from "@prisma/client";
import { PetsRepository } from "../repositories/petsRepository";
import { NotFoundError } from "../errors/NotFoundError";

export class GetAllPetsUseCase {
  constructor(
    private petsRepository: PetsRepository
  ) {}

  async execute({ 
    state, age, size, energyLevel, environment, independencyLevel 
  }: GetAllPetsUseCaseRequest): Promise<GetAllPetsUseCaseResponse> {
    const pets = await this.petsRepository.findMany(
      state,
      {
        age,
        size,
        energy_level: energyLevel,
        environment,
        independency_level: independencyLevel
      }
    );

    if (!pets.length) {
      throw new NotFoundError('No pets found with the given filters.')
    }

    return {
      pets
    }
  }
}

interface GetAllPetsUseCaseRequest {
  state: string;
  age?: string;
  size?: string;
  energyLevel?: string;
  independencyLevel?: string;
  environment?: string;
}

interface GetAllPetsUseCaseResponse {
  pets: Pet[];
}